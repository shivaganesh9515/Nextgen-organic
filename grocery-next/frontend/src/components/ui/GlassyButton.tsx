'use client';

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassyButtonProps extends HTMLMotionProps<"button"> {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * The variant of the button
   * @default "default"
   */
  variant?: "default" | "secondary" | "destructive";
}

/**
 * A glassmorphic button component with animations using Framer Motion
 * 
 * @example
 * ```tsx
 * <GlassyButton onClick={handleClick}>
 *   Click me
 * </GlassyButton>
 * ```
 * 
 * @example
 * ```tsx
 * <GlassyButton variant="secondary" isLoading>
 *   Loading...
 * </GlassyButton>
 * ```
 */
export default function GlassyButton({ 
  children, 
  className, 
  isLoading = false,
  variant = "default",
  ...props 
}: GlassyButtonProps) {
  // Define variant styles
  const variantStyles = {
    default: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    secondary: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 border-blue-500/30",
    destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-100 border-red-500/30",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-3 rounded-xl backdrop-blur-lg shadow-lg",
        "font-semibold transition-all duration-200",
        "border",
        variantStyles[variant],
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}