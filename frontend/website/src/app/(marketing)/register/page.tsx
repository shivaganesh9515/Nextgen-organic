"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { VendorDocumentRow } from "@/components/forms/VendorDocumentRow";

// Type Options
const VENDOR_TYPES = [
  { id: "Manufacturer", label: "Manufacturer", desc: "You grow or process food items directly." },
  { id: "Trader", label: "Trader / Aggregator", desc: "You source from farmers and sell in bulk." },
  { id: "Marketer", label: "Marketer / Brand", desc: "You sell under your own brand name." }
];

// Initial Data
const INITIAL_DOCS = {
  npop: { available: true },
  fssai: { available: true },
  manufacturing_license: { available: true },
  gst: { available: true },
  udyam: { available: true },
  pan: { available: true }
};

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Optional: Could use strict steps, but single page scroll is also fine. Let's do sections.
  
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    vendorTypes: [] as string[],
    documents: INITIAL_DOCS as Record<string, any>,
    agreed: false
  });

  const updateDoc = (key: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [key]: data }
    }));
  };

  const toggleVendorType = (type: string) => {
    setFormData(prev => {
      const types = prev.vendorTypes.includes(type)
        ? prev.vendorTypes.filter(t => t !== type)
        : [...prev.vendorTypes, type];
      return { ...prev, vendorTypes: types };
    });
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.agreed) {
      setError("You must agree to the terms and declaration.");
      setLoading(false);
      return;
    }
    if (formData.vendorTypes.length === 0) {
      setError("Please select at least one Vendor Type.");
      setLoading(false);
      return;
    }

    try {
      // API Call
      await api.vendors.register({
        business_name: formData.businessName,
        contact_email: formData.email,
        phone_number: formData.phone,
        address_line: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        seller_category: "NPOP_ORGANIC", // Default for now, or map from Types
        documents: {
          ...formData.documents, // Stores the detailed doc objects
          vendor_types: formData.vendorTypes
        }
      });

      router.push("/login/vendor?registered=true");
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
       {/* Simple Header */}
       <header className="bg-white border-b border-[#262A2B]/5 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
             <Link href="/login/vendor" className="text-[#4A6741] font-medium flex items-center gap-2 hover:text-[#262A2B] transition-colors">
                <ArrowLeft size={18} /> Back to Login
             </Link>
             <span className="text-[#262A2B]/40 font-mono text-xs">VENDOR REGISTRATION</span>
          </div>
       </header>

       <main className="max-w-4xl mx-auto px-6 py-12">
          
          <div className="text-center mb-12">
             <h1 className="font-heading font-black text-4xl text-[#262A2B] mb-4">Partner Application</h1>
             <p className="text-[#262A2B]/60 text-lg max-w-2xl mx-auto">
                Join NextGen Organics to reach premium customers. Please ensure all details are accurate for quick verification.
             </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-12">
            
            {/* 1. Business Details */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold">1</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Business Details</h2>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#262A2B] mb-2">Registered Business Name <span className="text-red-500">*</span></label>
                    <input required type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="e.g. Prakruthi Organic Farms Pvt Ltd" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-[#262A2B] mb-2">Business Email <span className="text-red-500">*</span></label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="accounts@farm.com" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-[#262A2B] mb-2">Primary Contact Number <span className="text-red-500">*</span></label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="+91 98765 43210" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-[#262A2B] mb-2">Registered Address <span className="text-red-500">*</span></label>
                     <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all mb-4" placeholder="Street Address / Plot No." />
                     
                     <div className="grid grid-cols-3 gap-4">
                        <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="City" />
                        <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="State" />
                        <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="PIN Code" />
                     </div>
                  </div>
               </div>
            </section>

            {/* 2. Vendor Type */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold">2</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Vendor Type <span className="text-red-500">*</span></h2>
               </div>
               
               <div className="grid md:grid-cols-3 gap-4">
                  {VENDOR_TYPES.map(type => (
                     <div 
                        key={type.id}
                        onClick={() => toggleVendorType(type.id)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${formData.vendorTypes.includes(type.id) ? 'border-[#4A6741] bg-[#4A6741]/5 shadow-lg' : 'border-[#262A2B]/10 hover:border-[#4A6741]/50'}`}
                     >
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-[#262A2B]">{type.label}</h3>
                           {formData.vendorTypes.includes(type.id) && <CheckCircle size={20} className="text-[#4A6741]" />}
                        </div>
                        <p className="text-sm text-[#262A2B]/60">{type.desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* 3. Food Certifications */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold">3</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Certifications</h2>
               </div>
               
               <div className="space-y-6">
                  <VendorDocumentRow label="NPOP Organic Certificate" docKey="npop" data={formData.documents.npop} onChange={updateDoc} required />
                  <VendorDocumentRow label="FSSAI License" docKey="fssai" data={formData.documents.fssai} onChange={updateDoc} required />
               </div>
            </section>

            {/* 4. Licensing and Registration */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold">4</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Business Registration</h2>
               </div>
               
               <div className="space-y-6">
                  <VendorDocumentRow label="GST Registration" docKey="gst" data={formData.documents.gst} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="UDYAM Registration" docKey="udyam" data={formData.documents.udyam} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="PAN Card" docKey="pan" data={formData.documents.pan} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="Manufacturing License" docKey="manufacturing_license" data={formData.documents.manufacturing_license} onChange={updateDoc} />
               </div>
            </section>

            {/* 5. Declaration */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-4 p-4 bg-[#F5F5F0] rounded-xl border border-[#262A2B]/10">
                  <ShieldCheck size={32} className="text-[#4A6741] shrink-0" />
                  <div className="text-sm text-[#262A2B]/80">
                     <p>I hereby declare that all the information submitted is true and valid. I understand that any falsification will lead to immediate rejection and blacklisting from the NextGen Organic platform.</p>
                  </div>
               </div>
               
               <label className="flex items-center gap-3 mt-6 cursor-pointer select-none">
                  <input type="checkbox" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} className="w-5 h-5 accent-[#4A6741]" />
                  <span className="font-bold text-[#262A2B]">I confirm that the above details are true and valid.</span>
               </label>
            </section>

            <div className="flex flex-col gap-4">
              {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-medium text-center">
                    {error}
                  </div>
              )}
              
              <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#4A6741] text-white font-bold py-5 rounded-full text-xl shadow-xl hover:bg-[#3A5233] transition-all transform active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-3"
              >
                  {loading && <Loader2 className="animate-spin" size={24} />}
                  {loading ? "Submitting Application..." : "Submit Vendor Application"}
              </button>
            </div>

          </form>
       </main>
    </div>
  );
}
