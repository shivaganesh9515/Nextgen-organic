"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
         {/* Info */}
         <div>
            <span className="text-[#4A6741] font-bold tracking-widest text-sm uppercase mb-4 block">Get in Touch</span>
            <h1 className="font-heading font-black text-5xl md:text-6xl text-[#262A2B] mb-8">
               We'd love to hear from you.
            </h1>
            <p className="text-xl text-[#262A2B]/60 mb-12">
               Have a question about our farms? Want to become a partner? Just want to say hi? Drop us a line.
            </p>

            <div className="space-y-8">
               {[
                  { icon: Mail, label: "Email", val: "hello@next360organics.in" },
                  { icon: Phone, label: "Phone", val: "+91 40-1234-5678" },
                  { icon: MapPin, label: "HQ", val: "Hitech City, Hyderabad" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-white border border-[#262A2B]/10 flex items-center justify-center text-[#4A6741]">
                        <item.icon size={20} />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-[#262A2B]/40 uppercase tracking-widest">{item.label}</div>
                        <div className="text-xl font-medium text-[#262A2B]">{item.val}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Form */}
         <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-[#262A2B]/5">
            <form className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-[#262A2B]">First Name</label>
                     <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#F5F5F0] border-transparent focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all outline-none" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-[#262A2B]">Last Name</label>
                     <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#F5F5F0] border-transparent focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all outline-none" placeholder="Doe" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-[#262A2B]">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-[#F5F5F0] border-transparent focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all outline-none" placeholder="john@example.com" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-[#262A2B]">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-[#F5F5F0] border-transparent focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all outline-none" placeholder="How can we help?" />
               </div>
               <button type="submit" className="w-full py-4 bg-[#262A2B] text-white font-bold rounded-xl hover:bg-[#4A6741] transition-colors">
                  Send Message
               </button>
            </form>
         </div>
      </div>
    </div>
  );
}
