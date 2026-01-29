"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { UploadCloud, CheckCircle, FileText, Factory, Award } from "lucide-react";

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
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
                  <p className="text-gray-600 mb-6">
                      Your vendor application has been received. Our team will verify your documents and send an approval email to <b>{watch('contact_email')}</b>.
                  </p>
                  <button onClick={() => window.location.href='/'} className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-800 transition">
                      Return Home
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Partner with NextGen Organics</h1>
          <p className="mt-2 text-gray-600">Join our network of verified organic producers. Complete the form to start.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Progress Bar (Simple) */}
          <div className="bg-gray-100 h-2 w-full">
               <div className="bg-green-600 h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            
            {/* --- STEP 1: Company & Category --- */}
            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Factory className="w-5 h-5 text-green-600" /> Company Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business / Farm Name</label>
                            <input {...register("business_name")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Green Valley Farms" />
                            {errors.business_name && <p className="text-red-500 text-xs mt-1">{errors.business_name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input {...register("contact_email")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            {errors.contact_email && <p className="text-red-500 text-xs mt-1">{errors.contact_email.message}</p>}
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input {...register("phone_number")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Establishment Year</label>
                            <input {...register("year_establishment")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="YYYY" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Registered Address</label>
                        <input {...register("address_line")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Street Address" />
                        <div className="grid grid-cols-3 gap-4">
                            <input {...register("city")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="City" />
                            <input {...register("state")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="State" />
                            <input {...register("pincode")} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="PIN Code" />
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="block text-sm font-medium text-gray-700 mb-3">Seller Category</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['NPOP_ORGANIC', 'NATURAL', 'ECO_FRIENDLY'].map((cat) => (
                                <label key={cat} className={`border p-4 rounded-xl cursor-pointer hover:border-green-500 transition flex flex-col items-center gap-2 ${sellerCategory === cat ? 'bg-green-50 border-green-600' : 'border-gray-200'}`}>
                                    <input type="radio" value={cat} {...register("seller_category")} className="sr-only" />
                                    <span className="font-medium text-sm text-gray-900">{cat.replace('_', ' ')}</span>
                                    {cat === 'NPOP_ORGANIC' && <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Certificate Required</span>}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- STEP 2: Compliance (FSSAI & NPOP) --- */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-600" /> Compliance & Licenses
                    </h2>

                    {/* FSSAI Section */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-md font-medium text-gray-900 mb-4">FSSAI License (Mandatory)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">License Number</label>
                                <input {...register("fssai_number")} className="w-full p-2 border border-gray-300 rounded-lg" />
                                {errors.fssai_number && <p className="text-red-500 text-xs mt-1">{errors.fssai_number.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Validity Date</label>
                                <input {...register("fssai_validity")} type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">License Type</label>
                                <select {...register("fssai_type")} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                    <option value="">Select Type</option>
                                    <option value="Manufacturer">Manufacturer</option>
                                    <option value="Trader">Trader</option>
                                    <option value="Marketer">Marketer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Upload Certificate</label>
                                <input type="file" {...register("doc_fssai_cert")} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                                {errors.doc_fssai_cert && <p className="text-red-500 text-xs mt-1">{errors.doc_fssai_cert.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* NPOP Section (Conditional) */}
                    {isOrganic && (
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                            <h3 className="text-md font-medium text-green-900 mb-4">NPOP Organic Certification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-green-800 mb-1">Certificate Number</label>
                                    <input {...register("npop_number")} className="w-full p-2 border border-green-300 rounded-lg focus:ring-green-500" />
                                </div>
                                <div className="">
                                     <label className="block text-xs font-medium text-green-800 mb-1">Certification Body</label>
                                     <input {...register("npop_scope")} className="w-full p-2 border border-green-300 rounded-lg" placeholder="e.g. Aditi Organic Certifications" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-green-800 mb-1">Validity Date</label>
                                    <input {...register("npop_validity")} type="date" className="w-full p-2 border border-green-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-green-800 mb-1">Upload NPOP Certificate</label>
                                    <input type="file" {...register("doc_npop_cert")} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-green-700 hover:file:bg-green-100" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- STEP 3: Legal Documents --- */}
            {step === 3 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" /> Business Documents
                    </h2>
                    <p className="text-sm text-gray-500">Please upload clear scans (PDF/JPG/PNG, Max 10MB each).</p>

                    <div className="space-y-4">
                        <div className="border border-dashed border-gray-300 p-6 rounded-xl text-center hover:bg-gray-50 transition">
                            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                            <label className="block font-medium text-gray-900 mb-1">Company Registration / Partnership Deed</label>
                            <input type="file" {...register("doc_company_reg")} className="block w-full text-sm text-gray-500 file:mx-auto file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" />
                            {errors.doc_company_reg && <p className="text-red-500 text-xs mt-1">{errors.doc_company_reg.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="border border-dashed border-gray-300 p-4 rounded-xl">
                                <label className="block font-medium text-sm text-gray-700 mb-2">PAN Card (Entity/Individual)</label>
                                <input type="file" {...register("doc_pan_card")} className="w-full text-xs" />
                                {errors.doc_pan_card && <p className="text-red-500 text-xs mt-1">{errors.doc_pan_card.message}</p>}
                             </div>
                             
                             <div className="border border-dashed border-gray-300 p-4 rounded-xl">
                                <label className="block font-medium text-sm text-gray-700 mb-2">Cancelled Cheque / Bank Proof</label>
                                <input type="file" {...register("doc_bank_proof")} className="w-full text-xs" />
                                {errors.doc_bank_proof && <p className="text-red-500 text-xs mt-1">{errors.doc_bank_proof.message}</p>}
                             </div>

                             <div className="border border-dashed border-gray-300 p-4 rounded-xl">
                                <label className="block font-medium text-sm text-gray-700 mb-2">Manufacturing License (Optional)</label>
                                <input type="file" {...register("doc_manufacturing_license")} className="w-full text-xs" />
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
                {step > 1 ? (
                    <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-2 text-gray-600 font-medium hover:text-gray-900">
                        Back
                    </button>
                ) : <div />}
                
                {step < 3 ? (
                    <button type="button" onClick={() => setStep(s => s + 1)} className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition">
                        Next Step
                    </button>
                ) : (
                    <button type="submit" disabled={isSubmitting} className="px-8 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
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
