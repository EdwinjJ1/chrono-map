"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GradientTextProps {
  text: string;
  className?: string;
  delay?: number;
  from?: string;
  to?: string;
}

export default function GradientText({
  text,
  className = "",
  delay = 0,
  from = "var(--accent)",
  to = "var(--accent-light)",
}: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      <motion.span
        initial={{ backgroundPosition: "0% 50%" }}
        animate={
          isInView
            ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            : {}
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: delay + 0.8,
        }}
        style={{
          background: `linear-gradient(90deg, ${from}, ${to}, ${from})`,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
