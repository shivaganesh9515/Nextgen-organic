'use client';

import { useState } from 'react';
import { Tag, Clock, Gift } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    {
      id: '1',
      title: 'Summer Sale - Up to 50% Off',
      description: 'Enjoy massive discounts on selected fruits and vegetables',
      code: 'SUMMER50',
      discount: '50% off',
      validUntil: '2025-12-31',
      category: 'fruits',
      isActive: true,
    },
    {
      id: '2',
      title: 'Buy 1 Get 1 Free on Dairy',
      description: 'Buy any dairy product and get another one free',
      code: 'DAIRYBOGOF',
      discount: 'BOGO',
      validUntil: '2025-11-30',
      category: 'dairy',
      isActive: true,
    },
    {
      id: '3',
      title: '₹100 Off on Orders Above ₹500',
      description: 'Apply coupon code to get instant discount on your order',
      code: 'SAVE100',
      discount: '₹100 off',
      validUntil: '2025-10-31',
      category: 'all',
      isActive: true,
    },
    {
      id: '4',
      title: 'First Order - 20% Off',
      description: 'New customers can enjoy 20% off on their first order',
      code: 'WELCOME20',
      discount: '20% off',
      validUntil: '2025-12-31',
      category: 'all',
      isActive: true,
    },
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover amazing deals and discounts on your favorite groceries
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'all'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Offers
          </button>
          <button
            onClick={() => setActiveTab('fruits')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'fruits'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Fruits & Veggies
          </button>
          <button
            onClick={() => setActiveTab('dairy')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'dairy'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dairy
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="card p-6 relative">
            {offer.discount && (
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {offer.discount}
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Tag className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Coupon Code:</span>
                <span className="font-mono font-bold text-primary-600">{offer.code}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
            </div>
            
            <Button className="w-full mt-6">
              Copy Code
            </Button>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Use Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Find an Offer</h3>
            <p className="text-gray-600">
              Browse our current offers and find the one that suits your needs
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Copy the Code</h3>
            <p className="text-gray-600">
              Click on the `Copy Code` button to copy the coupon code to your clipboard
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Apply at Checkout</h3>
            <p className="text-gray-600">
              Paste the code in the coupon section during checkout to avail the discount
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}