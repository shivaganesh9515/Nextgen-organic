import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-emerald-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl">
                🌱
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                DailyPick Organic
              </h3>
            </div>
            <p className="text-green-100">
              Your organic grocery store for fresh, quality products from local vendors.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-green-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-green-100 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/categories" className="text-green-100 hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/vendors" className="text-green-100 hover:text-white transition-colors">Vendors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-green-100 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-green-100 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-green-100 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-green-100 hover:text-white transition-colors">Returns Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <ul className="space-y-2 text-green-100">
              <li>Email: info@dailypick.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Organic St, Greenvile</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-400 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} DailyPick Organic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}