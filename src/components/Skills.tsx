"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";
import { 
  Globe, 
  Layers, 
  Server, 
  Code2, 
  Zap, 
  Database, 
  Cpu, 
  Smartphone, 
  Hexagon, 
  Terminal, 
  Cloud, 
  Boxes,
  Box,
  FileCode,
  Layout,
  MousePointer2,
  Share2,
  Wind,
  Activity
} from "lucide-react";

const skills = [
  { name: "React", icon: <Globe /> },
  { name: "Node.js", icon: <Server /> },
  { name: "Express.js", icon: <Share2 /> },
  { name: "MongoDB", icon: <Database /> },
  { name: "Next.js", icon: <Layers /> },
  { name: "Fastify", icon: <Zap /> },
  { name: "Turso", icon: <Cpu /> },
  { name: "Redis", icon: <Box /> },
  { name: "React Native", icon: <Smartphone /> },
  { name: "TypeScript", icon: <Code2 /> },
  { name: "JavaScript", icon: <FileCode /> },
  { name: "GraphQL", icon: <Hexagon /> },
  { name: "Python", icon: <Terminal /> },
  { name: "PineconeDB", icon: <Activity /> },
  { name: "Supabase", icon: <Cloud /> },
  { name: "HTML", icon: <Layout /> },
  { name: "CSS", icon: <MousePointer2 /> },
  { name: "Tailwind", icon: <Wind /> },
  { name: "Expo", icon: <Boxes /> },
];

export default function Skills() {
  return (
    <div className={styles.section}>
      <motion.div 
        className={styles.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.div>
      
      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className={styles.skillCard}
          >
            <div className={styles.iconWrapper}>
              {/* Injecting class to the icon component */}
              {React.cloneElement(skill.icon as React.ReactElement, { 
                className: styles.icon,
                size: 40,
                strokeWidth: 1.5
              })}
            </div>
            <span className={styles.name}>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
