'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Heart,
  MapPin,
  User,
  CreditCard
} from 'lucide-react';

export default function UserDashboard() {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      description: "Last 30 days",
      icon: ShoppingCart,
    },
    {
      title: "Wishlist Items",
      value: "12",
      description: "Saved for later",
      icon: Heart,
    },
    {
      title: "Saved Addresses",
      value: "3",
      description: "For faster checkout",
      icon: MapPin,
    },
    {
      title: "Loyalty Points",
      value: "450",
      description: "Redeem for discounts",
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-gray-500">Welcome back! Here{`'`}s your account overview.</p>
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
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your latest purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12345</p>
                  <p className="text-sm text-gray-500">Nov 1, 2025 - $124.99</p>
                </div>
                <span className="text-sm text-green-600">Delivered</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12344</p>
                  <p className="text-sm text-gray-500">Oct 28, 2025 - $89.50</p>
                </div>
                <span className="text-sm text-yellow-600">Shipped</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">Order #12343</p>
                  <p className="text-sm text-gray-500">Oct 25, 2025 - $210.75</p>
                </div>
                <span className="text-sm text-blue-600">Processing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>
              Your delivery addresses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-gray-500">
                    123 Main St, Apt 4B<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Work</p>
                  <p className="text-sm text-gray-500">
                    456 Business Ave, Suite 100<br />
                    New York, NY 10002
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <User className="h-6 w-6 mb-2" />
              <span>Profile</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Heart className="h-6 w-6 mb-2" />
              <span>Wishlist</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <MapPin className="h-6 w-6 mb-2" />
              <span>Addresses</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Payment Methods</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}