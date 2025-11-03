Follow this file and update the project as per this to make it more stunning so that it will be more awesome to see make sure use this perfectly 

This is for the new update of the website. for the hero section:

import React, { useState, useEffect } from 'react';

export default function OrganicHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leaves = [
    { delay: '0s', left: '10%' },
    { delay: '2s', left: '30%' },
    { delay: '4s', left: '50%' },
    { delay: '1s', left: '70%' },
    { delay: '3s', left: '90%' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Animated Background Leaves */}
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="absolute text-6xl opacity-20"
          style={{
            left: leaf.left,
            animation: `leaf-fall 8s linear infinite`,
            animationDelay: leaf.delay,
          }}
        >
          🍃
        </div>
      ))}

      {/* Organic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 8.28-6.72 15-15 15s-15-6.72-15-15S6.72 0 15 0s15 6.72 15 15z' fill='%232D5016' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="space-y-8 animate-grow"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            {/* Organic Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-organic">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-semibold text-green-800">100% Organic & Fresh</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">
                Farm Fresh
              </span>
              <span className="block text-green-900 mt-2">
                Organic Groceries
              </span>
              <span className="block text-amber-600 text-5xl mt-2" style={{ fontFamily: 'Caveat, cursive' }}>
                to Your Doorstep
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Experience the goodness of nature with our handpicked organic products. 
              Fresh from local farms, delivered with love. 🍅🥕🥬
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-organic-lg hover:shadow-organic-xl transition-all duration-300 hover:-translate-y-1">
                <span className="relative z-10 flex items-center">
                  Shop Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button className="px-8 py-4 bg-white text-green-700 rounded-2xl font-bold text-lg shadow-organic hover:shadow-organic-lg transition-all duration-300 border-2 border-green-200 hover:border-green-400 hover:-translate-y-1">
                View Products
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Certified Organic</p>
                  <p className="text-sm text-gray-600">100% Natural</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Same Day Delivery</p>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-float">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-200 rounded-full opacity-30 blur-3xl" />
              
              {/* Product Showcase */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-organic-xl">
                {/* Placeholder for Product Image */}
                <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl">🥗</div>
                    <p className="text-2xl font-bold text-green-900">Fresh Organic Basket</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-green-600">₹299</span>
                      <span className="text-xl text-gray-500 line-through">₹450</span>
                    </div>
                    <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      34% OFF
                    </div>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-organic-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">⭐</span>
                    <div>
                      <p className="text-2xl font-bold text-green-900">4.8</p>
                      <p className="text-xs text-gray-600">2.5k+ reviews</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stock Card */}
                <div className="absolute -bottom-6 -left-6 bg-green-600 text-white rounded-2xl p-4 shadow-organic-lg">
                  <p className="text-sm font-semibold">🔥 Trending</p>
                  <p className="text-xs opacity-90">500+ sold today</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌿</div>
            <div className="absolute bottom-20 left-0 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🍊</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes leaf-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes grow {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

--------------------------------------------------------------------------------------
This below is gonnna we use it for the Desgin system for the project :

/* app/globals.css - Complete Organic Design System */

@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ===== ORGANIC COLOR PALETTE ===== */
@theme inline {
  /* Primary - Earthy Green */
  --color-primary: #2D5016;
  --color-primary-foreground: #FFFFFF;
  --color-primary-light: #4A7C2C;
  --color-primary-dark: #1A3309;
  
  /* Secondary - Natural Brown */
  --color-secondary: #8B6F47;
  --color-secondary-foreground: #FFFFFF;
  --color-secondary-light: #B89968;
  --color-secondary-dark: #6B5334;
  
  /* Accent - Fresh Leaf */
  --color-accent: #7CB342;
  --color-accent-foreground: #FFFFFF;
  --color-accent-light: #9CCC65;
  --color-accent-dark: #558B2F;
  
  /* Organic Neutrals */
  --color-sand: #F5F1E8;
  --color-cream: #FFF8E7;
  --color-earth: #D7CCC8;
  --color-bark: #5D4037;
  
  /* Background */
  --color-background: #FAFAF8;
  --color-foreground: #2C2C2C;
  
  /* Card & UI Elements */
  --color-card: #FFFFFF;
  --color-card-foreground: #2C2C2C;
  --color-popover: #FFFFFF;
  --color-popover-foreground: #2C2C2C;
  
  /* Muted - Soft Sage */
  --color-muted: #E8F5E9;
  --color-muted-foreground: #558B2F;
  
  /* Destructive - Organic Red */
  --color-destructive: #C62828;
  --color-border: #E0DED8;
  --color-input: #E8F5E9;
  --color-ring: #7CB342;
  
  /* Chart Colors - Natural Palette */
  --color-chart-1: #7CB342;
  --color-chart-2: #8B6F47;
  --color-chart-3: #FFA726;
  --color-chart-4: #4CAF50;
  --color-chart-5: #66BB6A;
  
  /* Organic Radius */
  --radius: 1rem;
  --radius-sm: 0.75rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  
  /* Custom Fonts */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-organic: 'Caveat', cursive;
}

