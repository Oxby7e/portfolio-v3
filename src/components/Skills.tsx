"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Blocks,
  Bot,
  CloudCog,
  Database,
  Globe2,
  KeyRound,
  Layers3,
  Network,
  ServerCog,
  Sparkles,
  Waypoints,
  Wrench,
} from "lucide-react";
import styles from "./Skills.module.css";

const skillGroups = [
  {
    title: "Backend Development",
    label: "Core",
    tone: "toneBlue",
    icon: ServerCog,
    description: "Scalable backend systems, services, and application logic.",
    items: ["Node.js", "TypeScript", "JavaScript", "NestJS", "Express.js"],
  },
  {
    title: "Databases",
    label: "Data",
    tone: "toneCyan",
    icon: Database,
    description: "Reliable data modeling, storage, caching, and performance.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Blockchain",
    label: "Chain",
    tone: "toneViolet",
    icon: Blocks,
    description: "Smart contract systems and production-grade blockchain architecture.",
    items: [
      "Solidity",
      "Smart Contracts",
      "Web3.js",
      "Ethers.js",
      "Hyperledger",
      "Blockchain Architecture",
    ],
  },
  {
    title: "API Development",
    label: "API",
    tone: "toneAmber",
    icon: Waypoints,
    description: "Robust interfaces for integrations, services, and product workflows.",
    items: ["REST APIs", "GraphQL", "Microservices", "Webhooks"],
  },
  {
    title: "System Design",
    label: "Scale",
    tone: "toneEmerald",
    icon: Network,
    description: "Backend architecture built for growth, resilience, and clarity.",
    items: [
      "Scalable Backend Architecture",
      "Distributed Systems",
      "Event-Driven Systems",
    ],
  },
  {
    title: "Cloud & DevOps",
    label: "Infra",
    tone: "toneBlue",
    icon: CloudCog,
    description: "Deployment, infrastructure, and operational reliability at scale.",
    items: ["Docker", "AWS", "Linux", "Nginx", "CI/CD"],
  },
  {
    title: "Authentication & Security",
    label: "Secure",
    tone: "toneCyan",
    icon: KeyRound,
    description: "Access control, session flows, and API-first security foundations.",
    items: ["JWT", "OAuth", "RBAC", "Session Management", "API Security"],
  },
  {
    title: "Messaging & Queues",
    label: "Async",
    tone: "toneViolet",
    icon: Layers3,
    description: "Event flow, background jobs, and resilient message-driven processing.",
    items: ["RabbitMQ", "Kafka", "BullMQ"],
  },
  {
    title: "Frontend Basics",
    label: "UI",
    tone: "toneAmber",
    icon: Globe2,
    description: "Practical frontend delivery for product interfaces and integrations.",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "AI & Automation",
    label: "AI",
    tone: "toneEmerald",
    icon: Sparkles,
    description: "Applied AI integrations and workflow automation for real product use.",
    items: ["AI Integrations", "OpenAI APIs", "Automation Workflows"],
  },
  {
    title: "Tools & Platforms",
    label: "Stack",
    tone: "toneBlue",
    icon: Wrench,
    description: "The tooling layer that supports shipping, debugging, and iteration.",
    items: ["Git", "GitHub", "Postman", "Prisma", "Mongoose"],
  },
  {
    title: "Other Areas",
    label: "Domain",
    tone: "toneViolet",
    icon: Bot,
    description: "Operational problem-solving across logistics, climate, and tracking systems.",
    items: [
      "Supply Chain Solutions",
      "Carbon Credit Platforms",
      "QR Tracking Systems",
      "Geo-tagging Systems",
    ],
  },
];

export default function Skills() {
  return (
    <div className={styles.section}>
      <motion.h2
        className={styles.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <div className={styles.grid}>
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className={clsx(styles.skillCard, styles[group.tone])}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerLead}>
                <span className={styles.groupIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.headerLine} aria-hidden="true" />
              </div>
              <span className={styles.headerMeta}>
                {group.items.length} capabilities
              </span>
            </div>

            <div className={styles.visualWrap} aria-hidden="true">
              <div className={styles.visualBackdrop} />
              <div className={styles.visualFrame}>
                <span className={styles.visualRing} />
                <span className={styles.visualPulse} />
                <group.icon className={styles.visualIcon} strokeWidth={1.6} />
              </div>
            </div>

            <div className={styles.infoPanel}>
              <span className={styles.groupCount}>{group.label}</span>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.groupDescription}>{group.description}</p>
              <div className={styles.infoDivider} aria-hidden="true" />
              <ul className={styles.skillList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.skillItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
