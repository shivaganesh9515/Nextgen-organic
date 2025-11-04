import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity, Calendar, Filter, Download, Eye, Heart, Star, Zap, Award, Target, Leaf, Clock, ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';

export default function PremiumDashboard() {
  const [dashboardType, setDashboardType] = useState('user');
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, [dashboardType]);

  // ============ MOCK DATA ============
  const salesData = [
    { date: 'Jan 1', sales: 4000, revenue: 2400, orders: 24, users: 240 },
    { date: 'Jan 5', sales: 3000, revenue: 1398, orders: 22, users: 221 },
    { date: 'Jan 10', sales: 2000, revenue: 9800, orders: 29, users: 229 },
    { date: 'Jan 15', sales: 2780, revenue: 3908, orders: 20, users: 200 },
    { date: 'Jan 20', sales: 1890, revenue: 4800, orders: 21, users: 229 },
    { date: 'Jan 25', sales: 2390, revenue: 3800, orders: 25, users: 200 },
    { date: 'Jan 30', sales: 3490, revenue: 4300, orders: 21, users: 300 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 400, color: '#10b981' },
    { name: 'Fruits', value: 300, color: '#7cb342' },
    { name: 'Dairy', value: 200, color: '#f59e0b' },
    { name: 'Bakery', value: 278, color: '#8b5cf6' },
    { name: 'Others', value: 189, color: '#06b6d4' },
  ];

  const topProducts = [
    { name: 'Organic Apples', sales: 1200, revenue: 4800, growth: 12, emoji: '🍎' },
    { name: 'Fresh Spinach', sales: 980, revenue: 3920, growth: 8, emoji: '🥬' },
    { name: 'Whole Grain Bread', sales: 850, revenue: 2550, growth: -3, emoji: '🍞' },
    { name: 'Dairy Milk', sales: 750, revenue: 2250, growth: 15, emoji: '🥛' },
    { name: 'Organic Carrots', sales: 680, revenue: 2040, growth: 5, emoji: '🥕' },
  ];

  const userActivities = [
    { id: 1, user: 'John Doe', action: 'Placed order', amount: '₹450', time: '2 mins ago', icon: ShoppingCart },
    { id: 2, user: 'Sarah Smith', action: 'Wishlist added', amount: '3 items', time: '15 mins ago', icon: Heart },
    { id: 3, user: 'Mike Johnson', action: 'Left review', amount: '⭐⭐⭐⭐⭐', time: '28 mins ago', icon: Star },
    { id: 4, user: 'Emma Wilson', action: 'Subscription', amount: '₹2999/mo', time: '1 hour ago', icon: Zap },
    { id: 5, user: 'Alex Brown', action: 'Referral bonus', amount: '₹100', time: '2 hours ago', icon: Award },
  ];

  const vendorStats = [
    { name: 'Fresh Farms', orders: 450, revenue: 45000, rating: 4.8, products: 120, growth: 25, emoji: '👨‍🌾' },
    { name: 'Bakery Delight', orders: 380, revenue: 28500, rating: 4.6, products: 85, growth: 12, emoji: '🧑‍🍳' },
    { name: 'Dairy Fresh', orders: 290, revenue: 20300, rating: 4.7, products: 45, growth: 18, emoji: '🥛' },
  ];

  // ============ REUSABLE METRIC CARD ============
  const MetricCard = ({ title, value, change, icon: Icon, color, delay }: { title: string; value: string; change: string; icon: React.ElementType; color: string; delay: number }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-green-100 ${
        animateCards ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : ''
      }`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          <p className="text-xs text-green-600 font-semibold mt-2">{change}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg text-white`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  // ============ USER DASHBOARD ============
  const UserDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Welcome back, Sarah! 👋</h2>
            <p className="text-green-100">You{`'`}re doing great! Here{`'`}s your activity summary for this month.</p>
          </div>
          <div className="text-6xl">🌿</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Spent', value: '₹12,450', change: '+12%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
          { title: 'Orders', value: '24', change: '+5 this month', icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
          { title: 'Wishlist Items', value: '18', change: '+3 new', icon: Heart, color: 'from-pink-500 to-rose-500' },
          { title: 'Loyalty Points', value: '2,450', change: '+350 earned', icon: Star, color: 'from-amber-500 to-orange-500' },
        ].map((metric, idx) => (
          <MetricCard key={idx} {...metric} delay={idx} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Spending Trend</h3>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
            <select className="px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" aria-label="Select time range">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Purchases</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }}></span>
                  {cat.name}
                </span>
                <span className="font-semibold text-gray-900">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Favorites */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Favorites</h3>
          <div className="space-y-4">
            {topProducts.slice(0, 4).map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all cursor-pointer hover:-translate-x-1">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{product.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{product.revenue}</p>
                  <p className={`text-sm font-semibold ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {userActivities.map((activity, idx) => {
              const IconComponent = activity.icon;
              return (
                <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all cursor-pointer">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg text-white">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ============ VENDOR DASHBOARD ============
  const VendorDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Your Store Performance 📊</h2>
            <p className="text-amber-100">You{`'`}re crushing it! Keep up the amazing work.</p>
          </div>
          <div className="text-6xl">🏪</div>
        </div>
      </div>

      {/* Store Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { title: 'Total Revenue', value: '₹125,450', change: '+18%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
          { title: 'Orders', value: '1,250', change: '+120 today', icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
          { title: 'Customers', value: '456', change: '+45 new', icon: Users, color: 'from-purple-500 to-pink-500' },
          { title: 'Products', value: '245', change: '+8 new', icon: Activity, color: 'from-red-500 to-orange-500' },
          { title: 'Rating', value: '4.8', change: '⭐⭐⭐⭐⭐', icon: Star, color: 'from-yellow-500 to-amber-500' },
        ].map((metric, idx) => (
          <VendorMetricCard key={idx} {...metric} delay={idx} />
        ))}
      </div>

      {/* Sales & Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f97316', borderRadius: '8px' }} />
              <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f97316', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Vendors to Beat */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Benchmark Against Top Vendors</h3>
        <div className="space-y-4">
          {vendorStats.map((vendor, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{vendor.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{vendor.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-600">Orders: <span className="font-semibold">{vendor.orders}</span></span>
                      <span className="text-xs text-gray-600">Rating: <span className="font-semibold">{vendor.rating}⭐</span></span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">₹{vendor.revenue}</p>
                  <p className="text-sm text-green-600 font-semibold">+{vendor.growth}% growth</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ VENDOR METRIC CARD ============
  const VendorMetricCard = ({ title, value, change, icon: Icon, color, delay }: { title: string; value: string; change: string; icon: React.ElementType; color: string; delay: number }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-amber-100 ${
        animateCards ? 'animate-in fade-in' : ''
      }`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-xs font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
          <p className="text-xs text-amber-600 font-semibold mt-2">{change}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg text-white`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  // ============ ADMIN DASHBOARD ============
  const AdminDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Platform Command Center 🎛️</h2>
            <p className="text-indigo-100">System running smoothly. All metrics optimal.</p>
          </div>
          <div className="text-6xl">⚙️</div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Platform Revenue', value: '₹1.2M', change: '+24%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
          { title: 'Total Users', value: '12,450', change: '+520 this week', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { title: 'Total Vendors', value: '456', change: '+18 new', icon: ShoppingCart, color: 'from-orange-500 to-amber-500' },
          { title: 'Daily Orders', value: '2,834', change: '+12% vs yesterday', icon: Activity, color: 'from-pink-500 to-rose-500' },
        ].map((metric, idx) => (
          <AdminMetricCard key={idx} {...metric} delay={idx} />
        ))}
      </div>

      {/* Comprehensive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #6366f1', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">All Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #6366f1', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Health</h3>
          <div className="space-y-4">
            {[
              { name: 'Server Response', value: 95, color: 'from-green-500 to-emerald-500' },
              { name: 'Database Health', value: 98, color: 'from-blue-500 to-cyan-500' },
              { name: 'API Uptime', value: 99.9, color: 'from-purple-500 to-pink-500' },
              { name: 'User Satisfaction', value: 92, color: 'from-orange-500 to-amber-500' },
            ].map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">{metric.name}</p>
                  <span className="text-sm font-bold text-indigo-600">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`bg-gradient-to-r ${metric.color} h-2 rounded-full`} style={{ width: `${metric.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Vendors Performance</h3>
          <div className="space-y-3">
            {vendorStats.map((vendor, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{vendor.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{vendor.name}</p>
                    <p className="text-xs text-gray-600">{vendor.products} products</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600 text-sm">₹{vendor.revenue}</p>
                  <p className="text-xs text-green-600">↑ {vendor.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============ ADMIN METRIC CARD ============
  const AdminMetricCard = ({ title, value, change, icon: Icon, color, delay }: { title: string; value: string; change: string; icon: React.ElementType; color: string; delay: number }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-indigo-100 ${
        animateCards ? 'animate-in fade-in' : ''
      }`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          <p className="text-xs text-indigo-600 font-semibold mt-2">{change}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg text-white`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                🌿
              </div>
              <h1 className="text-2xl font-bold text-gray-900">DailyPick Analytics</h1>
            </div>

            {/* Dashboard Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              {[
                { id: 'user', label: 'Customer', icon: '👤' },
                { id: 'vendor', label: 'Vendor', icon: '🏪' },
                { id: 'admin', label: 'Admin', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDashboardType(tab.id)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    dashboardType === tab.id
                      ? 'bg-white text-green-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {dashboardType === 'user' && <UserDashboard />}
        {dashboardType === 'vendor' && <VendorDashboard />}
        {dashboardType === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
}