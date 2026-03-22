"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, target, {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, target, duration, delay, count, rounded]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
