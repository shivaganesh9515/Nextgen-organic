import Link from "next/link";
import { Arrowright, Store, Tractor, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-5xl">
         <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1a1c1e] mb-4">Welcome Back</h1>
            <p className="text-[#64748B]">Choose your portal to continue.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LoginCard 
               role="Customer" 
               icon={Store} 
               desc="Order fresh organic produce directly to your home." 
               link="#" 
               color="blue"
            />
            <LoginCard 
               role="Vendor" 
               icon={Tractor} 
               desc="Manage your harvests, products, and earnings." 
               link="/login/vendor" 
               color="neon"
            />
            <LoginCard 
               role="Admin" 
               icon={ShieldCheck} 
               desc="Oversee the ecosystem, verify farms, and manage hubs." 
               link="/login/admin" 
               color="zinc"
            />
         </div>
      </div>
    </div>
  );
}

function LoginCard({ role, icon: Icon, desc, link, color }: any) {
   const colors = {
      blue: "hover:border-blue-500 hover:shadow-blue-500/10",
      neon: "hover:border-[#65A30D] hover:shadow-[#65A30D]/10",
      zinc: "hover:border-zinc-500 hover:shadow-zinc-500/10"
   };

   return (
      <Link href={link} className={`bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 group ${colors[color]}`}>
         <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1a1c1e] mb-6 group-hover:scale-110 transition-transform">
            <Icon size={32} strokeWidth={1.5} />
         </div>
         <h3 className="text-2xl font-bold text-[#1a1c1e] mb-3">{role}</h3>
         <p className="text-[#64748B] mb-8 leading-relaxed">{desc}</p>
         <div className="flex items-center gap-2 font-bold text-[#1a1c1e] group-hover:gap-4 transition-all">
            Login <Arrowright size={18} />
         </div>
      </Link>
   );
}
