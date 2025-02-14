import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "./useMediaQuery";
import styles from "./Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import Notifications from "@mui/icons-material/Notifications";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type SidebarProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onSidebarToggle?: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen: defaultIsOpen = true,
  onSidebarToggle,
}) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultIsOpen);
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle?.(newState);
  };

  return (
    <>
      {!isMobile ? (
        <div
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.open : styles.closed
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: "15px" }} />
          </button>
          <ul className={styles.menuList}>
            <Link href="/webapp">
              <li
                title={isSidebarOpen ? "" : "Dashboard"}
                className={`${styles.menuItem} ${
                  pathname === "/webapp" ? styles.active : ""
                }`}
              >
                <HomeIcon />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link href="/webapp/Schedule">
              <li
                title="Schedule"
                className={`${styles.menuItem} ${
                  pathname === "/webapp/Schedule" ? styles.active : ""
                }`}
              >
                <CalendarMonthIcon />
                <span>Schedule</span>
              </li>
            </Link>
            <Link href="/webapp/courses">
              <li
                title="Courses"
                className={`${styles.menuItem} ${
                  pathname === "/webapp/Courses" ? styles.active : ""
                }`}
              >
                <BookIcon />
                <span>Courses</span>
              </li>
            </Link>
            <Link href="/webapp/notifications">
              <li
                title="Notifications"
                className={`${styles.menuItem} ${
                  pathname === "/webapp/Notifications" ? styles.active : ""
                }`}
              >
                <Notifications />
                <span>Notifications</span>
              </li>
            </Link>
            <Link href="/webapp/Settings">
              <li
                title="Settings"
                className={`${styles.menuItem} ${
                  pathname === "/webapp/Settings" ? styles.active : ""
                }`}
              >
                <SettingsIcon />
                <span>Settings</span>
              </li>
            </Link>
          </ul>
          {children}
        </div>
      ) : (
        /* Mobile View */
        <div></div>
      )}
    </>
  );
};

export default Sidebar;
