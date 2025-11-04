'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'next-auth/react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Home, 
  Store, 
  Settings, 
  BarChart3,
  LogOut,
  Heart,
  Moon,
  Sun
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function OrganicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuthStore();
  const { items } = useCartStore();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      // Update DOM class directly without state update in effect
      document.documentElement.classList.add('dark');
      // Set state after effect
      setTimeout(() => setIsDarkMode(true), 0);
    }
  }, []);

  // Close all menus when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Why Organic?', href: '/about/organic' },
    { name: 'Our Vendors', href: '/vendors' },
    { name: 'Health Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              DailyPick
            </Link>
          </div>

          {/* Desktop search - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const query = formData.get('search') as string;
                if (query?.trim()) {
                  // In a real app, you would redirect to search results
                  console.log('Search query:', query);
                }
              }}
              className="relative w-full"
            >
              <input
                type="text"
                name="search"
                placeholder="Search organic products, vendors, categories..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-green-600"
            >
              {isDarkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* Mobile search button */}
            <button 
              onClick={toggleSearch}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-green-600 md:hidden"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-green-600">
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={toggleUserMenu}
                  aria-label="User menu"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50">
                    <Link 
                      href={user.role === 'user' ? '/account/user-dashboard' : 
                            user.role === 'vendor' ? '/vendor/vendor-dashboard' : 
                            '/admin/admin-dashboard'}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      href="/premium-dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Premium Dashboard</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search - shown when search is open */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const query = formData.get('search-mobile') as string;
                if (query?.trim()) {
                  // In a real app, you would redirect to search results
                  console.log('Search query:', query);
                }
                setIsSearchOpen(false); // Close search after submitting
              }}
              className="relative"
            >
              <input
                type="text"
                name="search-mobile"
                placeholder="Search organic products, vendors, categories..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}

        {/* Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {user && (
                <>
                  <li>
                    <Link 
                      href={user.role === 'user' ? '/account/user-dashboard' : 
                            user.role === 'vendor' ? '/vendor/vendor-dashboard' : 
                            '/admin/admin-dashboard'}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/premium-dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Premium Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
        
        {/* Desktop navigation - always visible on md and up */}
        <nav className="hidden md:flex justify-center py-4 border-t border-gray-200">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}