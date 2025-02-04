"use client";
import { useState } from "react";
import Topbar from "../components/topbar";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  /* TO HELP VISUALIZE THE PAGE CHANGE FUNCTIONALITY
    A[User clicks sidebar item] -->|triggers| B[handleClick in Sidebar]
    B -->|calls| C[onPageChange prop]
    C -->|executes| D[handlePageChange in page.tsx]
    D -->|updates| E[currentPage state]
    E -->|passes to| F[Main component]
    F -->|renders| G[Correct page content]
    */

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar onMenuClick={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onPageChange={handlePageChange} />
        <Main currentPage={currentPage} isOpen={isSidebarOpen} />
        <Footer isOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
