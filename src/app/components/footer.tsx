import { JSX } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./footer.module.css";

/**
 * Props interface for the Footer component.
 * @interface FooterProps
 * @property {boolean} [isOpen] - Optional boolean that determines if the footer is expanded or collapsed.
 * Default is true.
 */

type FooterProps = {
  isOpen?: boolean;
};

type TeamMember = {
  name: string;
  github?: string;
  linkedin?: string;
};

//TODO: Add Socials 👌

/**
 * Represents a team member's information.
 * @interface TeamMember
 * @property {string} name - The full name of the team member
 * @property {string} [github] - Optional GitHub profile URL
 * @property {string} [linkedin] - Optional LinkedIn profile URL
 * @constant {TeamMember[]} - Array of team members(us :D) contributing to the Uniplanner 3000 project.
 */

const team: TeamMember[] = [
  {
    name: "Julian Thäsler",
    github: "https://github.com/akoSiThaesler",
    linkedin: "#", // too lazy to put in my linkedin put on hold for now
  },
  {
    name: "Luis Sayer",
    github: "#",
  },
  {
    name: "Tom Weise",
    github: "https://github.com/tonix401",
  },
];

export default function Footer({ isOpen = true }: FooterProps): JSX.Element {
  // Gets current year for the Copyright section
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${styles.footer} ${
        isOpen ? styles.footerOpen : styles.footerClosed
      }`}
    >
      <div className={styles.container}>
        <div className={styles.teamContainer}>
          <span className={styles.madeBy}>Made by</span>
          {/*
           * For each team member in our array, this creates a "card" showing:
           * - Their name
           * - Their GitHub link (if they have one)
           * - Their LinkedIn link (if they have one)
           *
           * The 'key={member.name}' helps React track each "card" efficiently
           * https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
           *
           */}
          {team.map((member) => (
            <div key={member.name} className={styles.memberContainer}>
              <span className={styles.memberName}>{member.name}</span>
              <div className={styles.socialLinks}>
                {member.github && (
                  <a href={member.github} className={styles.socialLink}>
                    <GitHubIcon className={styles.socialIcon} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} className={styles.socialLink}>
                    <LinkedInIcon className={styles.socialIcon} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.copyright}>
          © {currentYear} Uniplanner 3000. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
