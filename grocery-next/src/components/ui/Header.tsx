'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { Search, ShoppingCart, User, Menu, X, Store } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaMenu } from './MegaMenu';

export default function Header() {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartItemsCount = getTotalItems();
  const shopLinkRef = useRef<HTMLAnchorElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Clear mega menu timer
  const clearMegaMenuTimer = () => {
    if (megaMenuTimer.current) {
      clearTimeout(megaMenuTimer.current);
      megaMenuTimer.current = null;
    }
  };

  // Open mega menu with delay
  const openMegaMenu = () => {
    clearMegaMenuTimer();
    megaMenuTimer.current = setTimeout(() => {
      setIsMegaMenuOpen(true);
    }, 150); // Small delay to prevent accidental triggers
  };

  // Close mega menu with delay
  const closeMegaMenu = () => {
    clearMegaMenuTimer();
    megaMenuTimer.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 300); // Delay to allow moving cursor to submenu
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mega menu
      if (shopLinkRef.current && !shopLinkRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      
      // Close user menu
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearMegaMenuTimer();
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsMegaMenuOpen(false);
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
        setIsMegaMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Updated navigation items for organic marketplace
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop by Category', href: '/shop' },
    { name: 'Why Organic?', href: '/about' },
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
            <Link href="/" className="text-2xl font-bold text-primary-600">
              OrganicNext
            </Link>
          </div>

          {/* Desktop search - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search organic products, vendors, categories..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
              />
              <button 
                className="absolute right-0 top-0 h-full px-4 bg-primary-600 text-white rounded-r-full hover:bg-primary-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            <button 
              className="md:hidden text-gray-600 hover:text-primary-600"
              onClick={toggleSearch}
              aria-label="Toggle search"
              aria-expanded={isSearchOpen ? "true" : "false"}
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link href="/shop/cart" className="relative text-gray-600 hover:text-primary-600" aria-label="Shopping cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User menu - NO VENDOR LOGIN HERE */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 focus:outline-none"
                  onClick={toggleUserMenu}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen ? "true" : "false"}
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-md shadow-lg py-1 border border-white/20 z-50"
                    >
                      <Link 
                        href="/account" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link 
                        href="/account/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        href="/account/wishlist" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600 text-sm" aria-label="Customer Sign In">
                  Sign In
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/auth/signup" className="text-gray-600 hover:text-primary-600 text-sm" aria-label="Customer Sign Up">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search - shown when search is open */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              className="md:hidden pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search organic products, vendors, categories..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                />
                <button 
                  className="absolute right-0 top-0 h-full px-4 bg-primary-600 text-white rounded-r-full hover:bg-primary-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <li key={item.name} className="relative">
                    {item.name === 'Shop by Category' ? (
                      <>
                        <button 
                          className={`text-gray-600 hover:text-primary-600 font-medium flex items-center w-full text-left ${
                            pathname === item.href ? 'text-primary-600' : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMegaMenu();
                          }}
                          aria-expanded={isMegaMenuOpen ? "true" : "false"}
                        >
                          <Store className="h-4 w-4 mr-1" />
                          {item.name}
                        </button>
                        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
                      </>
                    ) : (
                      <Link 
                        href={item.href} 
                        className={`text-gray-600 hover:text-primary-600 font-medium block ${
                          pathname === item.href ? 'text-primary-600' : ''
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false); // Close mobile menu when clicking a link
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        
        {/* Desktop navigation - always visible on md and up */}
        <nav className="hidden md:flex justify-center py-4">
          <ul className="flex flex-row space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                {item.name === 'Shop by Category' ? (
                  <>
                    <Link 
                      ref={shopLinkRef}
                      href={item.href} 
                      className={`text-gray-600 hover:text-primary-600 font-medium flex items-center ${
                        pathname === item.href ? 'text-primary-600' : ''
                      }`}
                      onMouseEnter={openMegaMenu}
                      onMouseLeave={closeMegaMenu}
                      aria-expanded={isMegaMenuOpen ? "true" : "false"}
                    >
                      <Store className="h-4 w-4 mr-1" />
                      {item.name}
                      {pathname === item.href && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                          layoutId="navbar-indicator"
                        />
                      )}
                    </Link>
                    <MegaMenu 
                      isOpen={isMegaMenuOpen} 
                      onClose={() => setIsMegaMenuOpen(false)} 
                    />
                  </>
                ) : (
                  <Link 
                    href={item.href} 
                    className={`text-gray-600 hover:text-primary-600 font-medium ${
                      pathname === item.href ? 'text-primary-600' : ''
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}