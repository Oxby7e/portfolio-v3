"use client";

import styles from "./Footer.module.css";
import { Globe, Briefcase, Camera, Mail, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer({ id }: { id?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer} id={id}>
      <div className={styles.contactContainer}>
        <motion.div 
          className={styles.contactHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.contactTitle}>Let's build something together</h2>
          <p className={styles.contactSubtext}>
            Ready to start a project or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          <motion.a 
            href="mailto:modakaryan11@gmail.com"
            className={styles.contactCard}
            whileHover={{ y: -5, borderColor: "var(--foreground)" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            whileHover={{ y: -5, borderColor: "var(--foreground)" }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
      </div>

      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.left}>
            <p className="mono text-xs text-zinc-500">
              Coded in Visual Studio Code. Built with Next.js and Tailwind CSS, deployed with Vercel.
            </p>
            <p className="mono text-xs text-zinc-400 mt-2">
              © {currentYear} Ayan Modak. All rights reserved.
            </p>
          </div>
          
          <div className={styles.right}>
            <div className={styles.socials}>
              <a href="https://github.com/ayanmodak" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Globe size={20} />
              </a>
              <a href="https://linkedin.com/in/ayanmodak" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Briefcase size={20} />
              </a>
              <a href="https://instagram.com/ayan.modak" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Camera size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
