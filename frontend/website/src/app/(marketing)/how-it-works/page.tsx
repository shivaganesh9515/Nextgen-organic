"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Truck, Sprout, ShoppingBag, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "You Order",
    desc: "Choose from our daily harvest of vegetables, fruits, and essentials on the app.",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    title: "We Harvest",
    desc: "Farmers receive your order and harvest fresh, ensuring maximum nutrient retention.",
    icon: Sprout,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Quality Check",
    desc: "Every batch undergoes rigorous quality checks and is tagged for traceability.",
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Doorstep Delivery",
    desc: "Delivered to your home in eco-friendly packaging within 24 hours of harvest.",
    icon: Truck,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
       <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
          <h1 className="font-heading font-black text-5xl md:text-7xl text-[#262A2B] mb-6">
             Farm to Fork, <br/>
             <span className="text-[#4A6741]">Simplified.</span>
          </h1>
          <p className="text-xl text-[#262A2B]/60 max-w-2xl mx-auto">
             No middlemen. No cold storage. Just fresh food moving at the speed of nature.
          </p>
       </div>

       <div className="max-w-5xl mx-auto px-6 pb-32">
          <div className="relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#262A2B]/10 -translate-x-1/2 rounded-full" />

             <div className="space-y-12">
                {steps.map((step, idx) => (
                   <motion.div 
                     key={step.id}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                   >
                      <div className="flex-1 w-full md:w-1/2 p-6">
                         <div className={`bg-white p-8 rounded-3xl shadow-lg border border-[#262A2B]/5 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}>
                             <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-[100px] ${step.color.split(" ")[0]}`} />
                             
                             <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-6`}>
                                <step.icon size={28} />
                             </div>
                             <h3 className="font-heading font-bold text-2xl text-[#262A2B] mb-3">{step.title}</h3>
                             <p className="text-[#262A2B]/70">{step.desc}</p>
                             <div className="absolute -bottom-4 -right-4 text-[120px] font-black text-[#262A2B]/5 leading-none -z-0">
                                {step.id}
                             </div>
                         </div>
                      </div>
                      
                      {/* Center Point */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#F5F5F0] border-4 border-[#4A6741] flex items-center justify-center shrink-0">
                         <div className="w-3 h-3 bg-[#4A6741] rounded-full" />
                      </div>

                      <div className="flex-1 w-full md:w-1/2 p-6 md:text-center text-[#262A2B]/40 font-medium italic hidden md:block">
                         Step 0{step.id}
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
