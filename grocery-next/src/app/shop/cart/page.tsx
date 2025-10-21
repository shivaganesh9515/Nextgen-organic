'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Shield, Tag } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { CartItem as CartItemType, Vendor } from '../../../lib/types';
import { VendorCartGroup } from '../../../components/shop/VendorCartGroup';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';
import GlassyButton from '../../../components/ui/GlassyButton';

export default function CartPage() {
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [vendorNotes, setVendorNotes] = useState<Record<string, string>>({});

  // Group items by vendor
  const vendorGroups = useMemo(() => {
    const groups: Record<string, { vendor: Vendor; items: CartItemType[] }> = {};
    
    cartItems.forEach(item => {
      const vendorId = item.product.vendor.id;
      if (!groups[vendorId]) {
        groups[vendorId] = {
          vendor: item.product.vendor,
          items: []
        };
      }
      groups[vendorId].items.push(item);
    });
    
    return Object.values(groups);
  }, [cartItems]);

  // Calculate totals for each vendor group
  const vendorTotals = useMemo(() => {
    const totals: Record<string, { subtotal: number; deliveryFee: number; total: number }> = {};
    
    vendorGroups.forEach(group => {
      const subtotal = group.items.reduce((sum, item) => {
        const discountedPrice = item.product.originalPrice 
          ? item.product.originalPrice - (item.product.originalPrice * (item.product.discount || 0) / 100)
          : item.product.price;
        return sum + (discountedPrice * item.quantity);
      }, 0);
      
      const deliveryFee = subtotal >= 500 ? 0 : group.vendor.deliveryFee;
      const total = subtotal + deliveryFee;
      
      totals[group.vendor.id] = { subtotal, deliveryFee, total };
    });
    
    return totals;
  }, [vendorGroups]);

  // Calculate overall totals
  const overallSubtotal = useMemo(() => {
    return Object.values(vendorTotals).reduce((sum, vendor) => sum + vendor.subtotal, 0);
  }, [vendorTotals]);

  const overallDeliveryFee = useMemo(() => {
    return Object.values(vendorTotals).reduce((sum, vendor) => sum + vendor.deliveryFee, 0);
  }, [vendorTotals]);

  const discount = 0; // In a real app, this would be calculated based on coupon code
  const overallTotal = overallSubtotal + overallDeliveryFee - discount;

  const handleApplyCoupon = () => {
    // In a real app, this would validate and apply the coupon
    console.log('Applying coupon:', couponCode);
  };

  const handleNoteChange = (vendorId: string, note: string) => {
    setVendorNotes(prev => ({ ...prev, [vendorId]: note }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Your cart is empty"
          description="Start adding some products to your cart"
          actionText="Continue Shopping"
          actionHref="/shop"
          icon={<ShoppingCart className="h-12 w-12 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Shopping Cart
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold">
              {getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'} from {vendorGroups.length} {vendorGroups.length === 1 ? 'Vendor' : 'Vendors'}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear Cart
            </motion.button>
          </motion.div>
          
          {/* Vendor Groups */}
          <div>
            {vendorGroups.map((group, index) => (
              <VendorCartGroup
                key={group.vendor.id}
                vendor={group.vendor}
                items={group.items}
                onNoteChange={handleNoteChange}
                note={vendorNotes[group.vendor.id] || ''}
              />
            ))}
          </div>
          
          {/* Coupon Code */}
          <motion.div 
            className="card mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-medium mb-3 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-primary-600" />
              Coupon Code
            </h3>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="input-field flex-1 rounded-r-none"
              />
              <Button 
                onClick={handleApplyCoupon}
                className="rounded-l-none"
              >
                Apply
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Order Summary */}
        <div>
          <motion.div 
            className="card sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {vendorGroups.map(group => {
                const vendorTotal = vendorTotals[group.vendor.id];
                return (
                  <div key={group.vendor.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{group.vendor.name}</span>
                      <span>₹{vendorTotal.subtotal.toFixed(2)}</span>
                    </div>
                    {vendorTotal.deliveryFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Delivery Fee</span>
                        <span>₹{vendorTotal.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium mt-1">
                      <span>Total</span>
                      <span>₹{vendorTotal.total.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
              
              <div className="flex justify-between text-sm pt-4">
                <span>Subtotal</span>
                <span>₹{overallSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Delivery Fees</span>
                <span>₹{overallDeliveryFee.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span className="text-lg">₹{overallTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <GlassyButton className="w-full mt-6">
                <Link href="/shop/checkout" className="block w-full">
                  Proceed to Checkout
                </Link>
              </GlassyButton>
              
              <div className="mt-4 text-center">
                <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Benefits */}
          <motion.div 
            className="mt-6 grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card p-4 text-center">
              <div className="flex justify-center">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium mt-2">Free Delivery</h3>
              <p className="text-sm text-gray-600 mt-1">
                On orders over ₹500 per vendor
              </p>
            </div>
            
            <div className="card p-4 text-center">
              <div className="flex justify-center">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium mt-2">Secure Payment</h3>
              <p className="text-sm text-gray-600 mt-1">
                100% secure payment
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}