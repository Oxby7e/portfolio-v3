"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";
import Link from "next/link";
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
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? "#about");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const getFocusLine = () => {
      const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 0;
      return navBottom + Math.min(window.innerHeight * 0.18, 120);
    };

    const syncActiveSection = () => {
      if (window.location.hash && links.some((link) => link.href === window.location.hash)) {
        const hashTarget = document.getElementById(window.location.hash.slice(1));
        if (hashTarget) {
          const rect = hashTarget.getBoundingClientRect();
          if (rect.top <= getFocusLine() && rect.bottom >= 0) {
            setActiveHref(window.location.hash);
            return;
          }
        }
      }

      const focusLine = getFocusLine();
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= focusLine) {
          currentSection = section;
        }
      });

      setActiveHref(`#${currentSection.id}`);
    };

    let frameId = 0;
    const scheduleSync = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        syncActiveSection();
      });
    };

    syncActiveSection();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("hashchange", scheduleSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", scheduleSync);
    };
  }, []);

  return (
    <nav ref={navRef} className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${styles.link} ${activeHref === link.href ? styles.active : ""}`}
                aria-current={activeHref === link.href ? "true" : undefined}
                onClick={() => setActiveHref(link.href)}
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
