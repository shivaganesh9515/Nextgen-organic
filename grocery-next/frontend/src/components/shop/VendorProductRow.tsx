'use client';

import { Product } from '../../lib/types';
import { vendors } from '../../lib/data/vendors';
import ProductCard from './ProductCard';

interface VendorProductRowProps {
  vendorId: string;
  products: Product[];
}

export const VendorProductRow: React.FC<VendorProductRowProps> = ({ vendorId, products }) => {
  const vendor = vendors.find(v => v.id === vendorId);
  
  if (!vendor) return null;

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

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 touch-optimized">
      {/* Vendor Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          {vendor.logo ? (
            <img 
              src={vendor.logo} 
              alt={vendor.name} 
              className="w-full h-full rounded-full object-cover" 
              loading="lazy" 
              width="56"
              height="56"
            />
          ) : (
            <span className="text-xl font-bold text-gray-600">
              {vendor.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{vendor.name}</h3>
          <div className="flex items-center text-base text-gray-500 mt-1">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {vendor.rating}
            </span>
            <span className="mx-3">•</span>
            <span>{vendor.deliveryTime}</span>
            <span className="mx-3">•</span>
            <span>₹{vendor.deliveryFee} delivery</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label={`Products from ${vendor.name}`}
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