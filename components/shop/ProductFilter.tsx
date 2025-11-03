'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProductFilter() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = [
    'Fruits', 'Vegetables', 'Dairy', 'Bakery', 
    'Meat', 'Beverages', 'Snacks', 'Frozen Foods'
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Label htmlFor="price-range" className="sr-only">Price range</Label>
          <input
            type="range"
            id="price-range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
            title="Price range slider"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                aria-label={`Filter by ${category}`}
              />
              <Label htmlFor={category} className="ml-2 text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                aria-label={`Filter by ${rating} stars and up`}
              />
              <Label htmlFor={`rating-${rating}`} className="ml-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="ml-1">&amp; Up</span>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}