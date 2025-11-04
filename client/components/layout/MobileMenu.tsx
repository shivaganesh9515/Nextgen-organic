'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Heart,
  MapPin,
  Search
} from 'lucide-react';

interface MobileMenuProps {
  userType?: 'admin' | 'vendor' | 'user';
}

export default function MobileMenu({ userType = 'user' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 border-b border-gray-200">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
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
                  } group flex items-center px-3 py-2 text-base font-medium rounded-md`}
                  onClick={() => setIsOpen(false)}
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
            
            <div className="pt-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start text-left">
                <LogOut className="mr-3 h-6 w-6 text-gray-400" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}