"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, ShieldCheck, Leaf, Sprout, Recycle, CheckCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { VendorDocumentRow } from "@/components/forms/VendorDocumentRow";

// Seller Categories
const SELLER_CATEGORIES = [
  { 
      id: "NPOP_ORGANIC", 
      label: "Organic", 
      icon: Leaf,
      desc: "Certified Organic products under NPOP standards." 
  },
  { 
      id: "NATURAL", 
      label: "Natural", 
      icon: Sprout,
      desc: "Chemical-free, naturally grown without certification." 
  },
  { 
      id: "ECO_FRIENDLY", 
      label: "Eco-friendly", 
      icon: Recycle,
      desc: "Sustainable and eco-conscious products." 
  }
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
  
  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    sellerCategory: "NPOP_ORGANIC", // Default
    documents: INITIAL_DOCS as Record<string, any>,
    agreed: false
  });

  // Calculate Validity
  const isFormValid = (() => {
      // 1. Basic Fields
      if (!formData.businessName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) return false;
      
      // 2. Declaration
      if (!formData.agreed) return false;

      // 3. Category Specific Logic
      // If Organic, NPOP is mandatory unless explicitly marked unavailable (which might require admin approval)
      // But for "Redesign", we enforce: If Organic -> MUST have NPOP.
      if (formData.sellerCategory === "NPOP_ORGANIC") {
          const npop = formData.documents.npop;
          // If available is true (default), must have URL and Number
          if (npop.available !== false) {
             if (!npop.url || !npop.number) return false;
          }
      }

      // 4. General Docs Validation logic could go here if we want to enforce other docs
      // For now, we only STRICTLY enforce NPOP for Organic as per requirements.
      
      return true;
  })();

  const updateDoc = (key: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [key]: data }
    }));
  };

  // Validation Logic
  const validateForm = () => {
      // 1. Basic Fields
      if (!formData.businessName || !formData.email || !formData.phone || !formData.address) return "Please fill in all Business Details.";
      
      // 2. Declaration
      if (!formData.agreed) return "You must agree to the terms and declaration.";

      // 3. Category Specific Validation
      if (formData.sellerCategory === "NPOP_ORGANIC") {
          const npop = formData.documents.npop;
          if (npop.available !== false) {
             if (!npop.url || !npop.number) return "NPOP Certificate and Number are required for Organic vendors.";
          }
      }

      return null;
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validationError = validateForm();
    if (validationError) {
        setError(validationError);
        setLoading(false);
        // Scroll to top or error
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        seller_category: formData.sellerCategory,
        
        // Flattened Doc Fields
        npop_number: formData.documents.npop?.number,
        npop_scope: "NPOP", // Default scope
        fssai_number: formData.documents.fssai?.number,
        fssai_type: "General", // Default/Derived

        documents: {
          ...formData.documents, 
        }
      });

      router.push("/login/vendor?registered=true");
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || "Registration failed. Please title-case your inputs and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
       {/* Header */}
       <header className="bg-white border-b border-[#262A2B]/5 sticky top-0 z-40 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
             <Link href="/login/vendor" className="text-[#4A6741] font-medium flex items-center gap-2 hover:text-[#262A2B] transition-colors">
                <ArrowLeft size={18} /> Back to Login
             </Link>
             <div className="flex items-center gap-4">
               {isFormValid ? (
                  <span className="flex items-center gap-2 text-xs font-bold text-[#4A6741] bg-[#4A6741]/10 px-3 py-1.5 rounded-full animate-pulse">
                     <CheckCircle size={14} /> Ready to Submit
                  </span>
               ) : (
                  <span className="text-xs font-bold text-[#262A2B]/30 bg-[#262A2B]/5 px-3 py-1.5 rounded-full">
                     Incomplete Application
                  </span>
               )}
               <span className="text-[#262A2B]/40 font-mono text-xs uppercase tracking-widest hidden md:block">Vendor Registration</span>
             </div>
          </div>
       </header>

       <main className="max-w-4xl mx-auto px-6 py-12">
          
          <div className="text-center mb-12">
             <h1 className="font-heading font-black text-4xl text-[#262A2B] mb-4">Partner Application</h1>
             <p className="text-[#262A2B]/60 text-lg max-w-2xl mx-auto">
                Join our curated network of ethical producers. Please ensure all details are accurate for quick verification.
             </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            
            {/* 1. Business Details */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold text-lg">1</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Business Details</h2>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Registered Business Name <span className="text-red-500">*</span></label>
                    <input required type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all font-heading" placeholder="e.g. Prakruthi Organic Farms Pvt Ltd" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Business Email <span className="text-red-500">*</span></label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="accounts@farm.com" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Direct Contact Number <span className="text-red-500">*</span></label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all" placeholder="+91 98765 43210" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Registered Address <span className="text-red-500">*</span></label>
                     <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] font-medium outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all mb-4" placeholder="Street Address / Plot No." />
                     
                     <div className="grid grid-cols-3 gap-4">
                        <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all text-sm" placeholder="City" />
                        <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all text-sm" placeholder="State" />
                        <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-[#F5F5F0] border-transparent rounded-xl px-4 py-3 text-[#262A2B] outline-none focus:bg-white focus:ring-2 ring-[#4A6741]/20 transition-all text-sm" placeholder="PIN Code" />
                     </div>
                  </div>
               </div>
            </section>

            {/* 2. Product Nature Toggle */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold text-lg">2</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Nature of Products</h2>
               </div>
               
               <div className="grid md:grid-cols-3 gap-4">
                  {SELLER_CATEGORIES.map(cat => {
                     const Icon = cat.icon;
                     const isSelected = formData.sellerCategory === cat.id;
                     return (
                        <div 
                           key={cat.id}
                           onClick={() => setFormData({...formData, sellerCategory: cat.id})}
                           className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                              isSelected 
                               ? 'border-[#4A6741] bg-[#4A6741]/5 shadow-md' 
                               : 'border-[#262A2B]/10 hover:border-[#4A6741]/50 bg-white'
                           }`}
                        >
                           <div className={`mb-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-[#4A6741] text-white' : 'bg-[#F5F5F0] text-[#262A2B]/60 group-hover:bg-[#4A6741]/10 group-hover:text-[#4A6741]'}`}>
                              <Icon size={20} />
                           </div>
                           <h3 className={`font-bold mb-1 ${isSelected ? 'text-[#4A6741]' : 'text-[#262A2B]'}`}>{cat.label}</h3>
                           <p className="text-xs text-[#262A2B]/60 leading-relaxed">{cat.desc}</p>
                           
                           {isSelected && (
                              <div className="absolute top-4 right-4 text-[#4A6741]">
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                 </svg>
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            </section>

            {/* 3. Certifications (Conditional) */}
            <div className={`transition-all duration-300 ${formData.sellerCategory === 'NPOP_ORGANIC' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                {formData.sellerCategory === 'NPOP_ORGANIC' && (
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5 ring-2 ring-[#4A6741]/10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold text-lg">3</div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#262A2B]">Organic Certification</h2>
                            <p className="text-sm text-[#262A2B]/60 mt-1">Required for accurate labeling of organic products.</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <VendorDocumentRow 
                            label="NPOP Organic Certificate" 
                            docKey="npop" 
                            data={formData.documents.npop} 
                            onChange={updateDoc} 
                            required 
                        />
                    </div>
                    </section>
                )}
            </div>

            {/* Informational Banner for Non-Organic */}
            {formData.sellerCategory !== 'NPOP_ORGANIC' && (
                <div className="bg-[#4A6741]/5 border border-[#4A6741]/20 p-6 rounded-2xl flex items-start gap-4">
                    <div className="bg-white p-2 rounded-full shadow-sm text-[#4A6741] shrink-0">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#4A6741] text-sm mb-1 uppercase tracking-wide">Standard Verification</h4>
                        <p className="text-[#262A2B]/70 text-sm">
                            Since you selected <strong>{SELLER_CATEGORIES.find(c => c.id === formData.sellerCategory)?.label}</strong>, 
                            NPOP certification is not mandatory. However, valid business proof is still required.
                        </p>
                    </div>
                </div>
            )}

            {/* 4. Licensing and Registration */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold text-lg">{formData.sellerCategory === 'NPOP_ORGANIC' ? 4 : 3}</div>
                  <h2 className="text-2xl font-bold text-[#262A2B]">Business Registration</h2>
               </div>
               
               <div className="space-y-6">
                  <VendorDocumentRow label="FSSAI License" docKey="fssai" data={formData.documents.fssai} onChange={updateDoc} showValidity />
                  <VendorDocumentRow label="GST Registration" docKey="gst" data={formData.documents.gst} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="UDYAM Registration" docKey="udyam" data={formData.documents.udyam} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="PAN Card" docKey="pan" data={formData.documents.pan} onChange={updateDoc} showValidity={false} />
                  <VendorDocumentRow label="Manufacturing License" docKey="manufacturing_license" data={formData.documents.manufacturing_license} onChange={updateDoc} showValidity={true} />
               </div>
            </section>

            {/* 5. Declaration */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#262A2B]/5">
               <div className="flex items-center gap-4 p-4 bg-[#F5F5F0] rounded-xl border border-[#262A2B]/10">
                  <ShieldCheck size={32} className="text-[#4A6741] shrink-0" />
                  <div className="text-sm text-[#262A2B]/80 font-medium">
                     <p>I hereby declare that all the information submitted is true and valid. I understand that any falsification will lead to immediate rejection and blacklisting from the NextGen Organic platform.</p>
                  </div>
               </div>
               
               <label className="flex items-center gap-3 mt-6 cursor-pointer select-none group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.agreed ? 'bg-[#4A6741] border-[#4A6741]' : 'border-[#262A2B]/20 bg-white group-hover:border-[#4A6741]'}`}>
                     {formData.agreed && <svg width="16" height="16" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </div>
                  <input type="checkbox" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} className="hidden" />
                  <span className="font-bold text-[#262A2B]">I confirm that the above details are true and valid.</span>
               </label>
            </section>

            <div className="flex flex-col gap-4 pt-4">
              {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-medium text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {error}
                  </div>
              )}
              
              <button 
                  type="submit" 
                  disabled={loading || !isFormValid}
                  className="w-full bg-[#4A6741] text-white font-bold py-5 rounded-full text-xl shadow-xl hover:bg-[#3A5233] transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
              >
                  {loading && <Loader2 className="animate-spin" size={24} />}
                  {loading ? "Submitting Application..." : isFormValid ? "Submit Vendor Application" : "Complete All Required Fields"}
              </button>
              <div className="text-center">
                  <p className="text-[#262A2B]/40 text-sm">Your application will be reviewed within 24-48 hours.</p>
              </div>
            </div>

          </form>
       </main>
    </div>
  );
}
