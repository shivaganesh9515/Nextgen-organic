"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Tractor, Loader2, AlertCircle } from "lucide-react";

export default function VendorLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;
      if (isSignUp) {
          result = await supabase.auth.signUp({
              email,
              password,
          });
      } else {
          result = await supabase.auth.signInWithPassword({
              email,
              password,
          });
      }

      const { data, error } = result;

      if (error) throw error;
      
      if (isSignUp) {
          // If auto-confirm is on, sign in happens immediately. Else check email.
          // For local/dev supabase, it's usually auto-confirmed.
          alert("Account created! You can now login.");
          setIsSignUp(false); // Switch back to login
      } else {
          router.push("/vendor");
      }
      
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4">
      <div className="bg-[#18181B] max-w-md w-full rounded-3xl p-8 shadow-xl shadow-black/50 border border-[#27272A]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#BEF264] text-black rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Tractor size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Vendor Portal</h1>
          <p className="text-[#A1A1AA] mt-2 text-sm">
             {isSignUp ? "Create your vendor account" : "Access your farm dashboard and manage inventory."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#E4E4E7] mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-[#27272A] text-white px-4 py-3 rounded-xl border border-[#3F3F46] focus:ring-2 focus:ring-[#BEF264]/20 focus:border-[#BEF264] outline-none transition-all placeholder:text-[#52525B]"
              placeholder="farm@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
             <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-[#E4E4E7]">
                    {isSignUp ? "Create Password" : "Password"}
                </label>
                {!isSignUp && <a href="#" className="text-xs text-[#BEF264] font-medium hover:underline">Forgot password?</a>}
             </div>
            <input
              type="password"
              required
              className="w-full bg-[#27272A] text-white px-4 py-3 rounded-xl border border-[#3F3F46] focus:ring-2 focus:ring-[#BEF264]/20 focus:border-[#BEF264] outline-none transition-all placeholder:text-[#52525B]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#BEF264] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(190,242,100,0.1)] hover:bg-[#A3D651] hover:shadow-[0_0_25px_rgba(190,242,100,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? "Sign Up" : "Login to Dashboard")}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-[#27272A]">
            <p className="text-[#A1A1AA] text-sm">
                {isSignUp ? "Already have an account?" : "New to NextGen?"}
                <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-2 text-[#BEF264] font-bold hover:underline"
                >
                    {isSignUp ? "Login here" : "Create Account"}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
}
