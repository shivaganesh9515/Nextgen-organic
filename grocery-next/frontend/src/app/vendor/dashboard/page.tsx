'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import GlassyButton from '../../../components/ui/GlassyButton';
import { SectionHeader } from '../../../components/ui/SectionHeader';

// Mock data for vendor dashboard
const vendorStats = {
  totalRevenue: 45231.89,
  revenueChange: 20.1,
  activeProducts: 234,
  newProducts: 15,
  totalOrders: 1234,
  ordersToday: 45,
  pendingOrders: 12,
  completedOrders: 1178
};

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    items: 3,
    total: 1250,
    status: 'completed',
    date: '2024-05-15'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    items: 5,
    total: 2100,
    status: 'pending',
    date: '2024-05-15'
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    items: 2,
    total: 850,
    status: 'processing',
    date: '2024-05-14'
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    items: 4,
    total: 1675,
    status: 'shipped',
    date: '2024-05-14'
  }
];

const topProducts = [
  {
    id: '1',
    name: 'Organic Red Apples',
    sales: 124,
    revenue: 14880
  },
  {
    id: '2',
    name: 'Organic Brown Rice',
    sales: 98,
    revenue: 8330
  },
  {
    id: '3',
    name: 'Organic Ghee',
    sales: 76,
    revenue: 34200
  }
];

export default function VendorDashboardPage() {
  const [timeRange, setTimeRange] = useState('month');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Vendor Dashboard" 
        subtitle="Welcome back! Here's your store overview."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{vendorStats.totalRevenue.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-green-600 mt-1">+{vendorStats.revenueChange}% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Products</p>
              <h3 className="text-2xl font-bold mt-1">{vendorStats.activeProducts}</h3>
              <p className="text-xs text-green-600 mt-1">+{vendorStats.newProducts} new this week</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{vendorStats.totalOrders}</h3>
              <p className="text-xs text-green-600 mt-1">+{vendorStats.ordersToday} today</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold mt-1">{vendorStats.pendingOrders}</h3>
              <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Sales Overview</h3>
            <div className="flex gap-2">
              <Button 
                variant={timeRange === 'week' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('week')}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
              <Button 
                variant={timeRange === 'year' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('year')}
              >
                Year
              </Button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Sales chart visualization</p>
              <p className="text-sm text-gray-400 mt-1">Your sales performance this {timeRange}</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{order.id}</span>
                    {getStatusIcon(order.status)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer} • {order.items} items</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500 mt-1">{getStatusText(order.status)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        className="card mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Top Selling Products</h3>
          <Button variant="outline" size="sm">
            View All Products
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{product.sales} sales</p>
                <p className="text-sm font-medium mt-1">₹{product.revenue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <Package className="h-8 w-8 mb-2" />
          <span className="font-medium">Add Product</span>
        </GlassyButton>
        
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <ShoppingBag className="h-8 w-8 mb-2" />
          <span className="font-medium">Manage Orders</span>
        </GlassyButton>
        
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <TrendingUp className="h-8 w-8 mb-2" />
          <span className="font-medium">View Analytics</span>
        </GlassyButton>
      </motion.div>
    </div>
  );
}
