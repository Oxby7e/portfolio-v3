"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { SendHorizonal } from "lucide-react";

const suggestions = [
  "What's your full stack tech stack?",
  "How much experience do you have as a full stack dev?",
  "Which databases you have ever used?",
  "Which frontend framework/library you prefer?",
  "Which backend framework you prefer?"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

export default function Hero() {
  return (
    <div className={styles.hero} id="home">
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={`${styles.greeting} mono`} variants={itemVariants}>
          Hi, I am
        </motion.span>
        
        <motion.h1 className={styles.title} variants={itemVariants}>
          <img src="/image.png" alt="Logo" className={styles.logo} />
          <span className={styles.titleName}>yan Modak</span>
        </motion.h1>
        
        <motion.p className={`${styles.subtext} mono`} variants={itemVariants}>
          Hi! Ask about my skills, projects, education, or scroll for details!
        </motion.p>

        <motion.div className={styles.chatContainer} variants={itemVariants}>
          <div className={styles.chatInputWrapper}>
            <textarea 
              placeholder="" 
              className={styles.chatInput}
              rows={3}
            />
            <motion.button 
              className={styles.sendButton}
              whileHover={{ scale: 1.1, backgroundColor: "#3f3f46" }}
              whileTap={{ scale: 0.95 }}
            >
              <SendHorizonal size={20} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div className={styles.suggestions} variants={itemVariants}>
          {suggestions.map((text) => (
            <motion.button
              key={text}
              className={`${styles.suggestionPill} mono`}
              whileHover={{ 
                scale: 1.05, 
                borderColor: "#52525b",
                backgroundColor: "#1c1c1f",
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {text}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
