'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { Product } from '../../lib/types';
import { ProductCard } from './ProductCard';
import { VendorProductRow } from './VendorProductRow';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  vendorView?: boolean;
  onVendorViewChange?: (vendorView: boolean) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false,
  vendorView = false,
  onVendorViewChange 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'vendor'>('grid');

  // Group products by vendor
  const productsByVendor = products.reduce((acc, product) => {
    const vendorId = product.vendor.id;
    if (!acc[vendorId]) {
      acc[vendorId] = [];
    }
    acc[vendorId].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Showing {products.length} products
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('vendor')}
            className={`p-2 rounded-lg ${viewMode === 'vendor' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="Vendor view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="vendor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {Object.entries(productsByVendor).map(([vendorId, vendorProducts]) => (
              <VendorProductRow 
                key={vendorId} 
                vendorId={vendorId} 
                products={vendorProducts} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};