/* ===== DARK MODE - Organic Night Theme ===== */
.dark {
  --color-background: #1A1A18;
  --color-foreground: #F5F1E8;
  --color-card: #2C2A26;
  --color-card-foreground: #F5F1E8;
  --color-primary: #7CB342;
  --color-secondary: #B89968;
  --color-muted: #2C2A26;
  --color-border: #3F3D38;
}

/* ===== ORGANIC TYPOGRAPHY ===== */
@layer base {
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@400;600;700&display=swap');
  
  * {
    @apply border-border outline-ring/50;
  }
  
  body {
    @apply bg-background text-foreground font-body;
    font-feature-settings: "kern" 1, "liga" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  
  h1 {
    @apply text-5xl md:text-6xl lg:text-7xl;
  }
  
  h2 {
    @apply text-4xl md:text-5xl;
  }
  
  h3 {
    @apply text-3xl md:text-4xl;
  }
}

/* ===== ORGANIC ANIMATIONS ===== */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes leaf-fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

@keyframes grow {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes organic-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-leaf-fall {
  animation: leaf-fall 8s linear infinite;
}

.animate-grow {
  animation: grow 0.5s ease-out;
}

.animate-organic-pulse {
  animation: organic-pulse 2s ease-in-out infinite;
}

/* ===== ORGANIC PATTERNS ===== */
.organic-texture {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.leaf-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 8.28-6.72 15-15 15s-15-6.72-15-15S6.72 0 15 0s15 6.72 15 15z' fill='%237CB342' fill-opacity='0.05'/%3E%3C/svg%3E");
}

.organic-gradient {
  background: linear-gradient(135deg, #7CB342 0%, #558B2F 100%);
}

.earth-gradient {
  background: linear-gradient(135deg, #8B6F47 0%, #5D4037 100%);
}

.cream-gradient {
  background: linear-gradient(135deg, #FFF8E7 0%, #F5F1E8 100%);
}

/* ===== ORGANIC UI ELEMENTS ===== */
.organic-card {
  @apply bg-card rounded-xl border border-border shadow-sm;
  background-image: 
    radial-gradient(circle at 100% 0%, rgba(124, 179, 66, 0.05) 0%, transparent 50%);
}

.organic-card:hover {
  @apply shadow-lg border-primary/20;
  transform: translateY(-4px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.organic-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  color: #2D5016;
  box-shadow: 0 2px 4px rgba(124, 179, 66, 0.1);
}

.organic-badge-premium {
  @apply organic-badge;
  background: linear-gradient(135deg, #FFF8E7 0%, #FFE082 100%);
  color: #6B5334;
}

/* ===== ORGANIC BUTTONS ===== */
.btn-organic {
  @apply px-6 py-3 rounded-xl font-semibold text-white;
  background: linear-gradient(135deg, #7CB342 0%, #558B2F 100%);
  box-shadow: 0 4px 12px rgba(124, 179, 66, 0.3);
  transition: all 0.3s ease;
}

.btn-organic:hover {
  box-shadow: 0 6px 20px rgba(124, 179, 66, 0.4);
  transform: translateY(-2px);
}

.btn-organic:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(124, 179, 66, 0.3);
}

.btn-earth {
  @apply btn-organic;
  background: linear-gradient(135deg, #8B6F47 0%, #5D4037 100%);
  box-shadow: 0 4px 12px rgba(139, 111, 71, 0.3);
}

.btn-earth:hover {
  box-shadow: 0 6px 20px rgba(139, 111, 71, 0.4);
}

/* ===== ORGANIC INPUTS ===== */
.input-organic {
  @apply w-full px-4 py-3 rounded-xl border-2 border-border bg-background;
  transition: all 0.3s ease;
}

.input-organic:focus {
  @apply border-primary outline-none ring-4 ring-primary/20;
}

/* ===== CUSTOM SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #F5F1E8;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7CB342 0%, #558B2F 100%);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #558B2F 0%, #2D5016 100%);
}

/* ===== ORGANIC SHADOWS ===== */
.shadow-organic {
  box-shadow: 
    0 4px 6px -1px rgba(45, 80, 22, 0.1),
    0 2px 4px -1px rgba(45, 80, 22, 0.06);
}

.shadow-organic-lg {
  box-shadow: 
    0 10px 15px -3px rgba(45, 80, 22, 0.1),
    0 4px 6px -2px rgba(45, 80, 22, 0.05);
}

.shadow-organic-xl {
  box-shadow: 
    0 20px 25px -5px rgba(45, 80, 22, 0.1),
    0 10px 10px -5px rgba(45, 80, 22, 0.04);
}

/* ===== SELECTION STYLES ===== */
::selection {
  background-color: #7CB342;
  color: white;
}

::-moz-selection {
  background-color: #7CB342;
  color: white;
}
---------------------------------------------------------------------------------------------
This below code is for the product card design use this perfectly into the project :

import React, { useState } from 'react';

export default function OrganicProductCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '1',
    name: 'Organic Fresh Tomatoes',
    category: 'Vegetables',
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.8,
    reviews: 234,
    unit: '1 kg',
    stock: 50,
    badge: '100% Organic',
    delivery: 'Same Day',
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
        {/* Product Card 1 - Modern Organic */}
        <div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500 transform hover:-translate-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative h-72 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
            {/* Product Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl">🍅</span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                {product.badge}
              </span>
              <span className="block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                {product.discount}% OFF
              </span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            >
              <svg
                className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Quick View (on hover) */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center animate-grow">
                <button className="px-6 py-3 bg-white text-green-700 rounded-xl font-bold shadow-lg hover:bg-green-50 transition-colors">
                  Quick View 👁️
                </button>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                {product.category}
              </span>
              <span className="text-xs text-gray-500">{product.unit}</span>
            </div>

            {/* Product Name */}
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-2xl">🚚</span>
              <span className="text-gray-600">
                <span className="font-semibold text-green-600">{product.delivery}</span> Delivery
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-sm text-red-500 font-semibold">Save ₹{product.originalPrice - product.price}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center font-bold text-green-600"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center font-bold text-green-600"
                >
                  +
                </button>
              </div>

              {/* Stock Info */}
              <span className="text-xs text-gray-500">
                {product.stock} left in stock
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add
              </button>
              <button className="px-4 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                Buy Now
              </button>
            </div>
          </div>

          {/* Organic Leaf Decoration */}
          <div className="absolute bottom-4 right-4 text-4xl opacity-10 pointer-events-none">
            🌿
          </div>
        </div>

        {/* Product Card 2 - Minimalist Organic */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500">
          <div className="relative">
            {/* Gradient Header */}
            <div className="h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">🥕</span>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                Fresh Today
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-orange-600 font-semibold uppercase">Vegetables</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">Organic Carrots</h3>
                </div>
                <button className="w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors flex items-center justify-center">
                  ❤️
                </button>
              </div>

              {/* Mini Features */}
              <div className="flex items-center space-x-3 text-xs">
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full font-semibold">✓ Certified</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">❄️ Fresh</span>
                <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-semibold">🚀 Fast</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-orange-600">₹65</p>
                  <p className="text-xs text-gray-500">500g</p>
                </div>
                <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Add to Cart
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="font-bold text-gray-900">⭐ 4.9</p>
                  <p className="text-gray-500">Rating</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">🚚 1hr</p>
                  <p className="text-gray-500">Delivery</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">✓ Fresh</p>
                  <p className="text-gray-500">Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-grow {
          animation: grow 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
--------------------------------------------------------------------------------------------
This below code for the category section so use this peerfectly too :
import React, { useState } from 'react';

export default function OrganicCategories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: 1,
      name: 'Fresh Vegetables',
      icon: '🥬',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      count: 156,
      trending: true,
    },
    {
      id: 2,
      name: 'Organic Fruits',
      icon: '🍎',
      color: 'from-red-400 to-rose-500',
      bgColor: 'bg-red-50',
      count: 124,
      trending: true,
    },
    {
      id: 3,
      name: 'Dairy Products',
      icon: '🥛',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      count: 89,
      trending: false,
    },
    {
      id: 4,
      name: 'Fresh Herbs',
      icon: '🌿',
      color: 'from-lime-400 to-green-500',
      bgColor: 'bg-lime-50',
      count: 45,
      trending: false,
    },
    {
      id: 5,
      name: 'Bakery Items',
      icon: '🍞',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      count: 67,
      trending: false,
    },
    {
      id: 6,
      name: 'Spices & Oils',
      icon: '🌶️',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
      count: 92,
      trending: true,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            🌱 Explore Our Range
          </span>
          <h2 className="text-5xl font-bold text-gray-900">
            Shop by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh, organic products handpicked from local farms to your kitchen
          </p>
        </div>

        {/* Categories Grid - Modern Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative cursor-pointer transition-all duration-300 ${
                activeCategory === index ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setActiveCategory(index)}
            >
              {/* Category Card */}
              <div className={`relative ${category.bgColor} rounded-3xl p-6 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    🔥 Hot
                  </div>
                )}

                {/* Icon */}
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-bold text-gray-900 text-center mb-2">
                  {category.name}
                </h3>

                {/* Product Count */}
                <span className="text-xs text-gray-500 font-semibold">
                  {category.count} Products
                </span>

                {/* Hover Effect - Arrow */}
                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Decorative Leaf */}
                <div className="absolute -bottom-2 -right-2 text-4xl opacity-5 group-hover:opacity-10 transition-opacity">
                  🍃
                </div>
              </div>

              {/* Active Indicator */}
              {activeCategory === index && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Featured Category Banner */}
        <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 8.28-6.72 15-15 15s-15-6.72-15-15S6.72 0 15 0s15 6.72 15 15z' fill='white' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 p-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                🎉 Special Offer
              </span>
              <h3 className="text-4xl font-bold leading-tight">
                Get 30% OFF on<br />
                First Order
              </h3>
              <p className="text-green-50 text-lg">
                Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">ORGANIC30</span> at checkout
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Shop Now
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Floating Products */}
            <div className="relative h-64 hidden md:block">
              <div className="absolute top-0 right-20 animate-float">
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-6xl shadow-xl">
                  🥕
                </div>
              </div>
              <div className="absolute top-20 right-0 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-xl">
                  🍅
                </div>
              </div>
              <div className="absolute bottom-0 right-32 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-xl">
                  🥬
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: '✓', title: '100% Organic', desc: 'Certified fresh products' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Within 24 hours' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive rates' },
            { icon: '🎁', title: 'Easy Returns', desc: '7-day return policy' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
-------------------------------
update home page
// Replace your current homepage with:
   import OrganicHero from '@/components/home-sections/OrganicHero';
   import OrganicCategories from '@/components/home-sections/OrganicCategories';
   import FeaturedProducts from '@/components/home-sections/FeaturedProducts';
   
   export default function Home() {
     return (
       <>
         <OrganicHero />
         <OrganicCategories />
         <FeaturedProducts />
       </>
     );
   }

   # Create these files and paste content from artifacts
   components/home-sections/OrganicHero.tsx
   components/home-sections/OrganicCategories.tsx
   components/custom/cards/OrganicProductCard.tsx


   // components/layout/Header.tsx - Updated Organic Header
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/shared/CartIcon';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function OrganicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-organic">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform">
              🌱
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              DailyPick Organic
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Products', 'Categories', 'Vendors', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-600 font-semibold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <CartIcon />
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-organic hover:shadow-organic-lg">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}