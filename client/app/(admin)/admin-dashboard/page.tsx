'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "12,234",
      description: "+180.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "1,234",
      description: "+19% from last month",
      icon: Package,
    },
    {
      title: "Vendors",
      value: "56",
      description: "+2% from last month",
      icon: Users,
    },
  ];

  // Mock data for system health
  const systemHealth = [
    {
      name: 'Database',
      status: 'operational',
      responseTime: '24ms',
    },
    {
      name: 'API Gateway',
      status: 'operational',
      responseTime: '42ms',
    },
    {
      name: 'Payment Processing',
      status: 'degraded',
      responseTime: '1.2s',
    },
    {
      name: 'Email Service',
      status: 'operational',
      responseTime: '156ms',
    },
  ];

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: '1',
      name: 'Organic Apples',
      type: 'Product',
      vendor: 'Fresh Farms',
      submitted: '2 hours ago',
    },
    {
      id: '2',
      name: 'Green Valley Organics',
      type: 'Vendor',
      vendor: 'New Registration',
      submitted: '5 hours ago',
    },
    {
      id: '3',
      name: 'Organic Milk',
      type: 'Product',
      vendor: 'Dairy Delight',
      submitted: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here{'\''}s what{'\''}s happening today.</p>
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

      {/* System Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Real-time status of platform services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {service.status === 'operational' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : service.status === 'degraded' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span>{service.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm ${
                      service.status === 'operational' ? 'text-green-600' : 
                      service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {service.status}
                    </span>
                    <p className="text-xs text-gray-500">{service.responseTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Advanced analytics dashboard would appear here</p>
                <p className="text-sm text-gray-400 mt-2">Integrated with Chart.js or Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>
              Products and vendors waiting for approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full mr-2">
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500">{item.vendor}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.submitted}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Pending Approvals
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from customers
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your platform quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Package className="h-6 w-6 mb-2" />
              <span>Manage Products</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Vendors</span>
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