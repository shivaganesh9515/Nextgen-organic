"use client";

import { ShieldCheck, FileCheck, UserCheck, SearchX } from "lucide-react";

export function TrustModel() {
  return (
    <section className="py-24 bg-[#262A2B] text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/2">
             <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 leading-tight">
               Not just a platform.<br />
               <span className="text-[#4A6741]">A Gatekeeper.</span>
             </h2>
             <p className="text-white/70 text-lg mb-10 leading-relaxed">
               Unlike open marketplaces, we don't let just anyone sell. Every vendor goes through a strict manual vetting process before they can list a single tomato.
             </p>
             
             <div className="space-y-8">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4A6741]/20 rounded-xl flex items-center justify-center text-[#4A6741] flex-shrink-0">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white">Manual Vendor Approval</h3>
                    <p className="text-white/60 text-sm">We personally verify the identity and location of every farmer and hub store owner.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#D4A373]/20 rounded-xl flex items-center justify-center text-[#D4A373] flex-shrink-0">
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white">Certification Check</h3>
                    <p className="text-white/60 text-sm">Selling as "Organic"? We verify your NPOP/USDA certificates. No documents, no "Organic" tag.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 flex-shrink-0">
                    <SearchX size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white">No Fake Claims</h3>
                    <p className="text-white/60 text-sm">It's better to sell honest "Natural" food than fake "Organic" food. We heavily penalize mislabeling.</p>
                  </div>
               </div>
             </div>
          </div>

          <div className="w-full md:w-1/2 relative">
             <div className="aspect-square rounded-3xl bg-[#3D4244] border border-white/5 p-8 flex items-center justify-center relative overflow-hidden">
                <ShieldCheck size={200} className="text-[#4A6741] opacity-20 absolute" />
                
                <div className="relative z-10 text-center space-y-2">
                   <div className="text-6xl font-bold font-heading">100%</div>
                   <div className="text-xl uppercase tracking-widest text-[#4A6741]">Verified</div>
                   <p className="max-w-xs mx-auto text-white/40 text-sm pt-4">Every vendor. Every product type. Every single day.</p>
                </div>

                {/* Decorative particles */}
                <div className="absolute w-2 h-2 bg-[#4A6741] rounded-full top-20 right-20 opacity-50" />
                <div className="absolute w-3 h-3 bg-[#D4A373] rounded-full bottom-20 left-20 opacity-30" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
