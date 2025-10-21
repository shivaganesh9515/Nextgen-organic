'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Review } from '../../lib/types';
import { InteractiveStarRating } from '../ui/InteractiveStarRating';

interface EnhancedReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string, isHelpful: boolean) => void;
}

export const EnhancedReviewCard: React.FC<EnhancedReviewCardProps> = ({ 
  review,
  onHelpful 
}) => {
  const handleHelpful = (isHelpful: boolean) => {
    if (onHelpful) {
      onHelpful(review.id, isHelpful);
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start">
        {review.userAvatar ? (
          <motion.img
            src={review.userAvatar}
            alt={review.userName}
            className="h-12 w-12 rounded-full object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          />
        ) : (
          <motion.div 
            className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            {review.userName.charAt(0)}
          </motion.div>
        )}
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <motion.h4 
                className="text-lg font-semibold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {review.userName}
              </motion.h4>
              <motion.div 
                className="mt-1 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <InteractiveStarRating 
                  initialRating={review.rating} 
                  readonly 
                  size="sm" 
                />
                <span className="ml-2 text-sm text-gray-500">{review.rating}.0</span>
              </motion.div>
            </div>
            
            <motion.span 
              className="text-sm text-gray-500"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {new Date(review.date).toLocaleDateString()}
            </motion.span>
          </div>
          
          <motion.div 
            className="mt-3 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>{review.comment}</p>
          </motion.div>
          
          {review.images && review.images.length > 0 && (
            <motion.div 
              className="mt-4 flex space-x-2 overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {review.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </motion.div>
          )}
          
          {review.verified && (
            <motion.div 
              className="mt-3 inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-1">
                ✓
              </span>
              Verified Purchase
            </motion.div>
          )}
          
          <motion.div 
            className="mt-4 flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-sm text-gray-500">Was this helpful?</span>
            <button
              onClick={() => handleHelpful(true)}
              className="flex items-center text-sm text-gray-500 hover:text-green-600 transition-colors"
              aria-label="This review was helpful"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{review.helpful}</span>
            </button>
            <button
              onClick={() => handleHelpful(false)}
              className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors"
              aria-label="This review was not helpful"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};