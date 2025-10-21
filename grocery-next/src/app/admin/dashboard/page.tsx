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
  Eye,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import GlassyButton from '../../../components/ui/GlassyButton';
import { SectionHeader } from '../../../components/ui/SectionHeader';

// Mock data for admin dashboard
const adminStats = {
  totalVendors: 245,
  activeVendors: 198,
  pendingVendors: 12,
  totalProducts: 5420,
  totalOrders: 12540,
  ordersToday: 342,
  totalRevenue: 2345000,
  revenueToday: 87500
};

const recentVendors = [
  {
    id: 'V-001',
    name: 'Green Valley Farms',
    email: 'greenvalley@example.com',
    products: 45,
    revenue: 123456,
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: 'V-002',
    name: 'Organic Dairy Co.',
    email: 'organicdairy@example.com',
    products: 23,
    revenue: 87654,
    status: 'active',
    joinDate: '2024-02-20'
  },
  {
    id: 'V-003',
    name: 'Fresh Organics',
    email: 'freshorg@example.com',
    products: 67,
    revenue: 234567,
    status: 'pending',
    joinDate: '2024-03-10'
  },
  {
    id: 'V-004',
    name: 'Natural Spices',
    email: 'naturalspices@example.com',
    products: 34,
    revenue: 98765,
    status: 'active',
    joinDate: '2024-04-05'
  }
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    vendor: 'Green Valley Farms',
    items: 3,
    total: 1250,
    status: 'completed',
    date: '2024-05-15'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    vendor: 'Organic Dairy Co.',
    items: 5,
    total: 2100,
    status: 'pending',
    date: '2024-05-15'
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    vendor: 'Fresh Organics',
    items: 2,
    total: 850,
    status: 'processing',
    date: '2024-05-14'
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    vendor: 'Natural Spices',
    items: 4,
    total: 1675,
    status: 'shipped',
    date: '2024-05-14'
  }
];

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('month');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'suspended':
        return 'Suspended';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Admin Dashboard" 
        subtitle="Manage and monitor all vendors and platform activity."
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
              <p className="text-sm font-medium text-gray-500">Total Vendors</p>
              <h3 className="text-2xl font-bold mt-1">{adminStats.totalVendors}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
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
              <p className="text-sm font-medium text-gray-500">Active Vendors</p>
              <h3 className="text-2xl font-bold mt-1">{adminStats.activeVendors}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-500">Pending Vendors</p>
              <h3 className="text-2xl font-bold mt-1">{adminStats.pendingVendors}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
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
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{adminStats.totalRevenue.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-green-600 mt-1">Today: ₹{adminStats.revenueToday.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Analytics */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Platform Analytics</h3>
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
              <p className="text-gray-500">Analytics chart visualization</p>
              <p className="text-sm text-gray-400 mt-1">Platform performance this {timeRange}</p>
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
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer} • {order.vendor}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.items} items</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vendor Management */}
      <motion.div
        className="card mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Vendor Management</h3>
          <Button variant="outline" size="sm">
            View All Vendors
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Vendor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Products</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentVendors.map((vendor) => (
                <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-500">Joined {vendor.joinDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{vendor.email}</td>
                  <td className="py-4 px-4">{vendor.products}</td>
                  <td className="py-4 px-4">₹{vendor.revenue.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(vendor.status)}
                      <span>{getStatusText(vendor.status)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <Users className="h-8 w-8 mb-2" />
          <span className="font-medium">Manage Vendors</span>
        </GlassyButton>
        
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <Package className="h-8 w-8 mb-2" />
          <span className="font-medium">Product Moderation</span>
        </GlassyButton>
        
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <ShoppingBag className="h-8 w-8 mb-2" />
          <span className="font-medium">Order Oversight</span>
        </GlassyButton>
        
        <GlassyButton className="flex flex-col items-center justify-center p-6">
          <TrendingUp className="h-8 w-8 mb-2" />
          <span className="font-medium">Platform Analytics</span>
        </GlassyButton>
      </motion.div>
    </div>
  );
}