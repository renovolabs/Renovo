"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to hold before animating in — used for stagger choreography. */
  delay?: number;
  className?: string;
}

/**
 * The single scroll-reveal primitive used across the site: fade + slight
 * upward translate, fired once when the element enters the viewport.
 * Deliberately the only scroll effect we allow — no parallax, no scale.
 * Collapses to a plain fade when the visitor prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
