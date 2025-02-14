"use client";
import { useState } from "react";
import { useMediaQuery } from "../components/useMediaQuery";

import Topbar from "../components/topbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
/* import AccountSettings from "../components/AccountSettings"; */
import Dockbar from "../components/Dockbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen);
  };

  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return !isMobile ? (
    <div className="flex flex-col min-h-screen">
      <Topbar>
        {/*       <AccountSettings
          username="JohnDoe"
          icon="https://via.placeholder.com/32"
        >
          <div>
            <p className="py-1 hover:underline cursor-pointer">
              Profile Settings
            </p>
            <p className="py-1 hover:underline cursor-pointer">Logout</p>
          </div>
        </AccountSettings> */}
      </Topbar>
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
  ) : (
    <div
      className="
    relative h-screen w-full 
    bg-[--background]
    bg-[radial-gradient(var(--dot-color)_var(--dot-size),transparent_var(--dot-size))]
    [background-size:var(--dot-spacing)_var(--dot-spacing)]
  "
    >
      <Topbar />
      <main className="flex-1 p-4">{children}</main>
      <div className="absolute bottom-0 flex justify-center w-full">
        <Dockbar direction="horizontal" />
      </div>
    </div>
  );
}
