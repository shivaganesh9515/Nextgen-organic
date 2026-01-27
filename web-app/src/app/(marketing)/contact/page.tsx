import { PageHeader } from "@/components/ui/PageHeader";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#262A2B] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#4A6741] rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-white/80 font-bold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
             24/7 Support
           </span>
           <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6">
             Get in Touch
           </h1>
           <p className="max-w-xl mx-auto text-xl text-white/60">
             Whether you're a customer with a question or a farmer looking to join, we are here to help.
           </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 -mt-20 relative z-20">
         <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-[#E5E5E0]">
            <div className="flex flex-col lg:flex-row gap-16">
               
               {/* Contact Info */}
               <div className="lg:w-1/3 space-y-10">
                  <div>
                     <h3 className="font-heading font-bold text-2xl text-[#262A2B] mb-6">Contact Info</h3>
                     <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 bg-[#E8F0E5] rounded-xl flex items-center justify-center text-[#4A6741] flex-shrink-0">
                              <MapPin size={24} />
                           </div>
                           <div>
                              <div className="font-bold text-[#262A2B]">Corporate Hub</div>
                              <div className="text-[#262A2B]/60 text-sm leading-relaxed mt-1">
                                 Unit 402, Cyber Towers,<br/>
                                 Hitech City, Hyderabad - 500081
                              </div>
                           </div>
                        </div>

                        <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 bg-[#E8F0E5] rounded-xl flex items-center justify-center text-[#4A6741] flex-shrink-0">
                              <Mail size={24} />
                           </div>
                           <div>
                              <div className="font-bold text-[#262A2B]">Email Us</div>
                              <div className="text-[#262A2B]/60 text-sm mt-1">hello@next360.com</div>
                              <div className="text-[#262A2B]/60 text-sm">farmers@next360.com</div>
                           </div>
                        </div>

                        <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 bg-[#E8F0E5] rounded-xl flex items-center justify-center text-[#4A6741] flex-shrink-0">
                              <Phone size={24} />
                           </div>
                           <div>
                              <div className="font-bold text-[#262A2B]">Call Support</div>
                              <div className="text-[#262A2B]/60 text-sm mt-1">+91 99887 76655</div>
                              <div className="text-xs text-[#4A6741] font-bold mt-1 bg-[#4A6741]/10 inline-block px-2 py-0.5 rounded">Mon-Sat, 9am - 7pm</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Quick Chat Link */}
                  <div className="bg-[#262A2B] text-white p-6 rounded-2xl relative overflow-hidden group cursor-pointer hover:bg-black transition-colors">
                     <div className="relative z-10 flex items-center justify-between">
                        <div>
                           <div className="font-bold text-lg">Live Chat</div>
                           <div className="text-white/60 text-sm">Wait time: ~2 mins</div>
                        </div>
                        <MessageCircle size={28} />
                     </div>
                     <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#4A6741] rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
                  </div>
               </div>

               {/* Divider */}
               <div className="hidden lg:block w-px bg-[#E5E5E0]" />

               {/* Form */}
               <div className="flex-1">
                  <h3 className="font-heading font-bold text-2xl text-[#262A2B] mb-6">Send a Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#262A2B]/40">First Name</label>
                        <input type="text" className="w-full px-4 py-4 bg-[#F5F5F0] rounded-xl border border-transparent focus:border-[#4A6741] focus:bg-white focus:ring-4 focus:ring-[#4A6741]/10 outline-none transition-all font-medium text-[#262A2B]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#262A2B]/40">Last Name</label>
                        <input type="text" className="w-full px-4 py-4 bg-[#F5F5F0] rounded-xl border border-transparent focus:border-[#4A6741] focus:bg-white focus:ring-4 focus:ring-[#4A6741]/10 outline-none transition-all font-medium text-[#262A2B]" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#262A2B]/40">Email Address</label>
                        <input type="email" className="w-full px-4 py-4 bg-[#F5F5F0] rounded-xl border border-transparent focus:border-[#4A6741] focus:bg-white focus:ring-4 focus:ring-[#4A6741]/10 outline-none transition-all font-medium text-[#262A2B]" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#262A2B]/40">Message</label>
                        <textarea rows={5} className="w-full px-4 py-4 bg-[#F5F5F0] rounded-xl border border-transparent focus:border-[#4A6741] focus:bg-white focus:ring-4 focus:ring-[#4A6741]/10 outline-none transition-all font-medium text-[#262A2B]" />
                    </div>

                    <button className="w-full py-5 bg-[#4A6741] text-white font-bold rounded-xl shadow-lg shadow-[#4A6741]/20 hover:shadow-xl hover:bg-[#3D5536] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                      Send Message <ArrowRight size={20} />
                    </button>
                  </form>
               </div>

            </div>
         </div>
      </div>
      
      {/* Map (Visual only) */}
      <div className="h-96 w-full -mt-24 relative z-0">
          <div className="absolute inset-0 bg-[#F5F5F0]">
              {/* Pattern to simulate map */}
              <div className="w-full h-full opacity-10 bg-[radial-gradient(#4A6741_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="w-24 h-24 bg-[#4A6741]/20 rounded-full animate-ping absolute top-0 left-0" />
                 <div className="w-24 h-24 bg-[#4A6741]/20 rounded-full flex items-center justify-center text-[#4A6741]">
                    <MapPin size={48} fill="currentColor" />
                 </div>
              </div>
          </div>
      </div>

    </div>
  );
}
