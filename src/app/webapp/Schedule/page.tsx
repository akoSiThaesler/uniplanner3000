"use client";

import Scheduler from "../../components/Scheduler";

export default function Schedule() {
  return (
    <div className="absolute h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex-1 h-full w-full mb-96 p-4 transition-all duration-300">
        <Scheduler />
      </div>
    </div>
  );
}
