import React, { useState, FC } from "react";
import "./LogoWall.css";

interface LogoItem {
  imgUrl: string;
  altText: string;
}

interface LogoWallProps {
  items?: LogoItem[];
  direction?: "horizontal" | "vertical";
  pauseOnHover?: boolean;
  size?: string;
  duration?: string;
  textColor?: string;
  bgColor?: string;
  bgAccentColor?: string;
  singleWall?: boolean; // If true, render one infinite wall
  scrollDirection?: "ltr" | "rtl"; // Control scroll direction
}

const LogoWall: FC<LogoWallProps> = ({
  items = [],
  direction = "horizontal",
  pauseOnHover = false,

  size = "clamp(20rem, 2rem + 70vmin, 50rem)", // Increased from 16rem/60vmin/40rem
  duration = "60s",
  textColor = "#ffffff",
  bgColor = "#060606",
  bgAccentColor = "#111111",
  singleWall = false,
  scrollDirection = "ltr",
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const wrapperClass = [
    "logoWall-wrapper",
    direction === "vertical" && "wrapper--vertical",
  ]
    .filter(Boolean)
    .join(" ");

  const baseMarqueeClass = [
    "marquee",
    direction === "vertical" && "marquee--vertical",
  ]
    .filter(Boolean)
    .join(" ");

  if (!singleWall) {
    const marqueeClass = [baseMarqueeClass, isPaused && "paused"]
      .filter(Boolean)
      .join(" ");
    return (
      <article
        className={wrapperClass}
        style={
          {
            "--size": size,
            "--duration": duration,
            "--color-text": textColor,
            "--color-bg": bgColor,
            "--color-bg-accent": bgAccentColor,
          } as React.CSSProperties
        }
      >
        <div
          className={marqueeClass}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          <div className="marquee__group">
            {items.map((item, idx) => (
              <img
                key={idx}
                src={item.imgUrl}
                alt={item.altText}
                style={{ width: size, height: "auto" }}
              />
            ))}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {items.map((item, idx) => (
              <img
                key={`dup1-${idx}`}
                src={item.imgUrl}
                alt={item.altText}
                style={{ width: size, height: "auto" }}
              />
            ))}
          </div>
        </div>

        <div
          className={`${baseMarqueeClass} marquee--reverse ${
            isPaused ? "paused" : ""
          }`}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          <div className="marquee__group">
            {items.map((item, idx) => (
              <img
                key={`rev-${idx}`}
                src={item.imgUrl}
                alt={item.altText}
                style={{ width: size, height: "auto" }}
              />
            ))}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {items.map((item, idx) => (
              <img
                key={`dup2-${idx}`}
                src={item.imgUrl}
                alt={item.altText}
                style={{ width: size, height: "auto" }}
              />
            ))}
          </div>
        </div>
      </article>
    );
  }

  // Single wall mode: duplicate marquee group for continuous scroll.
  const singleMarqueeClass = [
    baseMarqueeClass,
    scrollDirection === "rtl" && "marquee--reverse",
    isPaused && "paused",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={wrapperClass}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--color-text": textColor,
          "--color-bg": bgColor,
          "--color-bg-accent": bgAccentColor,
        } as React.CSSProperties
      }
    >
      <div
        className={singleMarqueeClass}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div className="marquee__group">
          {items.map((item, idx) => (
            <img
              key={`single-${idx}`}
              src={item.imgUrl}
              alt={item.altText}
              style={{ width: size, height: "auto" }}
            />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((item, idx) => (
            <img
              key={`single-dup-${idx}`}
              src={item.imgUrl}
              alt={item.altText}
              style={{ width: size, height: "auto" }}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default LogoWall;
