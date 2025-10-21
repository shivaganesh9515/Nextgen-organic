'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Bell,
  Edit,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react';
import GlassyButton from '../../../components/ui/GlassyButton';
import { StatusPill } from '../../../components/ui/StatusPill';
import { AnimatedTagPill } from '../../../components/ui/AnimatedTagPill';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Avatar } from '../../../components/ui/Avatar';

// Mock data for the dashboard
const mockProducts = [
  { id: '1', name: 'Organic Bananas', price: 40, stock: 50, sales: 120 },
  { id: '2', name: 'Red Apples', price: 120, stock: 30, sales: 85 },
  { id: '3', name: 'Whole Wheat Bread', price: 45, stock: 20, sales: 67 },
  { id: '4', name: 'Farm Fresh Milk', price: 28, stock: 40, sales: 210 },
];

const mockOrders = [
  { id: '1001', customer: 'John Doe', total: 340, status: 'pending' },
  { id: '1002', customer: 'Jane Smith', total: 180, status: 'confirmed' },
  { id: '1003', customer: 'Robert Johnson', total: 250, status: 'shipped' },
  { id: '1004', customer: 'Emily Davis', total: 95, status: 'delivered' },
];

const mockEarnings = [
  { month: 'Jan', amount: 12500 },
  { month: 'Feb', amount: 18900 },
  { month: 'Mar', amount: 15600 },
  { month: 'Apr', amount: 21000 },
  { month: 'May', amount: 24500 },
  { month: 'Jun', amount: 19800 },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stats data
  const stats = [
    { 
      title: 'Total Products', 
      value: '142', 
      change: '+12%', 
      icon: Package, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Total Orders', 
      value: '1,248', 
      change: '+8%', 
      icon: ShoppingCart, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Total Earnings', 
      value: '₹24,560', 
      change: '+15%', 
      icon: DollarSign, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Avg. Rating', 
      value: '4.7', 
      change: '+0.2', 
      icon: TrendingUp, 
      color: 'bg-yellow-500' 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your store and track performance</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassyButton variant="secondary">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              <AnimatedTagPill variant="danger" className="ml-2">
                3
              </AnimatedTagPill>
            </GlassyButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassyButton>
              <Edit className="h-5 w-5 mr-2" />
              Add Product
            </GlassyButton>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'products', 'orders', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Recent Orders */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <StatusPill 
                          status={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                          variant={
                            order.status === 'pending' ? 'warning' : 
                            order.status === 'confirmed' ? 'info' : 
                            order.status === 'shipped' ? 'info' : 'success'
                          }
                          pulse={order.status === 'pending'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900">
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Top Selling Products</h2>
              <div className="space-y-4">
                {mockProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">₹{product.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.sales} sold</p>
                      <p className="text-sm text-gray-500">{product.stock} in stock</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Earnings Overview</h2>
              <div className="h-64 flex items-end space-x-2">
                {mockEarnings.map((data, index) => (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.amount / 30000) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex-1 bg-primary-500 rounded-t flex items-end justify-center pb-2"
                  >
                    <span className="text-xs text-white rotate-90 origin-center">
                      {data.month}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-900">₹1,24,560</p>
                <p className="text-sm text-gray-500">Total earnings this year</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Management</h2>
            <GlassyButton>
              <Edit className="h-5 w-5 mr-2" />
              Add New Product
            </GlassyButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-1">₹{product.price}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-gray-500">Stock: </span>
                    <span className="ml-1 font-medium">{product.stock}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">Sales: </span>
                    <span className="ml-1 font-medium">{product.sales}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 btn-primary text-sm py-2">
                      Edit
                    </button>
                    <button className="flex-1 btn-outline text-sm py-2">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6">Order Management</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        12 Oct 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <StatusPill 
                          status={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                          variant={
                            order.status === 'pending' ? 'warning' : 
                            order.status === 'confirmed' ? 'info' : 
                            order.status === 'shipped' ? 'info' : 'success'
                          }
                          pulse={order.status === 'pending'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <SectionHeader 
            title="Analytics Dashboard" 
            subtitle="Track your store performance and customer insights"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card">
              <h3 className="font-semibold text-lg mb-4">Sales Performance</h3>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Sales chart visualization</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Customer Insights</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Returning Customers</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg. Order Value</span>
                      <span className="text-sm font-medium">₹245</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Customer Satisfaction</span>
                      <span className="text-sm font-medium">4.7/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Top Referrers</h3>
                <div className="space-y-3">
                  {['Organic Search', 'Social Media', 'Direct', 'Email'].map((source, index) => (
                    <div key={source} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="ml-3 text-gray-700">{source}</span>
                      <span className="ml-auto text-gray-500 text-sm">{100 - (index * 20)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <SectionHeader 
            title="Store Settings" 
            subtitle="Manage your store information and preferences"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-4">Store Profile</h3>
                <div className="flex flex-col items-center">
                  <Avatar 
                    src="/images/vendors/fresh-mart-logo.jpg" 
                    size="xl" 
                    alt="Store Logo" 
                  />
                  <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Change Logo
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      className="input-field w-full"
                      defaultValue="Fresh Mart"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Description
                    </label>
                    <textarea
                      id="storeDescription"
                      rows={3}
                      className="input-field w-full"
                      defaultValue="Your local fresh produce store with the finest quality fruits and vegetables"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="input-field w-full"
                      defaultValue="info@freshmart.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="input-field w-full"
                      defaultValue="+91 98765 43210"
                    />
                  </div>
                  
                  <GlassyButton className="w-full mt-4">
                    Save Changes
                  </GlassyButton>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Store Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center">
                      <span className="w-24 text-gray-700">{day}</span>
                      <input
                        type="text"
                        aria-label={`${day} hours`}
                        className="input-field flex-1 ml-2"
                        defaultValue={day === 'Sunday' ? '9:00 AM - 9:00 PM' : '8:00 AM - 10:00 PM'}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Delivery Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="minOrder" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Value
                    </label>
                    <input
                      type="number"
                      id="minOrder"
                      className="input-field w-full"
                      defaultValue="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Fee
                    </label>
                    <input
                      type="number"
                      id="deliveryFee"
                      className="input-field w-full"
                      defaultValue="20"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="deliveryAreas" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Areas
                    </label>
                    <textarea
                      id="deliveryAreas"
                      rows={3}
                      className="input-field w-full"
                      defaultValue="Mumbai 400001, Mumbai 400002, Mumbai 400003"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}