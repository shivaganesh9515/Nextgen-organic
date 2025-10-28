'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Clock, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Vendor } from '../../lib/types';
import { Button } from '../ui/Button';
import GlassyButton from '../ui/GlassyButton';
import { StatusPill } from '../ui/StatusPill';
import { AnimatedTagPill } from '../ui/AnimatedTagPill';

interface VendorProfileProps {
  vendor: Vendor;
}

export const VendorProfile: React.FC<VendorProfileProps> = ({ vendor }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="card">
      {/* Animated Vendor Banner */}
      <motion.div 
        className="relative rounded-lg h-64 overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={vendor.banner || '/images/placeholder-vendor.jpg'}
          alt={vendor.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Vendor Logo and Info */}
        <div className="absolute bottom-6 left-6 flex items-end">
          <motion.img
            src={vendor.logo || '/images/placeholder-logo.jpg'}
            alt={vendor.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          />
          <motion.div 
            className="ml-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold">{vendor.name}</h1>
            <p className="mt-1 text-sm opacity-90">{vendor.description}</p>
            
            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium">{vendor.rating}</span>
              <span className="ml-1 text-sm opacity-90">({vendor.reviewCount} reviews)</span>
              <StatusPill 
                status="Open" 
                variant="success" 
                className="ml-3" 
                pulse 
              />
            </div>
          </motion.div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Tabs */}
      <motion.div 
        className="border-b border-gray-200 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <nav className="-mb-px flex space-x-8">
          {['about', 'story', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vendor Details */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">About Vendor</h2>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AnimatedTagPill variant="info" glow>
                        {feature}
                      </AnimatedTagPill>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Opening Hours */}
              {vendor.openingHours && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Opening Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(vendor.openingHours).map(([day, hours], index) => (
                      <motion.div 
                        key={day}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="capitalize">{day}</span>
                        <span>{hours}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="ml-2 text-gray-600">{vendor.address}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="ml-2 text-gray-600">{vendor.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-gray-500" />
                  <div className="ml-2">
                    <div className="text-gray-600">Min. Order: ₹{vendor.minOrder}</div>
                    <div className="text-gray-600">Delivery Fee: ₹{vendor.deliveryFee}</div>
                    <div className="text-gray-600">Delivery Time: {vendor.deliveryTime}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <GlassyButton className="w-full">
                  Shop from this vendor
                </GlassyButton>
                <Button variant="outline" className="w-full">
                  Contact Vendor
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Story Tab */}
        {activeTab === 'story' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Our Story</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700">
                Founded in 2010, {vendor.name} started as a small family-owned grocery store with a passion for 
                providing the freshest and highest quality products to our community. What began as a modest 
                neighborhood shop has now grown into one of the most trusted names in local grocery retail.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    To provide our customers with fresh, high-quality groceries at competitive prices while 
                    supporting local farmers and producers.
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Values</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Quality above all else</li>
                    <li>Community support</li>
                    <li>Sustainable practices</li>
                    <li>Customer satisfaction</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-700">
                We source directly from local farms and producers whenever possible, ensuring that our customers 
                receive the freshest produce available. Our team is committed to excellence in every aspect of 
                our business, from product selection to customer service.
              </p>
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Sustainability Commitment</h3>
                <p className="text-blue-700">
                  We are proud to be a carbon-neutral business, with all our delivery vehicles running on 
                  electric power and our packaging made from 100% recycled materials.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
            
            <div className="flex items-center mb-6">
              <div className="text-3xl font-bold text-gray-900 mr-4">{vendor.rating}</div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Based on {vendor.reviewCount} reviews
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <motion.div
                  key={review}
                  className="border-b border-gray-200 pb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: review * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Customer {review}</div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 - review ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Leave a Review</h3>
              <div className="flex items-center mb-3">
                <span className="mr-3 text-gray-700">Your Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                    >
                      <Star className="h-6 w-6" fill="currentColor" />
                    </motion.button>
                  ))}
                </div>
              </div>
              <textarea
                rows={4}
                className="input-field w-full"
                placeholder="Share your experience with this vendor..."
              ></textarea>
              <GlassyButton className="mt-3">
                Submit Review
              </GlassyButton>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};