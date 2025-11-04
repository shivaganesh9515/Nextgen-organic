'use client';

import React from 'react';

interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  productsCount: number;
  location: string;
  specialties: string[];
  sustainabilityBadges: string[];
  image: string;
}

export default function VendorSpotlight() {
  // Mock data for featured vendors
  const featuredVendors: Vendor[] = [
    {
      id: '1',
      name: 'Green Valley Organics',
      description: 'Family-owned farm specializing in organic vegetables and herbs since 1995. Certified organic by USDA.',
      rating: 4.9,
      reviewCount: 1247,
      productsCount: 86,
      location: 'California, USA',
      specialties: ['Leafy Greens', 'Herbs', 'Root Vegetables'],
      sustainabilityBadges: ['Organic Certified', 'Carbon Neutral', 'Water Efficient'],
      image: '',
    },
    {
      id: '2',
      name: 'Sunrise Dairy Farms',
      description: 'Small-scale dairy farm producing organic milk, cheese, and yogurt. Grass-fed cows and sustainable practices.',
      rating: 4.8,
      reviewCount: 892,
      productsCount: 42,
      location: 'Wisconsin, USA',
      specialties: ['Milk', 'Cheese', 'Yogurt'],
      sustainabilityBadges: ['Organic Certified', 'Animal Welfare', 'Local Producer'],
      image: '',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
            🌾 Meet Our Vendors
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Trusted Local Producers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get to know the passionate farmers and producers behind your organic groceries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredVendors.map((vendor) => (
            <div 
              key={vendor.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500"
            >
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-amber-100 to-orange-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">
                      {vendor.name.includes('Green') ? '🥬' : '🥛'}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:w-3/5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{vendor.name}</h3>
                    <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="font-bold text-green-800">{vendor.rating}</span>
                      <span className="text-green-600 text-sm ml-1">({vendor.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{vendor.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {vendor.sustainabilityBadges.map((badge, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{vendor.productsCount}+</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{vendor.location.split(',')[0]}</p>
                      <p className="text-xs text-gray-500">Location</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">
                        {Math.floor(vendor.reviewCount / 100)}+
                      </p>
                      <p className="text-xs text-gray-500">Customers</p>
                    </div>
                  </div>
                  
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                    View Products
                  </button>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-2xl opacity-10 pointer-events-none">
                🌾
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}