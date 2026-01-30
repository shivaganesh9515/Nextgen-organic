"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

const stories = [
  {
    name: "Ramesh's Mango Grove",
    location: "Siddipet",
    duration: "1:20",
    color: "bg-orange-100",
    thumbColor: "bg-orange-600"
  },
  {
    name: "Lakshmi's Dairy Farm",
    location: "Medchal",
    duration: "0:45",
    color: "bg-blue-100",
    thumbColor: "bg-blue-600"
  },
  {
    name: "Natural Rice Process",
    location: "Warangal",
    duration: "2:10",
    color: "bg-amber-100",
    thumbColor: "bg-amber-600"
  },
  {
    name: "Hydroponic Setup",
    location: "City Outskirts",
    duration: "1:00",
    color: "bg-green-100",
    thumbColor: "bg-green-600"
  },
];

export function FarmerStories() {
  return (
    <section id="farmer-stories" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B] mb-4">
                Meet the Hands
              </h2>
              <p className="text-[#262A2B]/60 max-w-lg text-lg">
                Real videos from the fields. See how your food is grown, harvested, and packed with love.
              </p>
           </div>
           <Link 
             href="/stories"
             className="hidden md:block text-[#E23744] font-bold hover:underline transition-all"
           >
             Watch all stories &rarr;
           </Link>
        </div>

        {/* Carousel (Simulated) */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
           {stories.map((story, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`flex-shrink-0 w-[280px] h-[450px] rounded-3xl relative overflow-hidden cursor-pointer group snap-center ${story.color}`}
             >
                {/* Simulated Thumbnail */}
                <div className={`absolute inset-0 opacity-20 ${story.thumbColor}`} />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                     <Play size={24} fill="currentColor" />
                   </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white pt-20">
                   <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{story.location}</div>
                   <h3 className="font-heading font-bold text-xl leading-tight mb-2">{story.name}</h3>
                   <div className="flex items-center gap-2 text-xs opacity-60">
                      <Play size={12} /> {story.duration}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
