"use client";

import { motion } from "framer-motion";
import { Play, MapPin, Clock } from "lucide-react";

// Extended mock data
const allStories = [
  {
    id: 1,
    name: "Ramesh's Mango Grove",
    location: "Siddipet",
    duration: "1:20",
    color: "bg-orange-100",
    thumbColor: "bg-orange-600",
    category: "Fruits"
  },
  {
    id: 2,
    name: "Lakshmi's Dairy Farm",
    location: "Medchal",
    duration: "0:45",
    color: "bg-blue-100",
    thumbColor: "bg-blue-600",
    category: "Dairy"
  },
  {
    id: 3,
    name: "Natural Rice Process",
    location: "Warangal",
    duration: "2:10",
    color: "bg-amber-100",
    thumbColor: "bg-amber-600",
    category: "Grains"
  },
  {
    id: 4,
    name: "Hydroponic Setup",
    location: "City Outskirts",
    duration: "1:00",
    color: "bg-green-100",
    thumbColor: "bg-green-600",
    category: "Vegetables"
  },
  {
    id: 5,
    name: "Beekeeping Collective",
    location: "Adilabad Forest",
    duration: "3:15",
    color: "bg-yellow-100",
    thumbColor: "bg-yellow-500",
    category: "Honey"
  },
  {
    id: 6,
    name: "Millet Revival Project",
    location: "Zaheerabad",
    duration: "2:30",
    color: "bg-stone-100",
    thumbColor: "bg-stone-500",
    category: "Millets"
  }
];

export default function StoriesPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Hero Section */}
      <section className="relative mt-28 mx-4 rounded-3xl py-24 bg-[#262A2B] text-[#F5F5F0] overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A6741]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#4A6741] text-xs font-bold tracking-widest uppercase mb-6"
            >
               <Play size={10} className="fill-current" /> NextGen TV
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="font-heading font-black text-5xl md:text-7xl mb-6"
            >
               Voices of the <span className="text-[#4A6741]">Field.</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-xl text-white/60 max-w-2xl mx-auto"
            >
               Authentic stories from the people who grow your food. No scripts, just pure passion and hard work.
            </motion.p>
         </div>
      </section>

      {/* Video Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.map((story, idx) => (
               <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer"
               >
                  {/* Background/Thumbnail Placeholder */}
                  <div className={`absolute inset-0 ${story.color} transition-transform duration-700 group-hover:scale-105`} />
                  <div className={`absolute inset-0 opacity-20 ${story.thumbColor}`} />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                        <Play size={32} className="fill-current ml-1" />
                     </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pt-32">
                     <div className="flex items-center justify-between mb-2 opacity-80">
                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                           <MapPin size={12} /> {story.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">
                           <Clock size={12} /> {story.duration}
                        </div>
                     </div>
                     <h3 className="font-heading font-bold text-2xl leading-tight group-hover:text-[#4A6741] transition-colors duration-300">
                        {story.name}
                     </h3>
                     <div className="mt-2 text-sm opacity-60 font-medium">
                        Category: {story.category}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}
