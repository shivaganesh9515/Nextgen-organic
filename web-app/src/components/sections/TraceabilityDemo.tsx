"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tractor, FlaskConical, MapPin, CheckCircle2, FileText, ArrowRight } from "lucide-react";

const mockJourney = [
  {
    stage: "Harvested",
    time: "2 Days Ago, 6:00 AM",
    location: "GreenAcre Farm, Vikarabad",
    icon: Tractor,
    details: "Harvested by Rajesh Kumar. Batch Weight: 250kg",
    status: "completed"
  },
  {
    stage: "Quality Check",
    time: "Yesterday, 10:30 AM",
    location: "Jubilee Hills Hub",
    icon: FlaskConical,
    details: "Passed: Pesticide Residue Test (Results: 0%)",
    status: "completed"
  },
  {
    stage: "Ready for Pickup",
    time: "Today, 8:00 AM",
    location: "Next360 Store #4",
    icon: CheckCircle2,
    details: "Freshness Score: 98/100",
    status: "active"
  }
];

export function TraceabilityDemo() {
  const [batchId, setBatchId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) return;
    setLoading(true);
    setShowResult(false);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#262A2B] text-[#F5F5F0] overflow-hidden relative">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Input */}
          <div className="w-full lg:w-1/2">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A6741]/20 text-[#4A6741] text-xs font-bold uppercase tracking-widest mb-6">
                <MapPin size={12} /> Live Traceability Engine
             </div>
             <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
               Don't just trust us.<br />
               <span className="text-white/40">Track your food.</span>
             </h2>
             <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
               Every spinach bunch has a story. Enter the Batch ID found on your packet to see exactly when it was harvested and who grew it.
             </p>

             <form onSubmit={handleTrack} className="bg-white/5 p-2 rounded-2xl border border-white/10 flex items-center max-w-md shadow-2xl">
                <input 
                  type="text" 
                  placeholder="Try Batch ID: 8821X" 
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/20 px-4 py-3 w-full font-mono tracking-wider"
                />
                <button 
                  disabled={loading}
                  className="bg-[#4A6741] hover:bg-[#3D5536] text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Track <ArrowRight size={18} /></>
                  )}
                </button>
             </form>
             
             {/* Sample IDs */}
             <div className="mt-4 flex gap-3 text-sm text-white/30">
                <span>Try:</span>
                <button onClick={() => setBatchId("8821X")} className="hover:text-[#4A6741] transition-colors decoration-dotted underline">8821X</button>
                <button onClick={() => setBatchId("GRO-44")} className="hover:text-[#4A6741] transition-colors decoration-dotted underline">GRO-44</button>
             </div>
          </div>

          {/* Right: Results Timeline */}
          <div className="w-full lg:w-1/2 min-h-[400px] flex items-center justify-center bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-sm relative overflow-hidden">
             
             <AnimatePresence mode="wait">
               {!showResult ? (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="text-center"
                 >
                    <div className="w-20 h-20 bg-white/5 rounded-full mx-auto flex items-center justify-center mb-4">
                       <Search size={32} className="text-white/20" />
                    </div>
                    <p className="text-white/40 font-mono text-sm">Waiting for input...</p>
                 </motion.div>
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="w-full"
                 >
                    <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                       <div>
                          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Product</p>
                          <h3 className="font-heading font-bold text-2xl">Natural Spinach (Palak)</h3>
                       </div>
                       <button className="flex items-center gap-2 text-[#4A6741] text-sm font-bold bg-[#4A6741]/10 px-3 py-1.5 rounded-lg hover:bg-[#4A6741]/20 transition-colors">
                          <FileText size={14} /> Lab Report
                       </button>
                    </div>

                    <div className="space-y-8 relative">
                       {/* Connection Line */}
                       <div className="absolute left-[1.15rem] top-2 bottom-4 w-0.5 bg-white/10" />

                       {mockJourney.map((step, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative flex gap-6"
                          >
                             <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center z-10 border-4 border-[#262A2B] ${step.status === 'active' ? 'bg-[#4A6741] text-white' : 'bg-[#F5F5F0] text-[#262A2B]'}`}>
                                <step.icon size={18} />
                             </div>
                             <div className="pt-1">
                                <h4 className={`font-bold text-lg mb-1 ${step.status === 'active' ? 'text-[#4A6741]' : 'text-white'}`}>{step.stage}</h4>
                                <div className="text-sm text-white/50 mb-2">{step.time} • <span className="text-white/30">{step.location}</span></div>
                                <div className="text-xs bg-white/5 inline-block px-3 py-1 rounded border border-white/5 text-white/70">
                                   {step.details}
                                </div>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
