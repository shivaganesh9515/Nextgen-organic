'use client';

import { cn } from '../../lib/utils';

interface StandardizedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Additional CSS classes to apply to the input
   */
  className?: string;
  /**
   * The size of the input
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the input is in an error state
   */
  error?: boolean;
  /**
   * Whether the input is in a success state
   */
  success?: boolean;
}

/**
 * A standardized input component with consistent styling
 * 
 * @example
 * ```tsx
 * <StandardizedInput 
 *   type="text" 
 *   placeholder="Enter your name" 
 *   size="lg"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <StandardizedInput 
 *   type="email" 
 *   placeholder="Enter your email" 
 *   error={true}
 * />
 * ```
 */
export default function StandardizedInput({ 
  className, 
  size = 'md',
  error = false,
  success = false,
  ...props 
}: StandardizedInputProps) {
  // Define size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  // Define base styles
  const baseStyles = 'w-full border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';

  // Define state styles
  let stateStyles = 'border-gray-300 focus:ring-brand-green focus:border-transparent';
  if (error) {
    stateStyles = 'border-red-500 focus:ring-red-500 focus:border-transparent';
  } else if (success) {
    stateStyles = 'border-green-500 focus:ring-green-500 focus:border-transparent';
  }

  return (
    <input
      className={cn(
        baseStyles,
        sizeStyles[size],
        stateStyles,
        "min-h-[44px]", // Better touch targets
        className
      )}
      {...props}
    />
  );
}