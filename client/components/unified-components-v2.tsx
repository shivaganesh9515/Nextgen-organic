/**
 * ============================================
 * NEXTGEN ORGANICS - UNIFIED COMPONENTS v2
 * Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
 * ✅ ENHANCED UI WITH NAVBAR & LOGIN
 * ✅ ROLE-BASED LOGIN SYSTEM
 * ✅ VENDOR ID CARDS & RECRUITMENT CTA
 * ============================================
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, User, Menu, X, Home, Store, Settings,
  BarChart3, LogOut, Heart, Bell, ChevronDown, ChevronRight,
  Star, MapPin, Phone, Mail, Sprout, CheckCircle, Users,
  ArrowRight, Package, Award, Clock, Calendar, Gift, Target,
  Truck, Shield, RotateCcw, Zap, Leaf, Eye, EyeOff, Lock,
  ShoppingBag, AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================
// TYPES & INTERFACES
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

interface Vendor {
  id: string;
  name: string;
  image: string;
  rating: number;
  specialties: string[];
  certifications: string[];
  city: string;
  email: string;
  phone: string;
  description: string;
  story: string;
  followers: number;
  responseTime: string;
  productCount: number;
  verified: boolean;
}

// ============================================
// ENHANCED NAVBAR - Multi-page Navigation
// ============================================

export const Navbar: React.FC<{
  user?: User | null;
  onLogout?: () => void;
}> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = user?.userType === 'admin';
  const isVendor = user?.userType === 'vendor';
  const isCustomer = user?.userType === 'customer';

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'Blog', href: '/blog' },
    { label: 'Why Organic?', href: '/why-organic' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Nextgen</span>
                <span className="text-xs text-green-600 font-semibold block">Organics</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                    pathname === link.href
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search (visible on larger screens) */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="bg-transparent border-0 ml-2 text-sm outline-none"
              />
            </div>

            {/* Notifications */}
            {user && (
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Notifications">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Wishlist */}
            {isCustomer && (
              <Link href="/wishlist">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Wishlist">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
              </Link>
            )}

            {/* Cart (Customer only) */}
            {isCustomer && (
              <Link href="/cart">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                  <ShoppingBag className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">
                      {user.userType.toUpperCase()}
                    </Badge>
                  </div>

                  {isCustomer && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {isVendor && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/products">My Products</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/vendor/analytics">Analytics</Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">Admin Panel</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/approvals">Approvals</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/analytics">Analytics</Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <Separator className="my-2" />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="block text-gray-700 hover:text-green-600 font-medium py-2">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ============================================
// VENDOR ID CARD PROFILE - Beautiful Showcase
// ============================================

export const VendorIDCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link href="/vendors" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Vendors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Vendor Image & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-xl border-0">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-white opacity-20" />
                </div>
              </div>

              <CardContent className="pt-6">
                {/* Verified Badge */}
                {vendor.verified && (
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Verified Vendor</span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{vendor.rating}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {vendor.productCount} Products
                  </Badge>
                </div>

                {/* Follow Button */}
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`w-full mb-4 ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isFollowing ? '✓ Following' : '+ Follow'}
                </Button>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <a href={`tel:${vendor.phone}`}>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </a>
                  <a href={`mailto:${vendor.email}`}>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </a>
                </div>

                {/* Followers Count */}
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-3xl font-bold text-gray-900">{vendor.followers}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Vendor Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>{vendor.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>Responds in {vendor.responseTime}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{vendor.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card className="border-0 shadow-lg">
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100 rounded-lg">
                  <TabsTrigger value="story">Our Story</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="specialties">Specialties</TabsTrigger>
                </TabsList>

                <TabsContent value="story" className="p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{vendor.story}</p>
                </TabsContent>

                <TabsContent value="certifications" className="p-6">
                  <div className="space-y-3">
                    {vendor.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 border border-green-200 rounded-lg bg-green-50">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{cert}</p>
                          <p className="text-sm text-gray-600">Verified & Valid</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="specialties" className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-700 px-3 py-2 text-sm">
                        🌱 {specialty}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Shop Now Button */}
            <Link href={`/vendor/${vendor.id}/products`}>
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Products from {vendor.name}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// VENDOR RECRUITMENT CTA - Homepage Section
// ============================================

export const VendorRecruitmentCTA: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            <Badge className="bg-white/20 text-white mb-4 text-base px-4 py-1">
              🌱 Join Our Community
            </Badge>
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Want to Become a Vendor?
            </h2>
            <p className="text-xl text-green-50 mb-8 leading-relaxed">
              Connect with thousands of health-conscious customers who are actively seeking premium organic products. Grow your business with Nextgen Organics.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                '✓ Reach 50,000+ customers across major cities',
                '✓ 18% competitive commission structure',
                '✓ Free marketing and promotion support',
                '✓ Easy product management dashboard',
                '✓ Fast vendor verification (24-48 hours)',
                '✓ Dedicated vendor support team'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg text-green-50">
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/vendor/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 font-bold h-14 px-8 text-lg">
                Start Selling Today <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {[
                  { icon: '📊', title: 'Real-time Analytics', desc: 'Track sales and customer insights' },
                  { icon: '📱', title: 'Easy Dashboard', desc: 'Manage everything from one place' },
                  { icon: '🔍', title: 'Premium Placement', desc: 'Get featured on our platform' },
                  { icon: '💰', title: 'Fast Payouts', desc: 'Weekly commission transfers' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-white">
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-green-50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ROLE-BASED LOGIN PAGES
// ============================================

export const LoginPageWithRoles: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'vendor' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Next<span className="text-green-600">Gen</span> Organics
            </h1>
            <p className="text-gray-600 text-lg">Welcome to the Organic Revolution</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: 'user' as const,
                title: 'Customer',
                icon: '🛒',
                desc: 'Browse and buy organic products',
                color: 'blue'
              },
              {
                role: 'vendor' as const,
                title: 'Vendor',
                icon: '🌱',
                desc: 'Sell your organic products',
                color: 'green'
              },
              {
                role: 'admin' as const,
                title: 'Admin',
                icon: '⚙️',
                desc: 'Manage the platform',
                color: 'purple'
              }
            ].map((item) => (
              <Card
                key={item.role}
                onClick={() => setSelectedRole(item.role)}
                className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                  item.color === 'blue' ? 'hover:border-blue-500 hover:bg-blue-50' :
                  item.color === 'green' ? 'hover:border-green-500 hover:bg-green-50' :
                  'hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                <CardContent className="pt-8 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                  <Button className={`w-full ${
                    item.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    item.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  }`}>
                    Login as {item.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Don't have account */}
          <p className="text-center mt-8 text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-green-600 hover:text-green-700 font-bold">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Import signIn from next-auth/react
      const { signIn } = await import('next-auth/react');
      
      // Attempt to sign in with credentials
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        // Redirect based on role
        const dashboards = {
          user: '/',
          vendor: '/vendor/dashboard',
          admin: '/admin/dashboard'
        };

        router.push(dashboards[selectedRole]);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const roleConfig = {
    user: { color: 'blue', title: 'Customer Login' },
    vendor: { color: 'green', title: 'Vendor Login' },
    admin: { color: 'purple', title: 'Admin Login' }
  };

  const config = roleConfig[selectedRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => setSelectedRole(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Role Selection
        </button>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl">{config.title}</CardTitle>
            <CardDescription className="text-green-50">
              Sign in to your {selectedRole === 'user' ? 'customer' : selectedRole} account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 h-10"
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-semibold">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded w-4 h-4" />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-11"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Separator />

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Google Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-green-600 hover:text-green-700 font-bold">
                Sign up here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// ENHANCED HOMEPAGE
// ============================================

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-6 text-base px-4 py-1">
                🌱 Premium Organic Marketplace
              </Badge>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Fresh Organic Products, Delivered to Your Doorstep
              </h1>
              <p className="text-xl text-green-50 mb-8 leading-relaxed">
                Discover 300+ certified organic vendors delivering premium quality products directly from verified farms to your home.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vendors">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 font-bold h-12 px-8 text-base">
                    Browse Vendors <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-bold h-12 px-8 text-base">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  {[
                    { icon: '✓', text: '100% Certified Organic' },
                    { icon: '✓', text: 'Direct from Farmers' },
                    { icon: '✓', text: 'Fresh & Quality Guaranteed' },
                    { icon: '✓', text: 'Fast Delivery' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-lg font-semibold">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '300+', label: 'Verified Vendors' },
              { number: '15,000+', label: 'Organic Products' },
              { number: '50,000+', label: 'Happy Customers' },
              { number: '4.8★', label: 'Average Rating' }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold text-green-600 mb-2">{stat.number}</p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Vendors ⭐</h2>
          <p className="text-gray-600 text-lg mb-12">Handpicked organic vendors you can trust</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-xl transition cursor-pointer group">
                <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 group-hover:scale-105 transition" />
                <CardContent className="pt-6">
                  <Badge className="bg-green-100 text-green-700 mb-3">✓ Verified</Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Organic Farm {item}</h3>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold">4.{item}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Recruitment CTA */}
      <VendorRecruitmentCTA />

      {/* Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['🥬 Vegetables', '🍎 Fruits', '🥛 Dairy', '🌾 Grains', '🌿 Herbs', '🍯 Others'].map((cat) => (
              <Card key={cat} className="text-center hover:shadow-lg transition cursor-pointer">
                <CardContent className="pt-8 pb-8">
                  <p className="text-2xl mb-2">{cat.split(' ')[0]}</p>
                  <p className="font-semibold text-gray-700">{cat.split(' ')[1]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Why Organic */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Choose Organic?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '🌱 Healthier Living', desc: 'No harmful pesticides or chemicals' },
              { title: '♻️ Eco-Friendly', desc: 'Sustainable farming practices' },
              { title: '💪 Better Nutrition', desc: 'Higher nutrient content' }
            ].map((item) => (
              <Card key={item.title} className="border-l-4 border-green-500 hover:shadow-lg transition">
                <CardContent className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-lg mb-8 text-green-50">Start your organic lifestyle journey today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=customer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 font-bold h-12 px-8">
                Shop Now
              </Button>
            </Link>
            <Link href="/register?role=vendor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-bold h-12 px-8">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// EXPORT ALL COMPONENTS
// ============================================

export default {
  Navbar,
  VendorIDCard,
  VendorRecruitmentCTA,
  LoginPageWithRoles,
  HomePage
};