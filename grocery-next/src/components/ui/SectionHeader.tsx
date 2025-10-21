'use client';

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  /**
   * The title of the section
   */
  title: string;
  /**
   * The subtitle or description of the section
   */
  subtitle?: string;
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  /**
   * Text alignment
   * @default "center"
   */
  align?: "left" | "center" | "right";
}

/**
 * An animated section header with reveal animation
 * 
 * @example
 * ```tsx
 * <SectionHeader 
 *   title="Featured Products" 
 *   subtitle="Discover our most popular items"
 * />
 * ```
 */
export function SectionHeader({ 
  title, 
  subtitle, 
  className,
  align = "center"
}: SectionHeaderProps) {
  // Text alignment classes
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12", alignmentClasses[align], className)}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}