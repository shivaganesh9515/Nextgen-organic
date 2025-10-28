
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({ 
  value = 0, 
  onChange,
  readonly = false,
  size = "md",
  className 
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  
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
      className={cn("flex items-center", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const displayValue = hoverValue || value;
        const isFilled = star <= displayValue;
        const isHalf = !isFilled && star - 0.5 <= displayValue;

        return (
          <motion.button
            key={star}
            type="button"
            whileHover={readonly ? {} : { scale: 1.2, y: -2 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            className={cn(
              "focus:outline-none",
              readonly ? "cursor-default" : "cursor-pointer",
              sizeClasses[size]
            )}
            disabled={readonly}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <div className="relative">
              <Star 
                className={cn("text-gray-300", sizeClasses[size])} 
                fill="currentColor"
              />
              {(isFilled || isHalf) && (
                <div 
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: isHalf ? '50%' : '100%' }}
                >
                  <Star 
                    className={cn("text-yellow-400", sizeClasses[size])} 
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
