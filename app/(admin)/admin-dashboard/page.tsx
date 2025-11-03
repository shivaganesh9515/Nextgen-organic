'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here{`'`}s what{`'`}s happening today.</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Organic Apples</p>
                  <p className="text-sm text-gray-500">Vendor: Fresh Farms</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Green Valley Organics</p>
                  <p className="text-sm text-gray-500">New vendor registration</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
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