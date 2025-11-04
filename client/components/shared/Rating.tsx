'use client';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function Rating({ rating, reviewCount, size = 'md' }: RatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const starSize = sizeClasses[size];

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${starSize} fill-current ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="ml-2 text-gray-500 text-sm">({reviewCount})</span>
      )}
    </div>
  );
}