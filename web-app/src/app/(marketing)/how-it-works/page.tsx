"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { MapVisual } from "@/components/ui/MapVisual";
import { User, Tractor, Store, ShoppingBag, Truck, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

type Role = "customer" | "farmer";

const journeys = {
  customer: [
    {
      title: "Browse & Order",
      desc: "Explore fresh, seasonal produce listed directly by verified local farmers. Choose Regular, Natural, or Organic.",
      icon: User,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Farm Harvest",
      desc: "Once orders are pooled, farmers harvest exactly what is needed. No cold storage, no waste.",
      icon: Tractor,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Quality Check @ Hub",
      desc: "Produce arrives at your local Hub Store. We inspect for freshness and pack your order.",
      icon: CheckCircle2,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Delivery / Pickup",
      desc: "Get it delivered within 24 hours of harvest, or pick it up from the Hub on your way home.",
      icon: ShoppingBag,
      color: "bg-purple-100 text-purple-600"
    }
  ],
  farmer: [
    {
      title: "List Harvest",
      desc: "Upload expected harvest dates and quantities. Set your own fair price.",
      icon: Tractor,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Receive Orders",
      desc: "Orders are aggregated from nearby customers. Know exactly how much to harvest.",
      icon: CheckCircle2,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Drop at Hub",
      desc: "Deliver bulk produce to the nearest verified Hub Store. No long commutes to city markets.",
      icon: Store,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Instant Payment",
      desc: "Receive payment directly to your bank account within 24 hours of Hub verification.",
      icon: ShoppingBag, // Using ShoppingBag as 'Wallet' metaphor or specific icon if available
      color: "bg-emerald-100 text-emerald-600"
    }
  ]
};

const faqs = [
  { q: "How do you verify Organic produce?", a: "We require valid NPOP/USDA certification documents for every 'Organic' listed product. We also conduct random lab tests." },
  { q: "What if the produce is damaged?", a: "Our Hub Stores quality check every item. If something slips through, report it in the app for an instant refund." },
  { q: "How fresh is the food?", a: "Unlike supermarkets where food sits for days, our produce is harvested only after orders are placed and delivered within 24 hours." },
];

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<Role>("customer");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="The Ecosystem" 
        subtitle="Understanding how your food travels from the soil to your table." 
      />

      {/* Map Section */}
      <section className="px-6 -mt-8 mb-20 relative z-10">
         <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white">
            <MapVisual />
         </div>
      </section>

      {/* Toggle Controls */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#F5F5F0] p-1.5 rounded-full flex relative">
           {/* Slider Bg */}
           <motion.div 
             className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm z-0"
             animate={{ 
               left: activeRole === "customer" ? "6px" : "50%", 
               width: "calc(50% - 6px)" 
             }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
           />
           
           <button 
             onClick={() => setActiveRole("customer")}
             className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeRole === "customer" ? "text-[#262A2B]" : "text-[#262A2B]/50"}`}
           >
             For Customers
           </button>
           <button 
             onClick={() => setActiveRole("farmer")}
             className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeRole === "farmer" ? "text-[#262A2B]" : "text-[#262A2B]/50"}`}
           >
             For Farmers
           </button>
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="relative">
           {/* Center Line */}
           <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-0.5 bg-dashed border-r-2 border-dashed border-[#E5E5E0] -translate-x-1/2" />

           <AnimatePresence mode="wait">
             <motion.div
               key={activeRole}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="space-y-12"
             >
               {journeys[activeRole].map((step, idx) => (
                 <div key={idx} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center relative ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content */}
                    <div className={`pl-16 md:pl-0 md:w-1/2 ${idx % 2 !== 0 ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}>
                       <h3 className="font-heading font-bold text-2xl text-[#262A2B] mb-2">{step.title}</h3>
                       <p className="text-[#262A2B]/60 leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Icon Node */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center z-10">
                       <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color}`}>
                          <step.icon size={20} />
                       </div>
                    </div>

                    {/* Empty Space for alternate side */}
                    <div className="md:w-1/2" />
                 </div>
               ))}
             </motion.div>
           </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F5F5F0] py-24">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-heading font-bold text-3xl text-center mb-12">Common Questions</h2>
            <div className="space-y-4">
               {faqs.map((faq, idx) => (
                 <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E0]">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold text-[#262A2B] hover:bg-gray-50 transition-colors"
                    >
                       {faq.q}
                       {openFaq === idx ? <ChevronUp size={20} className="text-[#4A6741]" /> : <ChevronDown size={20} className="text-[#262A2B]/40" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                           <div className="p-6 pt-0 text-[#262A2B]/70 leading-relaxed border-t border-[#F5F5F0]">
                              {faq.a}
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
