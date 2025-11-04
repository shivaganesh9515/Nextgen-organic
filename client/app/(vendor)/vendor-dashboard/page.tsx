'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Plus,
  BarChart3,
  Users,
  Clock,
  Star
} from 'lucide-react';

export default function VendorDashboard() {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Sales",
      value: "$12,231.89",
      description: "+12.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "1,234",
      description: "+18.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "124",
      description: "+3% from last month",
      icon: Package,
    },
    {
      title: "Rating",
      value: "4.8/5",
      description: "+0.2 from last month",
      icon: Star,
    },
  ];

  // Mock data for sales chart
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 2000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
  ];

  // Mock data for top products
  const topProducts = [
    {
      id: '1',
      name: 'Organic Apples',
      sales: 120,
      revenue: 358.80,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      sales: 85,
      revenue: 296.65,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Free Range Eggs',
      sales: 150,
      revenue: 748.50,
      rating: 4.9,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here{'\''}s your store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Your sales performance over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Sales chart visualization would appear here</p>
                <p className="text-sm text-gray-400 mt-2">Integrated with Chart.js or Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
            <CardDescription>
              Key metrics about your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Repeat Customers</span>
                </div>
                <span className="font-bold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <span>Avg. Order Value</span>
                </div>
                <span className="font-bold">$42.50</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Product Rating</span>
                </div>
                <span className="font-bold">4.8/5</span>
              </div>
              <div className="pt-4">
                <h4 className="font-medium mb-2">Top Customer Segments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Health Conscious</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Family Shoppers</span>
                    <span>28%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Eco-Friendly</span>
                    <span>22%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders for your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12345</p>
                  <p className="text-sm text-gray-500">John Doe - $124.99</p>
                </div>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12344</p>
                  <p className="text-sm text-gray-500">Jane Smith - $89.50</p>
                </div>
                <span className="text-sm text-yellow-600">Processing</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12343</p>
                  <p className="text-sm text-gray-500">Bob Johnson - $210.75</p>
                </div>
                <span className="text-sm text-red-600">Cancelled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Your best performing products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                      <span className="text-sm text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-500">{product.sales} sold</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{product.sales} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your store quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-24 flex flex-col items-center justify-center">
              <Plus className="h-6 w-6 mb-2" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Package className="h-6 w-6 mb-2" />
              <span>Manage Products</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span>View Orders</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}