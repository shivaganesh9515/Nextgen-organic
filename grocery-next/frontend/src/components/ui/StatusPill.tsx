'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface StatusPillProps {
  /**
   * The status text to display
   */
  status: string;
  /**
   * The variant of the status pill
   * @default "default"
   */
  variant?: "default" | "success" | "warning" | "danger" | "info" | "pending";
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Whether to show a pulse animation
   * @default false
   */
  pulse?: boolean;
}

/**
 * A status pill component with optional pulse animation
 * 
 * @example
 * ```tsx
 * <StatusPill status="Delivered" variant="success" pulse />
 * ```
 */
export function StatusPill({ 
  status, 
  variant = "default",
  className,
  pulse = false
}: StatusPillProps) {
  // Define variant styles
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    pending: "bg-purple-100 text-purple-800",
  };

  // Pulse animation for certain variants
  const pulseVariants = {
    default: "",
    success: "",
    warning: "animate-pulse",
    danger: "animate-pulse",
    info: "",
    pending: "animate-pulse",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        pulse && pulseVariants[variant],
        className
      )}
    >
      {pulse && (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-2 h-2 rounded-full bg-current mr-1.5"
        />
      )}
      {status}
    </motion.span>
  );
}