'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import GlassyButton from '../ui/GlassyButton';

interface SortingOption {
  id: string;
  label: string;
  value: string;
}

interface SortingDropdownProps {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
}

const sortingOptions: SortingOption[] = [
  { id: 'featured', label: 'Featured', value: 'featured' },
  { id: 'best-selling', label: 'Best Selling', value: 'bestSelling' },
  { id: 'price-low-high', label: 'Price: Low to High', value: 'priceLowHigh' },
  { id: 'price-high-low', label: 'Price: High to Low', value: 'priceHighLow' },
  { id: 'rating', label: 'Top Rated', value: 'rating' },
  { id: 'newest', label: 'Newest Arrivals', value: 'newest' },
];

export const SortingDropdown: React.FC<SortingDropdownProps> = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortingOption>(sortingOptions[0]);

  const handleOptionSelect = (option: SortingOption) => {
    setSelectedOption(option);
    onSortChange(option.value);
    setIsOpen(false);
  };

  const currentOption = sortingOptions.find(option => option.value === currentSort) || sortingOptions[0];

  return (
    <div className="relative">
      <GlassyButton
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[180px]"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Sort by: {currentOption.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </GlassyButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 z-50 overflow-hidden"
            >
              <div className="py-2">
                {sortingOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.8)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100/80 transition-colors"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span className={option.value === currentSort ? 'font-medium text-primary-600' : ''}>
                      {option.label}
                    </span>
                    {option.value === currentSort && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary-600"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};