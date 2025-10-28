'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { Search, ShoppingCart, User, Menu, X, Store } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryDropdown from '../common/CategoryDropdown';
import StandardizedButton from '../ui/StandardizedButton';
import StandardizedInput from '../ui/StandardizedInput';
import { typographyClasses } from '../../lib/typography';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartItemsCount = getTotalItems();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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

  // Updated navigation items for organic marketplace
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Why Organic?', href: '/about' },
    { name: 'Our Vendors', href: '/vendors' },
    { name: 'Health Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
      <div className="main-container container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className={`${typographyClasses.h3} text-brand-green leading-none`}>
              OrganicNext
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
                  router.push(`/shop?search=${encodeURIComponent(query)}`);
                }
              }}
              className="relative w-full"
            >
              <StandardizedInput
                type="text"
                name="search"
                placeholder="Search organic products, vendors, categories..."
                className="w-full rounded-full bg-white/50 backdrop-blur-sm"
                size="md"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-full hover:bg-brand-dark-green transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4 pr-6">
            {/* Mobile search button */}
            <StandardizedButton 
              variant="ghost"
              onClick={toggleSearch}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Search className="h-6 w-6" />
            </StandardizedButton>

            {/* Cart */}
            <Link 
              href="/shop/cart" 
              className="relative text-gray-600 hover:text-primary-600 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={`Shopping cart with ${cartItemsCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">{cartItemsCount > 0 ? `${cartItemsCount} items in cart` : 'Cart is empty'}</span>
            </Link>

            {/* User menu - NO VENDOR LOGIN HERE */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <StandardizedButton 
                  variant="ghost"
                  onClick={toggleUserMenu}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center justify-center"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline ml-2">{user.name.split(' ')[0]}</span>
                </StandardizedButton>
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
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link 
                        href="/account/orders" 
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        href="/account/wishlist" 
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200`}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin" className={`${typographyClasses.bodySmall} text-gray-600 hover:text-primary-600 flex items-center justify-center`} aria-label="Customer Sign In">
                  Sign In
                </Link>
                <span className="text-gray-300 flex items-center justify-center">|</span>
                <Link href="/auth/signup" className={`${typographyClasses.bodySmall} text-gray-600 hover:text-primary-600 flex items-center justify-center`} aria-label="Customer Sign Up">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <StandardizedButton 
              variant="ghost"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </StandardizedButton>
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
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const query = formData.get('search-mobile') as string;
                  if (query?.trim()) {
                    router.push(`/shop?search=${encodeURIComponent(query)}`);
                  }
                  setIsSearchOpen(false); // Close search after submitting
                }}
                className="relative"
              >
                <StandardizedInput
                  type="text"
                  name="search-mobile"
                  placeholder="Search organic products, vendors, categories..."
                  className="w-full rounded-full bg-white/50 backdrop-blur-sm"
                  size="md"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-full hover:bg-brand-dark-green transition-colors flex items-center justify-center"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t border-gray-200 max-h-[70vh] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <li key={item.name} className="relative">
                    <Link 
                      href={item.href} 
                      className={`text-gray-600 hover:text-brand-green font-medium block transition-colors duration-200 py-2 px-4 rounded-lg ${
                        pathname === item.href ? 'text-brand-green bg-brand-green/10' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false); // Close mobile menu when clicking a link
                      }}
                    >
                      {item.name === 'Shop by Category' && <Store className="h-4 w-4 mr-1 inline" />}
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* Mobile Category Dropdown */}
                <li className="px-4">
                  <div className="py-2">
                    <CategoryDropdown onClose={() => setIsMenuOpen(false)} />
                  </div>
                </li>
                
                {/* Mobile User Menu */}
                {user && (
                  <li className="px-4">
                    <div className="border-t border-gray-200 pt-3 mt-2">
                      <div className="flex flex-col space-y-2">
                        <Link 
                          href="/account" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link 
                          href="/account/orders" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link 
                          href="/account/wishlist" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="text-left text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        
        {/* Desktop navigation - always visible on md and up */}
        <nav className="hidden md:flex justify-center py-4">
          <ul className="flex flex-row space-x-6 items-center">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link 
                  href={item.href} 
                  className={`text-gray-600 hover:text-brand-green font-medium flex items-center transition-colors duration-200 ${
                    pathname === item.href ? 'text-brand-green' : ''
                  }`}
                >
                  {item.name === 'Shop by Category' && <Store className="h-4 w-4 mr-1" />}
                  {item.name}
                  {pathname === item.href && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}