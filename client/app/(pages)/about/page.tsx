'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About DailyPick</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At DailyPick, we believe that access to fresh, quality groceries should be convenient, 
            affordable, and sustainable. Our mission is to connect local communities with trusted 
            vendors who provide the freshest products while supporting local businesses.
          </p>
          <p className="text-gray-700 mb-4">
            We{`'`}re committed to revolutionizing the grocery shopping experience by combining 
            technology with traditional values of quality and service. Our platform makes it 
            easy for customers to discover and purchase fresh products from local vendors, 
            while providing vendors with the tools they need to grow their businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Quality: We never compromise on the quality of products we offer.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Sustainability: We support local vendors and environmentally responsible practices.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Community: We{`'`}re building stronger local communities through commerce.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Convenience: We make grocery shopping fast, easy, and enjoyable.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Browse Products</h3>
                  <p className="text-gray-700 text-sm">Explore thousands of fresh products from local vendors.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Place Order</h3>
                  <p className="text-gray-700 text-sm">Add items to your cart and checkout in minutes.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-gray-700 text-sm">Get your groceries delivered fresh within hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you{`'`}re a customer looking for fresh groceries or a vendor wanting to grow your business, 
            we{`'`}d love to have you as part of the DailyPick community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/auth/register">Sign Up as Customer</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/auth/vendor-register">Register as Vendor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}