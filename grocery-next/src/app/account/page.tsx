'use client';

import { useState, useEffect } from 'react';
import { User, MapPin, ShoppingBag, Heart, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { orders } from '../../lib/data/orders';
import { Order } from '../../lib/types';
import { OrderCard } from '../../components/account/OrderCard';
import { Button } from '../../components/ui/Button';

export default function AccountDashboard() {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setRecentOrders(orders.slice(0, 3));
  }, []);

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <Button variant="outline" className="ml-auto">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{user.orders?.length || 0}</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold">Addresses</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{user.addresses?.length || 0}</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold">Wishlist</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{user.wishlist?.length || 0}</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Bell className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Button variant="outline">View All Orders</Button>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to see your orders here
            </p>
            <div className="mt-6">
              <Button>Start Shopping</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}