"use client";

import { Check, Info } from "lucide-react";

const classifications = [
  {
    title: "Regular",
    subtitle: "Daily Essentials",
    color: "bg-blue-50 border-blue-100",
    textColor: "text-blue-800",
    badgeColor: "bg-blue-100 text-blue-800",
    features: [
      "Standard food safety compliance",
      "Most affordable option",
      "Sourced from trusted markets",
      "Fresh & Hygienic"
    ]
  },
  {
    title: "Natural",
    subtitle: "Chemical-Free",
    color: "bg-[#E8F0E5] border-[#4A6741]/20",
    textColor: "text-[#4A6741]",
    badgeColor: "bg-[#4A6741] text-white",
    popular: true,
    features: [
      "Zero chemical residues",
      "Traditional farming methods",
      "Next360 Verified (Non-certified)",
      "Best balance of health & price"
    ]
  },
  {
    title: "Organic",
    subtitle: "Certified Premium",
    color: "bg-[#D4A373]/10 border-[#D4A373]/30",
    textColor: "text-[#8a6b4c]",
    badgeColor: "bg-[#D4A373] text-white",
    features: [
      "100% Certified Organic",
      "Full traceability documentation",
      "Premium quality assurance",
      "Strict regulatory compliance"
    ]
  }
];

export function FoodTypes() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="text-[#4A6741] font-bold tracking-widest text-sm uppercase mb-2 block">Know What You Eat</span>
           <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B] mb-6"> Three Ways to Buy </h2>
           <p className="max-w-2xl mx-auto text-[#262A2B]/60 text-lg">
             We believe in total transparency. Whether you want affordable essentials or certified premium organic, we tell you exactly what you're getting.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {classifications.map((item, idx) => (
             <div key={idx} className={`relative p-8 rounded-3xl border ${item.color} flex flex-col h-full hover:-translate-y-1 transition-transform duration-300`}>
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4A6741] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6 text-center">
                   <h3 className={`font-heading font-bold text-3xl ${item.textColor} mb-1`}>{item.title}</h3>
                   <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.badgeColor}`}>
                     {item.subtitle}
                   </span>
                </div>

                <ul className="space-y-4 flex-1">
                   {item.features.map((feat, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#262A2B]/80 text-sm md:text-base">
                        <Check size={18} className={`mt-0.5 ${item.textColor}`} strokeWidth={3} />
                        <span>{feat}</span>
                     </li>
                   ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-black/5 text-center">
                   <button className="text-sm font-bold underline opacity-60 hover:opacity-100 transition-opacity">
                      Learn more
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
