'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Order } from '../../../lib/types';
import { OrderCard } from '../../../components/account/OrderCard';
import { Pagination } from '../../../components/common/Pagination';
import { EmptyState } from '../../../components/common/EmptyState';
import { ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    // Since we don't have a mock orders file, we'll create empty array
    setOrders([]);
  }, []);

  // Pagination
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No orders yet"
          description="Your order history will appear here once you place an order"
          actionText="Start Shopping"
          actionHref="/shop"
          icon={<ShoppingBag className="h-12 w-12 text-gray-400" />}
        />
      )}
    </div>
  );
}