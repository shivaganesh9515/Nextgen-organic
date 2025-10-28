import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CartItem, Vendor } from '../../lib/types';
import { FREE_DELIVERY_THRESHOLD } from '../../lib/constants';
import { VendorInfoBox } from '../vendors/VendorInfoBox';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
}) => {
  // Group items by vendor
  const vendorGroups = useMemo(() => {
    const groups: Record<string, { vendor: Vendor; items: CartItem[] }> = {};
    
    items.forEach(item => {
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
  }, [items]);

  // Calculate totals for each vendor group
  const vendorTotals = useMemo(() => {
    const totals: Record<string, { subtotal: number; deliveryFee: number; total: number }> = {};
    
    vendorGroups.forEach(group => {
      const groupSubtotal = group.items.reduce((sum, item) => {
        const discountedPrice = item.product.originalPrice 
          ? item.product.originalPrice - (item.product.originalPrice * (item.product.discount || 0) / 100)
          : item.product.price;
        return sum + (discountedPrice * item.quantity);
      }, 0);
      
      const groupDeliveryFee = groupSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : group.vendor.deliveryFee;
      const groupTotal = groupSubtotal + groupDeliveryFee;
      
      totals[group.vendor.id] = { subtotal: groupSubtotal, deliveryFee: groupDeliveryFee, total: groupTotal };
    });
    
    return totals;
  }, [vendorGroups]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-6">
        {/* Vendor Groups */}
        <div className="space-y-4">
          {vendorGroups.map((group) => {
            const vendorTotal = vendorTotals[group.vendor.id];
            return (
              <motion.div 
                key={group.vendor.id}
                className="border-b border-gray-200 pb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VendorInfoBox vendor={group.vendor} className="mb-3" />
                
                <div className="space-y-2 ml-2">
                  {group.items.map((item) => {
                    const product = item.product;
                    const discountedPrice = product.originalPrice 
                      ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
                      : product.price;
                    
                    return (
                      <div key={product.id} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <span className="text-gray-500 ml-2">x {item.quantity}</span>
                        </div>
                        <span>₹{(discountedPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{vendorTotal.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {vendorTotal.deliveryFee > 0 ? `₹${vendorTotal.deliveryFee.toFixed(2)}` : (
                        <span className="text-green-600">Free</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Vendor Total</span>
                    <span>₹{vendorTotal.total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Overall Summary */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Delivery Fees</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
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
              <span className="text-lg">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};