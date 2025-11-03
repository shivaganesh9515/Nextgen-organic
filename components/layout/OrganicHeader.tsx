'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/shared/CartIcon';

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