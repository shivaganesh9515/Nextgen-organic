'use client';

import Link from 'next/link';
import { CheckCircle, Users } from 'lucide-react';

export default function VendorCTA() {
  const benefits = [
    "Zero Listing Fees for First 3 Months",
    "Dedicated Vendor Dashboard",
    "Real-time Sales Analytics",
    "Direct Payments via Razorpay",
    "Marketing & SEO Support"
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
                Join Our Marketplace
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wanna Become a Vendor?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Partner with us to reach thousands of health-conscious customers 
                looking for authentic organic products. Grow your organic business 
                and contribute to a healthier planet.
              </p>
              
              <div className="space-y-3 mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Contact Us to Get Started
                </Link>
                <Link 
                  href="/auth/vendor-register" 
                  className="bg-white text-green-600 border border-green-600 font-medium py-3 px-6 rounded-lg hover:bg-green-50 transition-colors text-center"
                >
                  Apply as Vendor
                </Link>
              </div>
              
              <p className="text-gray-500 mt-4">
                <small>Already a vendor? <Link href="/auth/login" className="text-green-600 hover:underline">Sign in to your dashboard</Link></small>
              </p>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl" />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
                <div className="bg-white text-center p-4 shadow-lg rounded-lg">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-900">500+</h3>
                  <p className="text-sm text-gray-600">Active Vendors</p>
                </div>
                <div className="bg-white text-center p-4 shadow-lg rounded-lg">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-900">50K+</h3>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-white text-center p-4 shadow-lg rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-900">100%</h3>
                  <p className="text-sm text-gray-600">Organic Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}