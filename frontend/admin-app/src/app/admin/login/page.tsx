"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the centralized authApi to talk to FastAPI
      const { access_token } = await authApi.login(username, password);
      
      // Store token (Basic implementation)
      localStorage.setItem("admin_token", access_token);
      
      // Redirect
      router.push("/admin");
      
    } catch (err: any) {
      setError(err.message || "Authentication Failed");
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded flex items-center gap-2 text-xs font-mono">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
           <input 
             type="text" 
             required
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:border-white/30 outline-none transition-all placeholder:text-white/20 font-mono text-sm" 
             placeholder="ADMIN ID (Username)" 
           />
           
           <input 
             type="password" 
             required
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full px-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:border-white/30 outline-none transition-all placeholder:text-white/20 font-mono text-sm" 
             placeholder="KEY (Password)" 
           />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white/10 text-white/60 font-mono text-xs rounded hover:bg-white/20 transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : "Authenticate"}
          </button>
        </form>
         
         <div className="mt-12 text-center">
            <Link href="/" className="text-xs text-white/20 hover:text-white/40 font-mono">← Return</Link>
         </div>
      </div>
    </div>
  );
}
