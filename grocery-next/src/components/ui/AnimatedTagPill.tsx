'use client';

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedTagPillProps {
  /**
   * The content of the tag pill
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the tag pill
   */
  className?: string;
  /**
   * The variant of the tag pill
   * @default "default"
   */
  variant?: "default" | "success" | "warning" | "danger" | "info";
  /**
   * Whether the tag pill should have a glow effect
   * @default false
   */
  glow?: boolean;
  /**
   * Click handler for the tag pill
   */
  onClick?: () => void;
}

/**
 * An animated tag pill component with optional glow effect
 * 
 * @example
 * ```tsx
 * <AnimatedTagPill variant="success" glow>
 *   New
 * </AnimatedTagPill>
 * ```
 */
export function AnimatedTagPill({ 
  children, 
  className, 
  variant = "default",
  glow = false,
  onClick 
}: AnimatedTagPillProps) {
  // Define variant styles
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  // Glow effect styles
  const glowStyles = {
    default: "shadow-[0_0_8px_rgba(156,163,175,0.5)]",
    success: "shadow-[0_0_8px_rgba(72,187,120,0.5)]",
    warning: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    danger: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    info: "shadow-[0_0_8px_rgba(59,130,246,0.5)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
        variantStyles[variant],
        glow && glowStyles[variant],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}