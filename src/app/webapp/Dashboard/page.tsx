"use client";
import React from "react";
import GlassCard from "../../components/GlassCard";
import MultiViewScheduler from "../../components/MultiViewScheduler";
import NotificationsPage from "../../components/NotificationsPage";
import LogoWall from "../../components/LogoWall";

function DashboardHeader() {
  const username = "Julian";
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-center text-[var(--foreground)]">
        Welcome Back, {username}!
      </h1>
      <p className="mt-2 text-center text-lg text-gray-500">
        Here’s an overview of your academic dashboard.
      </p>
    </div>
  );
}

// A reusable stats card component.
interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
}
function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <GlassCard title={title}>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold text-[var(--foreground)]">
          {value}
        </div>
        {subtitle && (
          <div className="text-sm text-gray-500 mt-2">{subtitle}</div>
        )}
      </div>
    </GlassCard>
  );
}

// Upcoming events list.
function UpcomingEvents() {
  const events = [
    {
      title: "Math Lecture",
      time: "09:00 AM",
      description: "Calculus review session",
    },
    {
      title: "Physics Lab",
      time: "11:00 AM",
      description: "Electromagnetism experiment",
    },
    {
      title: "History Seminar",
      time: "02:00 PM",
      description: "Modern history overview",
    },
  ];
  return (
    <GlassCard title="Upcoming Events">
      <ul className="divide-y divide-gray-200">
        {events.map((event, idx) => (
          <li key={idx} className="py-3">
            <div className="flex justify-between">
              <span className="font-medium text-[var(--foreground)]">
                {event.title}
              </span>
              <span className="text-sm text-gray-500">{event.time}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{event.description}</p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6">
      <DashboardHeader />

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Courses"
          value="5"
          subtitle="Courses enrolled"
        />
        <StatsCard title="GPA" value="3.8" subtitle="Current GPA" />
        <StatsCard title="Notifications" value="3" subtitle="Unread alerts" />
      </div>

      {/* Upcoming events & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UpcomingEvents />
        <GlassCard title="Notifications">
          <NotificationsPage />
        </GlassCard>
      </div>

      {/* Schedule Preview */}
      <div className="mb-8">
        <GlassCard title="This week's Schedule">
          <MultiViewScheduler widget />
        </GlassCard>
      </div>

      {/* Technologies Showcase */}
      <div>
        <GlassCard title="Technologies We Use">
          <LogoWall
            items={[
              { imgUrl: "/github.svg", altText: "GitHub" },
              { imgUrl: "/git.svg", altText: "Git" },
              { imgUrl: "/react.svg", altText: "React" },
              { imgUrl: "/html5.svg", altText: "HTML" },
              { imgUrl: "/css3.svg", altText: "CSS" },
              { imgUrl: "/typescript.svg", altText: "TypeScript" },
              { imgUrl: "/nextjs.svg", altText: "Next.js" },
              { imgUrl: "/tailwindcss.svg", altText: "Tailwind CSS" },
            ]}
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
        </GlassCard>
      </div>
    </div>
  );
}
