import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, Sprout, ShoppingBag, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';

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
    <div className="relative min-h-screen overflow-hidden bg-nature-pattern">
      {/* Animated Background Leaves */}
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="absolute text-6xl opacity-10"
          style={{
            left: leaf.left,
            animation: `float 8s ease-in-out infinite`,
            animationDelay: leaf.delay,
            transform: `translateY(${scrollY * 0.5}px)`,
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

      {/* Decorative Blur Circles */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#87a96b]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-[#8b6f47]/20 to-transparent rounded-full blur-3xl"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] border border-[#a5d6a7] text-[#2d5016] font-semibold">
              <Sprout className="w-4 h-4" />
              Premium Organic Marketplace
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient-organic">Fresh Organic</span>
              <br />
              <span className="text-[#2d5016]">Products Delivered</span>
              <br />
              <span className="text-[#4a7c59]">to Your Doorstep</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-[#5a5a5a] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover premium quality organic products from certified farms. Fresh, natural, and delivered with care.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-5 h-5 text-[#4a7c59]" />
                <span className="text-[#2d5016] font-medium">100% Certified</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-5 h-5 text-[#4a7c59]" />
                <span className="text-[#2d5016] font-medium">Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-5 h-5 text-[#4a7c59]" />
                <span className="text-[#2d5016] font-medium">Free Delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="organic" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Organic Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#f5f1e8]" asChild>
                <Link href="/vendors">
                  <Leaf className="w-5 h-5 mr-2" />
                  Explore Vendors
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-float">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-[#87a96b]/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-[#8b6f47]/30 to-transparent rounded-full blur-3xl" />
              
              {/* Product Showcase */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-organic-xl border-2 border-[#d4c4a8]/50">
                {/* Placeholder for Product Image */}
                <div className="aspect-square bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-2xl flex items-center justify-center border-2 border-[#d4c4a8]/30">
                  <div className="text-center space-y-4">
                    <div className="text-8xl">🥗</div>
                    <p className="text-2xl font-bold text-[#2d5016]">Fresh Organic Basket</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-[#4a7c59]">$29.99</span>
                      <span className="text-xl text-[#8b8b8b] line-through">$45.00</span>
                    </div>
                    <div className="inline-flex items-center bg-gradient-to-r from-[#c17767] to-[#d48777] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      34% OFF
                    </div>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-organic-lg border-2 border-[#d4c4a8]/50">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                    <div>
                      <p className="font-bold text-[#2d5016]">4.9</p>
                      <p className="text-xs text-[#8b8b8b]">500+ Reviews</p>
                    </div>
                  </div>
                </div>

                {/* Organic Badge */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="badge-organic px-6 py-2">
                    <Leaf className="w-4 h-4 mr-2 inline" />
                    Certified Organic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}