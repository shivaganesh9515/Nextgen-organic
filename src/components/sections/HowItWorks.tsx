"use client";

import { motion } from "framer-motion";
import { User, Store, ShoppingBag, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse & Order",
    desc: "Customers choose fresh produce from local organic farms.",
    icon: User,
  },
  {
    id: 2,
    title: "Farm to Hub",
    desc: "Farmers harvest and deliver to a verified local hub.",
    icon: Store,
  },
  {
    id: 3,
    title: "Quality Check",
    desc: "Hubs verify quality and pack orders for pickup/delivery.",
    icon: ShoppingBag,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#F5F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B] mb-6">
              How It Works
            </h2>
            <p className="text-lg text-[#262A2B]/70 mb-8 leading-relaxed">
              We've simplified the supply chain to ensure transparency and freshness. No hidden warehouses, just farm to hub to you.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#E5E5E0]">
                <div className="h-10 w-1 bg-[#4A6741] rounded-full" />
                <div>
                  <h4 className="font-bold text-[#262A2B]">Customer Flow</h4>
                  <p className="text-sm text-gray-500">Order → Verify → Receive</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#E5E5E0] opacity-80">
                 <div className="h-10 w-1 bg-[#D4A373] rounded-full" />
                 <div>
                  <h4 className="font-bold text-[#262A2B]">Vendor Flow</h4>
                  <p className="text-sm text-gray-500">List → Harvest → Deliver to Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="w-full md:w-1/2 relative">
             <div className="relative z-10 grid gap-6">
               {steps.map((step, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.2 }}
                   className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm relative"
                 > 
                   {idx !== steps.length - 1 && (
                     <div className="absolute left-[2.6rem] top-16 w-0.5 h-8 bg-dashed border-l-2 border-dashed border-gray-200" />
                   )}
                   <div className="w-14 h-14 rounded-full bg-[#E8F0E5] text-[#4A6741] flex items-center justify-center flex-shrink-0">
                     <step.icon size={24} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-[#262A2B]">{step.title}</h3>
                     <p className="text-sm text-gray-500">{step.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
             
             {/* Background Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4A6741]/5 rounded-full blur-3xl -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}
