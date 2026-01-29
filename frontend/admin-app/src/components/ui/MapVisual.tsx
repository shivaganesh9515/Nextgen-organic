"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function MapVisual() {
  return (
    <div className="relative w-full aspect-video bg-[#E8F0E5] rounded-3xl overflow-hidden border border-[#E5E5E0]">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20">
         <svg className="w-full h-full" width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A6741" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      {/* Pulsing Dots (Farms) */}
      {[
        { top: "30%", left: "20%", delay: 0 },
        { top: "60%", left: "50%", delay: 1 },
        { top: "40%", left: "80%", delay: 2 },
      ].map((pos, i) => (
        <div key={i} className="absolute" style={{ top: pos.top, left: pos.left }}>
           <motion.div 
             animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
             transition={{ duration: 3, repeat: Infinity, delay: pos.delay }}
             className="absolute w-20 h-20 -top-10 -left-10 bg-[#4A6741] rounded-full opacity-20"
           />
           <div className="relative z-10 w-4 h-4 bg-[#4A6741] rounded-full border-2 border-white shadow-sm" />
           <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-[#262A2B] whitespace-nowrap">
             Verified Farm
           </div>
        </div>
      ))}
      
      {/* Central Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
         <div className="relative">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-8 border-[2px] border-dashed border-[#4A6741]/30 rounded-full"
            />
            <div className="w-16 h-16 bg-[#262A2B] rounded-full flex items-center justify-center text-white shadow-xl relative z-10">
               <MapPin size={24} />
            </div>
         </div>
         <div className="mt-4 bg-white px-4 py-2 rounded-xl shadow-sm inline-block font-bold text-[#262A2B]">
            Your Local Hub
         </div>
      </div>
    </div>
  );
}
