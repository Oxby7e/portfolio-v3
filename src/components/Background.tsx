"use client";

import { useEffect, useState } from "react";
import styles from "./Background.module.css";
import { motion } from "framer-motion";

export default function Background() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.background}>
      {/* Deep Navy Glows */}
      <div className={styles.glow} />
      
      {/* Sub Grid (Finer) */}
      <div className={styles.subGrid} />
      
      {/* Primary Dashed Grid */}
      <div className={styles.grid} />
      
      {/* Static dashed lines for structure */}
      <div className={styles.dashedLines} />
      
      {/* Decorative Technical Box (from image) */}
      <motion.div 
        className={styles.decorative}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.dot} />
      </motion.div>

      {/* Subtle intersection dots */}
      <div className={styles.centerDot} />

      {/* Floating data particles - Only render on client to avoid hydration mismatch */}
      {isMounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: ["0vh", "-10vh"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  );
}
