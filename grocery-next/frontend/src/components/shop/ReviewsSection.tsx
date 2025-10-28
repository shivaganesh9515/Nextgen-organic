'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Review } from '../../lib/types';
import { EnhancedReviewCard } from './EnhancedReviewCard';
import { InteractiveStarRating } from '../ui/InteractiveStarRating';
import GlassyButton from '../ui/GlassyButton';
import { AnimatedTagPill } from '../ui/AnimatedTagPill';

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewHelpful?: (reviewId: string, isHelpful: boolean) => void;
}

interface ReviewFilters {
  rating: number | null;
  sortBy: 'newest' | 'oldest' | 'highestRated' | 'mostHelpful';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  reviews, 
  onReviewHelpful 
}) => {
  const [filters, setFilters] = useState<ReviewFilters>({
    rating: null,
    sortBy: 'newest'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters and sorting
  const filteredAndSortedReviews = [...reviews]
    .filter(review => 
      filters.rating === null || review.rating === filters.rating
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highestRated':
          return b.rating - a.rating;
        case 'mostHelpful':
          return b.helpful - a.helpful;
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handleRatingFilter = (rating: number | null) => {
    setFilters(prev => ({ ...prev, rating }));
  };

  const handleSortChange = (sortBy: ReviewFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      rating: null,
      sortBy: 'newest'
    });
  };

  // Calculate rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <InteractiveStarRating initialRating={Math.round(averageRating)} readonly size="sm" />
              <span className="ml-2 text-lg font-medium text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{reviews.length} reviews</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <GlassyButton
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="secondary"
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </GlassyButton>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Reviews</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rating Filter */}
              <div>
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center justify-between">
                      <button
                        onClick={() => handleRatingFilter(filters.rating === rating ? null : rating)}
                        className="flex items-center"
                      >
                        <InteractiveStarRating initialRating={rating} readonly size="sm" />
                        <span className="ml-2 text-sm text-gray-700">
                          {rating} star{rating > 1 ? 's' : ''}
                        </span>
                      </button>
                      <span className="text-sm text-gray-500">
                        {ratingDistribution.find(r => r.rating === rating)?.count || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h4 className="font-medium mb-3">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { id: 'newest', label: 'Newest' },
                    { id: 'oldest', label: 'Oldest' },
                    { id: 'highestRated', label: 'Highest Rated' },
                    { id: 'mostHelpful', label: 'Most Helpful' },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleSortChange(option.id as ReviewFilters['sortBy'])}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left ${
                        filters.sortBy === option.id 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm">{option.label}</span>
                      {filters.sortBy === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-primary-600"
                        >
                          <X className="h-4 w-4" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <AnimatePresence>
          {filters.rating !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedTagPill 
                variant="info" 
                glow
                onClick={() => handleRatingFilter(null)}
              >
                {filters.rating} Star{filters.rating > 1 ? 's' : ''}
              </AnimatedTagPill>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EnhancedReviewCard 
                review={review} 
                onHelpful={onReviewHelpful} 
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your filters to see more reviews
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};