"use client";

import { useEffect, useState } from "react";

export default function Courses() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex-1 h-full w-full p-4 transition-all duration-300">
      <h1>Test</h1>
    </div>
  );
}
