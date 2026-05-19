"use client";

import { useMemo } from "react";
import styles from "./Background.module.css";
import { motion } from "framer-motion";

export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        key: index,
        x: `${(index * 13 + 11) % 100}vw`,
        y: `${(index * 17 + 19) % 100}vh`,
        left: `${(index * 19 + 7) % 100}%`,
        top: `${(index * 23 + 13) % 100}%`,
        duration: 10 + index * 1.35,
        delay: index * 0.6,
      })),
    []
  );

  return (
    <div className={styles.background}>
      <div className={styles.glow} />

      <div className={styles.subGrid} />

      <div className={styles.grid} />

      <div className={styles.dashedLines} />

      <motion.div
        className={styles.decorative}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.dot} />
      </motion.div>

      <div className={styles.centerDot} />

      {particles.map((particle) => (
        <motion.div
          key={particle.key}
          className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: ["0vh", "-10vh"],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </div>
  );
}
