"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function AppShowcase() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsSent(true);
  };

  return (
    <section className="py-24 bg-[#FFF5F5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 relative z-10">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#262A2B] mb-6 leading-tight">
              Get the <span className="text-[#4A6741]">Next360 App</span>
            </h2>
            <p className="text-[#262A2B]/70 text-lg mb-8">
              We will send you a link, open it on your phone to download the app.
              Seamless ordering, live tracking, and direct farmer connection.
            </p>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#262A2B]/40">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E5E5E0] focus:border-[#4A6741] focus:ring-2 focus:ring-[#4A6741]/20 outline-none transition-all shadow-sm"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="px-8 py-4 bg-[#E23744] text-white font-bold rounded-xl shadow-lg hover:bg-[#D12D39] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Share App Link <ArrowRight size={18} />
                </button>
              </form>
            ) : (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200"
               >
                 <CheckCircle2 size={24} />
                 <span className="font-bold">Link sent! Check your inbox.</span>
               </motion.div>
            )}

            <p className="mt-6 text-sm text-[#262A2B]/40">
              Available on iOS and Android. trusted by 10,000+ Hyderabad families.
            </p>
          </div>

          {/* Visual Mockup */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[600px] border-8 border-[#262A2B] rounded-[3rem] bg-[#F5F5F0] shadow-2xl overflow-hidden z-10">
               {/* Mock Screen Content */}
               <div className="absolute inset-0 bg-white">
                  <div className="h-40 bg-[#4A6741] p-6 text-white rounded-b-3xl">
                     <div className="flex justify-between items-center mt-8">
                        <div>
                           <div className="text-xs opacity-80">Good Morning</div>
                           <div className="font-heading font-bold text-xl">Arjun!</div>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full" />
                     </div>
                     <div className="mt-6 bg-white p-3 rounded-xl flex items-center gap-2 shadow-lg">
                        <div className="w-4 h-4 rounded-full bg-red-400" />
                        <div className="w-20 h-2 bg-gray-100 rounded-full" />
                     </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 items-center">
                           <div className="w-16 h-16 bg-gray-100 rounded-xl" />
                           <div className="space-y-2 flex-1">
                              <div className="w-2/3 h-3 bg-gray-100 rounded-full" />
                              <div className="w-1/3 h-2 bg-gray-50 rounded-full" />
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Floating Elements on phone */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#262A2B] text-white rounded-2xl shadow-xl text-center text-sm font-bold">
                     Order Placed! 🥕
                  </div>
               </div>
            </div>
            
            {/* Background blobs for pop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E23744]/5 rounded-full blur-3xl -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}
