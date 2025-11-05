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
  ChefHat
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import NotificationBell from '@/components/shared/NotificationBell';

export default function OrganicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { items } = useCartStore();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

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

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Meal Kits & Bundles', href: '/meal-kits' },
    { name: 'Why Organic?', href: '/about/organic' },
    { name: 'Our Vendors', href: '/vendors' },
    { name: 'Health Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

      return (
    <header className="w-full z-50 relative">
      {/* Fixed Header - Top */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-md border-b border-[#d4c4a8]/30 z-50">
        <div className="relative">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4a7c59] to-[#5a9d6e] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-xl">🌱</span>
              </div>
              <div className="font-bold text-xl tracking-tight text-[#2d5016]">Nextgen Organics</div>
            </Link>

            {/* Right Side - Icons & Actions */}
            <div className="flex items-center space-x-3 xl:space-x-4">
            {/* Search */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-xl hover:bg-[#f5f1e8] transition-colors text-[#5a5a5a] hover:text-[#2d5016]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <NotificationBell />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-[#f5f1e8] transition-colors text-[#5a5a5a] hover:text-[#2d5016]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="p-2 rounded-xl hover:bg-[#f5f1e8] transition-colors text-[#5a5a5a] hover:text-[#2d5016]"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#d4c4a8]/30 overflow-hidden">
                    <div className="p-4 border-b border-[#d4c4a8]/30">
                      <p className="font-semibold text-[#2d5016]">{user.name || user.email}</p>
                      <p className="text-sm text-[#8b8b8b]">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/account"
                        className="flex items-center px-4 py-2 text-sm text-[#5a5a5a] hover:bg-[#f5f1e8] transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center px-4 py-2 text-sm text-[#5a5a5a] hover:bg-[#f5f1e8] transition-colors"
                      >
                        <Store className="w-4 h-4 mr-2" />
                        My Orders
                      </Link>
                      <Link
                        href="/account/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-[#5a5a5a] hover:bg-[#f5f1e8] transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </Link>
                      {(user.role === 'admin' || user.role === 'vendor') && (
                        <Link
                          href={user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard'}
                          className="flex items-center px-4 py-2 text-sm text-[#5a5a5a] hover:bg-[#f5f1e8] transition-colors"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account/settings"
                        className="flex items-center px-4 py-2 text-sm text-[#5a5a5a] hover:bg-[#f5f1e8] transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-[#c17767] hover:bg-[#ffe0db] transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-[#5a5a5a] hover:text-[#2d5016] transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-[#4a7c59] to-[#5a9d6e] text-white px-6 py-2 rounded-xl hover:from-[#3d6a4a] hover:to-[#4a7c59] transition-all shadow-lg font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

                                       {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-[#f5f1e8] transition-colors text-[#5a5a5a]"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

                        {/* Search Bar - Fixed Header */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-t border-[#d4c4a8]/30 py-3 z-50">
                <div className="container mx-auto px-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b8b8b]" />
                    <input
                      type="text"
                      placeholder="Search for organic products..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d4c4a8]/50 bg-[#faf9f6] focus:outline-none focus:border-[#4a7c59] transition-colors"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* Floating Navbar - Main Navigation */}
      <div className="pt-16 pb-6 px-6">
        <div className="container mx-auto">
          <nav className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-[#d4c4a8]/40 mx-auto max-w-5xl px-8 py-4">
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 font-medium">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#5a5a5a] hover:text-[#2d5016] transition-colors duration-200 whitespace-nowrap text-sm xl:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden">
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-[#5a5a5a] hover:text-[#2d5016] transition-colors font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {!user && (
                    <>
                      <li>
                        <Link
                          href="/auth/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 text-[#5a5a5a] hover:text-[#2d5016] transition-colors font-medium"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/auth/register"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 bg-gradient-to-r from-[#4a7c59] to-[#5a9d6e] text-white px-4 rounded-xl text-center font-medium"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}