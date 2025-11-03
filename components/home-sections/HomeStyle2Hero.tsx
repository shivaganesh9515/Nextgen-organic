'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeStyle2Hero() {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CiAgPHBhdGggZD0iTTAgMGgxMDAgdjEwMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Fresh Groceries <span className="block">Delivered to Your Door</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl text-green-100">
              Quality products from local vendors, delivered fresh to your doorstep. Shop now and enjoy same-day delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg py-6 px-8" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600 text-lg py-6 px-8" asChild>
                <Link href="/vendor-register">Become a Vendor</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-semibold text-center">Fresh Fruits</h3>
                </div>
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-semibold text-center">Organic Veggies</h3>
                </div>
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-semibold text-center">Dairy Products</h3>
                </div>
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-semibold text-center">Bakery Items</h3>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold animate-bounce">
              Free Delivery
            </div>
            <div className="absolute -bottom-6 -left-6 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
              100% Fresh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}