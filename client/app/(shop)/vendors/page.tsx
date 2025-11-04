'use client';

import React from 'react';
import { VendorRecruitmentCTA } from '@/components/unified-components-v2';

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Vendors</h1>
        <p className="text-gray-600 text-lg mb-12">Discover our network of certified organic vendors</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Organic Farm {item}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✓ Verified</span>
                </div>
                <p className="text-gray-600 mb-4">Specializing in fresh organic produce directly from farm to table.</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.{item}</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <VendorRecruitmentCTA />
      </div>
    </div>
  );
}