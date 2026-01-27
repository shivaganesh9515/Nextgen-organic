import { ShieldCheck, Zap, Users, Leaf } from "lucide-react";

export function WhyNext360() {
  return (
    <section className="py-24 bg-[#18181B] text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BEF264] rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#65A30D] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264] text-xs font-bold uppercase tracking-wider mb-6">
                 Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                 Not Just Organic.<br/>
                 <span className="text-[#BEF264]">NextGen Organic.</span>
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8 leading-relaxed">
                 We don't just aggregate produce; we verify it. Our proprietary traceability engine ensures every bite you take is cleaner, safer, and supports a real farming family.
              </p>
              
              <div className="space-y-6">
                 <FeatureRow 
                   icon={ShieldCheck} 
                   title="100% Verified Traceability" 
                   desc="Scan the QR code on any pack to see the farm, harvest time, and lab reports." 
                 />
                 <FeatureRow 
                   icon={Leaf} 
                   title="Zero Chemical Residue" 
                   desc="We adhere to strict NPOP standards with regular soil and water testing." 
                 />
                 <FeatureRow 
                   icon={Users} 
                   title="Farmer-First Model" 
                   desc="Farmers earn 30% more than market rates through our direct-to-hub network." 
                 />
              </div>
           </div>

           <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative group">
                 <img 
                   src="https://images.unsplash.com/photo-1615485500704-8e99099928b3?q=80&w=1200&auto=format&fit=crop" 
                   alt="Fresh Vegetables" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl max-w-xs">
                    <div className="text-[#BEF264] font-bold text-3xl mb-1">24hrs</div>
                    <div className="text-white text-sm">Maximum time from harvest to your doorstep. Guaranteed fresh.</div>
                 </div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-white/5 rounded-[3rem] rotate-6" />
           </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ icon: Icon, title, desc }: any) {
   return (
      <div className="flex gap-4">
         <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center text-[#BEF264] shrink-0 border border-white/5">
            <Icon size={24} />
         </div>
         <div>
            <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
         </div>
      </div>
   );
}
