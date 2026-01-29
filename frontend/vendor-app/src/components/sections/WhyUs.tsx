"use client";

import { CheckCircle2 } from "lucide-react";

export function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#262A2B] rounded-3xl p-8 md:p-16 text-[#F5F5F0] relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Why choose <span className="text-[#4A6741]">Next360?</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                We are reclaiming the word "Organic". No greenwashing, no hidden preservatives. Just honest food from honest farmers.
              </p>
              
              <ul className="space-y-4">
                {[
                  "100% Verified Local Sourcing",
                  "Farmer-First Pricing Model",
                  "Complete Supply Chain Transparency",
                  "Community-Based Quality Checks"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#4A6741]" size={20} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

             <div className="relative">
                <div className="aspect-square rounded-2xl bg-[#3D4244] p-8 border border-white/5 relative flex items-center justify-center">
                   <div className="text-center">
                      <span className="block text-6xl md:text-8xl font-bold text-[#4A6741] mb-2">360°</span>
                      <span className="text-xl uppercase tracking-widest opacity-60">Transparency</span>
                   </div>
                   
                   {/* Decorative Circles */}
                   <div className="absolute inset-0 border border-white/5 rounded-full scale-125" />
                   <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
                </div>
             </div>
          </div>
          
          {/* Bg Pattern */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
