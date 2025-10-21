'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LoaderProps {
  /**
   * The size of the loader
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

interface SkeletonProps {
  /**
   * The width of the skeleton
   */
  width?: string | number;
  /**
   * The height of the skeleton
   */
  height?: string | number;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Whether the skeleton should be circular
   * @default false
   */
  circle?: boolean;
}

/**
 * A loading spinner component with animation
 * 
 * @example
 * ```tsx
 * <Loader size="lg" />
 * ```
 */
export function Loader({ size = "md", className }: LoaderProps) {
  // Define size classes
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn(
        "border-t-primary-500 border-r-primary-500 border-b-primary-300 border-l-primary-300 rounded-full",
        sizeClasses[size],
        className
      )}
    />
  );
}

/**
 * A skeleton loading component with shimmer animation
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * ```
 */
export function Skeleton({ 
  width = "100%", 
  height = "16px", 
  className, 
  circle = false 
}: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={cn(
        "bg-gray-200 rounded",
        circle && "rounded-full",
        className
      )}
      style={{ width, height }}
    />
  );
}