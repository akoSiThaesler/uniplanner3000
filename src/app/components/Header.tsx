import React, { useState, useEffect } from "react";
import Link from "next/link";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useMediaQuery } from "./useMediaQuery";
import { useAuth } from "../../context/AuthContext";

type NavBarProps = {
  children?: React.ReactNode;
  onMenuClick?: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ children, onMenuClick }) => {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuth();

  // Check saved theme or system preference on mount.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update the HTML class and persist the theme when dark mode changes.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Full-width container with side padding */}
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {isMobile ? (
          // Mobile layout: Brand on the left and dark mode toggle on the right.
          <>
            <div className="flex items-center gap-2">
              <AutoStoriesSharpIcon
                sx={{ fontSize: "32px" }}
                className="cursor-pointer"
                style={{ color: "rgb(var(--foreground))" }}
              />
              <h1
                className="text-2xl font-bold"
                style={{ color: "rgb(var(--foreground))" }}
              >
                Uniplanner
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full"
                style={{ color: "rgb(var(--accent-foreground))" }}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>
          </>
        ) : (
          // Desktop layout: Brand on the left, navigation links and controls on the right.
          <>
            <div className="flex items-center gap-2">
              <AutoStoriesSharpIcon
                onClick={onMenuClick}
                aria-label="Toggle Sidebar"
                sx={{ fontSize: "32px" }}
                className="cursor-pointer"
                style={{ color: "rgb(var(--foreground))" }}
              />
              <h1
                className="text-2xl font-bold"
                style={{ color: "rgb(var(--foreground))" }}
              >
                Uniplanner
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-6">
                <Link
                  href="/#roadmap"
                  className="text-[var(--foreground)] hover:text-primary transition-colors"
                >
                  Roadmap
                </Link>
                <Link
                  href="/#faq"
                  className="text-[var(--foreground)] hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </nav>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full"
                style={{ color: "rgb(var(--accent-foreground))" }}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                )}
              </button>
              {/* Only show the Login link if the user is not logged in */}
              {!user && (
                <Link
                  href="/login"
                  className="hidden md:inline-flex px-4 py-2 text-[var(--foreground)] hover:text-primary transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      {children}
    </header>
  );
};

export default NavBar;
