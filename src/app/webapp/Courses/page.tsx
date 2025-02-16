"use client";
import React from "react";

const Card = ({ title, subtitle, gradient}: {title: string; subtitle: string; gradient: string }) => {
  return (
    <div className="flex-grow max-w-[300px] min-w-[50px] bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      <div className={`h-20 ${gradient}`}></div>
      <div className="p-4">
        <div className="text-red-600 text-sm font-bold">{title}</div>
        <div className="text-black text-xs">{subtitle}</div>
      </div>
    </div>
  );
};

export default function Courses() {
  return (
    <div className="flex flex-wrap justify-start h-10 gap-5">
      <Card
        title="Course 1"
        subtitle="TIF 2024 1. Semester"
        gradient="bg-gradient-to-r from-green-500 to-teal-500"
      />
      <Card
        title="Course 2"
        subtitle="TIF 2024 1. Semester"
        gradient="bg-gradient-to-r from-purple-600 to-blue-500"
      />
      <Card
        title="Course 3"
        subtitle="TIF 2024 1. Semester"
        gradient="bg-gradient-to-r from-purple-600 to-blue-500"
      />
      <Card
        title="Course 4"
        subtitle="TIF 2024 1. Semester"
        gradient="bg-gradient-to-r from-purple-600 to-blue-500"
      />
      <Card
        title="Course 5"
        subtitle="TIF 2024 1. Semester"
        gradient="bg-gradient-to-r from-purple-600 to-blue-500"
      />
    </div>
    
  );
}
