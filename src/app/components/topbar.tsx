import React from "react";
import styles from "./topbar.module.css";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import Image from "next/image";

type NavbarProps = {
  children?: React.ReactNode;
  onMenuClick?: () => void;
};
/*
Temporary based on Figma design !! Bound to change based on feedback :D
Main thing here is that when the user clicks on the Icon it calls onMenuClick which toggles the sidebar
I.e
    A[User clicks AutoStoriesSharpIcon in Topbar] -->|triggers| B[onMenuClick prop in Topbar]
    B -->| executes  | C[toggleSidebar in page.tsx]
    C -->| updates   | D[isSidebarOpen state]
    D -->| passes to | E[Sidebar component isOpen prop]
    D -->| passes to | F[Main component isOpen prop]
    D -->| passes to | G[Footer component isOpen prop]
    E -->| updates   | H[Sidebar visibility]
    F -->| adjusts   | I[Main content margin]
    G -->| adjusts   | J[Footer margin]
    :D
*/

const NavBar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.titleRow}>
        <Image
          width={50}
          height={50}
          src=".../public/logo.svg"
          alt="Logo"
        ></Image>
        <h1 className={styles.title}>Uniplanner</h1>
      </div>
      <ul className={styles.linkList}>
        <li>
          <a href="#home" className={styles.link}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" className={styles.link}>
            About
          </a>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default NavBar;