"use client";

import styles from "./Nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Calendar } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  // { name: "Milestones", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className={styles.actions}>
          <a href="https://calendly.com/modakaryan11/30min" target="_blank" rel="noopener noreferrer" className={styles.scheduleBtn}>
            <Calendar size={16} />
            <span>Meet</span>
          </a>

          <a href="/Ayan Modak.pdf" download="Ayan Modak Resume" className={styles.resumeBtn}>
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
