"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Achievements.module.css";
import { Trophy, Star, Award, Zap, Target, Rocket } from "lucide-react";

const achievements = [
  {
    title: "1st Runner Up - SIH 2024",
    description: "National Level Hackathon organized by Ministry of Education, Govt. of India. Developed an AI solution for predictive maintenance.",
    icon: <Trophy />,
    date: "2024",
    category: "HACKATHON"
  },
  {
    title: "Top 1% Worldwide - HackerRank",
    description: "Ranked among the top 1% of developers globally in Python and Problem Solving modules.",
    icon: <Target />,
    date: "2023",
    category: "COMPETITIVE"
  },
  {
    title: "AWS Certified Developer",
    description: "Associate level certification validating expertise in developing and maintaining AWS-based applications.",
    icon: <Award />,
    date: "2024",
    category: "CERTIFICATION"
  },
  {
    title: "GSoC Mentor - 2025",
    description: "Selected as a mentor for Google Summer of Code, guiding students through complex open-source contributions.",
    icon: <Zap />,
    date: "2025",
    category: "OPEN SOURCE"
  },
  {
    title: "Startup India Seed Fund",
    description: "Secured initial seed funding for GraveLedger under the Startup India initiative for digital mapping.",
    icon: <Rocket />,
    date: "2026",
    category: "ENTREPRENEURSHIP"
  },
  {
    title: "GitHub Arctic Code Vault",
    description: "Contributed to open-source projects selected for the 1,000-year archive in the Arctic World Archive.",
    icon: <Star />,
    date: "2020",
    category: "CONTRIBUTION"
  }
];

export default function Achievements() {
  return (
    <section className={styles.section} id="achievements">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>MILESTONES</span>
          <h2 className={styles.title}>Significant impacts and industry recognitions.</h2>
        </div>

        <div className={styles.grid}>
          {achievements.map((item, index) => (
            <motion.div 
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <span className={styles.date}>{item.date}</span>
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.glow} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
