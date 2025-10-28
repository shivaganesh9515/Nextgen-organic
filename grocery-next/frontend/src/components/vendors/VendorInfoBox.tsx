'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Vendor } from '../../lib/types';

interface VendorInfoBoxProps {
  /**
   * The vendor object
   */
  vendor: Vendor;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Whether to show the vendor's rating
   * @default true
   */
  showRating?: boolean;
  /**
   * Whether to show the vendor's delivery info
   * @default true
   */
  showDeliveryInfo?: boolean;
}

/**
 * A component to display vendor information in a compact box
 * 
 * @example
 * ```tsx
 * <VendorInfoBox vendor={vendor} />
 * ```
 */
export function VendorInfoBox({ 
  vendor, 
  className,
  showRating = true,
  showDeliveryInfo = true
}: VendorInfoBoxProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      className={`flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      <div className="flex-shrink-0">
        <div className="relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-12 h-12 bg-gray-300 rounded-full" />
            </div>
          )}
          
          {!imageError ? (
            <img
              src={vendor.logo || '/images/placeholder-logo.jpg'}
              alt={vendor.name}
              className={`w-12 h-12 rounded-full object-cover ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center">
              <span className="text-lg font-bold text-green-700">
                {vendor.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="ml-3 flex-grow min-w-0">
        <Link href={`/vendors/${vendor.id}`} className="hover:text-primary-600">
          <h4 className="font-medium text-gray-900 truncate">{vendor.name}</h4>
        </Link>
        
        {showRating && (
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount})</span>
          </div>
        )}
        
        {showDeliveryInfo && (
          <div className="flex text-xs text-gray-500 mt-1">
            <span>{vendor.deliveryTime}</span>
            <span className="mx-1">•</span>
            <span>Min ₹{vendor.minOrder}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}