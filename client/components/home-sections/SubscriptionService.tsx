'use client';

import React, { useState } from 'react';

interface SubscriptionProduct {
  id: string;
  name: string;
  price: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  image: string;
  category: string;
}

export default function SubscriptionService() {
  const [selectedFrequency, setSelectedFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  
  // Mock data for subscription products
  const subscriptionProducts: SubscriptionProduct[] = [
    {
      id: '1',
      name: 'Fresh Vegetable Box',
      price: 299,
      frequency: 'weekly',
      image: '',
      category: 'Vegetables',
    },
    {
      id: '2',
      name: 'Organic Fruit Basket',
      price: 349,
      frequency: 'weekly',
      image: '',
      category: 'Fruits',
    },
    {
      id: '3',
      name: 'Dairy Essentials Pack',
      price: 199,
      frequency: 'weekly',
      image: '',
      category: 'Dairy',
    },
    {
      id: '4',
      name: 'Herbs & Spices Set',
      price: 149,
      frequency: 'biweekly',
      image: '',
      category: 'Spices',
    },
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const filteredProducts = subscriptionProducts.filter(
    product => product.frequency === selectedFrequency || selectedFrequency === 'weekly'
  );

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            🔄 Save with Subscriptions
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Subscribe & Save
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your favorite organic products delivered regularly with exclusive discounts
          </p>
        </div>

        {/* Frequency Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-white rounded-2xl shadow-organic">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedFrequency === option.value
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-organic'
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => setSelectedFrequency(option.value as 'weekly' | 'biweekly' | 'monthly')}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500"
            >
              <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {product.category === 'Vegetables' ? '🥬' : 
                     product.category === 'Fruits' ? '🍎' : 
                     product.category === 'Dairy' ? '🥛' : 
                     product.category === 'Spices' ? '🌶️' : '🥬'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                  {product.frequency.charAt(0).toUpperCase() + product.frequency.slice(1)}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                  <span className="text-sm text-gray-500">/ {product.frequency}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-600 font-semibold">Save 15%</span>
                    <span className="text-xs text-gray-500 line-through">₹{Math.round(product.price * 1.15)}</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                  Subscribe Now
                </button>
              </div>
              
              <div className="absolute bottom-4 right-4 text-2xl opacity-10 pointer-events-none">
                🌿
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Save Money</h3>
              <p className="text-green-100">Get 15% off on every subscription order</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Save Time</h3>
              <p className="text-green-100">Never worry about running out of essentials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Priority Delivery</h3>
              <p className="text-green-100">Get your subscriptions delivered first</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}