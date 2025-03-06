"use client";
import Head from "next/head";
import Link from "next/link";
import type React from "react";
import Image from "next/image";
import NavBar from "./components/Header";
import GlassCard from "./components/GlassCard";
import Footer from "./components/footer";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";
import LogoWall from "./components/LogoWall";
import { useRef, useEffect, useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Check,
  Calendar,
  Users,
  Clipboard,
  BarChart2,
  Smartphone,
  Layers,
} from "lucide-react";

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
  /*   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]); */

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // ---------------------------
  // Roadmap Section Setup
  // ---------------------------
  const roadmapItems = [
    {
      title: "Phase 1: Foundation",
      description:
        "Initial release with core scheduling and planning features.",
      date: "Q1 2024",
      completed: true,
      color: "indigo",
      icon: <Layers className="w-6 h-6" />,
      features: [
        "Course scheduling system",
        "Basic calendar view",
        "Assignment tracking",
        "Grade calculator",
        "Personal dashboard",
        "Mobile-responsive design",
        "User profiles",
        "Notification system",
      ],
    },
    {
      title: "Phase 2: Collaboration",
      description: "Enhanced sharing and real-time collaboration tools.",
      date: "Q2 2024",
      completed: true,
      color: "emerald",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Study group creation",
        "Real-time document editing",
        "Shared calendars",
        "Group chat functionality",
        "File sharing system",
        "Collaborative note-taking",
        "Permission management",
        "Activity tracking",
      ],
    },
    {
      title: "Phase 3: Mobile & Integration",
      description: "Native mobile apps and third-party integrations.",
      date: "Q3 2024",
      completed: false,
      color: "amber",
      icon: <Smartphone className="w-6 h-6" />,
      features: [
        "Native iOS application",
        "Native Android application",
        "Google Calendar integration",
        "Microsoft Office integration",
        "Canvas/LMS integration",
        "Offline mode functionality",
        "Push notifications",
        "Cross-device synchronization",
      ],
    },
    {
      title: "Phase 4: AI & Advanced Analytics",
      description:
        "AI-powered scheduling suggestions and performance insights.",
      date: "Q4 2024",
      completed: false,
      color: "rose",
      icon: <BarChart2 className="w-6 h-6" />,
      features: [
        "AI schedule optimization",
        "Personalized study recommendations",
        "Performance analytics dashboard",
        "Predictive grade forecasting",
        "Smart reminders",
        "Time management insights",
        "Learning pattern analysis",
        "Course recommendation engine",
      ],
    },
  ];

  // Roadmap scroll and snapping logic
  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: roadmapProgress } = useScroll({
    target: roadmapRef,
    offset: ["start start", "end end"],
  });
  const progressScaleX = useTransform(roadmapProgress, [0, 1], [0, 1]);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const snappedX = useMotionValue(0);
  useEffect(() => {
    let latestSnapIndex = 0;
    const snapThreshold = 0.1;
    const unsubscribe = roadmapProgress.onChange((latest) => {
      const progressScaled = latest * (roadmapItems.length - 1);
      const fraction = progressScaled % 1;
      const baseIndex = Math.floor(progressScaled);
      const newSnapIndex = fraction > snapThreshold ? baseIndex + 1 : baseIndex;
      if (newSnapIndex !== latestSnapIndex) {
        latestSnapIndex = newSnapIndex;
        const target = -newSnapIndex * windowWidth;
        animate(snappedX, target, {
          type: "spring",
          stiffness: 300,
          damping: 30,
        });
      }
    });
    return () => unsubscribe();
  }, [roadmapItems.length, windowWidth, roadmapProgress, snappedX]);

  // FAQ section
  const faqs = [
    {
      question: "How does Uniplanner help with course scheduling?",
      answer:
        "Uniplanner provides an intuitive drag-and-drop interface for organizing your courses. It automatically detects scheduling conflicts and suggests alternatives based on your preferences and requirements.",
    },

    {
      question: "How does the grade tracking feature work?",
      answer:
        "You can input your grades for assignments, quizzes, and exams. Uniplanner calculates your current grade and projects your final grade based on the course syllabus and grading scheme.",
    },
    {
      question: "Can I integrate with other calendar apps?",
      answer:
        "Yes, Uniplanner seamlessly integrates with Google Calendar, Apple Calendar, Microsoft Outlook, and other popular calendar applications.",
    },
  ];

  // ---------------------------
  // Staggered Grid Component (Phase 2)
  // ---------------------------
  const StaggeredGrid = ({
    features,
    color,
  }: {
    features: string[];
    color: string;
  }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    const getRandomSize = (index: number) => {
      const sizes = ["h-32", "h-40", "h-48", "h-56"];
      return sizes[index % sizes.length];
    };

    return (
      <>
        <NavBar />
        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${getRandomSize(
                index
              )} p-6 rounded-xl flex flex-col justify-between bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800`}
            >
              <h3
                className={`text-lg font-semibold text-${color}-700 dark:text-${color}-300`}
              >
                {feature}
              </h3>
              <div
                className={`w-8 h-8 rounded-full bg-${color}-100 dark:bg-${color}-800 flex items-center justify-center`}
              >
                <span
                  className={`text-${color}-600 dark:text-${color}-300 text-xs font-bold`}
                >
                  {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  // ---------------------------
  // Timeline Layout Component (Phase 3)
  // ---------------------------
  const TimelineLayout = ({
    features,
    color,
  }: {
    features: string[];
    color: string;
  }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    return (
      <motion.div ref={containerRef} className="max-w-4xl mx-auto relative">
        <div
          className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-${color}-200 dark:bg-${color}-800 transform -translate-x-1/2`}
        ></div>
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: isEven ? -50 : 50 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative flex items-center mb-8 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-${color}-500 border-4 border-white dark:border-gray-800 transform -translate-x-1/2 z-10`}
              ></div>
              <div
                className={`ml-12 md:ml-0 ${
                  isEven ? "md:mr-8 md:text-right" : "md:ml-8"
                } md:w-5/12`}
              >
                <div
                  className={`p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800 shadow-md`}
                >
                  <h3
                    className={`text-lg font-semibold text-${color}-700 dark:text-${color}-300 mb-2`}
                  >
                    {feature}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{`Milestone ${
                    index + 1
                  }`}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  // ---------------------------
  // Card Grid Component (Phase 4)
  // ---------------------------
  const CardGrid = ({
    features,
    color,
  }: {
    features: string[];
    color: string;
  }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    return (
      <motion.div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto perspective-1000"
      >
        {features.map((feature, index) => {
          const rotateX = Math.random() * 5 - 2.5;
          const rotateY = Math.random() * 5 - 2.5;
          return (
            <motion.div
              key={index}
              className="card-3d-container"
              initial={{ opacity: 0, rotateX, rotateY, z: -100 }}
              animate={
                isInView
                  ? { opacity: 1, rotateX: 0, rotateY: 0, z: 0 }
                  : { opacity: 0, rotateX, rotateY, z: -100 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.05,
                rotateX: -5,
                rotateY: 5,
                z: 50,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                className={`h-48 p-6 rounded-xl flex flex-col justify-between transform-style-3d bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-900/40 dark:to-${color}-800/60 border border-${color}-200 dark:border-${color}-700 shadow-lg`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-${color}-200 dark:bg-${color}-700 flex items-center justify-center mb-4`}
                >
                  <span
                    className={`text-${color}-700 dark:text-${color}-300 font-bold`}
                  >
                    {index + 1}
                  </span>
                </div>
                <h3
                  className={`text-lg font-semibold text-${color}-800 dark:text-${color}-200`}
                >
                  {feature}
                </h3>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full bg-${color}-200 dark:bg-${color}-700 text-${color}-800 dark:text-${color}-200`}
                  >
                    Coming Q4
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <title>Uniplanner - Simplify Your Academic Life</title>
        <meta
          name="description"
          content="Organize your courses, track assignments, and collaborate with classmates using Uniplanner."
        />
        {/* Additional SEO meta tags can be added here */}
      </Head>
      <div className={`relative w-full bg-cover h-auto `}>
        <motion.div
          className="relative w-full bg-cover h-auto dark:bg-gray-900"
          style={{
            background: `radial-gradient(var(--dot-color, rgba(0, 0, 0, 0.1)) var(--dot-size, 1px), transparent var(--dot-size, 1px)), linear-gradient(135deg, var(--sidebar-bg, #f5f7fa), var(--background, #ffffff))`,
            backgroundSize:
              "var(--dot-spacing, 20px) var(--dot-spacing, 20px), cover",
            y: backgroundY,
            // Temporarily disabled
            /*   animation: "moveDots 20s linear infinite", */
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,var(--vignette-opacity, 0.2)) 100%)`,
            }}
          ></div>

          {/* Navigation */}

          <main className="pt-24">
            {/* Hero Section */}
            <motion.section
              className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-8"
              style={
                {
                  /*  opacity: heroOpacity, */
                  /*  scale: heroScale, */
                }
              }
            >
              <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full"
                  >
                    Simplify Your Academic Life
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-[var(--foreground)]"
                  >
                    Plan Your University Journey with{" "}
                    <span className="text-[var(--foreground)]">Uniplanner</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-8 text-xl text-[var(--foreground)] max-w-lg mx-auto md:mx-0"
                  >
                    The all-in-one platform for students to organize courses,
                    track assignments, collaborate with classmates, and excel in
                    their academic career.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
                  >
                    <Link
                      href="/login"
                      className="px-8 py-3 bg-black text-white rounded-md shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      Get Started <ArrowRight size={16} />
                    </Link>
                    <button
                      onClick={scrollToFeatures}
                      className="px-8 py-3 border border-primary text-primary dark:text-primary-foreground rounded-md hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
                    >
                      Learn More <ChevronDown size={16} />
                    </button>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Join now to improve university life with Uniplanner !
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative hidden md:block"
                >
                  <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src="/Dashboard.png"
                      alt="Uniplanner Dashboard"
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute bottom-10 left-0 right-0 flex justify-center"
              >
                <button
                  onClick={scrollToFeatures}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all animate-bounce"
                  aria-label="Scroll down"
                >
                  <ChevronDown size={24} className="text-primary" />
                </button>
              </motion.div>
            </motion.section>

            {/* Logo Section */}
            <section className="py-16 px-6 sm:px-12 ">
              <div className="container mx-auto">
                <h2 className="pb-4 text-xl sm:text-2xl text-gray-900 dark:text-white text-center font-semibold">
                  Built with modern technologies
                </h2>
                <p className="mb-8 text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center">
                  Leveraging the best tools to provide a seamless experience
                </p>
                <LogoWall
                  items={logoItems}
                  direction="horizontal"
                  pauseOnHover={false}
                  size="clamp(4rem, 1rem + 15vmin, 10rem)"
                  duration="60s"
                  textColor="var(--foreground)"
                  bgColor="transparent"
                  bgAccentColor="var(--glass-background, rgba(255,255,255,0.1))"
                  singleWall
                  scrollDirection="ltr"
                />
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 sm:px-12">
              <div className="container mx-auto">
                <div className="text-center mb-16">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                    Features
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Uniplanner combines powerful scheduling tools with
                    collaboration features to help you make the most of your
                    academic journey.
                  </p>
                </div>
                <GlassCard title="Core Features">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Smart Scheduling
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Organize your course timetable with an intuitive
                        drag-and-drop interface. AI-powered suggestions help
                        optimize your weekly schedule.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <Clipboard className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Custom Dashboards
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Personalize your dashboard with widgets that highlight
                        what matters most to you - upcoming assignments, exam
                        countdown, grade tracking, and more.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Collaboration Tools
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Share your schedule and collaborate with peers in real
                        time. Create study groups, coordinate meeting times, and
                        share resources seamlessly.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Roadmap Section */}
            <section
              id="roadmap"
              className="py-24 px-6 sm:px-12 bg-gray-50 dark:bg-gray-900/50"
            >
              <div className="container mx-auto mb-16">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                    Roadmap
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Development Journey
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    See what we&apos;ve accomplished and what&apos;s coming next
                    for Uniplanner.
                  </p>
                </div>
              </div>
              <div ref={roadmapRef} className="relative h-[500vh]">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                  <motion.ul
                    style={{
                      x: snappedX,
                      width: `${roadmapItems.length * 100}vw`,
                    }}
                    className="flex"
                  >
                    {roadmapItems.map((phase, index) => (
                      <li
                        key={index}
                        className="w-screen h-screen flex flex-col justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8"
                      >
                        <div className="max-w-5xl mx-auto">
                          <div className="flex items-center mb-8">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                phase.completed
                                  ? `bg-${phase.color}-100 text-${phase.color}-600 dark:bg-${phase.color}-900/30 dark:text-${phase.color}-300`
                                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                              }`}
                            >
                              {phase.completed ? (
                                <Check size={20} />
                              ) : (
                                phase.icon
                              )}
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold">
                                {phase.title}
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400">
                                {phase.date} {phase.completed && "• Completed"}
                              </p>
                            </div>
                          </div>
                          <p className="text-xl mb-12 max-w-3xl">
                            {phase.description}
                          </p>
                          {index === 0 && (
                            <motion.div className="grid grid-cols-6 gap-6 mt-8">
                              {phase.features.map((feature, i) => {
                                const spans = [
                                  "col-span-3 row-span-2",
                                  "col-span-3",
                                  "col-span-2",
                                  "col-span-2",
                                  "col-span-2",
                                  "col-span-2 row-span-2",
                                  "col-span-2",
                                  "col-span-2",
                                ];
                                return (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      delay: i * 0.1,
                                      duration: 0.4,
                                    }}
                                    className={`bg-white/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 ${spans[i]}`}
                                  >
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      {feature}
                                    </h3>
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center mt-2">
                                      <span className="text-indigo-600 dark:text-indigo-300 text-xs font-bold">
                                        {i + 1}
                                      </span>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          )}
                          {index === 1 && (
                            <StaggeredGrid
                              features={phase.features}
                              color="emerald"
                            />
                          )}
                          {index === 2 && (
                            <TimelineLayout
                              features={phase.features}
                              color="amber"
                            />
                          )}
                          {index === 3 && (
                            <CardGrid features={phase.features} color="rose" />
                          )}
                        </div>
                      </li>
                    ))}
                  </motion.ul>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-gray-700 dark:text-gray-300 text-sm">
                    Scroll to explore the roadmap
                  </p>
                </div>
                <motion.div
                  style={{ scaleX: progressScaleX }}
                  className="fixed left-0 right-0 h-2 bg-primary bottom-10 origin-left"
                />
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 sm:px-12">
              <div className="container mx-auto">
                <div className="text-center mb-16">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                    FAQ
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Find answers to common questions about Uniplanner.
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {faq.question}
                          </span>
                          <span className="transition group-open:rotate-180">
                            <ChevronDown size={20} />
                          </span>
                        </summary>
                        <div className="p-4 mt-1 bg-white dark:bg-gray-700 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 px-6 sm:px-12 bg-primary/5 dark:bg-gray-900/50">
              <div className="container mx-auto">
                <div className="max-w-3xl mx-auto text-center justify-center flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Stay Updated with Uniplanner
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Subscribe to our newsletter for the latest features, tips,
                    and updates.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1  px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
