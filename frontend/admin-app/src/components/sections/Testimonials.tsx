"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    role: "Local Farmer",
    name: "Rajesh Kumar",
    location: "Organic Roots Farm, Nashik",
    quote: "Finally, a platform that respects our hard work. Next360 handles the logistics so I can focus on growing pure food.",
    rating: 5
  },
  {
    role: "Hub Store Owner",
    name: "Sarah Jenkins",
    location: "Green Valley Community Hub",
    quote: "My store has become the neighborhood favorite. The produce quality is unmatched, and customers love the transparency.",
    rating: 5
  },
  {
    role: "Customer",
    name: "Priya Sharma",
    location: "Health Conscious Mom",
    quote: "I visited the farm where my spinach was grown through the app. That level of trust means everything to my family.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F5F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B] mb-4">
            Trusted by the Community
          </h2>
          <p className="text-[#262A2B]/60 max-w-2xl mx-auto text-lg">
            Real stories from the people building a better food system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-[#E5E5E0] relative group hover:-translate-y-1 transition-transform duration-300"
            >
              <Quote className="absolute top-8 right-8 text-[#4A6741]/10 w-10 h-10 group-hover:text-[#4A6741]/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#E9C46A] text-[#E9C46A]" />
                ))}
              </div>
              
              <p className="text-[#262A2B]/80 text-lg leading-relaxed mb-8 font-medium">
                "{item.quote}"
              </p>
              
              <div className="pt-6 border-t border-[#F5F5F0]">
                 <div className="font-heading font-bold text-[#262A2B]">{item.name}</div>
                 <div className="text-sm text-[#4A6741] font-medium mb-1">{item.role}</div>
                 <div className="text-xs text-[#262A2B]/40">{item.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
