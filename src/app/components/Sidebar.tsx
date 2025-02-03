import React from "react";
import styles from "./Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import { pages } from "../types/pages";

type SidebarProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onPageChange?: (page: pages) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen = true,
  onPageChange,
}) => {
  /**
   * @see {@link https://react.dev/learn/responding-to-events#event-handlers}
   */

  const handleClick = (page: pages) => (e: React.MouseEvent) => {
    // Stop the browser from refreshing the page
    e.preventDefault();
    onPageChange?.(page);
  };

  /**
   * Sidebar component providing navigation for the application
   * TODO: Consider implementing: All optional and up to debate for now but would be nice :D
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
        <li className={styles.menuItem} onClick={handleClick(pages.dashboard)}>
          <HomeIcon />
          <a href="#">dashboard</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick(pages.schedule)}>
          <CalendarMonthIcon />
          <a href="#">schedule</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick(pages.courses)}>
          <BookIcon />
          <a href="#">courses</a>
        </li>
        <li className={styles.menuItem} onClick={handleClick(pages.settings)}>
          <SettingsIcon />
          <a href="#">Settings</a>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Sidebar;
