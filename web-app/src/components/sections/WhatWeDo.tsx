import { Sprout, Box, Truck, Store } from "lucide-react";

export function WhatWeDo() {
  const steps = [
    {
      icon: Sprout,
      title: "Ethical Sourcing",
      desc: "We partner directly with certified organic farmers, focusing on sustainable and chemical-free practices."
    },
    {
      icon: Box,
      title: "Quality Hubs",
      desc: "Produce travels to our local hubs for strict quality checks, grading, and eco-friendly packaging."
    },
    {
      icon: Truck,
      title: "Smart Logistics",
      desc: "Our tech-enabled fleet optimizes routes to ensure produce reaches the city within 12 hours of harvest."
    },
    {
      icon: Store,
      title: "Direct to You",
      desc: "Fresh, traceable organic food delivered to your doorstep or neighborhood pick-up points."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="text-sm font-bold text-[#65A30D] uppercase tracking-wider mb-3">Our Ecosystem</h2>
           <h3 className="text-4xl font-bold text-[#1a1c1e] mb-4">From Soil to Soul</h3>
           <p className="text-[#64748B] text-lg">We've reimagined the food supply chain to be transparent, fair, and incredibly fast.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {/* Connector Line (Desktop) */}
           <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#BEF264] to-transparent z-0" />

           {steps.map((step, i) => (
              <div key={i} className="relative z-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-16 h-16 rounded-2xl bg-[#BEF264] flex items-center justify-center text-[#1a1c1e] mb-6 shadow-lg shadow-[#BEF264]/30 mx-auto">
                    <step.icon size={32} strokeWidth={1.5} />
                 </div>
                 <h4 className="text-xl font-bold text-[#1a1c1e] mb-3 text-center">{step.title}</h4>
                 <p className="text-[#64748B] text-center leading-relaxed">{step.desc}</p>
                 
                 {/* Step Number */}
                 <div className="absolute top-4 right-4 text-xs font-bold text-[#65A30D] bg-[#65A30D]/10 px-2 py-1 rounded-full">
                    0{i + 1}
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
