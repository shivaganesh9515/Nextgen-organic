'use client';

import Link from 'next/link';
import { Order, OrderStatus } from '../../lib/types';
import { Badge } from '../ui/Badge';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'out_for_delivery':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'processing':
        return 'Processing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  // Get unique vendors from order items
  const vendors = Array.from(
    new Set(order.items.map(item => item.product.vendor.name))
  );

  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Order #{order.id.substring(0, 8)}
            </h3>
            <Badge variant={getStatusVariant(order.status)} className="ml-3">
              {getStatusText(order.status)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <p className="text-lg font-semibold text-gray-900">
          ₹{order.total.toFixed(2)}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>{order.items.length} items</span>
          <span className="mx-2">•</span>
          <span>{vendors.join(', ')}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <Link
          href={`/account/orders/${order.id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View Details
        </Link>
        {order.status === 'delivered' && (
          <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
            Reorder
          </button>
        )}
      </div>
    </div>
  );
};