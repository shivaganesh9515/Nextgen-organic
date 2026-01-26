"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#262A2B] flex items-center justify-center px-6">
      
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 flex flex-col items-center">
           <div className="relative w-12 h-12 mb-6 opacity-20 grayscale">
             <Image src="/logo.png" alt="Logo" fill className="object-contain" />
           </div>
           <h1 className="font-mono text-sm uppercase tracking-widest text-white/40 flex items-center gap-2">
             <Lock className="w-4 h-4" /> Restricted Access
           </h1>
        </div>

        <form className="space-y-4">
           <input type="text" className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:border-white/30 outline-none transition-all placeholder:text-white/20 font-mono text-sm" placeholder="ADMIN ID" />
           
           <input type="password" className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:border-white/30 outline-none transition-all placeholder:text-white/20 font-mono text-sm" placeholder="KEY" />
          
          <button className="w-full py-3 bg-white/10 text-white/60 font-mono text-xs rounded hover:bg-white/20 transition-colors uppercase tracking-widest">
            Authenticate
          </button>
        </form>
         
         <div className="mt-12 text-center">
            <Link href="/" className="text-xs text-white/20 hover:text-white/40 font-mono">← Return</Link>
         </div>
      </div>
    </div>
  );
}
