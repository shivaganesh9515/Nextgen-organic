"use client";

import Link from "next/link";
import Image from "next/image";
import { Leaf, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center px-6">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-[#262A2B]/60 hover:text-[#4A6741] transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-[#E5E5E0]">
        <div className="flex flex-col items-center mb-8">
           <div className="relative w-20 h-20 mb-6 drop-shadow-sm">
             <Image 
               src="/logo.png" 
               alt="Next360 Logo" 
               fill 
               className="object-contain" 
               priority
             />
           </div>
           <h1 className="font-heading font-bold text-2xl text-[#262A2B]">Vendor Portal</h1>
           <p className="text-center text-[#262A2B]/60 mt-2">Access your farm or hub dashboard</p>
        </div>

        <form className="space-y-5">
           <div className="space-y-2">
              <label className="text-sm font-medium text-[#262A2B]/70">Email / ID</label>
              <input type="email" className="w-full px-4 py-3 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#4A6741] focus:bg-white outline-none transition-all" placeholder="farmer@next360.com" />
          </div>
          <div className="space-y-2">
              <label className="text-sm font-medium text-[#262A2B]/70">Password</label>
              <input type="password" className="w-full px-4 py-3 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#4A6741] focus:bg-white outline-none transition-all" />
          </div>
          
          <Link 
            href="/dashboard"
            className="block w-full py-4 bg-[#4A6741] text-white font-bold rounded-lg hover:bg-[#3D5536] transition-colors shadow-lg hover:shadow-xl text-center"
          >
            Secure Login
          </Link>
        </form>

        <div className="mt-8 text-center text-sm text-[#262A2B]/50">
          <p>Don't have an account?</p>
          <Link href="/vendors" className="text-[#4A6741] font-medium hover:underline">Apply to be a vendor</Link>
        </div>
      </div>
    </div>
  );
}
