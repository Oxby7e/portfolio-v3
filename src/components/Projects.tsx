"use client";

import { motion } from "framer-motion";
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
          <button className={styles.navButton} onClick={() => scroll("left")} aria-label="Scroll projects left">
            <ChevronLeft size={20} />
          </button>
          <button className={styles.navButton} onClick={() => scroll("right")} aria-label="Scroll projects right">
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
  const accentClass = styles[`accent${(index % 4) + 1}`];
  const primaryTags = project.tags.slice(0, 4);
  const extraTags = Math.max(project.tags.length - primaryTags.length, 0);

  return (
    <div
      className={`${styles.projectCard} ${project.highlight ? styles.highlightCard : ""} ${accentClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.cardInner}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        animate={{ rotateY: isHovered ? 180 : 0 }}
      >
        <div className={styles.cardFaceFront}>
          <div className={styles.cardVisual}>
            <div className={styles.visualBackdrop} />
            <div className={styles.imageOverlay} />

            <div className={styles.previewFrame}>
              <div className={styles.previewTopRow}>
                <span className={styles.previewYear}>{project.year ?? "Case Study"}</span>
                <span className={styles.previewStatus}>{project.highlight ? "Featured" : "Delivery"}</span>
              </div>

              <div className={styles.previewCenter}>
                <span className={styles.previewIconWrap}>
                  <span className={styles.previewIcon}>{project.icon}</span>
                </span>
              </div>

              <div className={styles.previewCopy}>
                <span className={styles.previewLabel}>Project Snapshot</span>
              </div>
            </div>
          </div>

          <div className={styles.cardInfo}>
            <div className={styles.cardMetaRow}>
              <span className={styles.cardBadge}>{project.badge}</span>
              {project.year && <span className={styles.cardYear}>{project.year}</span>}
            </div>

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
                type="button"
                animate={{
                  scale: isHovered ? 1.04 : 1,
                }}
                transition={{ duration: 0.2 }}
                onClick={() => project.link && window.open(project.link, "_blank")}
                aria-label={project.link ? `Open ${project.title}` : `${project.title} preview unavailable`}
              >
                <ArrowUpRight size={22} strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className={styles.cardFaceBack}>
          <div className={styles.backHeader}>
            <span className={styles.backEyebrow}>Tech Stack</span>
            {project.year && <span className={styles.backYear}>{project.year}</span>}
          </div>

          <div className={styles.backMain}>
            <h3 className={styles.backTitle}>{project.title}</h3>
            <p className={styles.backDescription}>{project.description}</p>
          </div>

          <div className={styles.backStack}>
            {primaryTags.map((tag) => (
              <span key={tag} className={styles.backTag}>
                {tag}
              </span>
            ))}
            {extraTags > 0 && (
              <span className={styles.backTag}>+{extraTags} more</span>
            )}
          </div>

          <div className={styles.backFooter}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.previewLink}
              >
                <span>Preview Project</span>
                <ArrowUpRight size={18} strokeWidth={1.7} />
              </a>
            ) : (
              <span className={styles.previewLinkDisabled}>Preview unavailable</span>
            )}
          </div>
        </div>
      </motion.div>

      {project.highlight && (
        <div className={styles.startupRibbon}>STARTUP</div>
      )}
    </div>
  );
}
