'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Store, ArrowRight } from 'lucide-react';

export default function VendorCTA() {
  const benefits = [
    "Zero Listing Fees for First 3 Months",
    "Dedicated Vendor Dashboard",
    "Real-time Sales Analytics",
    "Direct Payments via Razorpay/UPI",
    "Marketing & SEO Support"
  ];

  return (
    <section className="py-20 bg-nature-pattern relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <span className="inline-block badge-organic mb-4">
                Join Our Marketplace
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">
                Wanna Become a Vendor?
              </h2>
              <p className="text-lg text-[#5a5a5a] mb-6">
                Partner with us to reach thousands of health-conscious customers across India 
                looking for authentic organic products. Grow your organic business 
                and contribute to a healthier planet.
              </p>
              
              <div className="space-y-3 mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#4a7c59] mr-2 flex-shrink-0" />
                    <span className="text-[#2d2d2d]">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="organic" size="lg" asChild>
                  <Link href="/auth/vendor-register">
                    <Store className="w-5 h-5 mr-2" />
                    Apply as Vendor
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#f5f1e8]" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
              
              <p className="text-[#5a5a5a] mt-4 text-sm">
                Already a vendor?{' '}
                <Link href="/auth/login" className="font-medium text-[#4a7c59] hover:text-[#2d5016] hover:underline">
                  Sign in to your dashboard
                </Link>
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-3xl p-8 border-2 border-[#d4c4a8]/50 card-organic">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#d4c4a8]/30 flex flex-col h-full">
                  <Users className="w-12 h-12 text-[#4a7c59] mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-bold text-[#2d5016] mb-1">500+</h3>
                  <p className="text-sm text-[#5a5a5a] flex-grow">Active Vendors</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#d4c4a8]/30 flex flex-col h-full">
                  <Users className="w-12 h-12 text-[#4a7c59] mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-bold text-[#2d5016] mb-1">50K+</h3>
                  <p className="text-sm text-[#5a5a5a] flex-grow">Happy Customers</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#d4c4a8]/30 flex flex-col h-full">
                  <Store className="w-12 h-12 text-[#4a7c59] mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-bold text-[#2d5016] mb-1">10K+</h3>
                  <p className="text-sm text-[#5a5a5a] flex-grow">Products Listed</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#d4c4a8]/30 flex flex-col h-full">
                  <CheckCircle className="w-12 h-12 text-[#4a7c59] mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-bold text-[#2d5016] mb-1">100%</h3>
                  <p className="text-sm text-[#5a5a5a] flex-grow">Organic Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}