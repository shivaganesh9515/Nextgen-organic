'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Store, TrendingUp, Gift } from 'lucide-react';
import { categories } from '../../lib/data/categories';
import { vendors } from '../../lib/data/vendors';
import { Category, Vendor } from '../../lib/types';
import { AnimatedTagPill } from './AnimatedTagPill';
import { VendorInfoBox } from '../vendors/VendorInfoBox';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Get top rated vendors
  const topVendors = [...vendors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Clear close timer
  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Close menu with delay
  const delayedClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      onClose();
    }, 300); // Delay to allow moving cursor to submenu
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        delayedClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearCloseTimer();
    };
  }, [isOpen, onClose]);

  // Reset active category when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveCategory(null);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50"
          onMouseLeave={delayedClose}
          onMouseEnter={clearCloseTimer}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Store className="h-5 w-5 mr-2 text-primary-600" />
                  All Departments
                </h3>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                        activeCategory?.id === category.id 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50'
                      }`}
                      onMouseEnter={() => setActiveCategory(category)}
                      onFocus={() => setActiveCategory(category)}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="flex items-center">
                        <span className="text-lg mr-3">{category.icon}</span>
                        <span className="truncate">{category.name}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {activeCategory ? (
                    <motion.div
                      key={activeCategory.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-medium text-gray-900 mb-3">{activeCategory.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                        {activeCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/shop?category=${activeCategory.id}&subcategory=${subcategory.id}`}
                            className="p-3 rounded-lg hover:bg-gray-50 transition-colors block"
                            onClick={onClose}
                          >
                            <div className="font-medium text-gray-900">{subcategory.name}</div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">{subcategory.description}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center text-gray-500 min-h-[200px]"
                    >
                      <p>Select a category to view subcategories</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Popular Vendors */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                  Popular Vendors
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {topVendors.map((vendor) => (
                    <motion.div
                      key={vendor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VendorInfoBox vendor={vendor} showRating={true} showDeliveryInfo={false} />
                    </motion.div>
                  ))}
                </div>

                <Link 
                  href="/vendors" 
                  className="mt-4 btn-outline py-2 text-center block text-sm font-medium"
                  onClick={onClose}
                >
                  View All Vendors
                </Link>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-yellow-600" />
                    Special Offers
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Up to 50% off on selected items this week
                  </p>
                  <AnimatedTagPill variant="warning" glow>
                    Limited Time
                  </AnimatedTagPill>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}