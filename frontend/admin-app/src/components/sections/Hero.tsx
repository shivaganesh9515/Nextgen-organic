"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Search, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F5F5F0]">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Organic colored blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#8AA881]/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-0 w-[600px] h-[600px] bg-[#D4A373]/15 rounded-full blur-[120px]" 
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#4A6741]/20 text-[#4A6741] text-sm font-medium tracking-wide shadow-sm">
            <Leaf size={14} className="fill-[#4A6741]/20" />
            Now Serving Hyderabad
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#262A2B] mb-8"
        >
          Honest Food for <br className="hidden md:block" />
          <span className="text-[#4A6741] inline-block font-serif italic relative">
            Better Health
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#D4A373]/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"> 
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </motion.h1>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="max-w-xl mx-auto mb-12 bg-white rounded-full p-2 flex items-center shadow-lg border border-[#E5E5E0]"
        >
             <div className="flex items-center gap-2 px-4 border-r border-[#E5E5E0] text-[#E23744]">
                <MapPin size={20} />
                <span className="font-medium text-[#262A2B] hidden sm:block">Hyderabad</span>
             </div>
             <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={20} className="text-[#262A2B]/40" />
                <input 
                  type="text" 
                  placeholder="Search for mangoes, organic milk..." 
                  className="w-full bg-transparent outline-none text-[#262A2B]"
                />
             </div>
             <button className="bg-[#E23744] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#D12D39] transition-colors">
                <Search size={18} />
             </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#262A2B]/70 mb-12 leading-relaxed"
        >
          Connecting you to trusted farms. Choose from Regular, Chemical-Free Natural, or Certified Organic essentials delivered to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group relative px-8 py-4 bg-[#4A6741] text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:bg-[#3D5536] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get the App 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link
            href="/vendors"
            className="px-8 py-4 bg-white border border-[#E5E5E0] text-[#262A2B] rounded-full text-lg font-medium shadow-sm hover:shadow-md hover:border-[#4A6741]/30 transition-all duration-300"
          >
            Become a Vendor
          </Link>
        </motion.div>
      </div>

      {/* Decorative Floating Elements (Parallax feel) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 md:left-20 opacity-20 hidden md:block"
      >
        <Leaf size={64} className="text-[#4A6741] rotate-[-15deg]" />
      </motion.div>
    </section>
  );
}
