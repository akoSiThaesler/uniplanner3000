"use client";
import { useState } from "react";

import Topbar from "../components/topbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
        <div className="flex flex-col flex-1 ml-20">
          <div
            className="
            relative h-full w-full 
            bg-[--background]
            bg-[radial-gradient(var(--dot-color)_var(--dot-size),transparent_var(--dot-size))]
            [background-size:var(--dot-spacing)_var(--dot-spacing)]
          "
          >
            <main className="flex-1 p-4">{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
