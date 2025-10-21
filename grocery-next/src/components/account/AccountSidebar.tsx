'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Bell, 
  Settings, 
  Shield, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { name: 'Profile', href: '/account', icon: User },
  { name: 'My Orders', href: '/account/orders', icon: ShoppingBag },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Payment Methods', href: '/account/payment', icon: CreditCard },
  { name: 'Notifications', href: '/account/notifications', icon: Bell },
  { name: 'Settings', href: '/account/settings', icon: Settings },
  { name: 'Privacy', href: '/account/privacy', icon: Shield },
];

export const AccountSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="card h-full">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};