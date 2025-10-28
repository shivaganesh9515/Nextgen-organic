'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf, Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the subscription here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400 mr-2" />
              <h3 className="text-2xl font-bold text-green-400">OrganicNext</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering healthy living through authentic organic products while supporting sustainable farming practices.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-3">
                Subscribe to our newsletter for the latest offers and health tips.
              </p>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 rounded-r-lg transition-colors flex items-center"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-gray-300 hover:text-white transition">
                  Our Vendors
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=fruits-vegetables" className="text-gray-300 hover:text-white transition">
                  Organic Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=grains-pulses" className="text-gray-300 hover:text-white transition">
                  Organic Grains & Pulses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dairy" className="text-gray-300 hover:text-white transition">
                  Organic Dairy & Alternatives
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beverages" className="text-gray-300 hover:text-white transition">
                  Organic Beverages
                </Link>
              </li>
              <li>
                <Link href="/shop?category=spices" className="text-gray-300 hover:text-white transition">
                  Organic Spices & Condiments
                </Link>
              </li>
              <li>
                <Link href="/shop?category=snacks" className="text-gray-300 hover:text-white transition">
                  Organic Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/account/orders" className="text-gray-300 hover:text-white transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-gray-300 hover:text-white transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="text-gray-300 hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-gray-300 hover:text-white transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Our Address</h5>
                <p className="text-gray-300 text-sm">
                  123 Organic Market Street, Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Call Us</h5>
                <p className="text-gray-300 text-sm">
                  +91 98765 43210<br />
                  Mon-Fri: 9AM-6PM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Email Us</h5>
                <p className="text-gray-300 text-sm">
                  support@organicnext.com<br />
                  help@organicnext.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OrganicNext. All rights reserved.</p>
          <p className="mt-2 text-sm">Empowering healthy living through authentic organic products</p>
        </div>
      </div>
    </footer>
  );
}