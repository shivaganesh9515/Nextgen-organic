"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { UploadCloud, CheckCircle, FileText, Factory, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Schema ---
const MAX_FILE_SIZE = 10000000; // 10MB
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const vendorSchema = z.object({
  // 1. Company
  business_name: z.string().min(2, "Company Name is required"),
  contact_email: z.string().email("Invalid email"),
  phone_number: z.string().min(10, "Invalid phone number"),
  address_line: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Invalid PIN"),
  year_establishment: z.string().optional(),

  // 2. Category
  seller_category: z.enum(["NPOP_ORGANIC", "NATURAL", "ECO_FRIENDLY"]),

  // 3. Documents
  doc_company_reg: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Company Registration is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 10MB")
    .refine((files) => ACCEPTED_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png accepted"),
  
  doc_pan_card: z.custom<FileList>().refine((files) => files?.length === 1, "PAN Card is required"),
  doc_bank_proof: z.custom<FileList>().refine((files) => files?.length === 1, "Bank Proof is required"),
  
  // Optional/Conditional
  doc_manufacturing_license: z.custom<FileList>().optional(),
  
  // 4. NPOP (Conditional in UI)
  npop_number: z.string().optional(),
  npop_scope: z.string().optional(),
  npop_validity: z.string().optional(),
  doc_npop_cert: z.custom<FileList>().optional(),

  // 5. FSSAI
  fssai_number: z.string().min(5, "FSSAI Number is required"),
  fssai_validity: z.string().min(4, "Validity Date required"),
  fssai_type: z.string().min(2, "License type required"),
  doc_fssai_cert: z.custom<FileList>().refine((files) => files?.length === 1, "FSSAI Certificate is required"),
});

type VendorFormValues = z.infer<typeof vendorSchema>;

export default function VendorRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      seller_category: "NPOP_ORGANIC",
    },
  });

  const sellerCategory = watch("seller_category");
  const isOrganic = sellerCategory === "NPOP_ORGANIC";

  const onSubmit = async (data: VendorFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Append Text Fields
    Object.keys(data).forEach((key) => {
       if (!key.startsWith("doc_")) {
           formData.append(key, (data as any)[key] || "");
       }
    });

    // Append Files
    formData.append("doc_company_reg", data.doc_company_reg[0]);
    formData.append("doc_pan_card", data.doc_pan_card[0]);
    formData.append("doc_bank_proof", data.doc_bank_proof[0]);
    formData.append("doc_fssai_cert", data.doc_fssai_cert[0]);

    if (data.doc_manufacturing_license?.length) {
        formData.append("doc_manufacturing_license", data.doc_manufacturing_license[0]);
    }
    if (isOrganic && data.doc_npop_cert?.length) {
        formData.append("doc_npop_cert", data.doc_npop_cert[0]);
    }

    try {
      await axios.post("http://localhost:8000/api/v1/public/vendors/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please check your data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
      return (
          <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
              <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center border border-[#4A6741]/10">
                  <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#4A6741]" />
                  </div>
                  <h2 className="font-heading font-bold text-3xl text-[#262A2B] mb-2">Application Received!</h2>
                  <p className="text-[#262A2B]/70 mb-8 leading-relaxed">
                      Thank you for applying. We will verify your documents and send an approval status to <b>{watch('contact_email')}</b> within 48 hours.
                  </p>
                  <Link href="/" className="block w-full bg-[#4A6741] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#3D5536] transition-colors">
                      Return Home
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A6741]/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A373]/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
           <Link href="/vendors" className="inline-flex items-center gap-2 text-[#262A2B]/60 hover:text-[#4A6741] transition-colors mb-4 font-medium">
             <ArrowLeft size={16} /> Back to Benefits
           </Link>
           <h1 className="font-heading font-black text-4xl text-[#262A2B] mb-2">Vendor Application</h1>
           <p className="text-[#262A2B]/60">Complete the details below to join our certified organic network.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-[#262A2B]/5 border border-[#262A2B]/5 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-[#F5F5F0] h-1.5 w-full">
               <motion.div 
                 className="bg-[#4A6741] h-full" 
                 initial={{ width: 0 }}
                 animate={{ width: `${(step / 3) * 100}%` }}
                 transition={{ duration: 0.5 }}
               />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10">
            
            {/* --- STEP 1: Company & Category --- */}
            {step === 1 && (
                <div className="space-y-8">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-[#262A2B]">
                        <div className="w-10 h-10 rounded-full bg-[#4A6741]/10 flex items-center justify-center text-[#4A6741]">
                           <Factory size={20} /> 
                        </div>
                        Company Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#262A2B] uppercase tracking-wide">Business Name</label>
                            <input {...register("business_name")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="e.g. Green Valley Farms" />
                            {errors.business_name && <p className="text-[#E23744] text-xs font-medium">{errors.business_name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#262A2B] uppercase tracking-wide">Contact Email</label>
                            <input {...register("contact_email")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="you@company.com" />
                            {errors.contact_email && <p className="text-[#E23744] text-xs font-medium">{errors.contact_email.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-[#262A2B] uppercase tracking-wide">Phone Number</label>
                            <input {...register("phone_number")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="+91" />
                            {errors.phone_number && <p className="text-[#E23744] text-xs font-medium">{errors.phone_number.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#262A2B] uppercase tracking-wide">Est. Year</label>
                            <input {...register("year_establishment")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="YYYY" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-[#262A2B] uppercase tracking-wide">Registered Address</label>
                        <input {...register("address_line")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="Street Address" />
                        <div className="grid grid-cols-3 gap-4">
                            <input {...register("city")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="City" />
                            <input {...register("state")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="State" />
                            <input {...register("pincode")} className="w-full px-4 py-3 border border-[#E5E5E0] rounded-xl focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] bg-[#F9F9F7]" placeholder="PIN Code" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#E5E5E0]">
                        <h3 className="block text-sm font-bold text-[#262A2B] uppercase tracking-wide mb-4">Seller Category</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['NPOP_ORGANIC', 'NATURAL', 'ECO_FRIENDLY'].map((cat) => (
                                <label key={cat} className={`border p-4 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-2 text-center ${sellerCategory === cat ? 'bg-[#4A6741]/10 border-[#4A6741]' : 'border-[#E5E5E0] hover:border-[#4A6741]/50'}`}>
                                    <input type="radio" value={cat} {...register("seller_category")} className="sr-only" />
                                    <span className="font-bold text-sm text-[#262A2B]">{cat.replace('_', ' ')}</span>
                                    {cat === 'NPOP_ORGANIC' && <span className="text-[10px] bg-[#F0FDF4] text-[#4A6741] px-2 py-0.5 rounded-full font-bold">Cert. Required</span>}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- STEP 2: Compliance (FSSAI & NPOP) --- */}
            {step === 2 && (
                <div className="space-y-8">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-[#262A2B]">
                        <div className="w-10 h-10 rounded-full bg-[#4A6741]/10 flex items-center justify-center text-[#4A6741]">
                            <Award size={20} /> 
                        </div>
                        Compliance & Licenses
                    </h2>

                    {/* FSSAI Section */}
                    <div className="bg-[#F9F9F7] p-6 rounded-2xl border border-[#E5E5E0]">
                        <h3 className="text-md font-bold text-[#262A2B] mb-6 border-b border-[#262A2B]/10 pb-2">FSSAI License (Mandatory)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#262A2B]/60 uppercase">License Number</label>
                                <input {...register("fssai_number")} className="w-full px-4 py-2 border border-[#E5E5E0] rounded-xl bg-white focus:outline-none focus:border-[#4A6741]" />
                                {errors.fssai_number && <p className="text-[#E23744] text-xs font-medium">{errors.fssai_number.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#262A2B]/60 uppercase">Validity Date</label>
                                <input {...register("fssai_validity")} type="date" className="w-full px-4 py-2 border border-[#E5E5E0] rounded-xl bg-white focus:outline-none focus:border-[#4A6741]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#262A2B]/60 uppercase">License Type</label>
                                <select {...register("fssai_type")} className="w-full px-4 py-2 border border-[#E5E5E0] rounded-xl bg-white focus:outline-none focus:border-[#4A6741]">
                                    <option value="">Select Type</option>
                                    <option value="Manufacturer">Manufacturer</option>
                                    <option value="Trader">Trader</option>
                                    <option value="Marketer">Marketer</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#262A2B]/60 uppercase">Upload Certificate</label>
                                <input type="file" {...register("doc_fssai_cert")} className="w-full text-xs text-[#262A2B] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#4A6741]/10 file:text-[#4A6741] hover:file:bg-[#4A6741]/20" />
                                {errors.doc_fssai_cert && <p className="text-[#E23744] text-xs font-medium">{errors.doc_fssai_cert.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* NPOP Section (Conditional) */}
                    {isOrganic && (
                        <div className="bg-[#4A6741]/5 p-6 rounded-2xl border border-[#4A6741]/20">
                            <h3 className="text-md font-bold text-[#4A6741] mb-6 border-b border-[#4A6741]/10 pb-2">NPOP Organic Certification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#4A6741]/80 uppercase">Certificate Number</label>
                                    <input {...register("npop_number")} className="w-full px-4 py-2 border border-[#4A6741]/20 rounded-xl bg-white focus:outline-none focus:border-[#4A6741]" />
                                </div>
                                <div className="space-y-2">
                                     <label className="text-xs font-bold text-[#4A6741]/80 uppercase">Certification Body</label>
                                     <input {...register("npop_scope")} className="w-full px-4 py-2 border border-[#4A6741]/20 rounded-xl bg-white focus:outline-none focus:border-[#4A6741]" placeholder="e.g. Aditi Organic Certifications" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#4A6741]/80 uppercase">Validity Date</label>
                                    <input {...register("npop_validity")} type="date" className="w-full px-4 py-2 border border-[#4A6741]/20 rounded-xl bg-white focus:outline-none focus:border-[#4A6741]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#4A6741]/80 uppercase">Upload NPOP Certificate</label>
                                    <input type="file" {...register("doc_npop_cert")} className="w-full text-xs text-[#4A6741] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#4A6741] file:text-white hover:file:bg-[#3D5536]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- STEP 3: Legal Documents --- */}
            {step === 3 && (
                <div className="space-y-8">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-[#262A2B]">
                        <div className="w-10 h-10 rounded-full bg-[#4A6741]/10 flex items-center justify-center text-[#4A6741]">
                            <FileText size={20} />
                        </div>
                        Business Documents
                    </h2>
                    <p className="text-sm text-[#262A2B]/60">Please upload clear scans (PDF/JPG/PNG, Max 10MB each).</p>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-[#E5E5E0] p-8 rounded-2xl text-center hover:border-[#4A6741] hover:bg-[#4A6741]/5 transition active:scale-[0.99]">
                            <UploadCloud className="w-10 h-10 text-[#4A6741]/40 mx-auto mb-3" />
                            <label className="block font-bold text-[#262A2B] mb-1">Company Registration / Partnership Deed</label>
                            <input type="file" {...register("doc_company_reg")} className="block w-full text-sm text-[#262A2B]/60 file:mx-auto file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#262A2B] file:text-white hover:file:bg-[#4A6741] cursor-pointer" />
                            {errors.doc_company_reg && <p className="text-[#E23744] text-xs font-medium mt-2">{errors.doc_company_reg.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="border border-dashed border-[#E5E5E0] p-6 rounded-2xl bg-[#F9F9F7]">
                                <label className="block font-bold text-sm text-[#262A2B] mb-3">PAN Card (Entity/Individual)</label>
                                <input type="file" {...register("doc_pan_card")} className="w-full text-xs" />
                                {errors.doc_pan_card && <p className="text-[#E23744] text-xs font-medium mt-1">{errors.doc_pan_card.message}</p>}
                             </div>
                             
                             <div className="border border-dashed border-[#E5E5E0] p-6 rounded-2xl bg-[#F9F9F7]">
                                <label className="block font-bold text-sm text-[#262A2B] mb-3">Cancelled Cheque / Bank Proof</label>
                                <input type="file" {...register("doc_bank_proof")} className="w-full text-xs" />
                                {errors.doc_bank_proof && <p className="text-[#E23744] text-xs font-medium mt-1">{errors.doc_bank_proof.message}</p>}
                             </div>

                             <div className="border border-dashed border-[#E5E5E0] p-6 rounded-2xl bg-[#F9F9F7] md:col-span-2">
                                <label className="block font-bold text-sm text-[#262A2B] mb-3">Manufacturing License (Optional)</label>
                                <input type="file" {...register("doc_manufacturing_license")} className="w-full text-xs" />
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between pt-8 border-t border-[#E5E5E0]">
                {step > 1 ? (
                    <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-3 text-[#262A2B]/60 font-bold hover:text-[#262A2B] transition-colors">
                        Back
                    </button>
                ) : <div />}
                
                {step < 3 ? (
                    <button type="button" onClick={() => setStep(s => s + 1)} className="px-8 py-3 bg-[#262A2B] text-white rounded-xl font-bold hover:bg-[#4A6741] transition-all shadow-lg hover:shadow-xl">
                        Next Step
                    </button>
                ) : (
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-[#4A6741] text-white rounded-xl font-bold hover:bg-[#3D5536] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
