'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SplitOrderTracker } from '../../../components/shop/SplitOrderTracker';
import GlassyButton from '../../../components/ui/GlassyButton';
import { Order, CartItem } from '../../../lib/types';

// Mock order data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-12345-01',
    items: [
      {
        product: {
          id: '1',
          name: 'Organic Bananas',
          description: 'Fresh yellow bananas, perfect for smoothies and snacks',
          price: 40,
          originalPrice: 50,
          discount: 20,
          image: '/images/products/banana.jpg',
          images: ['/images/products/banana.jpg'],
          category: 'fruits',
          subcategory: 'fresh-fruits',
          vendor: {
            id: 'v1',
            name: 'Fresh Mart',
            description: 'Your local fresh produce store',
            logo: '/images/vendors/fresh-mart-logo.jpg',
            banner: '/images/vendors/fresh-mart-banner.jpg',
            rating: 4.5,
            reviewCount: 1250,
            deliveryTime: '30-45 mins',
            deliveryFee: 20,
            minOrder: 100,
            categories: ['fruits', 'vegetables'],
            isActive: true,
            address: '123 Market Street, Mumbai 400001',
            phone: '+91 98765 43210',
            email: 'info@freshmart.com',
            openingHours: {
              monday: '8:00 AM - 10:00 PM',
              tuesday: '8:00 AM - 10:00 PM',
              wednesday: '8:00 AM - 10:00 PM',
              thursday: '8:00 AM - 10:00 PM',
              friday: '8:00 AM - 10:00 PM',
              saturday: '8:00 AM - 11:00 PM',
              sunday: '9:00 AM - 9:00 PM',
            },
            features: ['Fresh Produce', 'Organic Options'],
          },
          rating: 4.2,
          reviewCount: 145,
          inStock: true,
          quantity: 1,
          unit: 'kg',
          weight: '1 kg',
          tags: ['fresh', 'organic'],
          isOrganic: true,
        },
        quantity: 2,
      },
      {
        product: {
          id: '2',
          name: 'Red Apples',
          description: 'Crisp and sweet organic apples',
          price: 120,
          originalPrice: 140,
          discount: 14,
          image: '/images/products/apple.jpg',
          images: ['/images/products/apple.jpg'],
          category: 'fruits',
          subcategory: 'fresh-fruits',
          vendor: {
            id: 'v1',
            name: 'Fresh Mart',
            description: 'Your local fresh produce store',
            logo: '/images/vendors/fresh-mart-logo.jpg',
            banner: '/images/vendors/fresh-mart-banner.jpg',
            rating: 4.5,
            reviewCount: 1250,
            deliveryTime: '30-45 mins',
            deliveryFee: 20,
            minOrder: 100,
            categories: ['fruits', 'vegetables'],
            isActive: true,
            address: '123 Market Street, Mumbai 400001',
            phone: '+91 98765 43210',
            email: 'info@freshmart.com',
            openingHours: {
              monday: '8:00 AM - 10:00 PM',
              tuesday: '8:00 AM - 10:00 PM',
              wednesday: '8:00 AM - 10:00 PM',
              thursday: '8:00 AM - 10:00 PM',
              friday: '8:00 AM - 10:00 PM',
              saturday: '8:00 AM - 11:00 PM',
              sunday: '9:00 AM - 9:00 PM',
            },
            features: ['Fresh Produce', 'Organic Options'],
          },
          rating: 4.6,
          reviewCount: 278,
          inStock: true,
          quantity: 1,
          unit: 'kg',
          weight: '1 kg',
          tags: ['fresh', 'organic', 'premium'],
          isOrganic: true,
        },
        quantity: 1,
      },
    ] as CartItem[],
    subtotal: 200,
    deliveryFee: 20,
    discount: 0,
    total: 220,
    status: 'confirmed',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    deliveryAddress: {
      id: '1',
      type: 'home',
      name: 'Home',
      phone: '+91 98765 43210',
      address: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    deliverySlot: {
      id: 'slot1',
      date: '2025-10-20',
      time: '10:00 AM - 12:00 PM',
      fee: 20,
    },
    orderDate: new Date(),
  },
  {
    id: 'ORD-12345-02',
    items: [
      {
        product: {
          id: '3',
          name: 'Whole Wheat Bread',
          description: 'Fresh baked whole wheat bread',
          price: 45,
          image: '/images/products/bread.jpg',
          images: ['/images/products/bread.jpg'],
          category: 'bakery',
          subcategory: 'bread',
          vendor: {
            id: 'v2',
            name: "Baker's Delight",
            description: 'Fresh baked goods daily',
            logo: '/images/vendors/bakers-delight-logo.jpg',
            banner: '/images/vendors/bakers-delight-banner.jpg',
            rating: 4.3,
            reviewCount: 589,
            deliveryTime: '20-30 mins',
            deliveryFee: 15,
            minOrder: 75,
            categories: ['bakery', 'snacks'],
            isActive: true,
            address: '456 Bakery Lane, Mumbai 400002',
            phone: '+91 98765 43211',
            email: 'info@bakersdelight.com',
            openingHours: {
              monday: '7:00 AM - 9:00 PM',
              tuesday: '7:00 AM - 9:00 PM',
              wednesday: '7:00 AM - 9:00 PM',
              thursday: '7:00 AM - 9:00 PM',
              friday: '7:00 AM - 9:00 PM',
              saturday: '7:00 AM - 10:00 PM',
              sunday: '8:00 AM - 8:00 PM',
            },
            features: ['Fresh Baked', 'No Preservatives'],
          },
          rating: 4.1,
          reviewCount: 89,
          inStock: true,
          quantity: 1,
          unit: 'loaf',
          weight: '400g',
          tags: ['fresh', 'healthy'],
        },
        quantity: 2,
      },
    ] as CartItem[],
    subtotal: 90,
    deliveryFee: 15,
    discount: 0,
    total: 105,
    status: 'processing',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    deliveryAddress: {
      id: '1',
      type: 'home',
      name: 'Home',
      phone: '+91 98765 43210',
      address: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    deliverySlot: {
      id: 'slot1',
      date: '2025-10-20',
      time: '10:00 AM - 12:00 PM',
      fee: 15,
    },
    orderDate: new Date(),
  },
];

export default function OrderConfirmationPage() {
  const [orders] = useState<Order[]>(mockOrders);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-12">
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Thank you for your order. We{`'`}ve received your order and it{`'`}s being processed.
            You will receive an email confirmation shortly with your order details.
          </motion.p>
        </div>
        
        {/* Order Summary */}
        <motion.div 
          className="card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium">#ORD-12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-medium">₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="ml-2">
                  <span className="text-gray-600 block">Delivery Address</span>
                  <span className="font-medium">
                    {orders[0]?.deliveryAddress.address}, {orders[0]?.deliveryAddress.city}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="ml-2">
                  <span className="text-gray-600 block">Delivery Slot</span>
                  <span className="font-medium">
                    {orders[0]?.deliverySlot.date} • {orders[0]?.deliverySlot.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Split Order Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SplitOrderTracker orders={orders} />
        </motion.div>
        
        {/* Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button>
            <Link href="/account/orders" className="block w-full">
              View All Orders
            </Link>
          </Button>
          <GlassyButton variant="secondary">
            <Link href="/shop" className="block w-full">
              Continue Shopping
            </Link>
          </GlassyButton>
        </motion.div>
      </motion.div>
    </div>
  );
}