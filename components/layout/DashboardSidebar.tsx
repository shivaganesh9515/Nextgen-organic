'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  User,
  Heart,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  userType: 'admin' | 'vendor' | 'user';
}

export default function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname();
  
  const getNavigation = () => {
    switch (userType) {
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
          { name: 'Products', href: '/admin/products', icon: Package },
          { name: 'Vendors', href: '/admin/vendors', icon: Users },
          { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
          { name: 'Users', href: '/admin/users', icon: Users },
          { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      case 'vendor':
        return [
          { name: 'Dashboard', href: '/vendor/dashboard', icon: Home },
          { name: 'Products', href: '/vendor/products', icon: Package },
          { name: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
          { name: 'Inventory', href: '/vendor/inventory', icon: Package },
          { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
          { name: 'Payouts', href: '/vendor/payouts', icon: ShoppingCart },
          { name: 'Settings', href: '/vendor/settings', icon: Settings },
        ];
      case 'user':
      default:
        return [
          { name: 'Dashboard', href: '/account/dashboard', icon: Home },
          { name: 'Orders', href: '/account/orders', icon: ShoppingCart },
          { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
          { name: 'Addresses', href: '/account/addresses', icon: MapPin },
          { name: 'Profile', href: '/account/profile', icon: User },
          { name: 'Settings', href: '/account/settings', icon: Settings },
        ];
    }
  };

  const navigation = getNavigation();

  return (
    <div className="flex h-full">
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center justify-between px-4">
            <Link href="/" className="text-xl font-bold text-green-600">
              {userType === 'admin' ? 'Admin Panel' : userType === 'vendor' ? 'Vendor Panel' : 'My Account'}
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon
                      className={`${
                        pathname === item.href
                          ? 'text-green-600'
                          : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="mr-3 h-6 w-6 text-gray-400" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}