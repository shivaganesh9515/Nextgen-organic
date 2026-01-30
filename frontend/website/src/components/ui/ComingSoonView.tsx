"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bell, Smartphone } from "lucide-react";
import { useState } from "react";

export function ComingSoonView() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    setNotified(true);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 10, repeat: Infinity }}
           className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-[#4A6741]/10 rounded-full blur-[100px]" 
         />
         <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-[#D4A373]/10 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-xl w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 relative rotate-6"
        >
          <Smartphone size={40} className="text-[#4A6741]" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E23744] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-[#F5F5F0]">1</div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-6xl text-[#262A2B] mb-6"
        >
          Something Fresh is <br />
          <span className="text-[#4A6741]">Sprouting Soon.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#262A2B]/70 mb-10 leading-relaxed"
        >
          We are putting the final touches on the NextGen Organics App. 
          Get ready to experience farm-to-doorstep traceability like never before.
        </motion.p>

        {notified ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#4A6741]/10 border border-[#4A6741]/20 rounded-2xl p-6 text-[#4A6741]"
           >
              <div className="font-bold text-lg mb-1">You're on the list! 🎉</div>
              <p>We'll notify you the moment we launch.</p>
           </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleNotify}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl border border-[#262A2B]/10 focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-white shadow-sm"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-[#262A2B] text-white font-bold rounded-xl shadow-lg hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2"
            >
              <Bell size={18} /> Notify Me
            </button>
          </motion.form>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[#262A2B]/60 hover:text-[#4A6741] transition-colors font-medium">
             <ArrowLeft size={18} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
