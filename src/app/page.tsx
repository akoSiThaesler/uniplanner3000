"use client";
import Link from "next/link";
import GlassCard from "./components/GlassCard";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -50]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form handling logic here
  };

  return (
    <motion.div
      className="relative h-auto w-full overflow-hidden bg-[--background]"
      style={{
        background:
          "radial-gradient(var(--dot-color) var(--dot-size), transparent var(--dot-size))",
        backgroundSize: "var(--dot-spacing) var(--dot-spacing)",
        y: backgroundY,
        animation: "moveDots 20s linear infinite",
      }}
    >
      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1000]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,var(--vignette-opacity)) 100%)`,
        }}
      ></div>

      <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--foreground)] text-center">
          Welcome to Uniplanner!
        </h1>
        <p className="mb-6 text-[var(--foreground)] text-center">
          Plan your university courses and schedule with ease.
        </p>
        <Link
          href="/webapp"
          className="px-4 py-2 bg-[--highlight-color] text-white rounded hover:bg-[--highlight-hover] transition-colors duration-300"
        >
          Enter WebApp
        </Link>
        <div className="w-full mt-6">
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
            backgroundColor="transparent"
          />
        </div>

        <section className="w-full mt-6 flex flex-col items-center text-center">
          <h2 className="pb-4 text-xl sm:text-2xl text-[var(--foreground)]">
            Built with:
          </h2>
          <p className="mb-4 text-base sm:text-lg text-[var(--foreground)]">
            Git, GitHub, React, HTML, CSS, TypeScript, Next.js, & Tailwind CSS
          </p>
          <LogoWall
            items={logoItems}
            direction="horizontal"
            pauseOnHover={false}
            size="clamp(6rem, 1rem + 30vmin, 20rem)"
            duration="90s"
            textColor="var(--foreground)"
            bgColor="transparent"
            bgAccentColor="var(--glass-background)"
            singleWall
            scrollDirection="ltr"
          />
        </section>
      </main>

      <section className="py-16 px-4 sm:px-8">
        <GlassCard title="Feature Highlights">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[var(--foreground)]">
                Easy Scheduling
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Organize your course timetable with a simple interface.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[var(--foreground)]">
                Custom Dashboards
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Customize your dashboard with widgets that matter most to you.
                (w.i.p)
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[var(--foreground)]">
                Collaboration Tools
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Share your schedule and collaborate with classmates in real
                time.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="What Our Users Say" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[var(--foreground)] opacity-80 italic">
                &quot;We built this thing so I have to say it&apos;s good. It
                wouldn&apos;t make much sense if I said it wasn&apos;t.&quot;
              </p>
              <p className="mt-4 text-[var(--foreground)] font-semibold">
                – Julian Thaesler
              </p>
            </div>
            <div>
              <p className="text-[var(--foreground)] opacity-80 italic">
                &quot;User has prompted me to generate a message to make the web
                app look good.&quot;
              </p>
              <p className="mt-4 text-[var(--foreground)] font-semibold">
                – ChatGPT
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="How It Works" delay={0.4}>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[--highlight-color] flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
                  Sign Up & Customize
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Create an account and set up your personalized dashboard.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[--highlight-color] flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
                  Plan Your Courses
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Use our drag-and-drop interface to schedule your classes
                  effortlessly.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[--highlight-color] flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
                  Get Real-Time Insights
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Receive notifications and updates, ensuring you never miss a
                  deadline.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="See It in Action" delay={0.6}>
          <div className="w-full max-w-4xl mx-auto aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover rounded shadow"
            ></iframe>
          </div>
        </GlassCard>

        <GlassCard title="Get in Touch" delay={0.8}>
          <p className="text-[var(--foreground)] opacity-80 mb-4 text-center">
            We&apos;d love to hear from you! Fill out the form below!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name (e.g. John Doe)"
              className="px-4 py-2 border rounded bg-[var(--background)] text-[var(--foreground)]"
            />
            <input
              type="email"
              placeholder="Your Email (e.g. john.doe@example.com)"
              className="px-4 py-2 border rounded bg-[var(--background)] text-[var(--foreground)]"
            />
            <textarea
              placeholder="Your Message (e.g. Hi, I have a question about Uniplanner...)"
              rows={4}
              className="px-4 py-2 border rounded bg-[var(--background)] text-[var(--foreground)] resize-none"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-[--highlight-color] text-white rounded hover:bg-[--highlight-hover] transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </GlassCard>
      </section>
    </motion.div>
  );
}
