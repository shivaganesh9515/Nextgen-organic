'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'next-auth/react';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Home, 
  Store, 
  Settings, 
  BarChart3,
  LogOut
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function OrganicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { items } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/shop', icon: Store },
    { name: 'Dashboard', href: '/account/user-dashboard', icon: BarChart3 },
    { name: 'Premium Dashboard', href: '/premium-dashboard', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-organic sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌿</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              DailyPick
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
                  <User className="w-6 h-6" />
                  <span className="hidden md:inline">{user.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-organic py-2 hidden group-hover:block z-50">
                  <Link 
                    href={user.role === 'user' ? '/account/user-dashboard' : 
                          user.role === 'vendor' ? '/vendor/vendor-dashboard' : 
                          '/admin/admin-dashboard'}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/premium-dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Premium Dashboard</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {user && (
                <>
                  <Link 
                    href={user.role === 'user' ? '/account/user-dashboard' : 
                          user.role === 'vendor' ? '/vendor/vendor-dashboard' : 
                          '/admin/admin-dashboard'}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/premium-dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Premium Dashboard</span>
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
              
              {!user && (
                <Link 
                  href="/auth/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}