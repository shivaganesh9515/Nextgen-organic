'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { vendors } from '../../lib/data/vendors';
import { AnimatedTagPill } from '../ui/AnimatedTagPill';

interface VendorOffer {
  vendorId: string;
  offerTitle: string;
  offerDescription: string;
  discount: number;
  validUntil: string;
}

const vendorOffers: VendorOffer[] = [
  {
    vendorId: 'v1',
    offerTitle: 'Fresh Produce Sale',
    offerDescription: 'Get 20% off on all fruits and vegetables',
    discount: 20,
    validUntil: '2025-11-15',
  },
  {
    vendorId: 'v2',
    offerTitle: 'Buy 1 Get 1 Free',
    offerDescription: 'On all bakery items this weekend',
    discount: 50,
    validUntil: '2025-10-27',
  },
  {
    vendorId: 'v3',
    offerTitle: 'Dairy Delight',
    offerDescription: '15% off on all dairy products',
    discount: 15,
    validUntil: '2025-11-05',
  },
];

export const OfferZone: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === vendorOffers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? vendorOffers.length - 1 : prevIndex - 1
    );
  };

  const getVendorById = (id: string) => {
    return vendors.find(vendor => vendor.id === id);
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Offers</h2>
      
      <div className="relative">
        <motion.div 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          layout
        >
          {/* Background Pattern - Enhanced */}
          <div className="absolute inset-0 opacity-10">
            {/* Geometric pattern with organic shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mt-32 -mr-32 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -mb-24 -ml-24 opacity-20"></div>
            
            {/* Additional decorative elements for a more advanced look */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-lg transform rotate-45 opacity-10"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-white rounded-full opacity-15"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white transform rotate-12 opacity-10"></div>
            
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-white"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <AnimatedTagPill variant="warning" glow className="mb-4">
                  Limited Time Offer
                </AnimatedTagPill>
                
                <h3 className="text-2xl font-bold mb-2">
                  {vendorOffers[currentIndex].offerTitle}
                </h3>
                
                <p className="text-lg mb-4 opacity-90">
                  {vendorOffers[currentIndex].offerDescription}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">
                      {vendorOffers[currentIndex].discount}% OFF
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <div>Valid until</div>
                    <div className="font-medium">
                      {new Date(vendorOffers[currentIndex].validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                {(() => {
                  const vendor = getVendorById(vendorOffers[currentIndex].vendorId);
                  return vendor ? (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4">
                        {vendor.logo ? (
                          <img 
                            src={vendor.logo} 
                            alt={vendor.name} 
                            className="w-full h-full rounded-full object-cover" 
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-600">
                            {vendor.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold">{vendor.name}</div>
                        <div className="text-sm opacity-90">{vendor.rating} ★</div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
          aria-label="Previous offer"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
          aria-label="Next offer"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        
        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {vendorOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};