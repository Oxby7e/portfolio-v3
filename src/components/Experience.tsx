"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from "./Experience.module.css";
import { GraduationCap, Briefcase } from "lucide-react";

interface TimelineItemProps {
  date: string;
  category: string;
  description: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  type: "education" | "work";
  techStack?: string[];
}

const timelineData: TimelineItemProps[] = [
  {
    date: "2006 — 2019",
    category: "EDUCATION",
    description:
      "Completed secondary and higher secondary education with a strong foundation in science and mathematics.",
    title: "Shri Vithalrao Joshi Charities Trust's High School",
    subtitle: "SSC & HSSC",
    location: "Dervan, Sawarde",
    duration: "2006 — 2019",
    type: "education",
  },
  {
    date: "2019 — 2023",
    category: "EDUCATION",
    description:
      "Successfully completed Bachelor of Engineering in Information Technology with a focus on software engineering and system architecture.",
    title: "Sanjay Ghodawat University",
    subtitle: "Bachelor of Engineering",
    location: "Kolhapur, Maharashtra",
    duration: "2019 — 2023",
    type: "education",
    techStack: ["Computer Science", "System Design", "Networking"],
  },
  {
    date: "DEC 2021 — MAR 2022",
    category: "WORK",
    description:
      "Worked with amazing framework's and library's like React.js, Next.js, Node.js to develop various cool projects.",
    title: "Crypticonic Security",
    subtitle: "Web Development Intern",
    location: "Remote",
    duration: "DEC 2021 — MAR 2022",
    type: "work",
    techStack: ["Node.js", "MongoDB", "React.js", "AWS"],
  },

  {
    date: "2023 — PRESENT",
    category: "WORK",
    description:
      "I build and maintain REST/GraphQL services, event-driven pipelines, and database schemas. Additionally, I focus on optimizing system performance, ensuring security best practices, and implementing scalable solutions to meet evolving business needs.",
    title: "Emertech Innovations",
    subtitle: "Backend Engineer",
    location: "Remote",
    duration: "2023 — PRESENT",
    type: "work",
    techStack: [
      "Node.js/TypeScript",
      "Prisma",
      "Nginx",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={styles.container} id="experience">
      <div className={styles.sectionLabelCenter}>Experience & Education</div>

      {/* Central Animated Line */}
      <div className={styles.timelineLineGlobal}>
        <motion.div className={styles.lineScroll} style={{ scaleY }} />
      </div>

      {timelineData.map((item, index) => (
        <div key={index} className={styles.item}>
          <motion.div
            className={styles.date}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {item.date}
          </motion.div>

          <div className={styles.timelineLine}>
            <motion.div
              className={styles.dot}
              initial={{ scale: 0, backgroundColor: "var(--background)" }}
              whileInView={{
                scale: 1,
                backgroundColor: "var(--foreground)",
                boxShadow: "0 0 10px var(--foreground)",
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring" as const,
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
            />
          </div>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className={styles.categoryLabel}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {item.category}
            </motion.div>

            <div className={styles.eventDescription}>{item.description}</div>

            {item.techStack && (
              <div className="text-[11px] text-zinc-500 mono mb-4 uppercase tracking-wider">
                <span className="text-zinc-400 mr-1">Stack:</span>
                {item.techStack.join(", ")}
              </div>
            )}

            <motion.div
              className={styles.card}
              whileHover={{
                scale: 1.02,
                borderColor: "#52525b",
                backgroundColor: "#0c0c0e",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)",
              }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 15,
              }}
            >
              <div className={styles.logoWrapper}>
                <motion.div
                  className={styles.logoPlaceholder}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {item.type === "education" ? (
                    <GraduationCap size={40} className="text-zinc-400" />
                  ) : (
                    <Briefcase size={40} className="text-zinc-400" />
                  )}
                </motion.div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.subtitle}>{item.subtitle}</p>
                <p className={styles.location}>{item.location}</p>
                <p className={styles.cardDate}>{item.duration}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
