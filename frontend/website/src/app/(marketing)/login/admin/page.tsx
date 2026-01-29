"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function AdminLogin() {
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
      localStorage.setItem("next360_token", access_token);
      router.push("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Access Denied");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#BEF264] rounded-full blur-[150px] opacity-[0.05]" />
         <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-500 rounded-full blur-[150px] opacity-[0.05]" />
      </div>

      <div className="w-full max-w-md relative z-10">
         <Link href="/login" className="inline-flex items-center gap-2 text-[#52525B] hover:text-white mb-8 text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back
         </Link>

         <div className="bg-[#18181B] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center text-white mb-6 border border-white/5">
                <ShieldCheck size={24} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Admin Workspace</h1>
            <p className="text-[#A1A1AA] mb-8 text-sm">Enter your credentials to access the command center.</p>

            <form onSubmit={handleLogin} className="space-y-4">
               {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
                     {error}
                  </div>
               )}
               <div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-colors" 
                    placeholder="admin@next360.com"
                    required 
                  />
               </div>
               <div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-colors" 
                    placeholder="••••••••••••" 
                    required
                  />
               </div>
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full bg-white text-black font-bold py-3 rounded-xl text-center text-sm hover:bg-[#E4E4E7] transition-all mt-6 flex items-center justify-center gap-2"
               >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  Verify & Access
               </button>
            </form>
         </div>
         
         <div className="text-center mt-8 text-[#52525B] text-xs">
            Restricted Access. Authorized personnel only.
         </div>
      </div>
    </div>
  );
}
