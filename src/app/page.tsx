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

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Additional form logic if needed.
  };

  return (
    <motion.div
      className="relative h-auto w-full overflow-hidden"
      style={{
        /* Inverted layer order:
           First layer: the dot grid (radial-gradient)
           Second layer: the linear gradient */
        background: `radial-gradient(var(--dot-color) var(--dot-size), transparent var(--dot-size)), linear-gradient(135deg, var(--sidebar-bg), var(--background))`,
        backgroundSize: "var(--dot-spacing) var(--dot-spacing), cover",
        y: backgroundY,
        animation: "moveDots 20s linear infinite",
      }}
    >
      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,var(--vignette-opacity)) 100%)`,
        }}
      ></div>

      {/* Top-right Navigation for Login and Sign Up */}
      <header className="absolute top-0 right-0 p-6 z-50 flex gap-4">
        <Link
          href="/login"
          className="text-xl font-semibold text-[var(--highlight-color)] hover:underline transition-all duration-300"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-xl font-semibold text-[var(--highlight-color)] hover:underline transition-all duration-300"
        >
          Sign Up
        </Link>
      </header>

      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-center text-[var(--foreground)] drop-shadow-lg"
        >
          Welcome to Uniplanner!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-xl text-center text-[var(--foreground)]"
        >
          Plan your university courses and schedule with ease.
        </motion.p>
        <div className="flex flex-wrap gap-6 mb-8">
          {/* Primary CTA */}
          <Link
            href="/login"
            className="px-6 py-3 bg-[var(--highlight-color)] text-white rounded shadow-md hover:bg-[var(--highlight-hover)] transition-transform duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          {/* Secondary CTA */}
          <button
            onClick={scrollToFeatures}
            className="px-6 py-3 border border-[var(--highlight-color)] text-[var(--highlight-color)] rounded hover:bg-[var(--highlight-color)] hover:text-white transition-transform duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
        <div className="w-full mt-6">
          <FallingText
            text="UniPlanner 3000 helps you plan your academic journey with course scheduling and a modern dashboard."
            highlightWords={[
              "UniPlanner",
              "plan",
              "academic",
              "course",
              "scheduling",
              "dashboard",
            ]}
            highlightClass="text-[var(--highlight-color)] font-bold transition-colors duration-300"
            backgroundColor="transparent"
          />
        </div>
      </main>

      <section className="py-10 px-6 sm:px-12">
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6 sm:px-12">
        <GlassCard title="Feature Highlights">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--foreground)]">
                Easy Scheduling
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Organize your course timetable with an intuitive drag-and-drop
                interface. Organize your course timetable with a simple
                drag-and-drop interface.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--foreground)]">
                Custom Dashboards
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Personalize your dashboard with widgets that highlight what
                matters most. Customize your dashboard with widgets that matter
                most to you.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--foreground)]">
                Collaboration Tools
              </h3>
              <p className="text-[var(--foreground)] opacity-80">
                Share your schedule and collaborate with peers in real time.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="What Our Users Say" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[var(--foreground)] opacity-80 italic">
                &quot;This app redefines academic planning – sleek, modern, and
                highly functional.&quot;
              </p>
              <p className="mt-4 text-[var(--foreground)] font-bold">
                – Julian Thaesler
              </p>
            </div>
            <div>
              <p className="text-[var(--foreground)] opacity-80 italic">
                &quot;An incredibly modern tool that makes managing my schedule
                a breeze.&quot;
              </p>
              <p className="mt-4 text-[var(--foreground)] font-bold">
                – ChatGPT
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="How It Works" delay={0.4}>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--highlight-color)] flex items-center justify-center text-white font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
                  Sign Up & Customize
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Create an account and tailor your dashboard to fit your
                  academic needs.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--highlight-color)] flex items-center justify-center text-white font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
                  Plan Your Courses
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Use our scheduler to arrange your classes with a simple
                  drag-and-drop.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--highlight-color)] flex items-center justify-center text-white font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
                  Get Real-Time Insights
                </h3>
                <p className="text-[var(--foreground)] opacity-80">
                  Receive timely notifications and updates so you never miss a
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
              className="w-full h-full object-cover rounded shadow-lg"
            ></iframe>
          </div>
        </GlassCard>

        <GlassCard title="Get in Touch" delay={0.8}>
          <p className="text-[var(--foreground)] opacity-80 mb-6 text-center">
            We’d love to hear from you! Drop us a message.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name (e.g. John Doe)"
              className="px-4 py-3 border rounded bg-[var(--background)] text-[var(--foreground)]"
            />
            <input
              type="email"
              placeholder="Your Email (e.g. john.doe@example.com)"
              className="px-4 py-3 border rounded bg-[var(--background)] text-[var(--foreground)]"
            />
            <textarea
              placeholder="Your Message..."
              rows={4}
              className="px-4 py-3 border rounded bg-[var(--background)] text-[var(--foreground)] resize-none"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--highlight-color)] text-white rounded shadow-md hover:bg-[var(--highlight-hover)] transition-transform duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </GlassCard>
      </section>
    </motion.div>
  );
}
