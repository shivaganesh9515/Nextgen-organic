'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../../lib/data/categories';

interface FilterOptions {
  categories: string[];
  rating: number | null;
}

interface VendorFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const VendorFilters: React.FC<VendorFiltersProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, rating });
  };

  const handleRatingChange = (value: number | null) => {
    setRating(value);
    onFilterChange({ categories: selectedCategories, rating: value });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setRating(null);
    onFilterChange({ categories: [], rating: null });
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </button>

      {/* Filters Panel */}
      <div className={`mt-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-medium mb-3">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${stars}`}
                  name="rating"
                  checked={rating === stars}
                  onChange={() => handleRatingChange(stars)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor={`rating-${stars}`} className="ml-2 text-sm text-gray-700">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-1">&amp; Up</span>
                  </div>
                </label>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="radio"
                id="rating-all"
                name="rating"
                checked={rating === null}
                onChange={() => handleRatingChange(null)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <label htmlFor="rating-all" className="ml-2 text-sm text-gray-700">
                All Ratings
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};