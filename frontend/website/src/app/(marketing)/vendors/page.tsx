"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VendorsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#262A2B] text-[#F5F5F0] mt-28 mx-4 rounded-3xl py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="font-heading font-black text-5xl md:text-7xl mb-8">
               Grow with <span className="text-[#4A6741]">NextGen.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
               Join a network of certified farmers and organic producers. We handle the logistics and marketing, you focus on growing real food.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/register-vendor" className="px-8 py-4 bg-[#4A6741] text-white font-bold rounded-full hover:bg-[#3D5536] transition-colors">
                  Apply as Vendor
               </Link>
               <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-colors">
                  Learn More
               </button>
            </div>
         </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-12">
            {[
               { title: "Fair Pricing", desc: "We guarantee prices 20-30% higher than the local mandi rates." },
               { title: "Direct Access", desc: "Your produce reaches thousands of premium households directly." },
               { title: "Smart Logistics", desc: "Our tech-enabled supply chain reduces wastage to near zero." }
            ].map((feature, i) => (
               <div key={i} className="bg-[#F5F5F0] p-10 rounded-[2.5rem]">
                  <div className="w-12 h-12 bg-[#262A2B] rounded-full flex items-center justify-center text-white mb-6">
                     <Check size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#262A2B] mb-4">{feature.title}</h3>
                  <p className="text-[#262A2B]/70 leading-relaxed">{feature.desc}</p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
