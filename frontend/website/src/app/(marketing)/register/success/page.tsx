"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const businessName = searchParams.get("businessName") || "Your Business";

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl border border-[#262A2B]/5 p-8 text-center">
        
        <div className="w-20 h-20 bg-[#4A6741]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#4A6741]" />
        </div>

        <h1 className="font-heading font-black text-3xl text-[#262A2B] mb-2">
          Application Submitted!
        </h1>
        
        <p className="text-[#262A2B]/60 text-lg mb-8">
          Thank you for registering <br/>
          <span className="font-bold text-[#262A2B]">{businessName}</span>
        </p>

        <div className="bg-[#F5F5F0] rounded-xl p-6 text-left mb-8 space-y-4">
            <h3 className="font-bold text-[#262A2B] text-sm uppercase tracking-wider mb-2">Next Steps</h3>
            
            <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-1 rounded-full shadow-sm">
                    <ShieldCheck size={16} className="text-[#4A6741]" />
                </div>
                <div>
                    <p className="font-bold text-[#262A2B] text-sm">Document Verification</p>
                    <p className="text-xs text-[#262A2B]/60">Our team will verify your uploaded documents (FSSAI/NPOP) for compliance.</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-1 rounded-full shadow-sm">
                    <Clock size={16} className="text-[#4A6741]" />
                </div>
                <div>
                    <p className="font-bold text-[#262A2B] text-sm">Approval Wait Time</p>
                    <p className="text-xs text-[#262A2B]/60">This process typically takes <strong>24-48 hours</strong>. You will be notified via email.</p>
                </div>
            </div>
        </div>

        <Link 
          href="/" 
          className="w-full bg-[#262A2B] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#1a1c1d] transition-all flex items-center justify-center gap-2"
        >
          Return to Home <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}

export default function RegisterSuccess() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
