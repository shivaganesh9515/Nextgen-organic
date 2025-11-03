'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Heart,
  MapPin,
  User,
  CreditCard,
  Star,
  Calendar,
  Gift,
  Trophy,
  Target
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
      icon: Gift,
    },
  ];

  // Mock data for subscriptions
  const subscriptions = [
    {
      id: '1',
      name: 'Weekly Vegetable Box',
      frequency: 'Weekly',
      nextDelivery: 'Nov 15, 2025',
      status: 'Active',
      price: '₹299',
    },
    {
      id: '2',
      name: 'Monthly Fruit Basket',
      frequency: 'Monthly',
      nextDelivery: 'Dec 1, 2025',
      status: 'Active',
      price: '₹349',
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: '1',
      title: 'Order #12345 Delivered',
      description: 'Your organic vegetable box has been delivered',
      time: '2 hours ago',
      icon: ShoppingCart,
    },
    {
      id: '2',
      title: 'New Product Review',
      description: 'You earned 50 points for reviewing Organic Tomatoes',
      time: '1 day ago',
      icon: Star,
    },
    {
      id: '3',
      title: 'Subscription Renewal',
      description: 'Your Weekly Vegetable Box subscription has been renewed',
      time: '3 days ago',
      icon: Calendar,
    },
  ];

  // Mock loyalty data
  const loyaltyPoints = 450;
  const nextTierPoints = 1000;
  const progressPercentage = (loyaltyPoints / nextTierPoints) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-gray-500">Welcome back! Here{'\''}s your account overview.</p>
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

      {/* Loyalty Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Loyalty Program
          </CardTitle>
          <CardDescription>
            Earn points and unlock exclusive benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900">Sprout Tier</h3>
              <p className="text-gray-600">Next: Sapling Tier (500 pts)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{loyaltyPoints}</div>
              <p className="text-gray-600">Points</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>0 pts</span>
              <span>1000 pts</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Earn {nextTierPoints - loyaltyPoints} more points</span>
            <span>
              <Button variant="link" className="p-0 h-auto text-green-600">
                View Benefits
              </Button>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            My Subscriptions
          </CardTitle>
          <CardDescription>
            Manage your recurring orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{subscription.name}</p>
                  <p className="text-sm text-gray-500">
                    {subscription.frequency} • Next: {subscription.nextDelivery}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{subscription.price}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {subscription.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Create New Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest account activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-green-100 p-2 rounded-full">
                      <activity.icon className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
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