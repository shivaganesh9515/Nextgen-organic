"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  fullWidth?: boolean;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  fullWidth = false
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getDirectionVariants = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      case "none": return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionVariants() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Custom smooth easing
      }}
      className={className}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      {children}
    </motion.div>
  );
}
