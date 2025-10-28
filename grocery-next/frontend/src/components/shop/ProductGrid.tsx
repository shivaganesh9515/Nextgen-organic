'use client';

import { useState } from 'react';
import { Product } from '../../lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false
}) => {
  const [viewMode] = useState<'grid'>('grid');

  // Mock handlers for product actions
  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
  };

  const handleQuickView = (id: string) => {
    console.log(`Quick view for product ${id}`);
  };

  const handleWishlist = (id: string) => {
    console.log(`Added product ${id} to wishlist`);
  };

  const handleCompare = (id: string) => {
    console.log(`Compare product ${id}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card card-product h-full bg-white rounded-2xl shadow-lg p-5 animate-pulse touch-optimized">
            <div className="bg-gray-200 h-56 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Product grid"
      >
        {products.map((product) => (
          <div key={product.id} role="listitem">
            <ProductCard 
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onWishlist={handleWishlist}
              onCompare={handleCompare}
            />
          </div>
        ))}
      </div>
    </div>
  );
};