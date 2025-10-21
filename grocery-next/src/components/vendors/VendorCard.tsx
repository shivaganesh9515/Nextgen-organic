'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { Vendor } from '../../lib/types';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <div className="card group">
      {/* Vendor Banner */}
      <div className="relative overflow-hidden rounded-lg h-32">
        <img
          src={vendor.banner || '/images/placeholder-vendor.jpg'}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-2 left-2">
          <img
            src={vendor.logo || '/images/placeholder-logo.jpg'}
            alt={vendor.name}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Vendor Info */}
      <div className="mt-4">
        <Link href={`/vendors/${vendor.id}`} className="hover:text-primary-600">
          <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{vendor.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({vendor.reviewCount})</span>
        </div>
        
        {/* Delivery Info */}
        <div className="mt-3 flex justify-between text-sm">
          <div>
            <span className="text-gray-500">Delivery:</span>
            <span className="ml-1 font-medium">{vendor.deliveryTime}</span>
          </div>
          <div>
            <span className="text-gray-500">Min:</span>
            <span className="ml-1 font-medium">₹{vendor.minOrder}</span>
          </div>
        </div>
        
        {/* Features */}
        {vendor.features && vendor.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {vendor.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="badge badge-primary text-xs">
                {feature}
              </span>
            ))}
            {vendor.features.length > 2 && (
              <span className="badge badge-secondary text-xs">
                +{vendor.features.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};