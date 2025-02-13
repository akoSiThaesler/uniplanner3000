"use client";
import Link from "next/link";
import FallingText from "./components/FallingText";
import LogoWall from "./components/LogoWall";

export default function Landing() {
  const logoItems = [
    { imgUrl: "/github.svg", altText: "GitHub" },
    { imgUrl: "/git.svg", altText: "Git" },
    { imgUrl: "/react.svg", altText: "React" },
    { imgUrl: "/html5.svg", altText: "HTML" },
    { imgUrl: "/css3.svg", altText: "CSS" },
    { imgUrl: "/typescript.svg", altText: "TypeScript" },
    { imgUrl: "/nextdotjs.svg", altText: "Next.js" },
    { imgUrl: "/tailwindcss.svg", altText: "Tailwind CSS" },
  ];

  return (
    <div
      className="
        absolute h-full w-full 
        bg-[--background]
        bg-[radial-gradient(var(--dot-color)_var(--dot-size),transparent_var(--dot-size))]
        [background-size:var(--dot-spacing)_var(--dot-spacing)]
      "
    >
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-6xl font-bold mb-4">Welcome to Uniplanner!</h1>
        <p className="mb-6">
          Plan your university courses and schedule with ease.
        </p>
        <Link
          href="/webapp"
          className="
            px-4 py-2 
            bg-[--highlight-color] 
            text-white rounded 
            hover:bg-[--highlight-hover]
            transition-colors duration-300
          "
        >
          Enter WebApp
        </Link>
        <div className="w-full">
          <FallingText
            text="UniPlanner 3000 helps you plan your academic journey with course scheduling and a modernistic dashboard."
            highlightWords={[
              "UniPlanner",
              "plan",
              "academic",
              "course",
              "scheduling",
              "dashboard",
            ]}
            highlightClass="text-[--highlight-color] font-semibold transition-colors duration-300"
            trigger="hover"
            backgroundColor="transparent"
            animationDuration={800}
            staggerDelay={50}
            fallDistance={20}
            easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
            fontSize="text-lg"
            lineHeight="leading-relaxed"
            fallDirection="down"
          />
        </div>

        <section className="w-full mt-8 flex flex-col items-center text-center">
          <h2 className="pb-4 text-2xl">Built with:</h2>
          <p className="mb-4 text-lg">
            Git, GitHub, React, HTML, CSS, TypeScript, Next.js, & Tailwind CSS
          </p>
          <LogoWall
            items={logoItems}
            direction="horizontal"
            pauseOnHover={false}
            size="clamp(8rem, 1rem + 30vmin, 20rem)"
            duration="90s"
            textColor="var(--foreground)"
            bgColor="transparent"
            bgAccentColor="var(--glass-background)"
            singleWall
            scrollDirection="ltr"
          />
        </section>
      </main>
    </div>
  );
}
