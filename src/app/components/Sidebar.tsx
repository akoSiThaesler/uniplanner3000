import React from "react";
import styles from "./Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";

type SidebarProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onPageChange?: (page: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen = true,
  onPageChange,
}) => {
  /**
   * @see {@link https://react.dev/learn/responding-to-events#event-handlers}
   */

  const handleClick = (page: string) => (e: React.MouseEvent) => {
    // Stop the browser from refreshing the page
    e.preventDefault();
    //
    onPageChange?.(page);
  };

  /**
   * Sidebar component providing navigation for the application
   * TODO: Consider implementing:
   * - Active page highlighting
   * - Keyboard navigation
   * - Route mapping configuration object
   * Currently optional and am not 100% sure it works, but already see the problem that
   * If the user refreshes the site while the user is in a different "page" it resets them back to the default page. Would be a nice Imporvement point !
   * - Next.js Link component for proper routing
   * https://react.dev/learn/responding-to-events
   * https://nextjs.org/docs/pages/building-your-application/routing
   * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
   * https://nextjs.org/docs/app/building-your-application/routing/defining-routes - Defining Routes
   * https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating - Navigation
   */

  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={handleClick("dashboard")}>
          <HomeIcon />
          <a href="#">Dashboard</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick("schedule")}>
          <CalendarMonthIcon />
          <a href="#">Schedule</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick("courses")}>
          <BookIcon />
          <a href="#">Courses</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick("settings")}>
          <SettingsIcon />
          <a href="#">Settings</a>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Sidebar;
