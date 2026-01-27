"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { name: "Vegetables", items: "Carrots, Spinach, Okra", color: "from-[#FFE0B2] to-[#FFCC80]", shadow: "shadow-orange-500/20", image: "/icons/3d/carrot.png", scale: 1.25, y: -15, rotate: 10 },
  { name: "Fruits", items: "Mangoes, Bananas", color: "from-[#E1BEE7] to-[#CE93D8]", shadow: "shadow-purple-500/20", image: "/icons/3d/eggplant.png", scale: 1.15, y: -8, rotate: -5 },
  { name: "Bakery", items: "Millet Bread, Cookies", color: "from-[#FFF9C4] to-[#FFF59D]", shadow: "shadow-yellow-500/20", image: "/icons/3d/bakery.png", scale: 1.25, y: -10, rotate: 15 },
  { name: "Essentials", items: "Coffee, Honey, Spices", color: "from-[#D7CCC8] to-[#BCAAA4]", shadow: "shadow-stone-500/20", image: "/icons/3d/essentials.png", scale: 1.15, y: 0, rotate: -10 },
  { name: "Snacks", items: "Healthy Munchies", color: "from-[#FFCCBC] to-[#FFAB91]", shadow: "shadow-red-500/20", image: "/icons/3d/snacks.png", scale: 1.2, y: -8, rotate: 5 },
];

export function Categories() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#4A6741]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#E23744]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <span className="text-[#4A6741] font-bold tracking-widest text-sm uppercase mb-3 block">Fresh Collections</span>
           <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#262A2B]">
             What's in the Store?
           </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-center">
           {categories.map((cat, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05, type: "spring", stiffness: 50 }}
               whileHover={{ y: -15, scale: 1.02 }}
               className="group cursor-pointer text-center relative"
             >
                {/* Visual Card */}
                <div className={`aspect-square rounded-[2rem] bg-gradient-to-br ${cat.color} mb-5 relative transition-all duration-500 group-hover:shadow-2xl ${cat.shadow} flex flex-col justify-end pb-6 px-2 overflow-visible`}>
                  
                  {/* Floating 3D Image with sophisticated hover animation */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 z-20 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3">
                      <div className="relative w-full h-full filter drop-shadow-2xl">
                        <Image 
                          src={cat.image} 
                          alt={cat.name} 
                          fill 
                          className="object-contain"
                          style={{ 
                            transform: `scale(${cat.scale}) translateY(${cat.y}px) rotate(${cat.rotate}deg)`,
                          }}
                        />
                      </div>
                  </div>

                  {/* Glassmorphism Detail Card */}
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-3 mx-2 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                      <h3 className="font-heading font-bold text-lg text-[#262A2B] leading-tight">{cat.name}</h3>
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                         <p className="text-[10px] uppercase font-bold text-[#262A2B]/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Explore</p>
                      </div>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
