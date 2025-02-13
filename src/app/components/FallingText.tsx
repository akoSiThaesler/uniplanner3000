import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import "./FallingText.css";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
}

const FallingText = ({
  text = "This is a sample falling text",
  highlightWords = [],
  highlightClass = "highlighted",
  backgroundColor = "none",
  wireframes = false,
  gravity = 0.2,
  mouseConstraintStiffness = 1,
}: FallingTextProps) => {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  const [isFixed, setIsFixed] = useState(false);
  const fixedRef = useRef(isFixed);
  const reassembleRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // New state to control hover prompt visibility.
  const [showHoverPrompt, setShowHoverPrompt] = useState(true);
  // New state to detect if device supports hover.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fixedRef.current = isFixed;
  }, [isFixed]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the device supports hover; if not, treat it as mobile.
      setIsMobile(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  // Insert text as individual word spans.
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${
          isHighlighted ? highlightClass : ""
        }">${word}</span>`;
      })
      .join(" ");
    textRef.current.innerHTML = newHTML;
    // Delay setting ready until after layout.
    setTimeout(() => setIsReady(true), 0);
  }, [text, highlightWords, highlightClass]);

  // Initialize the physics simulation once the text is ready.
  useEffect(() => {
    // If mobile, skip simulation and show static text.
    if (isMobile || !isReady) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;
    try {
      const simulationEl = simulationRef.current;
      if (!simulationEl) return;
      const containerRect = simulationEl.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      if (width <= 0 || height <= 0) return;

      const engine = Engine.create();
      engineRef.current = engine;
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasContainerRef.current!,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
        },
      });

      const boundaryOptions = {
        isStatic: true,
        render: { fillStyle: "transparent" },
      };
      const boundaries = [
        Bodies.rectangle(width / 2, height + 10, width, 20, boundaryOptions),
        Bodies.rectangle(width / 2, -10, width, 20, boundaryOptions),
        Bodies.rectangle(-10, height / 2, 20, height, boundaryOptions),
        Bodies.rectangle(width + 10, height / 2, 20, height, boundaryOptions),
      ];

      const wordSpans = textRef.current
        ? textRef.current.querySelectorAll(".word")
        : [];
      const wordBodies = Array.from(wordSpans).map((elem) => {
        const rect = elem.getBoundingClientRect();
        const simRect = simulationEl.getBoundingClientRect();
        const x = rect.left - simRect.left + rect.width / 2;
        const y = rect.top - simRect.top + rect.height / 2;
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: "transparent" },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2,
        });
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem, body, initialPosition: { x, y } };
      });

      const mouse = Mouse.create(simulationEl);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false },
        },
      });
      render.mouse = mouse;

      World.add(engine.world, [
        ...boundaries,
        mouseConstraint,
        ...wordBodies.map((wb) => wb.body),
      ]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      const updateLoop = () => {
        wordBodies.forEach(({ body, elem, initialPosition }) => {
          if (fixedRef.current || reassembleRef.current) {
            body.isSensor = true;
            const lerpFactor = 0.05;
            const newX =
              body.position.x +
              (initialPosition.x - body.position.x) * lerpFactor;
            const newY =
              body.position.y +
              (initialPosition.y - body.position.y) * lerpFactor;
            Matter.Body.setPosition(body, { x: newX, y: newY });
            const newAngle = body.angle * (1 - lerpFactor);
            Matter.Body.setAngle(body, newAngle);
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Body.setAngularVelocity(body, 0);
          } else {
            body.isSensor = false;
          }
          const { x, y } = body.position;
          const w = body.bounds.max.x - body.bounds.min.x;
          const h = body.bounds.max.y - body.bounds.min.y;
          (elem as HTMLElement).style.position = "absolute";
          (elem as HTMLElement).style.left = `${x - w / 2}px`;
          (elem as HTMLElement).style.top = `${y - h / 2}px`;
          (elem as HTMLElement).style.transform = `rotate(${body.angle}rad)`;
        });
        Matter.Engine.update(engine, 16);
        animationFrameRef.current = requestAnimationFrame(updateLoop);
      };

      updateLoop();

      const canvasContainer = canvasContainerRef.current;
      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
        Mouse.clearSourceEvents(mouse);
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasContainer) {
          canvasContainer.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);
        engineRef.current = null;
      };
    } catch (error) {
      console.error("Physics initialization failed:", error);
    }
  }, [
    isReady,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    isMobile,
  ]);

  // For mobile, show static text.
  const renderStaticText = () => (
    <div className="falling-text-target static" ref={textRef} />
  );

  return (
    <div className="falling-text-container" ref={outerContainerRef}>
      {/* Header for toggle switch */}
      <div className="falling-text-header">
        <div className="header-bg"></div>
        <div
          className={`toggle-switch ${isFixed ? "active" : ""}`}
          onClick={() => {
            setIsFixed((prev) => {
              const newVal = !prev;
              reassembleRef.current = newVal;
              return newVal;
            });
          }}
        >
          <div className="toggle-knob"></div>
        </div>
      </div>

      {/* Simulation area */}
      <div
        className="falling-text-simulation"
        onMouseEnter={() => {
          if (!isFixed) {
            reassembleRef.current = true;
            setShowHoverPrompt(false);
          }
        }}
        onMouseLeave={() => {
          if (!isFixed) {
            reassembleRef.current = false;
            setShowHoverPrompt(true);
          }
        }}
        ref={simulationRef}
      >
        {isMobile ? (
          renderStaticText()
        ) : (
          <div ref={textRef} className="falling-text-target" />
        )}
        <div ref={canvasContainerRef} className="falling-text-canvas" />
        {/* Render hover prompt only if not mobile and toggle is inactive */}
        {!isMobile && !isFixed && (
          <div
            className="hover-prompt"
            style={{ opacity: showHoverPrompt ? 1 : 0 }}
          >
            {/*  <span>Hover me</span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FallingText;
