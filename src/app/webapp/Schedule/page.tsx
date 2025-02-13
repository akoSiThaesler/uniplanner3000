"use client";

import Scheduler from "../../components/Scheduler";

export default function Schedule() {
  return (
    <div>
      <div className="flex-1 h-full w-full mb-96 p-4 transition-all duration-300">
        <Scheduler />
      </div>
    </div>
  );
}
