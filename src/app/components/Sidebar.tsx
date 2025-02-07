import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(defaultIsOpen);

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
            pathname === "/webapp" ? styles.active : ""
          }`}
        >
          <HomeIcon />
          <Link href="/webapp" prefetch>
            Dashboard
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/webapp/Schedule" ? styles.active : ""
          }`}
        >
          <CalendarMonthIcon />
          <Link href="/webapp/Schedule" prefetch>
            Schedule
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/webapp/courses" ? styles.active : ""
          }`}
        >
          <BookIcon />
          <Link href="/webapp/courses">Courses</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/webapp/notifications" ? styles.active : ""
          }`}
        >
          <Notifications />
          <Link href="/webapp/notifications">Notifications</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/webapp/settings" ? styles.active : ""
          }`}
        >
          <SettingsIcon />
          <Link href="/webapp/settings">Settings</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Sidebar;
