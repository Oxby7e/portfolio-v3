"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const languages = [
  { flag: "🇬🇧", name: "English", level: "Professional proficiency" },
  { flag: "🇮🇳", name: "Konkani", level: "Native" },
  { flag: "🇮🇳", name: "Marathi", level: "Professional proficiency" },
  { flag: "🇮🇳", name: "Hindi", level: "Professional proficiency" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function About() {
  return (
    <section className={styles.about} id="about">
      <motion.div
        className={styles.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        About
      </motion.div>

      {/* <motion.h2
        className={styles.name}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Ayan Modak
      </motion.h2> */}

      <motion.div
        className={styles.meta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span>📍 Goa, India</span>
        <span>|</span>
        <span>📅 09 march 2001</span>
      </motion.div>

      <motion.p
        className={styles.bio}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Hi, I&apos;m Ayan, a backend and blockchain developer with over 2.5
        years of experience. I specialise in building robust, scalable solutions
        and have extensive expertise in{" "}
        <span className="text-white">supply chain optimisation</span>,{" "}
        <span className="text-white">traceability (track and trace)</span>, and{" "}
        <span className="text-white">tokenomics</span>. Additionally, I have
        worked extensively on regulatory compliance and climate change
        initiatives, as well as sustainable blockchain applications.
        <br />
        <br />
        Currently, I&apos;m a Back-End Engineer at{" "}
        <span className="text-white">Emertech Innovations</span>, where I
        contribute to the design and scale APIs and microservices that power our
        products and integrations. I am also working on a use case called{" "}
        <span className="text-white">Zahabi</span> (Revolutionising Gold
        Investment with Blockchain), which aims to help finance institutions and
        retail shops monetise their idle gold assets.
      </motion.p>

      <motion.div
        className={styles.languages}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {languages.map((lang) => (
          <motion.div
            key={lang.name}
            className={styles.languageCard}
            variants={cardVariants}
            whileHover={{
              y: -5,
              borderColor: "#3f3f46",
              backgroundColor: "#111113",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            }}
          >
            <div className={styles.flag}>{lang.flag}</div>
            <div className={styles.langInfo}>
              <span className={styles.langName}>{lang.name}</span>
              <span className={styles.langLevel}>{lang.level}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
