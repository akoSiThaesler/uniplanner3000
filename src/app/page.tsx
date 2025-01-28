"use client";
import { useState } from "react";
import Topbar from "./components/topbar";
import Footer from "./components/footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

/* TO HELP VISUALIZE THE PAGE CHANGE FUNCTIONALITY
    A[User clicks sidebar item] -->|triggers| B[handleClick in Sidebar]
    B -->|calls| C[onPageChange prop]
    C -->|executes| D[handlePageChange in page.tsx]
    D -->|updates| E[currentPage state]
    E -->|passes to| F[Main component]
    F -->|renders| G[Correct page content]
    */

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard as default cause idk prolly change that

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page); // Updates the current page
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

    /* going to move to Webpage on hold for now because of merge conflict (Current setup of home is setup to Direct webpage but the idea is):
  A[Landing Page] -->|User enters| B[Introduction/Welcome]
    B -->|Navigate via Sidebar| C[Main Web Application]
      C -->|Toggle Menu| D[Sidebar Navigation]
        D -->|Select| E[Dashboard View]        -
        D -->|Select| F[Schedule Management]   -   D is all up for debate just put them in as a placeholder to align with figma design
        D -->|Select| G[Course Management]     -
        D -->|Select| H[Settings])             -

        Therefor used this page as a temporary placeHolder for the Webapp(its nicely setup :D) since I didnt want to trouble with creating the Landing page and set up the routing T_T

       <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TopBar/>
      <main className="row-start-2 items-center sm:items-start">
        { TODO: ein Carousel }
        </main>
        <Footer/>
      </div>
    */
  );
}
