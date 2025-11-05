'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartIcon from '@/components/shared/CartIcon';
import NotificationBell from '@/components/shared/NotificationBell';
import { Search } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-green-600 mr-8">
            Nextgen Organics
          </Link>
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <NotificationBell />
          <CartIcon />
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}