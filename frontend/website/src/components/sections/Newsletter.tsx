"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "loading">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] bg-[#4A6741] overflow-hidden px-6 py-16 md:py-24 text-center">
          
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8 text-white"
            >
              <Mail size={32} />
            </motion.div>
            
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
              Join the Organic Movement
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Get weekly updates on seasonal harvests, farmer stories, and exclusive offers delivered to your inbox. No spam, just fresh news.
            </p>

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white"
              >
                <p className="text-xl font-medium">✨ Thank you for joining!</p>
                <p className="opacity-80 mt-2">Check your email for a welcome gift.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#E23744] hover:bg-[#D12D39] text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === "loading" ? "Joining..." : "Subscribe"}
                  {!status && <ArrowRight size={18} />}
                </button>
              </form>
            )}
            
            <p className="mt-6 text-white/40 text-sm">
              Join 5,000+ community members. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
