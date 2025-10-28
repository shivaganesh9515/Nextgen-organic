'use client';

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface StandardizedButtonProps extends HTMLMotionProps<"button"> {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * The variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  /**
   * The size of the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "icon";
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

/**
 * A standardized button component with consistent styling and animations
 * 
 * @example
 * ```tsx
 * <StandardizedButton onClick={handleClick}>
 *   Click me
 * </StandardizedButton>
 * ```
 * 
 * @example
 * ```tsx
 * <StandardizedButton variant="secondary" size="lg">
 *   Large Secondary Button
 * </StandardizedButton>
 * ```
 */
export default function StandardizedButton({ 
  children, 
  className, 
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  ...props 
}: StandardizedButtonProps) {
  // Define variant styles
  const variantStyles = {
    primary: "bg-brand-green text-white hover:bg-brand-dark-green focus:ring-brand-green/50",
    secondary: "bg-brand-beige text-brand-navy hover:bg-brand-beige/80 focus:ring-brand-beige/50",
    outline: "border border-brand-green text-brand-green bg-transparent hover:bg-brand-green/10 focus:ring-brand-green/50",
    ghost: "text-brand-green bg-transparent hover:bg-brand-green/10 focus:ring-brand-green/50",
    icon: "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white focus:ring-gray-300 hover:shadow-md",
  };

  // Define size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-base",
    icon: "p-2",
  };

  // Define base styles
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "min-h-[44px] min-w-[44px]", // Better touch targets
        className
      )}
      disabled={disabled || isLoading}
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