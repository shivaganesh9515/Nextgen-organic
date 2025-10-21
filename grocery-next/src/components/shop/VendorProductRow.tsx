'use client';

import { motion } from 'framer-motion';
import { Product } from '../../lib/types';
import { ProductCard } from './ProductCard';
import { vendors } from '../../lib/data/vendors';

interface VendorProductRowProps {
  vendorId: string;
  products: Product[];
}

export const VendorProductRow: React.FC<VendorProductRowProps> = ({ vendorId, products }) => {
  const vendor = vendors.find(v => v.id === vendorId);
  
  if (!vendor) return null;

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Vendor Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          {vendor.logo ? (
            <img src={vendor.logo} alt={vendor.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-gray-600">
              {vendor.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span>{vendor.rating} ★</span>
            <span className="mx-2">•</span>
            <span>{vendor.deliveryTime}</span>
            <span className="mx-2">•</span>
            <span>₹{vendor.deliveryFee} delivery</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};