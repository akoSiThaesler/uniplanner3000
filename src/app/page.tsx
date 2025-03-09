"use client";
import Head from "next/head";
import Link from "next/link";
import type React from "react";
import Image from "next/image";
import NavBar from "./components/Header";
import GlassCard from "./components/GlassCard";
import { motion, useInView, AnimatePresence } from "framer-motion";
import LogoWall from "./components/LogoWall";
import { useRef, useState } from "react";
import {
  LayersRounded,
  GroupsRounded,
  PhoneIphoneRounded,
  BarChartRounded,
  CheckCircleRounded,
  CalendarMonthRounded,
  AssignmentRounded,
  PeopleRounded,
  GridViewRounded,
  AutoAwesomeRounded,
  TimelineRounded,
  SpeedRounded,
  NotificationsRounded,
  EditNoteRounded,
  ShareRounded,
  ChatRounded,
  FolderSharedRounded,
  AdminPanelSettingsRounded,
  AndroidRounded,
  DescriptionRounded,
  IntegrationInstructionsRounded,
  CloudOffRounded,
  NotificationsActiveRounded,
  SyncRounded,
  SmartToyRounded,
  RecommendRounded,
  InsightsRounded,
  TrendingUpRounded,
  AccessTimeRounded,
  PsychologyRounded,
  SchoolRounded,
  KeyboardArrowDownRounded,
  ArrowForwardRounded,
  CalendarTodayRounded,
  DashboardRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

export default function Landing() {
  const logoItems = [
    { imgUrl: "/git.svg", altText: "Git" },
    { imgUrl: "/react.svg", altText: "React" },
    { imgUrl: "/html5.svg", altText: "HTML" },
    { imgUrl: "/css3.svg", altText: "CSS" },
    { imgUrl: "/typescript.svg", altText: "TypeScript" },

    { imgUrl: "/tailwindcss.svg", altText: "Tailwind CSS" },
  ];

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
      date: "Conceptual Release",
      status: "in progress",
      completed: false,
      color: "indigo",
      icon: <LayersRounded className="w-6 h-6" />,
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
      featureIcons: [
        <GridViewRounded className="w-5 h-5" key="grid" />,
        <CalendarMonthRounded className="w-5 h-5" key="calendar" />,
        <AssignmentRounded className="w-5 h-5" key="assignment" />,
        <SpeedRounded className="w-5 h-5" key="grade" />,
        <GridViewRounded className="w-5 h-5" key="dashboard" />,
        <PhoneIphoneRounded className="w-5 h-5" key="mobile" />,
        <PeopleRounded className="w-5 h-5" key="profile" />,
        <NotificationsRounded className="w-5 h-5" key="notification" />,
      ],
    },
    {
      title: "Phase 2: Collaboration",
      description: "Enhanced sharing and real-time collaboration tools.",
      date: "Alpha Release",
      status: "not started",
      completed: false,
      color: "emerald",
      icon: <GroupsRounded className="w-6 h-6" />,
      features: [
        "Study group creation",
        "Real-time document editing",
        "Shared calendars",
        "Group chat functionality",
        "File sharing system",
        "Collaborative note-taking",
        "Tour guide feature",
        "Permission management",
      ],
      featureIcons: [
        <GroupsRounded className="w-5 h-5" key="study" />,
        <EditNoteRounded className="w-5 h-5" key="document" />,
        <ShareRounded className="w-5 h-5" key="shared" />,
        <ChatRounded className="w-5 h-5" key="chat" />,
        <FolderSharedRounded className="w-5 h-5" key="file" />,
        <AutoAwesomeRounded className="w-5 h-5" key="collab" />,
        <SchoolRounded className="w-5 h-5" key="tour" />,
        <AdminPanelSettingsRounded className="w-5 h-5" key="permission" />,
        <TimelineRounded className="w-5 h-5" key="activity" />,
      ],
    },
    {
      title: "Phase 3: Mobile & Integration",
      description: "Native mobile apps and third-party integrations.",
      date: "Expanded Release",
      completed: false,
      status: "not started",
      color: "amber",
      icon: <PhoneIphoneRounded className="w-6 h-6" />,
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
      featureIcons: [
        <AndroidRounded className="w-5 h-5" key="android" />,
        <CalendarMonthRounded className="w-5 h-5" key="google" />,
        <DescriptionRounded className="w-5 h-5" key="office" />,
        <IntegrationInstructionsRounded className="w-5 h-5" key="canvas" />,
        <CloudOffRounded className="w-5 h-5" key="offline" />,
        <NotificationsActiveRounded className="w-5 h-5" key="push" />,
        <SyncRounded className="w-5 h-5" key="sync" />,
      ],
    },
    {
      title: "Phase 4: AI & Advanced Analytics",
      description:
        "AI-powered scheduling suggestions and performance insights.",
      date: "Full Release",
      status: "not started",
      completed: false,
      color: "rose",
      icon: <BarChartRounded className="w-6 h-6" />,
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
      featureIcons: [
        <SmartToyRounded className="w-5 h-5" key="ai" />,
        <RecommendRounded className="w-5 h-5" key="personalized" />,
        <InsightsRounded className="w-5 h-5" key="performance" />,
        <TrendingUpRounded className="w-5 h-5" key="predictive" />,
        <NotificationsActiveRounded className="w-5 h-5" key="smart" />,
        <AccessTimeRounded className="w-5 h-5" key="time" />,
        <PsychologyRounded className="w-5 h-5" key="learning" />,
        <SchoolRounded className="w-5 h-5" key="course" />,
      ],
    },
  ];

  // FAQ section
  const faqs = [
    {
      question: "How does Uniplanner help with course scheduling?",
      answer:
        "Uniplanner provides a visual course scheduler that allows you to drag and drop courses into your weekly timetable. You can view your schedule by day, week, or month.",
    },
    {
      question: "How does the grade tracking feature work?",
      answer:
        "The grade tracking feature allows you to see your course grades and weights to calculate your overall grade. You can track your progress throughout the semester.",
    },
    {
      question: "Can I integrate with other calendar apps?",
      answer:
        "No, unfortunately as of now we do not support integration with other calendar apps.",
    },
  ];

  // ---------------------------
  // New Roadmap Components
  // ---------------------------

  // Feature Grid Component
  const FeatureGrid = ({
    features,
    color,
    featureIcons,
  }: {
    features: string[];
    color: string;
    featureIcons?: React.ReactNode[];
  }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full bg-${color}-100 dark:bg-${color}-800 flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                {featureIcons && featureIcons[index] ? (
                  <div className={`text-${color}-600 dark:text-${color}-300`}>
                    {featureIcons[index]}
                  </div>
                ) : (
                  <span
                    className={`text-${color}-600 dark:text-${color}-300 text-xs font-bold`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <h3
                className={`text-sm md:text-base font-medium text-${color}-700 dark:text-${color}-300`}
              >
                {feature}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Roadmap Tabs Component
  const RoadmapTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {roadmapItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2
                ${
                  activeTab === index
                    ? `bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300 border-2 border-${item.color}-300 dark:border-${item.color}-700`
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-2 border-transparent"
                }`}
            >
              <span className="hidden sm:inline">
                {item.title.split(":")[0]}
              </span>
              <span className="sm:hidden">{index + 1}</span>
              {item.status === "completed" ? (
                <CheckCircleRounded className="w-4 h-4" />
              ) : item.status === "in progress" ? (
                <AccessTimeRounded className="w-4 h-4" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6 md:hidden">
          <button
            onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-full bg-[var(--background)] text-[var(--foreground)]"
            disabled={activeTab === 0}
          >
            <ChevronLeftRounded className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {roadmapItems[activeTab].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {roadmapItems[activeTab].date}{" "}
              {roadmapItems[activeTab].status === "completed"
                ? "• Completed"
                : roadmapItems[activeTab].status === "in progress"
                ? "• In Progress"
                : ""}
            </p>
          </div>
          <button
            onClick={() =>
              setActiveTab((prev) =>
                Math.min(roadmapItems.length - 1, prev + 1)
              )
            }
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            disabled={activeTab === roadmapItems.length - 1}
          >
            <ChevronRightRounded className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[var(--background)] rounded-lg shadow-md p-6">
          <div className="hidden md:flex items-center mb-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 
              ${
                roadmapItems[activeTab].completed
                  ? `bg-${roadmapItems[activeTab].color}-100 text-${roadmapItems[activeTab].color}-600 dark:bg-${roadmapItems[activeTab].color}-900/30 dark:text-${roadmapItems[activeTab].color}-300`
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {roadmapItems[activeTab].completed ? (
                <CheckCircleRounded className="w-6 h-6" />
              ) : (
                roadmapItems[activeTab].icon
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {roadmapItems[activeTab].title}
              </h2>
              <p className="text-[var(--foreground)] ">
                {roadmapItems[activeTab].date}{" "}
                {roadmapItems[activeTab].completed && "• Completed"}
              </p>
            </div>
          </div>

          <p className="text-lg mb-8">{roadmapItems[activeTab].description}</p>

          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <FeatureGrid
            features={roadmapItems[activeTab].features}
            color={roadmapItems[activeTab].color}
            featureIcons={roadmapItems[activeTab].featureIcons}
          />
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex gap-2">
            {roadmapItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTab === index
                    ? `bg-blue-700`
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to phase ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Single FAQ Item component
  interface FaqItemProps {
    faq: {
      question: string;
      answer: string;
    };
    index: number;
  }

  function FaqItem({ faq, index }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <details
          className="group"
          onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary
            className="flex justify-between items-center font-medium cursor-pointer 
                     border border-[var(--border)] p-4 rounded-lg bg-[var(--background)]
                     transition-all duration-300 ease-in-out group-open:border-primary group-open:shadow-lg"
          >
            <span className="text-lg font-semibold text-[var(--foreground)]">
              {faq.question}
            </span>
            <span className="transition-transform duration-300 group-open:rotate-180">
              <KeyboardArrowDownRounded fontSize="small" className="w-5 h-5" />
            </span>
          </summary>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-[var(--background)]">
                  <p className="text-[var(--foreground)]">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </details>
      </motion.div>
    );
  }

  return (
    <>
      <NavBar isLanding />
      <Head>
        <title>Uniplanner - Simplify Your Academic Life</title>
        <meta
          name="description"
          content="Organize your courses, track assignments, and collaborate with classmates using Uniplanner."
        />
        {/* Additional SEO meta tags can be added here */}
      </Head>
      <div className="relative w-full bg-cover h-auto">
        <motion.div
          className="relative w-full bg-cover h-auto dark:bg-gray-900"
          style={{
            background: `radial-gradient(var(--dot-color, rgba(0, 0, 0, 0.1)) var(--dot-size, 1px), transparent var(--dot-size, 1px)), linear-gradient(135deg, var(--sidebar-bg, #f5f7fa), var(--background, #ffffff))`,
            backgroundSize:
              "var(--dot-spacing, 20px) var(--dot-spacing, 20px), cover",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,var(--vignette-opacity, 0.2)) 100%)`,
            }}
          ></div>

          {/* Navigation */}

          <main>
            {/* Hero Section */}
            <motion.section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-8">
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
                      Get Started{" "}
                      <ArrowForwardRounded
                        fontSize="small"
                        className="w-4 h-4"
                      />
                    </Link>
                    <button
                      onClick={scrollToFeatures}
                      className="px-8 py-3 border border-[var(--border)] text-primary rounded-md flex items-center gap-2 hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                    >
                      Learn More{" "}
                      <KeyboardArrowDownRounded
                        fontSize="small"
                        className="w-4 h-4"
                      />
                    </button>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-sm text-[var(--foreground)] dark:text-[var(--foreground-dark)]"
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
                  <KeyboardArrowDownRounded
                    fontSize="medium"
                    className="w-6 h-6 text-[var(--primary)]"
                  />
                </button>
              </motion.div>
            </motion.section>

            {/* Logo Section */}
            <section className="py-16 px-6 sm:px-12">
              <div className="container mx-auto">
                <header className="mb-8 text-center">
                  <h2 className="pb-4 text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
                    Built with Modern Technologies
                  </h2>
                  <p className="text-base sm:text-lg text-[var(--foreground)]">
                    Leveraging the best tools to provide a seamless experience
                  </p>
                </header>
                <LogoWall
                  items={logoItems}
                  direction="horizontal"
                  pauseOnHover={false}
                  size="clamp(10rem, 8rem + 25vmin, 20rem)"
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
                  <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                    Uniplanner combines powerful scheduling tools with
                    collaboration features to help you make the most of your
                    academic journey.
                  </p>
                </div>
                <GlassCard title="Core Features">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <CalendarTodayRounded className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Campus News & Blog
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Stay connected with the latest university updates and
                        student stories. Our blog page is your go-to destination
                        for campus news, events, and insights, fostering a
                        vibrant community of shared experiences and academic
                        achievements.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <DashboardRounded className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Prebuilt Dashboards
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Access comprehensive dashboards that present key metrics
                        like attendance, grade tracking, and assignments. Get
                        immediate insights into your academic progress without
                        any setup.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <PeopleRounded className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Scheduler & Calendar
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Plan your day effortlessly with our intuitive scheduler
                        and calendar. Easily add, view, and manage appointments,
                        deadlines, and events, while receiving timely reminders
                        to keep you on track.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Roadmap Section - Mobile/Tablet*/}
            <section
              id="roadmap"
              className="py-16 md:py-24 px-4 sm:px-6 md:px-12"
            >
              <div className="container mx-auto mb-8 md:mb-12">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                    Roadmap
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                    Our Development Journey
                  </h2>
                  <p className="text-lg md:text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                    See what we&apos;ve accomplished and what&apos;s coming next
                    for Uniplanner.
                  </p>
                </div>
              </div>

              {/* New Roadmap Component */}
              <RoadmapTabs />
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 sm:px-12">
              <div className="container mx-auto">
                <div className="text-center mb-16">
                  <span
                    className="inline-block px-3 py-1 mb-4 text-sm font-medium
                       bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground 
                       rounded-full"
                  >
                    FAQ
                  </span>
                  <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                    Find answers to common questions about Uniplanner.
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  {faqs.map((faq, index) => (
                    <FaqItem key={index} faq={faq} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 px-6 sm:px-12 bg-primary/5 dark:bg-gray-900/50">
              <div className="container mx-auto">
                <div className="max-w-3xl mx-auto text-center justify-center flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                    Stay Updated with Uniplanner
                  </h2>
                  <p className="text-xl text-[var(--foreground)] mb-8">
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
                      className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[var(--background)] border border-[var(--border)] w-fit rounded-md hover:bg-[var(--primary)] hover:text-white transition-all"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="mt-4 text-sm text-[var(--foreground)]">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      </div>
    </>
  );
}
