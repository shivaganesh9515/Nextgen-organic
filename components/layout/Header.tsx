'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartIcon from '@/components/shared/CartIcon';
import NotificationBell from '@/components/shared/NotificationBell';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              DailyPick
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link 
                href="/products" 
                className={`${
                  pathname.startsWith('/products') ? 'text-green-600' : 'text-gray-700'
                } hover:text-green-600`}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className={`${
                  pathname.startsWith('/categories') ? 'text-green-600' : 'text-gray-700'
                } hover:text-green-600`}
              >
                Categories
              </Link>
              <Link 
                href="/vendors" 
                className={`${
                  pathname.startsWith('/vendors') ? 'text-green-600' : 'text-gray-700'
                } hover:text-green-600`}
              >
                Vendors
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <CartIcon />
            <NotificationBell />
            
            <Button variant="ghost" size="icon">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}