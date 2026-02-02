"use client";

import { UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VendorDocumentRowProps {
  label: string;
  docKey: string;
  data: {
    url?: string;
    number?: string;
    validity?: string;
    available?: boolean;
    type?: string; // For things like License type
  };
  onChange: (key: string, data: any) => void;
  required?: boolean;
  showValidity?: boolean;
  showType?: boolean; // For license types
}

export function VendorDocumentRow({ 
  label, 
  docKey, 
  data, 
  onChange, 
  required = false,
  showValidity = true,
  showType = false
}: VendorDocumentRowProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isAvailable = data.available !== false; // Default to true if undefined

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${docKey}_${Date.now()}.${fileExt}`;
      const bucket = 'vendor-docs'; // Ensure this bucket exists in Supabase

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange(docKey, { ...data, url: publicUrl });
    } catch (err: any) {
      console.error(err);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    onChange(docKey, { ...data, [field]: value });
  };

  const toggleAvailability = () => {
    // If turning OFF availability, clear data
    const newAvailable = !isAvailable;
    const newData = newAvailable ? { ...data, available: true } : { ...data, available: false, url: "", number: "", validity: "" };
    onChange(docKey, newData);
  };

  return (
    <div className={`p-6 rounded-2xl border ${isAvailable ? 'border-[#262A2B]/10 bg-white' : 'border-[#262A2B]/5 bg-[#F5F5F0]'}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
         <div>
            <h4 className="font-bold text-[#262A2B] text-lg flex items-center gap-2">
               {label}
               {required && <span className="text-red-500 text-sm">*</span>}
               {!isAvailable && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Not Available</span>}
            </h4>
            {!isAvailable && (
               <p className="text-sm text-red-500/80 mt-1">
                  <AlertCircle size={14} className="inline mr-1" />
                  Marked as unavailable. You may need to provide a reason during verification.
               </p>
            )}
         </div>

         {/* Availability Toggle */}
         <label className="flex items-center gap-2 cursor-pointer select-none">
            <input 
               type="checkbox" 
               checked={!isAvailable} 
               onChange={toggleAvailability}
               className="w-4 h-4 accent-[#262A2B]"
            />
            <span className="text-sm text-[#262A2B]/70">Document not available</span>
         </label>
      </div>

      {isAvailable && (
         <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* File Upload */}
            <div className="md:col-span-4">
               <label className="block text-xs font-bold text-[#262A2B]/60 mb-1 uppercase tracking-wider">Document File</label>
               <div className="relative group">
                  {data.url ? (
                     <div className="w-full bg-[#4A6741]/5 border border-[#4A6741]/20 rounded-xl px-4 py-3 text-[#4A6741] flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2 truncate">
                           <CheckCircle2 size={16} /> Uploaded
                        </span>
                        <input 
                           type="file" 
                           accept=".pdf,.jpg,.jpeg,.png"
                           onChange={handleUpload}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-xs underline cursor-pointer hover:text-[#262A2B]">Change</span>
                     </div>
                  ) : (
                     <div className="relative">
                        <input 
                           type="file" 
                           accept=".pdf,.jpg,.jpeg,.png"
                           onChange={handleUpload}
                           className="w-full bg-white border border-dashed border-[#262A2B]/20 rounded-xl px-4 py-3 text-sm text-[#262A2B]/60 outline-none focus:border-[#4A6741] hover:bg-[#F5F5F0] transition-colors cursor-pointer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none gap-2 text-[#262A2B]/40">
                           {uploading ? (
                              <span className="text-xs">Uploading...</span>
                           ) : (
                              <>
                                 <UploadCloud size={16} />
                                 <span className="text-xs">Choose File</span>
                              </>
                           )}
                        </div>
                     </div>
                  )}
               </div>
               {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>

            {/* Document Number */}
            <div className={`${showValidity ? 'md:col-span-5' : 'md:col-span-8'}`}>
               <label className="block text-xs font-bold text-[#262A2B]/60 mb-1 uppercase tracking-wider">License / Cert No.</label>
               <input 
                  type="text" 
                  value={data.number || ""} 
                  onChange={(e) => updateField("number", e.target.value)}
                  className="w-full bg-white border border-[#262A2B]/10 rounded-xl px-4 py-3 text-[#262A2B] text-sm outline-none focus:border-[#4A6741]" 
                  placeholder="e.g. FSSAI-123456789" 
               />
            </div>

            {/* Validity Date */}
            {showValidity && (
               <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-[#262A2B]/60 mb-1 uppercase tracking-wider">Valid Until</label>
                  <input 
                     type="date" 
                     value={data.validity || ""} 
                     onChange={(e) => updateField("validity", e.target.value)}
                     className="w-full bg-white border border-[#262A2B]/10 rounded-xl px-4 py-3 text-[#262A2B] text-sm outline-none focus:border-[#4A6741]" 
                  />
               </div>
            )}
         </div>
      )}
    </div>
  );
}
