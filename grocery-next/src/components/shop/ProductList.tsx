'use client';

import { Product } from '../../lib/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card animate-pulse flex">
            <div className="bg-gray-200 h-24 w-24 rounded-lg"></div>
            <div className="ml-4 flex-1 space-y-3">
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
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="card">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};