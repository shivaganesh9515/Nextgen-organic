'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/vendor/vendor-dashboard', icon: BarChart3 },
    { name: 'Products', href: '/vendor/products', icon: Package },
    { name: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
    { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <span className="text-xl font-bold text-green-600">Vendor Panel</span>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full pt-16 md:pt-0">
          <div className="flex items-center h-16 px-4 border-b">
            <span className="text-xl font-bold text-green-600">Vendor Panel</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-600"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}