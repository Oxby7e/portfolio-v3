"use client";

import { type FormEvent, useState } from "react";
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
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const askPortfolioAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = message.trim();

    if (!question || isAsking) {
      return;
    }

    setIsAsking(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = (await response.json()) as {
        answer?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "The portfolio assistant is unavailable.");
      }

      setAnswer(data.answer || "I could not find a relevant answer.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The portfolio assistant is unavailable.",
      );
    } finally {
      setIsAsking(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setMessage(text);
    setError("");
    setAnswer("");
  };

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
          <span className={styles.nameGroup}>
            <span className={styles.firstName}>
              <span className={styles.nameMark} aria-hidden="true">A</span>
              <span className={styles.firstNameText}>yan</span>
            </span>
            <span className={styles.lastName}>Modak</span>
          </span>
        </motion.h1>

        <motion.p className={styles.subtext} variants={itemVariants}>
          Hi! Ask about my skills, projects, education, or scroll for details!
        </motion.p>

        <motion.form
          className={styles.chatContainer}
          variants={itemVariants}
          onSubmit={askPortfolioAssistant}
          aria-busy={isAsking}
        >
          <div className={styles.chatInputWrapper}>
            <textarea
              placeholder="Select a topic below or type your question here..."
              className={styles.chatInput}
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-label="Ask Ayan's portfolio assistant"
            />
            <motion.button
              className={styles.sendButton}
              type="submit"
              disabled={isAsking || !message.trim()}
              aria-label="Ask the portfolio assistant"
              whileHover={{ scale: 1.1, backgroundColor: "#3f3f46" }}
              whileTap={{ scale: 0.95 }}
            >
              <SendHorizonal size={20} />
            </motion.button>
          </div>

          {(answer || error || isAsking) && (
            <motion.div
              className={`${styles.answerPanel} ${error ? styles.errorPanel : ""}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
            >
              <span className={`${styles.answerLabel} mono`}>
                {error ? "Assistant note" : "Portfolio answer"}
              </span>
              <p className={styles.answerText}>
                {isAsking ? "Reading Ayan's portfolio context..." : error || answer}
              </p>
            </motion.div>
          )}
        </motion.form>

        <motion.div className={styles.suggestions} variants={itemVariants}>
          {suggestions.map((text) => (
            <motion.button
              key={text}
              className={`${styles.suggestionPill} mono`}
              type="button"
              onClick={() => handleSuggestionClick(text)}
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
