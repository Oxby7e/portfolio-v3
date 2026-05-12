"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./Projects.module.css";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  badge: string;
  highlight?: boolean;
  icon: string;
  link?: string;
  year?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Zahabi",
    description: "A blockchain platform that tokenises physical gold into digital assets with full traceability from mine to vault. Each token is pegged to a verifiable quantity of audited gold, enabling fractional ownership, transparent trading, and immutable chain-of-custody records.",
    tags: ["Blockchain", "Tokenisation", "Fintech", "Smart Contracts"],
    badge: "PERSONAL STARTUP 2025",
    highlight: true,
    icon: "🪎",
    link: "https://www.zahabi.in",
    year: "2025",
    image: "/zahabi_preview.png"
  },
  {
    title: "GraveLedger",
    description: "Digital cemetery and grave management platform focused on mapping, memorial records, and long-term grave traceability.",
    tags: ["Blockchain", "GIS", "Next.js"],
    badge: "PERSONAL STARTUP 2026",
    highlight: true,
    icon: "🪦",
   link: "https://www.graveledger.in",
    year: "2026",
    image: "/graveledger_preview.png"
  },
  {
    title: "Farmer Passport – Digital Identity for Farmers",
    description: "A blockchain-backed digital identity platform for farmers that stores verified credentials, land records, crop history, and government scheme eligibility. Enables seamless access to credit, subsidies, and supply chain integration through a tamper-proof digital passport.",
    tags: ["Blockchain", "Digital Identity", "AgriTech", "React", "Node.js"],
    badge: "DIGITAL PRODUCT",
    icon: "🌾",
    image: "/farmer_passport.png",
  },
  {
    title: "Gold Tokenisation Platform",
    description: "A blockchain platform that tokenises physical gold into digital assets with full traceability from mine to vault. Each token is pegged to a verifiable quantity of audited gold, enabling fractional ownership, transparent trading, and immutable chain-of-custody records.",
    tags: ["Blockchain", "Tokenisation", "Smart Contracts", "FinTech", "React"],
    badge: "LIVE",
      icon: "🪎",
    image: "/gold_tokenisation.png",
  },

  {
    title: "Fabric to Cloth Traceability with Blockchain",
    description: "Leveraged blockchain technology and modern software development methods to establish end-to-end traceability for cotton fabric to finished cloth. Full visibility from loom to label for textile exporters.",
    tags: ["Blockchain", "Node.js", "Supply Chain"],
    badge: "GOV INITIATIVE",
    icon: "👕",
    image: "/fabric_traceability.png",
  },
  {
    title: "Protecting Sensitive Data",
    description: "Built a multi-level authorization and permission-based software system to protect highly sensitive data for a research organization. Role-based access control with full audit logging.",
    tags: ["Auth", "RBAC", "Security"],
    badge: "SECURITY",
    icon: "🔐",
    image: "/sensitive_data.png",
  },
  {
    title: "Leather Footwear Traceability",
    description: "End-to-end traceability system for GI-tagged leather footwear using blockchain — delivered for a state government initiative protecting India's authentic craft heritage.",
    tags: ["Blockchain", "GI Tags", "Gov Tech"],
    badge: "STATE GOVT",
    icon: "👞",
    image: "/footwear_traceability.png",
  },
  {
    title: "Educational Certificate Verification",
    description: "Certificate issuance and digital identity system for a semi-autonomous central government organization. Prevents duplication via blockchain-backed identity with tamper-proof verification.",
    tags: ["Blockchain", "Digital Identity", "React"],
    badge: "CENTRAL GOVT",
    icon: "📜",
    image: "/certificate_verification.png",
  },
  {
    title: "Tree Plantation Digitisation",
    description: "Tracks NGO donations and enables users to monitor events around their individual plants — complete plant-level traceability on the blockchain with a mobile-first experience.",
    tags: ["Blockchain", "NGO", "React Native"],
    badge: "NGO",
    icon: "🌳",
    image: "/tree_plantation.png",
  },
  {
    title: "Rubber to Tyre Traceability – EUDR",
    description: "End-to-end compliance solution for a major tyre exporter, enabling EUDR regulatory compliance with full supply-chain transparency via blockchain. Audit-ready from plantation to product.",
    tags: ["EUDR", "Blockchain", "Export Compliance"],
    badge: "EXPORT COMPLIANCE",
    icon: "🚛",
    image: "/rubber_traceability.png",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section} id="projects">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.mainHeading}>
            Innovative solutions and cutting-edge <br />
            technologies designed to transform your business.
          </h2>
        </div>
        <div className={styles.navButtons}>
          <button className={styles.navButton} onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </button>
          <button className={styles.navButton} onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.scrollContainer} ref={scrollRef}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.projectCard} ${project.highlight ? styles.highlightCard : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardVisual}>
        <div className={styles.imageOverlay} />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className={styles.hoverOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={styles.hoverContent}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className={styles.viewInfo}>View Project Details</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.cardBrand}>
          <span className={styles.cardIcon}>{project.icon}</span>
          <span className={styles.cardBadge}>{project.badge}</span>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.infoTop}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDescription}>{project.description}</p>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          
          <motion.button 
            className={styles.actionButton}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered ? "#fff" : "rgba(255,255,255,0.05)",
              color: isHovered ? "#000" : "#fff"
            }}
            transition={{ duration: 0.2 }}
            onClick={() => project.link && window.open(project.link, "_blank")}
          >
            <ArrowUpRight size={22} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      {project.highlight && (
        <div className={styles.startupRibbon}>STARTUP</div>
      )}
    </motion.div>
  );
}