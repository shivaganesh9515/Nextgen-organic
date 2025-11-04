# Feature Sections Summary

## 1. Navbar

### File Path
`src/components/ui/Header.tsx`

### Source Code
```tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { Search, ShoppingCart, User, Menu, X, Store, Moon, Sun } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
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
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20 dark:bg-dark-900/90 dark:border-dark-800/20">
      <div className="main-container container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className={`${typographyClasses.h3} text-brand-green leading-none dark:text-accent-teal`}>
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
              <div className="input-modern">
                <StandardizedInput
                  type="text"
                  name="search"
                  placeholder=" "
                  className="w-full"
                  size="md"
                />
                <label>Search organic products, vendors, categories...</label>
              </div>
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-xl hover:bg-brand-dark-green transition-colors flex items-center justify-center dark:bg-accent-teal dark:hover:bg-accent-purple"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4 pr-6">
            {/* Dark mode toggle */}
            <StandardizedButton 
              variant="ghost"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              {isDarkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-700" />}
            </StandardizedButton>

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
              className="relative text-gray-600 hover:text-brand-green transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] dark:text-gray-300 dark:hover:text-accent-teal"
              aria-label={`Shopping cart with ${cartItemsCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
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
                  <span className="hidden md:inline ml-2 dark:text-white">{user.name.split(' ')[0]}</span>
                </StandardizedButton>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-md shadow-lg py-1 border border-white/20 z-50 dark:bg-dark-800/90 dark:border-dark-700/20"
                    >
                      <Link 
                        href="/account" 
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-dark-700`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link 
                        href="/account/orders" 
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-dark-700`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        href="/account/wishlist" 
                        className={`block px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-dark-700`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 ${typographyClasses.bodySmall} text-gray-700 hover:bg-brand-green/10 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-dark-700`}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin" className={`${typographyClasses.bodySmall} text-gray-600 hover:text-brand-green flex items-center justify-center dark:text-gray-300 dark:hover:text-accent-teal`} aria-label="Customer Sign In">
                  Sign In
                </Link>
                <span className="text-gray-300 flex items-center justify-center dark:text-dark-500">|</span>
                <Link href="/auth/signup" className={`${typographyClasses.bodySmall} text-gray-600 hover:text-brand-green flex items-center justify-center dark:text-gray-300 dark:hover:text-accent-teal`} aria-label="Customer Sign Up">
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
                <div className="input-modern">
                  <StandardizedInput
                    type="text"
                    name="search-mobile"
                    placeholder=" "
                    className="w-full"
                    size="md"
                    autoFocus
                  />
                  <label>Search organic products, vendors, categories...</label>
                </div>
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-xl hover:bg-brand-dark-green transition-colors flex items-center justify-center dark:bg-accent-teal dark:hover:bg-accent-purple"
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
              className="md:hidden py-4 border-t border-gray-200 max-h-[70vh] overflow-y-auto dark:border-dark-700"
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
                        pathname === item.href ? 'text-brand-green bg-brand-green/10 dark:text-accent-teal dark:bg-accent-teal/10' : 'hover:bg-gray-100 dark:hover:bg-dark-800'
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
                
                {/* Mobile User Menu */}
                {user && (
                  <li className="px-4">
                    <div className="border-t border-gray-200 pt-3 mt-2 dark:border-dark-700">
                      <div className="flex flex-col space-y-2">
                        <Link 
                          href="/account" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-accent-teal dark:hover:bg-dark-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link 
                          href="/account/orders" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-accent-teal dark:hover:bg-dark-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link 
                          href="/account/wishlist" 
                          className="text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-accent-teal dark:hover:bg-dark-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="text-left text-gray-600 hover:text-brand-green font-medium block py-2 px-4 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-accent-teal dark:hover:bg-dark-800"
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
                  className={`text-gray-600 hover:text-brand-green font-medium flex items-center transition-colors duration-200 dark:text-gray-300 ${
                    pathname === item.href ? 'text-brand-green dark:text-accent-teal' : ''
                  }`}
                >
                  {item.name === 'Shop by Category' && <Store className="h-4 w-4 mr-1" />}
                  {item.name}
                  {pathname === item.href && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green dark:bg-accent-teal"
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
```

## 2. Trusted Certificates

### File Path
`src/app/page.tsx` (Lines 275-311)

### Source Code
```tsx
{/* Certifications */}
<section className="mb-16 py-10 bg-white dark:bg-dark-800 rounded-3xl shadow-sm">
  <div className="container mx-auto px-4">
    <div className="text-center mb-10">
      <h2 className={`${typographyClasses.h2} text-gray-900 mb-2 dark:text-white`}>Trusted Certifications</h2>
      <p className={`${typographyClasses.body} text-gray-600 dark:text-gray-300`}>
        Our products meet the highest standards of quality and safety
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">NPOP</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">National Programme for Organic Production</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">USDA</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">USDA Organic</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">Jaivik</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">Jaivik Bharat</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">ISO</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">ISO 22000</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">FSSAI</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">Food Safety and Standards Authority</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl dark:bg-dark-700">
        <div className="w-16 h-16 bg-linear-to-r from-green-100 to-brand-beige rounded-2xl flex items-center justify-center mb-2 dark:from-dark-600 dark:to-dark-700">
          <span className="text-brand-green font-bold text-lg dark:text-accent-teal">GAP</span>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center dark:text-gray-300">Good Agricultural Practices</span>
      </div>
    </div>
  </div>
</section>
```

## 3. Why Choose Us

### File Path
`src/app/page.tsx` (Lines 173-203)

### Source Code
```tsx
{/* Why Choose Us */}
<section className="mb-20 py-12 bg-linear-to-r from-green-50 to-brand-beige dark:from-dark-800 dark:to-dark-900 rounded-3xl">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <span className="inline-block bg-linear-to-r from-brand-green to-accent-teal text-white text-sm font-semibold px-4 py-2 rounded-full mb-3 shadow-md">
        WHY CHOOSE US
      </span>
      <h2 className={`${typographyClasses.h2} text-gray-900 mb-4 dark:text-white`}>Nurtured by Nature, Chosen by Moms</h2>
      <p className={`${typographyClasses.bodyLarge} text-gray-600 max-w-2xl mx-auto dark:text-gray-300`}>
        In a world where wellness begins at the table, making mindful food choices is essential. 
        We bring you thoughtfully curated organic products that preserve high levels of vitamins and minerals.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="card-modern p-6 text-center group">
          <div className="mx-auto w-16 h-16 bg-linear-to-r from-brand-green to-accent-teal rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <feature.icon className="h-8 w-8 text-white" />
          </div>
          <h3 className={`${typographyClasses.h4} mb-2 text-gray-900 dark:text-white`}>{feature.title}</h3>
          <p className={`${typographyClasses.body} text-gray-600 dark:text-gray-300`}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Related Data
The features data is defined in the same file:
```tsx
// Why Choose Us features with modern icons
const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Certified organic products from trusted local farmers"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day delivery in select areas with real-time tracking"
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Rigorous quality checks and freshness guarantees"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Sustainable packaging and carbon-neutral delivery"
  }
];
```

## 4. What Our Customers Say

### File Path
`src/app/page.tsx` (Lines 379-428)

### Source Code
```tsx
{/* Customer Testimonials */}
<section className="mb-16 bg-linear-to-br from-green-50 to-brand-beige dark:from-dark-800 dark:to-dark-900 rounded-3xl p-6 md:p-8">
  <div className="text-center mb-10">
    <span className="inline-block bg-linear-to-r from-brand-green to-accent-teal text-white text-sm font-semibold px-4 py-2 rounded-full mb-2 shadow-md">
      CUSTOMER LOVE
    </span>
    <h2 className={`${typographyClasses.h2} text-gray-900 mb-2 dark:text-white`}>What Our Customers Say</h2>
    <p className={`${typographyClasses.bodyLarge} text-gray-600 max-w-2xl mx-auto dark:text-gray-300`}>
      Don't just take our word for it. Hear from our satisfied customers who have transformed their health with our organic products.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {reviews.map((review) => (
      <div key={review.id} className="card-modern p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <div className="shrink-0">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 dark:bg-dark-700" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">{review.userName}</h4>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-dark-500'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 italic dark:text-gray-300">"{review.comment}"</p>
        <div className="mt-4 flex items-center">
          <span className="text-xs text-gray-500 dark:text-dark-400">
            {new Date(review.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
          {review.verified && (
            <span className="ml-2 inline-flex items-center text-xs text-green-600 dark:text-accent-teal">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Verified Purchase
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
  
  <div className="text-center mt-8">
    <Link 
      href="/testimonials" 
      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium dark:text-accent-teal"
    >
      Read More Reviews
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</section>
```

### Related Data
The reviews data is imported from:
`src/lib/data/reviews.ts`

## 5. Wanna Become a Vendor?

### File Path
`src/app/page.tsx` (Lines 467-533)

### Source Code
```tsx
{/* Vendor CTA Section */}
<section className="mb-16 bg-linear-to-r from-primary-50 to-green-50 dark:from-dark-800 dark:to-dark-900 rounded-3xl p-8">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <div className="vendor-cta-content">
          <span className="inline-block bg-linear-to-r from-green-100 to-accent-teal/20 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4 dark:text-accent-teal">
            Join Our Marketplace
          </span>
          <h2 className={`${typographyClasses.h2} text-gray-900 mb-4 dark:text-white`}>
            Wanna Become a Vendor?
          </h2>
          <p className={`${typographyClasses.bodyLarge} text-gray-600 mb-6 dark:text-gray-300`}>
            Partner with us to reach thousands of health-conscious customers 
            looking for authentic organic products. Grow your organic business 
            and contribute to a healthier planet.
          </p>
          
          <div className="space-y-3 mb-6">
            {[
              "Zero Listing Fees for First 3 Months",
              "Dedicated Vendor Dashboard",
              "Real-time Sales Analytics",
              "Direct Payments via Razorpay",
              "Marketing & SEO Support"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 dark:text-accent-teal" />
                <span className={typographyClasses.body}>{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="btn-modern-primary text-center py-3 px-6 rounded-xl font-medium"
            >
              Contact Us to Get Started
            </Link>
            <Link 
              href="/vendors/join" 
              className="btn-modern-secondary text-center py-3 px-6 rounded-xl font-medium"
            >
              Apply as Vendor
            </Link>
          </div>
          
          <p className="text-gray-500 mt-4 dark:text-dark-400">
            <small>Already a vendor? <Link href="/vendor/signin" className="text-primary-600 hover:underline dark:text-accent-teal">Sign in to your dashboard</Link></small>
          </p>
        </div>
      </div>
      
      <div>
        <div className="vendor-cta-image relative">
          <Image 
            src="/images/hero/vendor.jpg" 
            alt="Become a Vendor" 
            width={600}
            height={400}
            className="w-full h-auto rounded-2xl shadow-xl"
          />
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
            <div className="card-modern text-center p-4 shadow-lg">
              <Users className="h-6 w-6 text-primary-600 mx-auto mb-2 dark:text-accent-teal" />
              <h3 className={`${typographyClasses.h3} text-gray-900 dark:text-white`}>500+</h3>
              <p className={`${typographyClasses.bodySmall} text-gray-600 dark:text-gray-300`}>Active Vendors</p>
            </div>
            <div className="card-modern text-center p-4 shadow-lg">
              <Users className="h-6 w-6 text-primary-600 mx-auto mb-2 dark:text-accent-teal" />
              <h3 className={`${typographyClasses.h3} text-gray-900 dark:text-white`}>50K+</h3>
              <p className={`${typographyClasses.bodySmall} text-gray-600 dark:text-gray-300`}>Happy Customers</p>
            </div>
            <div className="card-modern text-center p-4 shadow-lg">
              <CheckCircle className="h-6 w-6 text-primary-600 mx-auto mb-2 dark:text-accent-teal" />
              <h3 className={`${typographyClasses.h3} text-gray-900 dark:text-white`}>100%</h3>
              <p className={`${typographyClasses.bodySmall} text-gray-600 dark:text-gray-300`}>Organic Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 6. Why Organic? page

### File Path
`src/app/about/page.tsx`

### Source Code
```tsx
'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Shield, Award, Users, Sprout } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';

export default function AboutOrganicPage() {
  const benefits = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Nutrient Dense",
      description: "Organic foods often contain more nutrients and antioxidants than conventionally grown foods."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Better for Your Health",
      description: "Free from synthetic pesticides, herbicides, and chemical fertilizers that can harm your body."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "No Harmful Chemicals",
      description: "Organic farming prohibits the use of synthetic chemicals, GMOs, and antibiotics."
    },
    {
      icon: <Sprout className="h-8 w-8" />,
      title: "Environmentally Sustainable",
      description: "Organic farming practices protect soil, water, and biodiversity for future generations."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Higher Quality Standards",
      description: "Strict certification processes ensure consistent quality and authenticity."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Supports Local Farmers",
      description: "Buying organic supports small-scale farmers who use sustainable practices."
    }
  ];

  const practices = [
    {
      title: "Natural Pest Control",
      description: "Using beneficial insects, companion planting, and natural repellents instead of synthetic pesticides."
    },
    {
      title: "Soil Health Management",
      description: "Building soil fertility through composting, crop rotation, and cover crops."
    },
    {
      title: "Biodiversity Conservation",
      description: "Maintaining diverse ecosystems that support wildlife and beneficial organisms."
    },
    {
      title: "Water Conservation",
      description: "Implementing efficient irrigation systems and protecting water sources from contamination."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Why Choose Organic?" 
        subtitle="Discover the benefits of organic products for your health and the environment"
      />

      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-16 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Organic Difference</h2>
        <p className="text-xl max-w-3xl mx-auto">
          Organic products are grown and processed according to strict standards that prioritize 
          environmental sustainability, animal welfare, and human health.
        </p>
      </motion.div>

      {/* Benefits Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Benefits of Organic Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="card text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Organic Practices */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Organic Farming Practices</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              className="flex gap-6 p-6 bg-white rounded-xl border border-gray-200"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">{practice.title}</h4>
                <p className="text-gray-600">{practice.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certification Info */}
      <section className="mb-16 bg-green-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Organic Certification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                Organic products sold on OrganicNext are certified by recognized organic certification bodies. 
                These certifications ensure that products meet strict organic standards throughout the 
                production and processing chain.
              </p>
              <p className="text-gray-700 mb-4">
                Look for these certifications when shopping:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>India Organic (NPOP) - National Programme for Organic Production</li>
                <li>USDA Organic - United States Department of Agriculture</li>
                <li>EU Organic - European Union Organic Standards</li>
                <li>Jaivik Bharat - India's new organic logo</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="font-medium text-sm text-center">India Organic</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="font-medium text-sm text-center">USDA Organic</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="font-medium text-sm text-center">EU Organic</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="font-medium text-sm text-center">Jaivik Bharat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
        <motion.blockquote 
          className="text-xl italic text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          "Empowering healthy living through authentic organic products while supporting 
          sustainable farming and local communities."
        </motion.blockquote>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          At OrganicNext, we believe in the power of organic products to transform lives and 
          protect our planet. We're committed to connecting health-conscious consumers with 
          trusted organic producers who share our values.
        </p>
      </section>
    </div>
  );
}
```

## 7. Our Vendors page

### File Path
`src/app/vendors/page.tsx`

### Source Code
```tsx
'use client';

import { useState, useEffect } from 'react';
import { vendors } from '../../lib/data/vendors';
import { Vendor } from '../../lib/types';

interface FilterOptions {
  categories: string[];
  rating: number | null;
}

import { VendorGrid } from '../../components/vendors/VendorGrid';
import { VendorFilters } from '../../components/vendors/VendorFilters';
import { SearchBar } from '../../components/common/SearchBar';
import { Pagination } from '../../components/common/Pagination';

export default function VendorsPage() {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const vendorsPerPage = 12;

  useEffect(() => {
    let result = [...vendors];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(vendor => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredVendors(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + vendorsPerPage);

  const handleFilterChange = (filters: FilterOptions) => {
    // In a real app, this would filter the vendors based on the filters
    console.log('Filters changed:', filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Vendors</h1>
        <SearchBar onSearch={setSearchQuery} placeholder="Search vendors..." />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <VendorFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Vendors Grid */}
        <div className="lg:w-3/4">
          {filteredVendors.length > 0 ? (
            <>
              <VendorGrid vendors={paginatedVendors} />
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No vendors found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Related Components

#### VendorGrid Component
`src/components/vendors/VendorGrid.tsx`
```tsx
'use client';

import { Vendor } from '../../lib/types';
import { VendorCard } from './VendorCard';

interface VendorGridProps {
  vendors: Vendor[];
  loading?: boolean;
}

export const VendorGrid: React.FC<VendorGridProps> = ({ vendors, loading = false }) => {
  if (loading) {
    return (
      <div className="responsive-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="bg-gray-200 h-32 rounded-lg"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No vendors found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="responsive-grid">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};
```

#### VendorCard Component
`src/components/vendors/VendorCard.tsx`
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Vendor } from '../../lib/types';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerError, setBannerError] = useState(false);
  const [logoLoading, setLogoLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="card group h-full flex flex-col">
      {/* Vendor Banner with Loading State */}
      <div className="relative overflow-hidden rounded-lg h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0">
        {bannerLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Skeleton Loader */}
            <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
          </div>
        )}
        
        {!bannerError ? (
          <img
            src={vendor.banner || '/images/placeholder-vendor.jpg'}
            alt={vendor.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
              bannerLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setBannerLoading(false)}
            onError={() => {
              setBannerError(true);
              setBannerLoading(false);
            }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-green-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">
                  {vendor.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">No Banner</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Logo with Loading State */}
        <div className="absolute bottom-2 left-2">
          <div className="relative">
            {logoLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse w-12 h-12 bg-gray-300 rounded-full" />
              </div>
            )}
            
            {!logoError ? (
              <img
                src={vendor.logo || '/images/placeholder-logo.jpg'}
                alt={vendor.name}
                className={`w-12 h-12 rounded-full border-2 border-white ${
                  logoLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setLogoLoading(false)}
                onError={() => {
                  setLogoError(true);
                  setLogoLoading(false);
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-white bg-green-300 flex items-center justify-center">
                <span className="text-lg font-bold text-green-700">
                  {vendor.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/vendors/${vendor.id}`} className="hover:text-primary-600">
          <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">{vendor.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1 flex items-center">
            ({vendor.reviewCount})
          </span>
        </div>
        
        {/* Delivery Info */}
        <div className="mt-3 flex justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-500">Delivery:</span>
            <span className="ml-1 font-medium">{vendor.deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500">Min:</span>
            <span className="ml-1 font-medium">₹{vendor.minOrder}</span>
          </div>
        </div>
        
        {/* Features */}
        {vendor.features && vendor.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {vendor.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="badge badge-primary text-xs whitespace-nowrap">
                {feature}
              </span>
            ))}
            {vendor.features.length > 2 && (
              <span className="badge badge-secondary text-xs whitespace-nowrap">
                +{vendor.features.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
```

## 8. Health Blog page

### File Path
`src/app/blog/page.tsx`

### Source Code
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronRight, Leaf, Heart, Sprout } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Health Benefits of Going Organic",
    excerpt: "Discover why switching to organic foods can transform your health and well-being.",
    content: "Going organic isn't just a trend - it's a lifestyle choice that can significantly impact your health...",
    author: "Dr. Priya Sharma",
    date: "2024-05-15",
    category: "Health",
    image: "/images/blog/organic-benefits.jpg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Seasonal Eating: Why It Matters",
    excerpt: "Learn how eating seasonally can improve your nutrition and support local farmers.",
    content: "Seasonal eating connects us with nature's rhythm and offers numerous health benefits...",
    author: "Rajesh Kumar",
    date: "2024-05-10",
    category: "Nutrition",
    image: "/images/blog/seasonal-eating.jpg",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Understanding Organic Labels",
    excerpt: "Navigate the confusing world of organic certifications and labels with our guide.",
    content: "With so many labels on organic products, it's easy to get confused about what they really mean...",
    author: "Neha Patel",
    date: "2024-05-05",
    category: "Education",
    image: "/images/blog/organic-labels.jpg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Environmental Impact of Organic Farming",
    excerpt: "How organic farming practices contribute to a healthier planet.",
    content: "Organic farming goes beyond just avoiding chemicals - it's a holistic approach to agriculture...",
    author: "Dr. Anil Verma",
    date: "2024-04-28",
    category: "Environment",
    image: "/images/blog/organic-environment.jpg",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Organic Superfoods You Should Know About",
    excerpt: "Discover powerful organic superfoods that can boost your health naturally.",
    content: "Superfoods are nutritional powerhouses that offer exceptional health benefits...",
    author: "Priya Menon",
    date: "2024-04-22",
    category: "Superfoods",
    image: "/images/blog/organic-superfoods.jpg",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Cooking with Organic Herbs and Spices",
    excerpt: "Enhance your dishes with the incredible flavors and health benefits of organic herbs.",
    content: "Organic herbs and spices not only add incredible flavors to your meals but also offer numerous health benefits...",
    author: "Chef Arjun Reddy",
    date: "2024-04-15",
    category: "Cooking",
    image: "/images/blog/organic-herbs.jpg",
    readTime: "4 min read"
  }
];

const categories = [
  { name: "All", icon: <Leaf className="h-4 w-4" /> },
  { name: "Health", icon: <Heart className="h-4 w-4" /> },
  { name: "Nutrition", icon: <Sprout className="h-4 w-4" /> },
  { name: "Environment", icon: <Leaf className="h-4 w-4" /> },
  { name: "Cooking", icon: <Leaf className="h-4 w-4" /> },
  { name: "Superfoods", icon: <Leaf className="h-4 w-4" /> }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Health & Wellness Blog" 
        subtitle="Discover tips, insights, and expert advice on organic living"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.name
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="card overflow-hidden hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.readTime}</span>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read More
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <motion.div 
        className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-2">Stay Informed</h3>
        <p className="mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest articles on organic living, health tips, 
          and exclusive offers from our vendors.
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-green-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
```

## 9. Contact page

### File Path
`src/app/contact/page.tsx`

### Source Code
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import GlassyButton from '../../components/ui/GlassyButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                  <p className="mt-1 text-gray-600">
                    123 Grocery Street<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+91 98765 43210</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Mon-Fri 8am-8pm, Sat-Sun 9am-6pm</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">support@grocerynext.com</p>
                  <p className="mt-1 text-gray-600">partnerships@grocerynext.com</p>
                </div>
              </div>
            </div>
            
            {/* Animated Map */}
            <motion.div 
              className="mt-8 rounded-xl overflow-hidden h-64 bg-gradient-to-br from-blue-50 to-green-50 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Our Location</p>
                  <p className="text-sm text-gray-600">Mumbai, India</p>
                </div>
              </div>
              
              {/* Animated pins */}
              <motion.div
                className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute top-2/3 left-2/3 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
                <p className="text-gray-600">
                  There was an error sending your message. Please try again.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
