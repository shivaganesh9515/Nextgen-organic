import { PageHeader } from "@/components/ui/PageHeader";
import { Check, Tractor, Sprout, TrendingUp, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { FarmerStories } from "@/components/sections/FarmerStories";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#262A2B] text-white pt-32 pb-24 px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
             <div className="absolute -right-20 top-20 w-96 h-96 bg-[#4A6741] rounded-full blur-3xl" />
             <div className="absolute -left-20 bottom-20 w-80 h-80 bg-[#D4A373] rounded-full blur-3xl" />
         </div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="font-heading font-bold text-5xl md:text-7xl mb-8 leading-tight">
               Your Harvest. <br/><span className="text-[#4A6741]">Your Price.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white/60 mb-12">
               Stop selling to middlemen for pennies. Join Next360 to connect directly with verified buyers and earn what your hard work deserves.
            </p>
            <Link href="/login" className="inline-flex items-center justify-center px-10 py-5 bg-[#4A6741] text-white font-bold rounded-xl hover:bg-[#3D5536] transition-all shadow-xl hover:shadow-[#4A6741]/20 hover:scale-105">
               Register Your Farm
            </Link>
         </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 -mt-16 relative z-20">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { icon: TrendingUp, title: "Zero Commission", desc: "We don't take a cut from your sale. You keep 100% of the listed price.", color: "bg-green-50" },
               { icon: Sprout, title: "Guaranteed Sales", desc: "Our prediction engine tells you exactly what to harvest based on pre-orders.", color: "bg-orange-50" },
               { icon: ShieldCheck, title: "Instant Payments", desc: "Money in your bank account within 24 hours of dropping produce at a Hub.", color: "bg-blue-50" },
            ].map((item, i) => (
               <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E5E0] h-full hover:-translate-y-2 transition-transform">
                     <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-[#262A2B] mb-6`}>
                        <item.icon size={28} />
                     </div>
                     <h3 className="font-heading font-bold text-2xl mb-4 text-[#262A2B]">{item.title}</h3>
                     <p className="text-[#262A2B]/60 leading-relaxed">{item.desc}</p>
                  </div>
               </FadeIn>
            ))}
         </div>
      </section>

      {/* Trust Checklist */}
      <section className="py-20 px-6 bg-[#F5F5F0]">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-heading font-bold text-4xl text-[#262A2B]">What you need to join</h2>
               <p className="text-[#262A2B]/60 mt-4">We maintain strict standards to ensure consumer trust.</p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#E5E5E0]">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                     "Valid Land Ownership Documents",
                     "NPOP/USDA Organic Certification (for Organic Tier)",
                     "Aadhar Card Identity Proof",
                     "Pass an on-site Soil Test",
                     "Commitment to Chemical-Free Farming",
                     "Bank Account for Transfers"
                  ].map((req, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-[#4A6741] flex-shrink-0 flex items-center justify-center text-white mt-0.5">
                           <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-[#262A2B]/80">{req}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Visual Proof */}
      <div className="bg-white">
         <FarmerStories />
      </div>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-[#262A2B] text-center">
         <Tractor size={64} className="text-[#4A6741] mx-auto mb-6" />
         <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-8">Ready to grow with us?</h2>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/login" className="px-10 py-4 bg-[#4A6741] text-white font-bold rounded-xl hover:bg-[#3D5536] transition-colors">
               Start Registration
             </Link>
             <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
               Contact Support
             </button>
         </div>
      </section>
    </div>
  );
}
