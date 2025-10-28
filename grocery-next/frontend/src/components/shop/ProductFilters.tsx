'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../../lib/data/categories';
import GlassyButton from '../ui/GlassyButton';
import { AnimatedTagPill } from '../ui/AnimatedTagPill';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  vendors: string[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  vendors: { id: string; name: string }[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, vendors }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [showVendors, setShowVendors] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);

  // The initial filter change will be handled by the parent component

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    // Only update if categories have actually changed
    if (JSON.stringify(newCategories) === JSON.stringify(selectedCategories)) return;
    
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange, rating, vendors: selectedVendors });
  };

  const handleVendorChange = (vendorId: string) => {
    const newVendors = selectedVendors.includes(vendorId)
      ? selectedVendors.filter(id => id !== vendorId)
      : [...selectedVendors, vendorId];
    
    // Only update if vendors have actually changed
    if (JSON.stringify(newVendors) === JSON.stringify(selectedVendors)) return;
    
    setSelectedVendors(newVendors);
    onFilterChange({ categories: selectedCategories, priceRange, rating, vendors: newVendors });
  };

  const handlePriceChange = (min: number, max: number) => {
    // Only update if price range has actually changed
    if (min === priceRange[0] && max === priceRange[1]) return;
    
    setPriceRange([min, max]);
    onFilterChange({ categories: selectedCategories, priceRange: [min, max], rating, vendors: selectedVendors });
  };

  const handleRatingChange = (value: number | null) => {
    // Only update if rating has actually changed
    if (value === rating) return;
    
    setRating(value);
    onFilterChange({ categories: selectedCategories, priceRange, rating: value, vendors: selectedVendors });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setRating(null);
    setSelectedVendors([]);
    onFilterChange({ categories: [], priceRange: [0, 1000], rating: null, vendors: [] });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
          aria-label="Clear all filters"
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

      {/* Active Filters Display */}
      <div className="mb-4 flex flex-wrap gap-2">
        {selectedCategories.map(categoryId => {
          const category = categories.find(c => c.id === categoryId);
          return category ? (
            <motion.div
              key={categoryId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedTagPill 
                variant="info" 
                glow
                onClick={() => handleCategoryChange(categoryId)}
              >
                {category.name}
              </AnimatedTagPill>
            </motion.div>
          ) : null;
        })}
        {selectedVendors.map(vendorId => {
          const vendor = vendors.find(v => v.id === vendorId);
          return vendor ? (
            <motion.div
              key={vendorId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedTagPill 
                variant="success" 
                glow
                onClick={() => handleVendorChange(vendorId)}
              >
                {vendor.name}
              </AnimatedTagPill>
            </motion.div>
          ) : null;
        })}
        {rating !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedTagPill 
              variant="warning" 
              glow
              onClick={() => handleRatingChange(null)}
            >
              {rating}+ Stars
            </AnimatedTagPill>
          </motion.div>
        )}
      </div>

      {/* Filters Panel */}
      <div className={`mt-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div className="mb-6">
          <button 
            onClick={() => setShowCategories(!showCategories)}
            className="flex justify-between items-center w-full font-medium mb-3"
          >
            <span>Categories</span>
            {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {showCategories && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-2"
              >
                {categories.map(category => (
                  <motion.div 
                    key={category.id} 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      aria-label={`Filter by ${category.name}`}
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                      {category.name}
                    </label>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vendors */}
        <div className="mb-6">
          <button 
            onClick={() => setShowVendors(!showVendors)}
            className="flex justify-between items-center w-full font-medium mb-3"
          >
            <span>Vendors</span>
            {showVendors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {showVendors && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-2"
              >
                {vendors.map(vendor => (
                  <motion.div 
                    key={vendor.id} 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      id={`vendor-${vendor.id}`}
                      checked={selectedVendors.includes(vendor.id)}
                      onChange={() => handleVendorChange(vendor.id)}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      aria-label={`Filter by ${vendor.name}`}
                    />
                    <label htmlFor={`vendor-${vendor.id}`} className="ml-2 text-sm text-gray-700">
                      {vendor.name}
                    </label>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button 
            onClick={() => setShowPrice(!showPrice)}
            className="flex justify-between items-center w-full font-medium mb-3"
          >
            <span>Price Range</span>
            {showPrice ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {showPrice && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                  <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Maximum price filter"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating */}
        <div>
          <button 
            onClick={() => setShowRating(!showRating)}
            className="flex justify-between items-center w-full font-medium mb-3"
          >
            <span>Rating</span>
            {showRating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {showRating && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-2"
              >
                {[4, 3, 2, 1].map((stars) => (
                  <motion.div 
                    key={stars} 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="radio"
                      id={`rating-${stars}`}
                      name="rating"
                      checked={rating === stars}
                      onChange={() => handleRatingChange(stars)}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      aria-label={`Filter by ${stars} stars and up`}
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
                        <span className="ml-1">& Up</span>
                      </div>
                    </label>
                  </motion.div>
                ))}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="radio"
                    id="rating-all"
                    name="rating"
                    checked={rating === null}
                    onChange={() => handleRatingChange(null)}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    aria-label="Show all ratings"
                  />
                  <label htmlFor="rating-all" className="ml-2 text-sm text-gray-700">
                    All Ratings
                  </label>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};