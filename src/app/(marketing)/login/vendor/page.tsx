"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function VendorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { access_token } = await authApi.login(email, password);
      // In a real app, use HTTP-only cookies or a secure storage method
      localStorage.setItem("next360_token", access_token);
      router.push("/vendor");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#18181B] flex relative overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative z-10">
         <Link href="/login" className="absolute top-8 left-8 text-[#A1A1AA] hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Selection
         </Link>

         <div className="max-w-md w-full mx-auto">
            <div className="mb-12">
               <h1 className="text-4xl font-bold text-white mb-2">Vendor Portal</h1>
               <p className="text-[#A1A1AA]">Login to manage your farm and products.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
               {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                     {error}
                  </div>
               )}
               <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Email / Vendor ID</label>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#27272A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BEF264] transition-colors" 
                    placeholder="ramesh@example.com"
                    required 
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#27272A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BEF264] transition-colors" 
                    placeholder="••••••••" 
                    required
                  />
               </div>
               
               <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#BEF264] text-black font-bold py-4 rounded-xl text-center hover:bg-[#A3D651] transition-all transform active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
               >
                  {loading && <Loader2 className="animate-spin" size={20} />}
                  Secure Login
               </button>
            </form>

            <div className="mt-8 text-center">
               <span className="text-[#52525B] text-sm">Don't have an account? </span>
               <Link href="/contact" className="text-[#BEF264] text-sm hover:underline">Register as a Partner</Link>
            </div>
         </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block w-1/2 relative">
         <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop" 
            alt="Farming" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
         <div className="absolute bottom-16 left-16 max-w-md text-white">
            <blockquote className="text-2xl font-bold mb-4">"NextGen has transformed how we sell. No more middlemen, just fair prices."</blockquote>
            <cite className="not-italic text-[#BEF264] font-medium">— Ramesh Kumar, Prakruthi Farms</cite>
         </div>
      </div>
    </div>
  );
}
