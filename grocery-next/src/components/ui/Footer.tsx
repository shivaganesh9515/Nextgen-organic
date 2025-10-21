import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400 mr-2" />
              <h3 className="text-2xl font-bold text-green-400">OrganicNext</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering healthy living through authentic organic products while supporting sustainable farming practices.
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
                  Why Organic?
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
                <Link href="/terms" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Organic Categories */}
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
                <MapPin className="h-5 w-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Organic Market Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-gray-300">support@organicnext.com</span>
              </li>
            </ul>
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