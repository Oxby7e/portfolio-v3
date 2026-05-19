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
      <motion.h2
        className={styles.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        About
      </motion.h2>

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
        I&apos;m Ayan, a Backend and Blockchain Developer with 3+ years of
        experience building scalable systems across blockchain, supply chain,
        sustainability, and digital infrastructure.
        <br />
        <br />
        I specialize in backend engineering, distributed systems, blockchain
        architecture, microservices, API development, and system design, with
        hands-on work in traceability platforms, tokenization, QR tracking, and
        regulatory-compliant blockchain solutions.
        <br />
        <br />
        Currently, I work as a Back-End Engineer at Emertech Innovations, where
        I design and scale APIs, backend systems, and microservices for
        enterprise-grade products and integrations.
        <br />
        <br />
        I&apos;m also building Zahabi, a blockchain-powered commodity
        monetization platform for transparent gold investment and asset
        utilization, and GraveLedger, a digital mapping platform modernizing
        cemetery and graveyard management in India.
        <br />
        <br />
        Beyond blockchain, I have contributed to climate-tech and sustainability
        initiatives, including DMRV systems for carbon credits and
        environmental impact tracking.
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
