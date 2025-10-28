'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItem as CartItemType } from '../../lib/types';
import { Button } from '../ui/Button';
import { VendorInfoBox } from '../vendors/VendorInfoBox';

interface CartItemProps {
  item: CartItemType;
  showVendorInfo?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({ item, showVendorInfo = false }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(product.id);
    }, 300);
  };

  const discountedPrice = product.originalPrice 
    ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
    : product.price;

  return (
    <motion.div 
      className="flex py-6 border-b border-gray-200"
      initial={{ opacity: 1, height: "auto" }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        height: isRemoving ? 0 : "auto" 
      }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={product.image || '/images/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">₹{(discountedPrice * item.quantity).toFixed(2)}</p>
          </div>
          {showVendorInfo && (
            <div className="mt-2">
              <VendorInfoBox vendor={product.vendor} showDeliveryInfo={false} />
            </div>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {product.unit} {product.weight && `(${product.weight})`}
          </p>
        </div>

        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
              className="p-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-2 text-gray-700">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="font-medium text-primary-600 hover:text-primary-500 flex items-center"
            aria-label="Remove item"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};