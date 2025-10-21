import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-400">GroceryNext</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for fresh groceries delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
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
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
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
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=fruits" className="text-gray-300 hover:text-white transition">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dairy" className="text-gray-300 hover:text-white transition">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bakery" className="text-gray-300 hover:text-white transition">
                  Bakery & Biscuits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beverages" className="text-gray-300 hover:text-white transition">
                  Beverages
                </Link>
              </li>
              <li>
                <Link href="/shop?category=snacks" className="text-gray-300 hover:text-white transition">
                  Snacks & Munchies
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white transition">
                  View All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Market Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary-400" />
                <span className="text-gray-300">support@grocerynext.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GroceryNext. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}