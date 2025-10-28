'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Package, Truck } from 'lucide-react';
import { CartItem as CartItemType, Vendor } from '../../lib/types';
import { CartItem } from './CartItem';
import GlassyButton from '../ui/GlassyButton';
import { StatusPill } from '../ui/StatusPill';

interface VendorCartGroupProps {
  vendor: Vendor;
  items: CartItemType[];
  onNoteChange: (vendorId: string, note: string) => void;
  note: string;
}

export const VendorCartGroup: React.FC<VendorCartGroupProps> = ({ 
  vendor, 
  items, 
  onNoteChange,
  note
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localNote, setLocalNote] = useState(note);

  const subtotal = items.reduce((sum, item) => {
    const discountedPrice = item.product.originalPrice 
      ? item.product.originalPrice - (item.product.originalPrice * (item.product.discount || 0) / 100)
      : item.product.price;
    return sum + (discountedPrice * item.quantity);
  }, 0);

  const handleNoteChange = (value: string) => {
    setLocalNote(value);
    onNoteChange(vendor.id, value);
  };

  return (
    <motion.div 
      className="card mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Vendor Header */}
      <motion.div 
        className="flex items-center justify-between cursor-pointer p-4 -m-6 mb-6 border-b border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={vendor.logo || '/images/placeholder-logo.jpg'}
              alt={vendor.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Truck className="h-4 w-4 mr-1" />
              <span>{vendor.deliveryTime}</span>
              <span className="mx-2">•</span>
              <span>Min ₹{vendor.minOrder}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</div>
            <div className="text-sm text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'}</div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {/* Items */}
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} showVendorInfo={false} />
          ))}
        </div>

        {/* Vendor Note */}
        <div className="mt-6">
          <label htmlFor={`vendor-note-${vendor.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Note for {vendor.name}
          </label>
          <textarea
            id={`vendor-note-${vendor.id}`}
            rows={2}
            className="input-field w-full"
            placeholder="Any special instructions for this vendor?"
            value={localNote}
            onChange={(e) => handleNoteChange(e.target.value)}
          />
        </div>

        {/* Vendor Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <Package className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">Delivery Fee</div>
              <div className="text-sm text-gray-500">₹{vendor.deliveryFee}</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <Truck className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">Delivery Time</div>
              <div className="text-sm text-gray-500">{vendor.deliveryTime}</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="mr-2">
              <StatusPill status={`Min ₹${vendor.minOrder}`} variant="warning" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Minimum Order</div>
              <div className="text-sm text-gray-500">₹{vendor.minOrder}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};