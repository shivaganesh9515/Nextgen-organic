"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Leaf, Users, Sprout, Heart } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Farmers Empowered",
    value: 120,
    suffix: "+",
    icon: Users,
    color: "text-[#4A6741]", // Brand Green
    bg: "bg-[#4A6741]/10",
  },
  {
    id: 2,
    label: "Acres Regenerated",
    value: 450,
    suffix: "ac",
    icon: Sprout,
    color: "text-[#8AA881]", // Sage Leaf
    bg: "bg-[#8AA881]/10",
  },
  {
    id: 3,
    label: "Chemicals Avoided",
    value: 2500,
    suffix: "kg",
    icon: Leaf,
    color: "text-[#D4A373]", // Harvest Gold
    bg: "bg-[#D4A373]/10",
  },
  {
    id: 4,
    label: "Families Served",
    value: 5000,
    suffix: "+",
    icon: Heart,
    color: "text-[#E23744]", // Brand Red
    bg: "bg-[#E23744]/10",
  },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    let startTime: number;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      
      const current = Math.floor(progress * (to - from) + from);
      node.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef} />;
}

export function ImpactStats() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-block py-1 px-3 rounded-full bg-[#4A6741]/10 text-[#4A6741] text-sm font-semibold tracking-wide uppercase mb-4"
           >
             Our Impact
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-heading font-bold text-3xl md:text-4xl text-[#262A2B]"
           >
             Growing a Healthier Future
           </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="font-heading font-bold text-4xl md:text-5xl text-[#262A2B] mb-2 flex items-baseline">
                  <Counter from={0} to={stat.value} />
                  <span className="text-2xl ml-1 text-[#4A6741]">{stat.suffix}</span>
                </div>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
