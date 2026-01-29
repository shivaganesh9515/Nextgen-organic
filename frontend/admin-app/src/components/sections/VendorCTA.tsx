"use client";

import Link from "next/link";

export function VendorCTA() {
  return (
    <section className="py-24 bg-[#F5F5F0]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B] mb-6">
          Grow with Next360
        </h2>
        <p className="text-xl text-[#262A2B]/70 mb-10">
          Are you a farmer or a local store owner? Join the ecosystem that puts producers first. 
          Fair pricing, guaranteed payments, and a community that cares.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link
             href="/vendors"
             className="px-8 py-4 bg-[#4A6741] text-white rounded-full text-lg font-medium shadow-lg hover:bg-[#3D5536] transition-all"
           >
             Start Selling
           </Link>
           <Link
             href="/login"
             className="px-8 py-4 bg-transparent text-[#262A2B] font-medium hover:text-[#4A6741] transition-colors"
           >
             Vendor Login &rarr;
           </Link>
        </div>
      </div>
    </section>
  );
}
