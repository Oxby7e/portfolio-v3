"use client";

import styles from "./Footer.module.css";
import { Mail, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

const StackOverflowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.117 14.276l.127 2.117 9.59-.575-.127-2.117-9.59.575zm1.17-4.404l.547 2.055 9.164-2.428-.547-2.055-9.164 2.428zm2.4-3.798l1.03 1.846 8.158-4.525-1.03-1.846-8.158 4.525zm3.93-3.048l1.414 1.414 6.742-6.742L18.428-3l-6.742 6.742z"/>
  </svg>
);

const ProductHuntIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.56 19.75c-.27 0-.54-.01-.81-.02V12h3.5c1.76 0 3.19 1.43 3.19 3.19 0 1.76-1.43 3.19-3.19 3.19h-2.69zM4.8 2.25h8.2c4.39 0 7.94 3.55 7.94 7.94 0 4.39-3.55 7.94-7.94 7.94H12.75v3.62c0 .59-.48 1.07-1.07 1.07-.59 0-1.07-.48-1.07-1.07v-3.62H4.8c-.59 0-1.07-.48-1.07-1.07V3.32c0-.59.48-1.07 1.07-1.07z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Footer({ id }: { id?: string }) {
  const lastUpdated = "12 May 2026";
  
  const socialLinks = [
    { icon: <LinkedInIcon />, href: "https://linkedin.com/in/ayanmodak", label: "LinkedIn" },
    { icon: <GithubIcon />, href: "https://github.com/ayanmodak", label: "GitHub" },
    { icon: <StackOverflowIcon />, href: "https://stackoverflow.com/users/ayanmodak", label: "Stack Overflow" },
    { icon: <XIcon />, href: "https://x.com/ayanmodak", label: "X" },
    { icon: <ProductHuntIcon />, href: "https://www.producthunt.com/@ayanmodak", label: "Product Hunt" },
    { icon: <Mail size={22} />, href: "mailto:modakaryan11@gmail.com", label: "Email" },
  ];

  return (
    <footer className={styles.footer} id={id}>
      <div className={styles.contactWrapper}>
        <motion.div 
          className={styles.pill}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.div>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Connect with me across various platforms. Whether you want to collaborate, discuss tech, or just say hello, I&apos;m always open to meaningful conversations.
        </motion.p>

        <div className={styles.contactGrid}>
          <motion.a 
            href="mailto:modakaryan11@gmail.com"
            className={styles.contactCard}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardIcon}>
              <Mail size={24} />
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardLabel}>Email Me</span>
              <span className={styles.cardValue}>modakaryan11@gmail.com</span>
            </div>
            <ArrowUpRight className={styles.cardArrow} size={20} />
          </motion.a>

          <motion.a 
            href="https://calendly.com/modakaryan11/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.cardIcon}>
              <Calendar size={24} />
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardLabel}>Schedule a Call</span>
              <span className={styles.cardValue}>Book a time on my calendar</span>
            </div>
            <ArrowUpRight className={styles.cardArrow} size={20} />
          </motion.a>
        </div>

        <motion.div 
          className={styles.socialIcons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconCircle}
              whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className={styles.divider} />

      <div className={styles.footerBottom}>
        <div className={styles.info}>
          <span className={styles.name}>Ayan Modak</span>
          <span className={styles.updated}>last updated at : {lastUpdated}</span>
        </div>
      </div>
    </footer>
  );
}
