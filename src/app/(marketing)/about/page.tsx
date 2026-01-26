import { PageHeader } from "@/components/ui/PageHeader";
import { Leaf, Heart, Users, MapPin, Award, Sprout } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:py-32 overflow-hidden bg-[#F5F5F0]">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#4A6741]/10 text-[#4A6741] font-bold text-sm tracking-widest uppercase mb-6">
               Our Story
            </span>
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#262A2B] mb-8 max-w-4xl mx-auto leading-none">
               Restoring the link between <span className="text-[#4A6741]">Soil</span> and <span className="text-[#D4A373]">Soul</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-[#262A2B]/60 leading-relaxed">
               Next360 Organics wasn't started in a boardroom. It started in a field in Vikarabad, with a simple question: "Why is good food so hard to find?"
            </p>
         </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto -mt-16 relative z-20 px-6">
         <div className="bg-[#262A2B] text-white rounded-3xl p-12 shadow-2xl flex flex-col md:flex-row justify-around items-center gap-12 md:gap-0">
            {[
               { number: "500+", label: "Partner Farms" },
               { number: "10k+", label: "Happy Families" },
               { number: "100%", label: "Traceable Produce" },
            ].map((stat, i) => (
               <div key={i} className="text-center">
                  <div className="font-heading font-bold text-4xl md:text-5xl mb-2 text-[#4A6741]">{stat.number}</div>
                  <div className="text-white/50 uppercase tracking-widest text-sm font-bold">{stat.label}</div>
               </div>
            ))}
         </div>
      </div>
      
      {/* Narrative Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <FadeIn className="space-y-8 text-lg text-[#262A2B]/70 leading-loose">
              <h2 className="font-heading font-bold text-4xl text-[#262A2B]">The Problem with "Organic"</h2>
              <p>
                 We realized that "Organic" had become just a label—a marketing sticker slapped on expensive produce that sat in cold storage for weeks.
              </p>
              <p>
                 Farmers were earning pennies. Families were paying verified premiums for unverified food. The trust was broken.
              </p>
              <p className="font-bold text-[#262A2B]">
                 So, we built Next360. A 100% transparent ecosystem where you don't just buy food; you buy the story behind it.
              </p>
           </FadeIn>
           
           <div className="relative">
              <div className="aspect-square bg-[#E8F0E5] rounded-[3rem] relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Sprout size={120} className="text-[#4A6741] opacity-20" />
                 </div>
                 {/* Floating Elements */}
                 <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#4A6741] rounded-full flex items-center justify-center text-white">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <div className="font-bold text-[#262A2B]">Local First</div>
                          <div className="text-xs text-[#262A2B]/60">We only operate in Hyderabad to ensure <br/>24hr harvest-to-home delivery.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#262A2B]">Our Core Beliefs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Nature First", desc: "If it hurts the soil, we don't sell it. Simple as that. We support regenerative farming.", color: "bg-green-50" },
              { icon: Users, title: "Farmer Wins", desc: "Our farmers set their own prices. We are partners, not just buyers.", color: "bg-blue-50" },
              { icon: Award, title: "Radical Truth", desc: "No hidden chemicals. No fake labels. 100% traceability for every spinach bunch.", color: "bg-orange-50" },
            ].map((item, i) => (
               <FadeIn key={i} direction="up" delay={i * 0.1}>
                 <div className={`h-full p-10 rounded-3xl ${item.color} hover:-translate-y-2 transition-transform duration-300`}>
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#262A2B] mb-6 shadow-sm">
                     <item.icon size={28} />
                   </div>
                   <h3 className="font-heading font-bold text-2xl mb-4 text-[#262A2B]">{item.title}</h3>
                   <p className="text-[#262A2B]/70 hover:text-[#262A2B] transition-colors">{item.desc}</p>
                 </div>
               </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
