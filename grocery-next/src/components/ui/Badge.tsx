'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className,
  glow = false
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    primary: 'bg-primary-100 text-primary-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const glowClasses = {
    default: 'shadow-[0_0_4px_rgba(156,163,175,0.5)]',
    success: 'shadow-[0_0_4px_rgba(72,187,120,0.5)]',
    warning: 'shadow-[0_0_4px_rgba(245,158,11,0.5)]',
    danger: 'shadow-[0_0_4px_rgba(239,68,68,0.5)]',
    info: 'shadow-[0_0_4px_rgba(59,130,246,0.5)]',
    primary: 'shadow-[0_0_4px_rgba(22,163,74,0.5)]',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        glow && glowClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}