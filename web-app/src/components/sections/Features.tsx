"use client";

import { motion } from "framer-motion";
import { Tractor, Store, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Tractor,
    title: "Farm Vendors",
    description: "Verified organic farmers listing fresh produce directly from the source.",
    color: "bg-[#4A6741]",
  },
  {
    icon: Store,
    title: "Hub Stores",
    description: "Local collection points ensuring verified quality and easy pickup.",
    color: "bg-[#D4A373]",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every product goes through a strict 3-step organic verification process.",
    color: "bg-[#8AA881]",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Optimized logistics to get produce from farm to hub within 24 hours.",
    color: "bg-[#262A2B]",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#262A2B] mb-4">
            Whole Ecosystem coverage
          </h2>
          <p className="text-[#262A2B]/60 max-w-2xl mx-auto">
            We don't just sell vegetables. We've built a complete trusted ecosystem connecting verified growers with conscious consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#F5F5F0] hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E5E5E0]"
            >
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-md`}>
                <feature.icon size={28} />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#262A2B] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[#262A2B]/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
