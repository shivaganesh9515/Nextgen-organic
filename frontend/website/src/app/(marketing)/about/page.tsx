"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Award, Heart, Users } from "lucide-react";
import { ImpactStats } from "@/components/sections/ImpactStats";

export default function AboutPage() {
  return (
    <div className="bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#262A2B] text-[#F5F5F0] mt-28 mx-4 rounded-3xl">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="/hero-farm.jpg" // Using existing asset
             alt="Our Farm Roots" 
             fill 
             className="object-cover"
           />
           <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A6741]/20 border border-[#4A6741]/30 text-[#4A6741] text-xs font-bold tracking-widest uppercase mb-6"
          >
             <Leaf size={12} /> Since 2020
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-heading font-black text-5xl md:text-7xl mb-6"
          >
             Rooted in <span className="text-[#4A6741]">Trust.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
             We are a collective of farmers, technologists, and food lovers on a mission to fix the broken food system.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="font-heading font-bold text-4xl text-[#262A2B] mb-6">
                  It started with a simple question: <br/>
                  <span className="text-[#4A6741]">"Where does this come from?"</span>
               </h2>
               <div className="space-y-6 text-[#262A2B]/70 text-lg leading-relaxed">
                  <p>
                    In a world of mass production, "organic" became just another label. We wanted to bring back the connection. The handshake between the grower and the eater.
                  </p>
                  <p>
                    NextGen Organics isn't just a store. It's an ecosystem. We empower small-scale farmers with technology and give you transparency you can actually verify.
                  </p>
               </div>
            </div>
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <Image 
                  src="/hero-farm.jpg" 
                  alt="Farmer Handshake" 
                  fill
                  className="object-cover"
               />
            </div>
         </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="font-heading font-bold text-4xl text-[#262A2B]">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { icon: Award, title: "Uncompromising Quality", text: "We don't do 'good enough'. If it's not nutrient-dense and chemical-free, it doesn't leave the farm." },
                  { icon: Users, title: "Farmer First", text: "We pay our farmers above market rates, ensuring they thrive so your food can thrive." },
                  { icon: Heart, title: "Community Driven", text: "Food brings people together. We are building a community of conscious consumers." }
               ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-[#F5F5F0] hover:bg-[#F0FDF4] transition-colors duration-300">
                     <div className="w-12 h-12 rounded-full bg-[#4A6741] text-white flex items-center justify-center mb-6">
                        <item.icon size={24} />
                     </div>
                     <h3 className="font-heading font-bold text-xl text-[#262A2B] mb-3">{item.title}</h3>
                     <p className="text-[#262A2B]/70">{item.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Stats Reuse */}
      <ImpactStats />
    </div>
  );
}
