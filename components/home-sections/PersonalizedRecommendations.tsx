'use client';

import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  vendorId: string;
  category: string;
}

export default function PersonalizedRecommendations() {
  // Mock data for personalized recommendations
  // In a real implementation, this would be fetched based on user preferences and purchase history
  const recommendedProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Fresh Tomatoes',
      price: 89,
      originalPrice: 120,
      discount: 26,
      rating: 4.8,
      reviewCount: 234,
      image: '',
      vendorId: '1',
      category: 'Vegetables',
    },
    {
      id: '2',
      name: 'Organic Carrots',
      price: 65,
      rating: 4.9,
      reviewCount: 187,
      image: '',
      vendorId: '2',
      category: 'Vegetables',
    },
    {
      id: '3',
      name: 'Organic Apples',
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.7,
      reviewCount: 156,
      image: '',
      vendorId: '3',
      category: 'Fruits',
    },
    {
      id: '4',
      name: 'Organic Milk',
      price: 75,
      rating: 4.9,
      reviewCount: 98,
      image: '',
      vendorId: '4',
      category: 'Dairy',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended For You</h2>
            <p className="text-gray-600">Based on your preferences and purchase history</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
            View All Recommendations
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {product.category === 'Vegetables' ? '🍅' : 
                     product.category === 'Fruits' ? '🍎' : 
                     product.category === 'Dairy' ? '🥛' : '🥬'}
                  </span>
                </div>
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                    Add
                  </button>
                  <button className="px-4 py-2 bg-white text-green-700 rounded-xl font-bold text-sm shadow-organic hover:shadow-organic-lg transition-all border-2 border-green-200 hover:border-green-400 hover:-translate-y-1">
                    View
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-2xl opacity-10 pointer-events-none">
                🌿
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}