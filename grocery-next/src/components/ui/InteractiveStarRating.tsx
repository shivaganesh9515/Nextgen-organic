'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface InteractiveStarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export const InteractiveStarRating: React.FC<InteractiveStarRatingProps> = ({
  initialRating = 0,
  onRatingChange,
  size = 'md',
  readonly = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readonly) {
      setRating(index);
      if (onRatingChange) {
        onRatingChange(index);
      }
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.button
          key={index}
          type="button"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.2, rotate: 5 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none relative`}
          aria-label={`Rate ${index} out of 5`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              index <= displayRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
          {!readonly && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0 }}
              animate={{ scale: index <= displayRating ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};