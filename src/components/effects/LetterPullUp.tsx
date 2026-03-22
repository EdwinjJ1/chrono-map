"use client";

import { motion, useInView, type Transition } from "framer-motion";
import { useRef } from "react";

interface LetterPullUpProps {
  text: string;
  className?: string;
  delay?: number;
}

const springTransition: Transition = {
  type: "spring" as const,
  damping: 12,
  stiffness: 100,
};

export default function LetterPullUp({
  text,
  className = "",
  delay = 0,
}: LetterPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: springTransition,
    },
  };

  return (
    <span ref={ref} className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap"
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex mr-[0.25em]">
            {word.split("").map((letter, letterIdx) => (
              <motion.span
                key={`${wordIdx}-${letterIdx}`}
                variants={child}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
