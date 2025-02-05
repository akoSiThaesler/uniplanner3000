import React from "react";
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
  onPageChange?: (page: string) => void;
  onSidebarToggle?: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen: defaultIsOpen = true,
  onPageChange,
  onSidebarToggle,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(defaultIsOpen);
  const [activePage, setActivePage] = React.useState("dashboard");

  const handleClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    onPageChange?.(page);
  };

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle?.(newState);
  };

  return (
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
        <li
          className={`${styles.menuItem} ${
            activePage === "dashboard" ? styles.active : ""
          }`}
          onClick={handleClick("dashboard")}
        >
          <HomeIcon />
          <a href="#">Dashboard</a>
        </li>
        <li
          className={`${styles.menuItem} ${
            activePage === "schedule" ? styles.active : ""
          }`}
          onClick={handleClick("schedule")}
        >
          <CalendarMonthIcon />
          <a href="#">Schedule</a>
        </li>
        <li
          className={`${styles.menuItem} ${
            activePage === "courses" ? styles.active : ""
          }`}
          onClick={handleClick("courses")}
        >
          <BookIcon />
          <a href="#">Courses</a>
        </li>
        <li
          className={`${styles.menuItem} ${
            activePage === "settings" ? styles.active : ""
          }`}
          onClick={handleClick("settings")}
        >
          <Notifications />
          <a href="#">Notifications</a>
        </li>
        <li
          className={`${styles.menuItem} ${
            activePage === "settings" ? styles.active : ""
          }`}
          onClick={handleClick("settings")}
        >
          <SettingsIcon />
          <a href="#">Settings</a>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Sidebar;
