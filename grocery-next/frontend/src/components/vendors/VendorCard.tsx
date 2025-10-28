'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Vendor } from '../../lib/types';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerError, setBannerError] = useState(false);
  const [logoLoading, setLogoLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="card group h-full flex flex-col">
      {/* Vendor Banner with Loading State */}
      <div className="relative overflow-hidden rounded-lg h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0">
        {bannerLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Skeleton Loader */}
            <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
          </div>
        )}
        
        {!bannerError ? (
          <img
            src={vendor.banner || '/images/placeholder-vendor.jpg'}
            alt={vendor.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
              bannerLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setBannerLoading(false)}
            onError={() => {
              setBannerError(true);
              setBannerLoading(false);
            }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-green-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">
                  {vendor.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">No Banner</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Logo with Loading State */}
        <div className="absolute bottom-2 left-2">
          <div className="relative">
            {logoLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse w-12 h-12 bg-gray-300 rounded-full" />
              </div>
            )}
            
            {!logoError ? (
              <img
                src={vendor.logo || '/images/placeholder-logo.jpg'}
                alt={vendor.name}
                className={`w-12 h-12 rounded-full border-2 border-white ${
                  logoLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setLogoLoading(false)}
                onError={() => {
                  setLogoError(true);
                  setLogoLoading(false);
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-white bg-green-300 flex items-center justify-center">
                <span className="text-lg font-bold text-green-700">
                  {vendor.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/vendors/${vendor.id}`} className="hover:text-primary-600">
          <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">{vendor.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1 flex items-center">
            ({vendor.reviewCount})
          </span>
        </div>
        
        {/* Delivery Info */}
        <div className="mt-3 flex justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-500">Delivery:</span>
            <span className="ml-1 font-medium">{vendor.deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500">Min:</span>
            <span className="ml-1 font-medium">₹{vendor.minOrder}</span>
          </div>
        </div>
        
        {/* Features */}
        {vendor.features && vendor.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {vendor.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="badge badge-primary text-xs whitespace-nowrap">
                {feature}
              </span>
            ))}
            {vendor.features.length > 2 && (
              <span className="badge badge-secondary text-xs whitespace-nowrap">
                +{vendor.features.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};