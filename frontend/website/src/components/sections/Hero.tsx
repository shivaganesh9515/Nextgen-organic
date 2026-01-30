"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Star } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F5F5F0] pt-32">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Floating Organic Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#4A6741]/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-[#D4A373]/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <motion.div style={{ y: yText, opacity }} className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#262A2B]/5 shadow-sm text-xs font-bold tracking-widest text-[#4A6741] uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#E23744] animate-pulse" />
            Voted #1 Organic Hub 2025
          </motion.div>

          <h1 className="font-heading font-black text-[#262A2B] text-6xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
            Eat Real.<br />
            <span className="text-[#4A6741] relative inline-block">
              Live Better.
              <svg className="absolute w-[105%] h-3 -bottom-1 -left-1 text-[#D4A373] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xl text-[#262A2B]/70 leading-relaxed mb-10 max-w-lg">
            Direct from certified farmers to your kitchen table. Experience the taste of 100% pesticide-free produce, fully traceable and ethically sourced.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/coming-soon"
              className="group h-14 px-8 rounded-full bg-[#262A2B] text-white font-medium flex items-center gap-3 shadow-xl shadow-[#262A2B]/20 hover:scale-105 hover:bg-[#4A6741] transition-all duration-300"
            >
              Start Shopping
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#4A6741] transition-colors">
                <ArrowRight size={14} />
              </div>
            </Link>
            
            <button 
              onClick={() => document.getElementById('farmer-stories')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 rounded-full bg-white border border-[#262A2B]/10 font-medium text-[#262A2B] flex items-center gap-3 hover:bg-[#F5F5F0] transition-colors"
            >
              <Play size={18} className="fill-[#262A2B]" />
              Watch Story
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm font-medium text-[#262A2B]/60">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F5F0] bg-gray-200" />
                ))}
             </div>
             <div className="flex items-center gap-1">
                <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
                <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
                <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
                <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
                <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
             </div>
             <span>Trusted by 5,000+ Families</span>
          </div>
        </motion.div>

        {/* Right: Immersive Visuals */}
        <motion.div style={{ y: yImage }} className="relative hidden lg:block h-[800px]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A6741] rounded-full mix-blend-multiply opacity-10 blur-3xl" />
           
           {/* Abstract Composition */}
           <div className="relative z-10 w-full h-full">
              {/* Main Image */}
              <div className="absolute top-20 right-10 w-[400px] h-[500px] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 border-4 border-white">
                 <div className="w-full h-full bg-[#E5E5E0] relative">
                    <Image 
                       src="/hero-farm.jpg" // Placeholder path, browser will show generic valid image if available or gray
                       alt="Sustainable Farming"
                       fill
                       className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                    {/* Fallback to gradient if image missing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/20 to-[#262A2B]/20" />
                 </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 left-10 p-4 rounded-2xl bg-white shadow-xl border border-[#262A2B]/5 max-w-[200px]"
              >
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 rounded-full bg-[#8AA881]/20 flex items-center justify-center text-[#4A6741]">
                        <Star size={18} className="fill-current" />
                     </div>
                     <div>
                        <div className="text-xs text-gray-500">Quality</div>
                        <div className="font-bold text-[#262A2B]">A+ Grade</div>
                     </div>
                  </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-40 -left-10 p-4 rounded-2xl bg-white shadow-xl border border-[#262A2B]/5"
              >
                  <div className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-1">New Arrival</div>
                  <div className="font-heading font-bold text-lg">Alphonso Mango</div>
                  <div className="text-sm text-gray-500">Ratnagiri Certified</div>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
