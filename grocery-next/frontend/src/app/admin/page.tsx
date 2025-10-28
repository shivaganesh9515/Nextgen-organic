'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import GlassyButton from '../../components/ui/GlassyButton';
import { StatusPill } from '../../components/ui/StatusPill';
import { AnimatedTagPill } from '../../components/ui/AnimatedTagPill';
import { SectionHeader } from '../../components/ui/SectionHeader';

// Mock data for the admin dashboard
const mockVendors = [
  { id: 'v1', name: 'Fresh Mart', email: 'info@freshmart.com', status: 'pending', products: 42, joined: '2025-10-15' },
  { id: 'v2', name: "Baker's Delight", email: 'info@bakersdelight.com', status: 'approved', products: 28, joined: '2025-10-10' },
  { id: 'v3', name: 'Dairy Fresh', email: 'info@dairyfresh.com', status: 'approved', products: 15, joined: '2025-10-05' },
  { id: 'v4', name: 'Organic Greens', email: 'info@organicgreens.com', status: 'pending', products: 0, joined: '2025-10-18' },
];

const mockProducts = [
  { id: 'p1', name: 'Organic Bananas', vendor: 'Fresh Mart', status: 'pending', price: 40 },
  { id: 'p2', name: 'Whole Wheat Bread', vendor: "Baker's Delight", status: 'approved', price: 45 },
  { id: 'p3', name: 'Farm Fresh Milk', vendor: 'Dairy Fresh', status: 'approved', price: 28 },
  { id: 'p4', name: 'Organic Tomatoes', vendor: 'Fresh Mart', status: 'flagged', price: 30 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats data
  const stats = [
    { title: 'Total Vendors', value: '142', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Pending Vendors', value: '8', change: '-3%', icon: AlertCircle, color: 'bg-yellow-500' },
    { title: 'Total Products', value: '2,847', change: '+8%', icon: Package, color: 'bg-green-500' },
    { title: 'Flagged Products', value: '3', change: '-1', icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage vendors, products, and marketplace operations</p>
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
                5
              </AnimatedTagPill>
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
                <p className="text-sm text-green-600 mt-1">{stat.change} from last week</p>
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
          {['overview', 'vendors', 'products', 'payouts', 'disputes'].map((tab) => (
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Pending Vendor Applications */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Pending Vendor Applications</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {mockVendors.filter(v => v.status === 'pending').map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-gray-500">{vendor.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied on {vendor.joined}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-100 text-green-600 rounded-full"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-red-100 text-red-600 rounded-full"
                    >
                      <XCircle className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Flagged Products */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Flagged Products</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {mockProducts.filter(p => p.status === 'flagged').map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.vendor}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">₹{product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-100 text-green-600 rounded-full"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-red-100 text-red-600 rounded-full"
                    >
                      <XCircle className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Vendors Tab */}
      {activeTab === 'vendors' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">Vendor Management</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="input-field pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn-outline flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockVendors.map((vendor) => (
                    <motion.tr 
                      key={vendor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{vendor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.products}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusPill 
                          status={vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)} 
                          variant={
                            vendor.status === 'pending' ? 'warning' : 
                            vendor.status === 'approved' ? 'success' : 'danger'
                          }
                          pulse={vendor.status === 'pending'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.joined}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          View
                        </button>
                        {vendor.status === 'pending' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </motion.button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">Product Moderation</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn-outline flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
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
                  {mockProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusPill 
                          status={product.status.charAt(0).toUpperCase() + product.status.slice(1)} 
                          variant={
                            product.status === 'pending' ? 'warning' : 
                            product.status === 'approved' ? 'success' : 'danger'
                          }
                          pulse={product.status === 'pending'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          View
                        </button>
                        {product.status !== 'approved' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-red-600 hover:text-red-900"
                            >
                              {product.status === 'flagged' ? 'Remove' : 'Reject'}
                            </motion.button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SectionHeader 
            title="Payout Management" 
            subtitle="Track and manage vendor payouts and earnings"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card">
              <h3 className="font-semibold text-lg mb-4">Recent Payouts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
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
                    {[
                      { id: 'pay1', vendor: 'Fresh Mart', amount: 12500, date: '2025-10-15', status: 'completed' },
                      { id: 'pay2', vendor: "Baker's Delight", amount: 8900, date: '2025-10-15', status: 'completed' },
                      { id: 'pay3', vendor: 'Dairy Fresh', amount: 15600, date: '2025-10-15', status: 'pending' },
                    ].map((payout) => (
                      <motion.tr 
                        key={payout.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payout.vendor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{payout.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusPill 
                            status={payout.status.charAt(0).toUpperCase() + payout.status.slice(1)} 
                            variant={
                              payout.status === 'completed' ? 'success' : 'warning'
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-900">
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Payout Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Payouts</span>
                    <span className="font-medium">₹37,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Payouts</span>
                    <span className="font-medium">₹15,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-medium">₹24,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-medium">₹3,700</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-semibold">
                    <span>Net Earnings</span>
                    <span className="text-green-600">₹24,500</span>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-lg mb-4">Request Payout</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vendorSelect" className="block text-sm font-medium text-gray-700 mb-1">
                      Vendor
                    </label>
                    <select id="vendorSelect" className="input-field w-full">
                      <option>Select vendor</option>
                      <option>Fresh Mart</option>
                      <option>Baker&apos;s Delight</option>
                      <option>Dairy Fresh</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="amountInput" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amountInput"
                      className="input-field w-full"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <GlassyButton className="w-full">
                    Process Payout
                  </GlassyButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SectionHeader 
            title="Dispute Management" 
            subtitle="Resolve customer and vendor disputes"
          />
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dispute ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parties
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'disp1', type: 'Order', customer: 'John Doe', vendor: 'Fresh Mart', status: 'open', date: '2025-10-18' },
                    { id: 'disp2', type: 'Product', customer: 'Jane Smith', vendor: "Baker's Delight", status: 'resolved', date: '2025-10-17' },
                    { id: 'disp3', type: 'Payment', customer: 'Robert Johnson', vendor: 'Dairy Fresh', status: 'in-progress', date: '2025-10-16' },
                  ].map((dispute) => (
                    <motion.tr 
                      key={dispute.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">#{dispute.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{dispute.customer}</div>
                        <div className="text-gray-400">{dispute.vendor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusPill 
                          status={dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)} 
                          variant={
                            dispute.status === 'open' ? 'danger' : 
                            dispute.status === 'in-progress' ? 'warning' : 'success'
                          }
                          pulse={dispute.status === 'open'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900">
                          View Details
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
    </div>
  );
}