'use client';

import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
          aria-label={`Rate ${index} out of 5`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              index <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${!readonly ? 'hover:fill-yellow-400 hover:text-yellow-400' : ''}`}
          />
        </button>
      ))}
    </div>
  );
};