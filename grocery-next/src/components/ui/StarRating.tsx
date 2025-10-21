'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  /**
   * The current rating value
   */
  value?: number;
  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;
  /**
   * Whether the rating is read-only
   * @default false
   */
  readonly?: boolean;
  /**
   * The size of the stars
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * A star rating component with interactive or read-only modes
 * 
 * @example
 * ```tsx
 * // Read-only
 * <StarRating value={4.5} readonly />
 * 
 * // Interactive
 * <StarRating value={rating} onChange={setRating} />
 * ```
 */
export function StarRating({ 
  value = 0, 
  onChange, 
  readonly = false,
  size = "md",
  className 
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  
  // Define size classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  return (
    <div 
      className={cn("flex", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = readonly 
          ? star <= Math.floor(value) 
          : star <= (hoverValue || value);
          
        const isHalfFilled = readonly 
          ? star === Math.ceil(value) && value % 1 !== 0
          : false;

        return (
          <motion.button
            key={star}
            type="button"
            whileHover={readonly ? {} : { scale: 1.2 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            className={cn(
              "cursor-pointer focus:outline-none",
              readonly ? "cursor-default" : "cursor-pointer",
              sizeClasses[size]
            )}
            disabled={readonly}
            aria-label={`Rate ${star} stars`}
          >
            {isHalfFilled ? (
              <div className="relative">
                <Star className="text-gray-300" fill="currentColor" />
                <div className="absolute inset-0 w-1/2 overflow-hidden">
                  <Star className="text-yellow-400" fill="currentColor" />
                </div>
              </div>
            ) : (
              <Star 
                className={cn(
                  isFilled ? "text-yellow-400" : "text-gray-300"
                )} 
                fill={isFilled ? "currentColor" : "none"} 
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}