import React from "react";
import { useMediaQuery } from "./useMediaQuery";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

type NavbarProps = {
  children?: React.ReactNode;
  onMenuClick?: () => void;
};

const NavBar: React.FC<NavbarProps> = ({ children, onMenuClick }) => {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  if (isMobile) {
    return (
      <nav className="bg-[var(--background)] border-b border-[var(--foreground)] py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-50">
        <div className="flex items-center justify-between w-full">
          {/* Left Section: Menu Toggle */}
          <div className="flex flex-1 items-center justify-start">
            <AutoStoriesSharpIcon
              onClick={onMenuClick}
              aria-label="Toggle Sidebar"
              sx={{ fontSize: "32px" }}
              className="cursor-pointer"
            />
          </div>
          {/* Center Section: Title */}
          <div className="flex flex-1 items-center justify-center">
            <h1 className="m-0 text-2xl font-semibold text-[var(--foreground)]">
              Uniplanner
            </h1>
          </div>
          {/* Right Section: Action Icons */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <Link href="/">
              <HomeIcon sx={{ fontSize: "32px" }} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ fontSize: "32px" }} />
            </Link>
          </div>
        </div>
        {children}
      </nav>
    );
  }

  // Desktop version: inline header with logo on left and nav links on right.
  return (
    <nav className="bg-[var(--background)] border-b border-[var(--foreground)] py-3 px-4 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AutoStoriesSharpIcon
            onClick={onMenuClick}
            aria-label="Toggle Sidebar"
            className="cursor-pointer"
            sx={{ fontSize: "24px" }}
          />
          <h1 className="m-0 text-xl font-semibold text-[var(--foreground)]">
            Uniplanner
          </h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-[var(--foreground)] hover:underline">
              Home
            </Link>
          </li>
          <li>
            <a
              href="#about"
              className="text-[var(--foreground)] hover:underline"
            >
              About
            </a>
          </li>
        </ul>
      </div>
      {children}
    </nav>
  );
};

export default NavBar;
