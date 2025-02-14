import React from "react";
import { useMediaQuery } from "./useMediaQuery";
import styles from "./topbar.module.css";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

type NavbarProps = {
  children?: React.ReactNode;
  onMenuClick?: () => void;
};
/*
Temporary based on Figma design !! Bound to change based on feedback :D
Main thing here is that when the user clicks on the Icon it calls onMenuClick which toggles the sidebar
I.e
    A[User clicks AutoStoriesSharpIcon in Topbar] -->|triggers| B[onMenuClick prop in Topbar]
    B -->|executes| C[toggleSidebar in page.tsx]
    C -->|updates| D[isSidebarOpen state]
    D -->|passes to| E[Sidebar component isOpen prop]
    D -->|passes to| F[Main component isOpen prop]
    D -->|passes to| G[Footer component isOpen prop]
    E -->|updates| H[Sidebar visibility]
    F -->|adjusts| I[Main content margin]
    G -->|adjusts| J[Footer margin]
    :D
*/

const NavBar: React.FC<NavbarProps> = ({ children, onMenuClick }) => {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return !isMobile ? (
    <nav className={styles.nav}>
      <div className={styles.titleRow}>
        <AutoStoriesSharpIcon
          width="24px"
          height="24px"
          onClick={onMenuClick}
          style={{ cursor: "pointer" }}
        />
        <h1 className={styles.title}>Uniplanner</h1>
      </div>
      <ul className={styles.linkList}>
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <a href="#about" className={styles.link}>
            About
          </a>
        </li>
      </ul>
      {children}
    </nav>
  ) : (
    <nav className={styles.nav}>
      <div className={styles.titleRow}>
        <AutoStoriesSharpIcon
          width="24px"
          height="24px"
          onClick={onMenuClick}
          style={{ cursor: "pointer" }}
        />
        <h1 className={styles.title}>Uniplanner</h1>
      </div>
      <ul className={styles.linkList}>
        <li>
          <Link href="/" className={styles.link}>
            <HomeIcon />
          </Link>
          <Link href="#">
            <GitHubIcon />
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default NavBar;
