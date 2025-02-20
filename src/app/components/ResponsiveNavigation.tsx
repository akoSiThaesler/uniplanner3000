import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "./useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./Sidebar.module.css";

export type NavItem = {
  href: string;
  title: string;
  icon: React.ReactElement;
};

export const defaultNavItems: NavItem[] = [
  {
    href: "/webapp/Dashboard",
    title: "Dashboard",
    icon: <HomeIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />,
  },
  {
    href: "/webapp/Schedule",
    title: "Schedule",
    icon: <CalendarMonthIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />,
  },
  {
    href: "/webapp/courses",
    title: "Courses",
    icon: <BookIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />,
  },
  {
    href: "/webapp/notifications",
    title: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />,
  },
  {
    href: "/webapp/Settings",
    title: "Settings",
    icon: <SettingsIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />,
  },
];

type ResponsiveNavigationProps = {
  children?: React.ReactNode;
  unreadCount: number;
};

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  children,
  unreadCount,
}) => {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return isMobile ? (
    <MobileDockbar navItems={defaultNavItems} unreadCount={unreadCount} />
  ) : (
    <DesktopSidebar navItems={defaultNavItems} unreadCount={unreadCount}>
      {children}
    </DesktopSidebar>
  );
};

type MobileDockbarProps = {
  navItems: NavItem[];
  unreadCount: number;
};

const MobileDockbar: React.FC<MobileDockbarProps> = ({
  navItems,
  unreadCount,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDock = () => setIsOpen((prev) => !prev);
  const pathname = usePathname();

  const containerClasses =
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto";
  const dockTransitionClasses = isOpen
    ? "translate-0 opacity-100"
    : "translate-y-full opacity-0 pointer-events-none";
  const buttonTransitionClasses = isOpen
    ? "opacity-0 pointer-events-none"
    : "opacity-100";

  const navButtonClasses = (active: boolean) =>
    `p-3 rounded-full transition-all duration-300 cursor-pointer text-[var(--foreground)]
     hover:scale-105 hover:bg-[var(--hover-background)] ${
       active ? "bg-[var(--active-background)]" : ""
     }`;

  return (
    <>
      <div
        className={`${containerClasses} p-3 border border-[var(--glass-border)] bg-[var(--glass-background)]
          backdrop-blur-md rounded-lg shadow-lg flex flex-row justify-center items-center gap-2 sm:gap-3 transform transition-all duration-300 ${dockTransitionClasses}`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          let icon = item.icon;
          if (item.href === "/webapp/notifications") {
            icon = (
              <div className="relative">
                {item.icon}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.title}
              className={navButtonClasses(isActive)}
            >
              {icon}
            </Link>
          );
        })}
        <button
          onClick={toggleDock}
          type="button"
          aria-label="Close Dock"
          className="p-3 rounded-full hover:bg-[var(--hover-background)] transition-all duration-300 cursor-pointer text-[var(--foreground)] hover:scale-105"
        >
          <CloseIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />
        </button>
      </div>
      <button
        onClick={toggleDock}
        type="button"
        aria-label="Open Dock"
        className={`${containerClasses} p-3 rounded-full bg-[var(--glass-background)]
          border border-[var(--glass-border)] backdrop-blur-md shadow-lg hover:bg-[var(--hover-background)]
          transition-all duration-300 cursor-pointer text-[var(--foreground)] ${buttonTransitionClasses}`}
      >
        <div className="relative">
          <MenuIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </button>
    </>
  );
};

type DesktopSidebarProps = {
  children?: React.ReactNode;
  navItems: NavItem[];
  unreadCount: number;
};

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  children,
  navItems,
  unreadCount,
}) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        {navItems.map((item) => {
          let icon = item.icon;
          if (item.href === "/webapp/notifications") {
            icon = (
              // Use a relative container with overflow visible
              <div className="relative overflow-visible">
                {item.icon}
                {unreadCount > 0 && (
                  <span
                    className="absolute bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                    // When sidebar is closed, shift badge further right so it's visible
                    style={
                      !isSidebarOpen
                        ? { top: "-0.25rem", right: "-1.25rem", zIndex: 10 }
                        : { top: "-0.25rem", right: "-0.25rem", zIndex: 10 }
                    }
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          }
          return (
            <Link key={item.href} href={item.href}>
              <li
                title={isSidebarOpen ? "" : item.title}
                className={`${styles.menuItem} ${
                  pathname === item.href ? styles.active : ""
                } overflow-visible`}
              >
                {icon}
                {isSidebarOpen && <span>{item.title}</span>}
              </li>
            </Link>
          );
        })}
      </ul>
      {children}
    </div>
  );
};

export default ResponsiveNavigation;
