'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order, OrderStatus } from '../../lib/types';
import { StatusPill } from '../ui/StatusPill';
import { VendorInfoBox } from '../vendors/VendorInfoBox';
import GlassyButton from '../ui/GlassyButton';

interface SplitOrderTrackerProps {
  orders: Order[];
}

export const SplitOrderTracker: React.FC<SplitOrderTrackerProps> = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Get status display info
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'Order Placed', icon: Clock, variant: 'warning' as const, pulse: true };
      case 'confirmed':
        return { label: 'Confirmed', icon: CheckCircle, variant: 'info' as const, pulse: false };
      case 'processing':
        return { label: 'Processing', icon: Package, variant: 'info' as const, pulse: true };
      case 'out_for_delivery':
        return { label: 'Out for Delivery', icon: Truck, variant: 'info' as const, pulse: true };
      case 'delivered':
        return { label: 'Delivered', icon: CheckCircle, variant: 'success' as const, pulse: false };
      case 'cancelled':
        return { label: 'Cancelled', icon: XCircle, variant: 'danger' as const, pulse: false };
      default:
        return { label: 'Unknown', icon: Clock, variant: 'default' as const, pulse: false };
    }
  };

  // Get progress percentage based on status
  const getProgressPercentage = (status: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered'];
    const index = statusOrder.indexOf(status);
    return index >= 0 ? ((index + 1) / statusOrder.length) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
      
      <div className="space-y-6">
        {orders.map((order, index) => {
          const statusInfo = getStatusInfo(order.status);
          const progress = getProgressPercentage(order.status);
          const isExpanded = expandedOrder === order.id;
          
          return (
            <motion.div
              key={order.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Order Header */}
              <div 
                className="flex items-center justify-between cursor-pointer p-4 -m-6 mb-6 border-b border-gray-200"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center">
                  <VendorInfoBox vendor={order.items[0].product.vendor} showDeliveryInfo={false} />
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">Order #{order.id}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • ₹{order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <StatusPill 
                    status={statusInfo.label} 
                    variant={statusInfo.variant} 
                    pulse={statusInfo.pulse}
                    className="mr-4"
                  />
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    {['pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered'].map((status) => {
                      const currentStatusInfo = getStatusInfo(status as OrderStatus);
                      const isCompleted = getProgressPercentage(status as OrderStatus) <= progress;
                      return (
                        <div key={status} className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <currentStatusInfo.icon className="h-3 w-3" />
                          </div>
                          <span className="text-xs mt-1 text-gray-500">
                            {currentStatusInfo.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Items in this order</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => {
                      const product = item.product;
                      const discountedPrice = product.originalPrice 
                        ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
                        : product.price;
                      
                      return (
                        <div key={product.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.image || '/images/placeholder-product.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.unit} {product.weight && `(${product.weight})`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">₹{(discountedPrice * item.quantity).toFixed(2)}</div>
                            <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Contact Seller */}
                <div className="flex justify-end">
                  <GlassyButton variant="secondary">
                    Contact Seller
                  </GlassyButton>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};