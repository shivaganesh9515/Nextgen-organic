import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import StandardizedInput from './ui/StandardizedInput';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600 mb-4">
              GroceryNext is your one-stop shop for the freshest organic groceries, delivered right to your doorstep.
            </p>
            <Link href="/about" className="text-primary-600 hover:underline">
              Learn More
            </Link>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-600 hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:underline">Contact Us</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2">
              <li><Link href="/vendors/join" className="text-gray-600 hover:underline">Become a Vendor</Link></li>
              <li><Link href="/vendor/login" className="text-gray-600 hover:underline">Vendor Login</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-primary-600"><Facebook /></a>
              <a href="#" className="text-gray-600 hover:text-primary-600"><Twitter /></a>
              <a href="#" className="text-gray-600 hover:text-primary-600"><Instagram /></a>
              <a href="#" className="text-gray-600 hover:text-primary-600"><Linkedin /></a>
            </div>
            <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
            <form>
              <div className="flex">
                <StandardizedInput type="email" placeholder="Your email" className="w-full rounded-l-md" />
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} GroceryNext. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}