import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DailyPick</h3>
            <p className="text-gray-300">
              Your one-stop grocery store for fresh, quality products from local vendors.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Products</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
              <li><Link href="/vendors" className="text-gray-300 hover:text-white">Vendors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white">Returns Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@dailypick.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Grocery St, Foodville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DailyPick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}