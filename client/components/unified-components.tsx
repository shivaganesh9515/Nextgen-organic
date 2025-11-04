/**
 * ============================================
 * NEXTGEN ORGANICS - COMPLETE UNIFIED COMPONENTS
 * Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
 * All components in ONE file with clear partitions
 * ============================================
 * 
 * USAGE GUIDE:
 * - Import components directly: import { HomePage, VendorDashboard, AdminDashboard } from '@/components/unified'
 * - Copy component function and paste where needed
 * - For Shadcn components: npm install shadcn-ui && npx shadcn-ui@latest init
 * - Each component is marked with [SECTION-XX] for easy navigation
 * 
 * SECTIONS:
 * [SECTION-01] - Imports & Dependencies
 * [SECTION-02] - Types & Interfaces
 * [SECTION-03] - Shared UI Components
 * [SECTION-04] - Customer Platform Components
 * [SECTION-05] - Vendor Dashboard Components
 * [SECTION-06] - Master Admin Components
 * [SECTION-07] - Auth Components (Login/Register with Shadcn)
 * ============================================
 */

// ============================================
// [SECTION-01] IMPORTS & DEPENDENCIES
// ============================================
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Icons from lucide-react
import {
  Search,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
  Filter,
  Grid,
  List,
  MapPin,
  Award,
  ChevronDown,
  ShoppingBag,
  Upload,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  X,
  AlertCircle,
  Info,
  User,
  Lock,
  Mail,
  Phone,
  Building,
  FileText,
  ArrowRight,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';

// Shadcn/ui Components (install with: npx shadcn-ui@latest add)
import { Button as ShadcnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// ============================================
// [SECTION-02] TYPES & INTERFACES
// ============================================

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
  description?: string;
  followers?: number;
  responseTime?: string;
  productCount?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  vendor: string;
  discount?: number;
  rating: number;
  category?: string;
  description?: string;
}

interface DailyOffer {
  id: string;
  title: string;
  discount: number;
  expiresAt: Date;
  product: Product;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  pendingApprovals: number;
  averageRating: number;
  conversionRate: number;
}

interface AdminStats {
  totalVendors: number;
  activeVendors: number;
  totalProducts: number;
  pendingProducts: number;
  totalRevenue: number;
  platformCommission: number;
  totalOrders: number;
  activeUsers: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

// ============================================
// [SECTION-03] SHARED UI COMPONENTS
// ============================================

/**
 * NAVBAR - Global Navigation Component
 * Supports: Customer, Vendor, Admin roles
 * Features: Adaptive menu, authentication state, notifications
 */
export const Navbar: React.FC<{
  userType?: 'customer' | 'vendor' | 'admin';
  isAuthenticated?: boolean;
  user?: User;
  onLogout?: () => void;
}> = ({
  userType = 'customer',
  isAuthenticated = false,
  user,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = {
    customer: [
      { label: 'Vendors', href: '/vendors' },
      { label: 'Products', href: '/products' },
      { label: 'Daily Offers', href: '/offers' },
      { label: 'About', href: '/about' }
    ],
    vendor: [
      { label: 'Dashboard', href: '/vendor/dashboard' },
      { label: 'My Products', href: '/vendor/products' },
      { label: 'Orders', href: '/vendor/orders' },
      { label: 'Analytics', href: '/vendor/analytics' }
    ],
    admin: [
      { label: 'Dashboard', href: '/admin/dashboard' },
      { label: 'Approvals', href: '/admin/approvals' },
      { label: 'Vendors', href: '/admin/vendors' },
      { label: 'Analytics', href: '/admin/analytics' }
    ]
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl font-bold text-gray-900">
                Next<span className="text-green-600">Gen</span>
              </span>
              <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                Organics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks[userType].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-gray-700 hover:text-green-600 font-medium transition">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <button className="relative">
                  <Bell className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center cursor-pointer">
                      <span className="text-green-600 font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{user.name}</DropdownMenuItem>
                    <DropdownMenuItem>{user.email}</DropdownMenuItem>
                    <Separator className="my-2" />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <ShadcnButton variant="outline">Login</ShadcnButton>
                </Link>
                <Link href="/register">
                  <ShadcnButton className="bg-green-600 hover:bg-green-700">
                    Sign Up
                  </ShadcnButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger className="md:hidden">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                {navLinks[userType].map((link) => (
                  <Link key={link.href} href={link.href}>
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
    </nav>
  );
};

/**
 * FOOTER - Global Footer Component
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Next<span className="text-green-400">Gen</span> Organics
            </h3>
            <p className="text-gray-400 text-sm">
              India's premium organic marketplace connecting conscious consumers with certified organic vendors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/vendors" className="hover:text-white transition">Browse Vendors</a></li>
              <li><a href="/products" className="hover:text-white transition">All Products</a></li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/vendor/register" className="hover:text-white transition">Become a Vendor</a></li>
              <li><a href="/vendor/login" className="hover:text-white transition">Vendor Login</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 NextGen Organics. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * LOADING SPINNER
 */
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <svg
        className="text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

/**
 * TOAST NOTIFICATION
 */
export const Toast: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}> = ({ message, type = 'info', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <Alert className={`flex items-center gap-3 ${colors[type]}`}>
        {icons[type]}
        <AlertDescription>{message}</AlertDescription>
        <button onClick={onClose} className="ml-auto">
          <X className="w-4 h-4" />
        </button>
      </Alert>
    </div>
  );
};

/**
 * RATING COMPONENT
 */
export const Rating: React.FC<{
  value: number;
  max?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}> = ({ value, max = 5, onChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverRating || value);

        return (
          <button
            key={index}
            type="button"
            onClick={() => !readonly && onChange?.(ratingValue)}
            onMouseEnter={() => !readonly && setHoverRating(ratingValue)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

/**
 * STAT CARD - Used in dashboards
 */
export const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}> = ({ title, value, subtitle, icon, trend, trendUp, color = 'green' }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
            {icon}
          </div>
          {trend && (
            <span className={`text-sm font-semibold ${trendUp ? 'text-green-600' : 'text-gray-600'}`}>
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

// ============================================
// [SECTION-04] CUSTOMER PLATFORM COMPONENTS
// ============================================

/**
 * HOMEPAGE - Main Landing Page
 * Features: Hero, featured vendors, daily offers, trending products
 */
export const HomePage: React.FC = () => {
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([]);
  const [dailyOffers, setDailyOffers] = useState<DailyOffer[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchFeaturedVendors();
    // fetchDailyOffers();
    // fetchTrendingProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Premium Organic Products <br />
              <span className="text-green-200">From Certified Vendors</span>
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Discover 300+ verified organic vendors offering fresh, certified products delivered to your doorstep
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-xl">
              <Search className="text-gray-400 ml-3" />
              <Input
                type="text"
                placeholder="Search for organic products, vendors, or categories..."
                className="flex-1 border-0 outline-none"
              />
              <ShadcnButton className="bg-green-600 hover:bg-green-700">
                Search
              </ShadcnButton>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Offers Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Clock className="mr-3 text-green-600" />
              Today's Flash Deals 🔥
            </h2>
            <p className="text-gray-600 mt-2">Limited time offers - Grab them before they're gone!</p>
          </div>
          <Link href="/offers" className="text-green-600 hover:text-green-700 flex items-center font-semibold">
            View All <ChevronRight className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200">
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  50% OFF
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Fresh Organic Tomatoes</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-green-600">₹299</span>
                    <span className="text-sm text-gray-400 line-through ml-2">₹599</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>4.8</span>
                </div>
                <div className="bg-red-50 text-red-600 text-sm font-semibold py-2 rounded-md text-center">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Ends in 2h 30m
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Organic Vendors ⭐</h2>
              <p className="text-gray-600 mt-2">Handpicked certified vendors you can trust</p>
            </div>
            <Link href="/vendors" className="text-green-600 hover:text-green-700 flex items-center font-semibold">
              Browse All <ChevronRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-lg transition cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-green-100 to-green-200" />
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Organic Farm {item}</h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-700">4.{item}</span>
                    <span className="text-gray-500 text-sm ml-2">• Mumbai</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Vegetables</Badge>
                    <Badge variant="secondary">Fruits</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">300+</div>
              <div className="text-gray-600 mt-2">Certified Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">15,000+</div>
              <div className="text-gray-600 mt-2">Organic Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">50,000+</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">4.8★</div>
              <div className="text-gray-600 mt-2">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * VENDOR MARKETPLACE - Browse All Vendors
 */
export const VendorMarketplace: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [city, setCity] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Organic Vendors</h1>
          <p className="text-gray-600 text-lg">Browse 300+ certified organic vendors across India</p>
        </div>

        {/* Search & Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Search className="text-gray-400" />
              <Input placeholder="Search vendors..." className="flex-1" />
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <ShadcnButton
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  <Grid className="w-4 h-4" />
                </ShadcnButton>
                <ShadcnButton
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  <List className="w-4 h-4" />
                </ShadcnButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendors Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="hover:shadow-lg transition cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-green-100 to-green-200" />
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Vendor {item}</h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span>4.{item}</span>
                  </div>
                  <ShadcnButton className="w-full bg-green-600 hover:bg-green-700">
                    View Products
                  </ShadcnButton>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-green-100 to-green-200" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">Vendor {item}</h3>
                      <p className="text-gray-600 mt-2">Premium organic products from certified farms</p>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400" />4.{item}</span>
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />Mumbai</span>
                        <span className="flex items-center"><Award className="w-4 h-4 mr-1" />Verified</span>
                      </div>
                    </div>
                    <ShadcnButton className="bg-green-600 hover:bg-green-700">
                      Shop Now
                    </ShadcnButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * PRODUCT LISTING - Browse All Products
 */
export const ProductListing: React.FC = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Filter className="mr-2 w-5 h-5" />
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <Label className="text-sm font-semibold">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-semibold">Price Range</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100">₹0 - ₹100</SelectItem>
                        <SelectItem value="100-500">₹100 - ₹500</SelectItem>
                        <SelectItem value="500+">₹500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-semibold">Rating</Label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">4+ Stars</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">4.5+ Stars</span>
                      </label>
                    </div>
                  </div>

                  <ShadcnButton variant="outline" className="w-full">
                    Clear Filters
                  </ShadcnButton>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200">
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -30%
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      Organic Product {item}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">Vendor {item}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">₹{299 * item}</span>
                      <div className="flex items-center text-sm">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span>4.{item}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// ============================================
// [SECTION-05] VENDOR DASHBOARD COMPONENTS
// ============================================

/**
 * VENDOR DASHBOARD - Main Overview
 */
export const VendorDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [stats] = useState<DashboardStats>({
    totalRevenue: 125000,
    totalOrders: 342,
    activeProducts: 48,
    pendingApprovals: 5,
    averageRating: 4.8,
    conversionRate: 3.2
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your store overview</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            trend="+12.5%"
            trendUp={true}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toString()}
            icon={<Package className="w-6 h-6" />}
            trend="+8.2%"
            trendUp={true}
            color="blue"
          />
          <StatCard
            title="Active Products"
            value={stats.activeProducts.toString()}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+5 new"
            trendUp={true}
            color="purple"
          />
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals.toString()}
            icon={<Clock className="w-6 h-6" />}
            trend="Action needed"
            trendUp={false}
            color="orange"
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((item) => (
                    <TableRow key={item}>
                      <TableCell>#{1001 + item}</TableCell>
                      <TableCell>Customer {item}</TableCell>
                      <TableCell>₹{1000 * item}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold">Product {item}</p>
                      <p className="text-sm text-gray-600">{50 * item} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{5000 * item}</p>
                      <p className="text-xs text-green-600">+{10 + item}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

/**
 * PRODUCT UPLOAD - Upload New Products
 */
export const ProductUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async () => {
    setUploading(true);
    // TODO: Implement upload logic
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Product</h1>
          <p className="text-gray-600 mb-8">Add product details and submit for Master Admin approval</p>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                {/* Images Upload */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Product Images*</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
                        <ShadcnButton type="button" variant="outline">
                          Choose Files
                        </ShadcnButton>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                      </div>
                    </DialogTrigger>
                  </Dialog>
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {previewImages.map((preview, idx) => (
                        <img
                          key={idx}
                          src={preview}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold mb-2 block">Product Name*</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Organic Fresh Tomatoes"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-semibold mb-2 block">Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product, its benefits, and what makes it special..."
                    rows={5}
                    required
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Category*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-sm font-semibold mb-2 block">Price (₹)*</Label>
                    <Input id="price" type="number" placeholder="299" required />
                  </div>
                </div>

                {/* Stock & Organic Type */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="stock" className="text-sm font-semibold mb-2 block">Stock Quantity*</Label>
                    <Input id="stock" type="number" placeholder="50" required />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Organic Type*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certified">Certified Organic</SelectItem>
                        <SelectItem value="natural">Natural (Pesticide-free)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Certifications</Label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">India Organic</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">FSSAI Certified</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <ShadcnButton
                    onClick={handleSubmit}
                    disabled={uploading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {uploading ? <LoadingSpinner size="sm" /> : 'Submit for Approval'}
                  </ShadcnButton>
                  <ShadcnButton type="button" variant="outline" className="px-6">
                    Save as Draft
                  </ShadcnButton>
                </div>

                {/* Info Box */}
                <Alert>
                  <AlertTitle>📋 Approval Process</AlertTitle>
                  <AlertDescription>
                    Your product will be reviewed by our Master Admin within 24-48 hours. Ensure all details are accurate and images are clear.
                  </AlertDescription>
                </Alert>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

/**
 * SALES ANALYTICS - Detailed Analytics Dashboard
 */
export const SalesAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sales Analytics</h1>

        {/* Revenue Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              [Chart visualization would go here - Use Recharts or Chart.js]
            </div>
          </CardContent>
        </Card>

        {/* Product Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <TableRow key={item}>
                    <TableCell>Product {item}</TableCell>
                    <TableCell>{100 * item}</TableCell>
                    <TableCell>₹{10000 * item}</TableCell>
                    <TableCell>{(4 + item * 0.1).toFixed(1)}★</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// [SECTION-06] MASTER ADMIN COMPONENTS
// ============================================

/**
 * ADMIN DASHBOARD - Master Admin Overview
 */
export const AdminDashboard: React.FC = () => {
  const [stats] = useState<AdminStats>({
    totalVendors: 342,
    activeVendors: 298,
    totalProducts: 15000,
    pendingProducts: 47,
    totalRevenue: 12500000,
    platformCommission: 2250000,
    totalOrders: 45000,
    activeUsers: 52000
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Master Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Vendors"
            value={stats.totalVendors.toString()}
            subtitle={`${stats.activeVendors} active`}
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts.toString()}
            subtitle={`${stats.pendingProducts} pending`}
            icon={<Package className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Platform Revenue"
            value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
            subtitle={`₹${(stats.platformCommission / 1000).toFixed(1)}K commission`}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toString()}
            subtitle={`${stats.activeUsers} active users`}
            icon={<TrendingUp className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-orange-200 hover:shadow-lg transition cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">{stats.pendingProducts}</span>
              </div>
              <h3 className="font-semibold text-lg text-orange-600">Pending Approvals</h3>
              <p className="text-sm text-gray-600 mt-2">View and manage pending products</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-lg transition cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">12</span>
              </div>
              <h3 className="font-semibold text-lg text-blue-600">Vendor Verifications</h3>
              <p className="text-sm text-gray-600 mt-2">Review vendor applications</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:shadow-lg transition cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <span className="text-3xl font-bold text-red-600">5</span>
              </div>
              <h3 className="font-semibold text-lg text-red-600">Disputes</h3>
              <p className="text-sm text-gray-600 mt-2">Resolve customer disputes</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Product Approved</p>
                    <p className="text-sm text-gray-600">Vendor {item} product approved</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/**
 * PRODUCT APPROVAL QUEUE - Approve/Reject Products
 */
export const ProductApprovalQueue: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('pending');

  const mockProducts = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Approval Queue</h1>
          <p className="text-gray-600">Review and approve products from vendors</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  placeholder="Search products or vendors..."
                  className="flex-1 border-0 outline-none"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Product List */}
          <div className="space-y-4">
            {mockProducts.map((item) => (
              <Card
                key={item}
                onClick={() => setSelectedProduct(item)}
                className={`overflow-hidden hover:shadow-lg transition cursor-pointer ${
                  selectedProduct === item ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-100 to-green-200" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Product {item}</h3>
                      <p className="text-sm text-gray-600 mb-2">by Vendor {item}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold text-green-600">₹{299 * item}</span>
                        <span className="text-gray-500">Category</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Product Details */}
          {selectedProduct && (
            <Card className="sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>

                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 rounded-lg bg-gradient-to-br from-green-100 to-green-200" />
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Product Name</Label>
                    <p className="text-gray-900">Product {selectedProduct}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Description</Label>
                    <p className="text-gray-700 text-sm">Product description goes here</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Category</Label>
                      <p className="text-gray-900">Vegetables</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Price</Label>
                      <p className="text-gray-900 font-bold">₹{299 * selectedProduct}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Certifications</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-700">✓ India Organic</Badge>
                      <Badge className="bg-green-100 text-green-700">✓ FSSAI</Badge>
                    </div>
                  </div>
                </div>

                {/* Approval Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <ShadcnButton className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </ShadcnButton>
                  <ShadcnButton className="flex-1" variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </ShadcnButton>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * VENDOR VERIFICATION - Verify New Vendors
 */
export const VendorVerification: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Verification</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendor List */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card
                key={item}
                onClick={() => setSelectedVendor(item)}
                className={`overflow-hidden hover:shadow-lg transition cursor-pointer ${
                  selectedVendor === item ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Vendor {item}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 vendor{item}@email.com</p>
                    <p>📱 +91 9876543210</p>
                    <p>📍 Mumbai</p>
                    <p>🏢 Organic Farm</p>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Submitted 2 days ago
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Verification Details */}
          {selectedVendor && (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Verification Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Certifications */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Certifications</h4>
                    {[1, 2].map((item) => (
                      <div key={item} className="border border-gray-200 rounded-lg p-4 mb-2">
                        <p className="font-semibold">Certification {item}</p>
                        <p className="text-sm text-gray-600">Valid until: 2026-12-31</p>
                        <Link href="#" className="text-green-600 text-sm hover:underline">
                          View Certificate →
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Bank Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Bank Details</h4>
                    <div className="border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-semibold">Bank:</span> State Bank of India</p>
                      <p><span className="font-semibold">Account:</span> ••••••••••••1234</p>
                      <p><span className="font-semibold">IFSC:</span> SBIN0001234</p>
                    </div>
                  </div>

                  {/* GST */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">GST Number</h4>
                    <p className="text-gray-700">18AABCT1234H1Z0</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <ShadcnButton className="flex-1 bg-green-600 hover:bg-green-700">
                      ✓ Verify & Approve
                    </ShadcnButton>
                    <ShadcnButton className="flex-1" variant="destructive">
                      ✗ Reject
                    </ShadcnButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// [SECTION-07] AUTH COMPONENTS (Login/Register with Shadcn)
// ============================================

/**
 * LOGIN PAGE - Using Shadcn Components
 */
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual login API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      console.log('Login attempt:', { email, password });

      // Simulate success
      setTimeout(() => {
        setLoading(false);
        router.push('/vendor/dashboard');
      }, 1000);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Next<span className="text-green-600">Gen</span>
          </h1>
          <p className="text-gray-600">Organic Marketplace</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-green-600 hover:text-green-700">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <ShadcnButton
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 h-10"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </ShadcnButton>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  OR
                </span>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <ShadcnButton type="button" variant="outline" className="w-full">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </ShadcnButton>
              </div>
            </form>
          </CardContent>

          {/* Sign Up Link */}
          <div className="px-6 pb-6 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold">
              Sign up here
            </Link>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-green-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

/**
 * REGISTER PAGE - Using Shadcn Components
 */
export const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // TODO: Implement actual registration API call
      console.log('Register attempt:', { userType, ...formData });

      // Simulate success
      setTimeout(() => {
        setLoading(false);
        router.push('/login');
      }, 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Next<span className="text-green-600">Gen</span>
          </h1>
          <p className="text-gray-600">Join Our Organic Community</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Start your organic marketplace journey today</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* User Type Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">I want to register as:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setUserType('customer')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      userType === 'customer'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <h3 className="font-semibold">Customer</h3>
                    <p className="text-sm text-gray-600">Buy organic products</p>
                  </div>
                  <div
                    onClick={() => setUserType('vendor')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      userType === 'vendor'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <h3 className="font-semibold">Vendor</h3>
                    <p className="text-sm text-gray-600">Sell organic products</p>
                  </div>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              {/* Vendor-Specific Fields */}
              {userType === 'vendor' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name*</Label>
                      <Input
                        id="businessName"
                        placeholder="My Organic Farm"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City*</Label>
                      <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password*</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password*</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" required className="rounded" />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-green-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-green-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <ShadcnButton
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 h-10"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </ShadcnButton>
            </form>
          </CardContent>

          {/* Login Link */}
          <div className="px-6 pb-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
              Sign in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// [SECTION-08] EXPORT ALL COMPONENTS
// ============================================

export default {
  // Shared Components
  Navbar,
  Footer,
  LoadingSpinner,
  Toast,
  Rating,
  StatCard,

  // Customer Components
  HomePage,
  VendorMarketplace,
  ProductListing,

  // Vendor Components
  VendorDashboard,
  ProductUpload,
  SalesAnalytics,

  // Admin Components
  AdminDashboard,
  ProductApprovalQueue,
  VendorVerification,

  // Auth Components
  LoginPage,
  RegisterPage
};

// ============================================
// USAGE INSTRUCTIONS FOR CURSOR IDE
// ============================================

/*
🎯 CURSOR IDE PROMPT - Copy this to use with Cursor:

"I have a unified components file for NextGen Organics marketplace. 
It contains:

🔵 SHARED COMPONENTS (Navbar, Footer, LoadingSpinner, Toast, Rating, StatCard)
🟢 CUSTOMER COMPONENTS (HomePage, VendorMarketplace, ProductListing)
🟣 VENDOR COMPONENTS (VendorDashboard, ProductUpload, SalesAnalytics)
🔴 ADMIN COMPONENTS (AdminDashboard, ProductApprovalQueue, VendorVerification)
🟠 AUTH COMPONENTS (LoginPage, RegisterPage)

Each section is marked with [SECTION-XX] for easy navigation.

QUICK COPY GUIDE:
1. Press Ctrl+F to find [SECTION-xx] and navigate to component
2. Copy entire component function
3. Paste into your Next.js page

INSTALLATION:
1. npm install shadcn-ui
2. npx shadcn-ui@latest init
3. npm install lucide-react

API REPLACEMENT:
- Replace all // TODO: fetch(...) comments with your actual API calls
- Update endpoints from /api/* to match your backend

STYLING:
- All components use Tailwind CSS
- Colors: Green-600 for primary (organic theme)
- Fully responsive (mobile-first)
- Dark mode compatible"

*/