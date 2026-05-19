"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const syncFromHash = () => {
      if (window.location.hash && links.some((link) => link.href === window.location.hash)) {
        setActiveHref(window.location.hash);
      }
    };

    syncFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (!topEntry?.target.id) {
          return;
        }

        setActiveHref(`#${topEntry.target.id}`);
      },
      {
        rootMargin: "-24% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  return (
    <nav className={styles.nav}>
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
