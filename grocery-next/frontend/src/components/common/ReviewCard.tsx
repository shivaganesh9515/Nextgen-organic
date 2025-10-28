'use client';

import { Star } from 'lucide-react';
import { Review } from '../../lib/types';
import { Rating } from './Rating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="card">
      <div className="flex items-start">
        {review.userAvatar ? (
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {review.userName.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-900">{review.userName}</h4>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mt-1 flex items-center">
            <Rating value={review.rating} readonly size="sm" />
            <span className="ml-2 text-sm text-gray-500">{review.rating}.0</span>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <p>{review.comment}</p>
          </div>
          
          {review.images && review.images.length > 0 && (
            <div className="mt-3 flex space-x-2">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="h-16 w-16 rounded-md object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}
          
          {review.verified && (
            <div className="mt-2 inline-flex items-center text-xs text-green-600">
              <span className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-1">
                ✓
              </span>
              Verified Purchase
            </div>
          )}
        </div>
      </div>
    </div>
  );
};