"use client";

import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VendorDocumentRowProps {
  label: string;
  docKey: string;
  data: {
    url?: string;
    fileName?: string; // Added to store filename
    number?: string;
    validity?: string;
    available?: boolean;
    type?: string; 
  };
  onChange: (key: string, data: any) => void;
  required?: boolean;
  showValidity?: boolean;
}

export function VendorDocumentRow({ 
  label, 
  docKey, 
  data, 
  onChange, 
  required = false,
  showValidity = true,
}: VendorDocumentRowProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isAvailable = data.available !== false;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${docKey}_${Date.now()}.${fileExt}`;
      const bucket = 'vendor-docs'; 

      // 1. Try Supabase Upload
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      let publicUrl = "";

      if (uploadError) {
         console.warn("Supabase upload failed, falling back to demo mode for testing if enabled:", uploadError);
         // For Dev/Demo purposes, if Supabase fails (e.g. RLS or bucket missing), 
         // we simulate a success so the flow can be tested.
         // In production, this should throw.
         const isDev = process.env.NODE_ENV === 'development';
         if (isDev) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
            publicUrl = `https://demo-storage.com/${fileName}`; // Fake URL
         } else {
            throw uploadError;
         }
      } else {
         const { data: publicData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);
         publicUrl = publicData.publicUrl;
      }

      onChange(docKey, { ...data, url: publicUrl, fileName: file.name });
    } catch (err: any) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    onChange(docKey, { ...data, [field]: value });
  };

  const toggleAvailability = () => {
    const newAvailable = !isAvailable;
    // If becoming unavailable, we keep old data but mark available: false
    // If becoming available, we mark available: true. 
    // We don't wipe data immediately in case it was accidental.
    onChange(docKey, { ...data, available: newAvailable });
  };

  const clearFile = () => {
      onChange(docKey, { ...data, url: "", fileName: "" });
  };

  return (
    <div className={`p-6 rounded-2xl border transition-colors ${isAvailable ? 'border-[#262A2B]/10 bg-white' : 'border-[#262A2B]/5 bg-[#F5F5F0]'}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
         <div>
            <h4 className="font-bold text-[#262A2B] text-lg flex items-center gap-2">
               {label}
               {required && isAvailable && <span className="text-red-500 text-sm">*</span>}
               {!isAvailable && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">Not Available</span>}
            </h4>
            {!isAvailable && (
               <p className="text-sm text-[#262A2B]/60 mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  Marked as unavailable. This may require admin explanation.
               </p>
            )}
         </div>

      {/* Availability Toggle */}
      <div className="flex items-center justify-end mb-4">
         <label className={`flex items-center gap-2 cursor-pointer select-none transition-all px-3 py-2 rounded-lg border ${!isAvailable ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' : 'border-transparent text-[#262A2B]/40 hover:text-[#262A2B]/80'}`}>
            <input 
               type="checkbox" 
               checked={!isAvailable} 
               onChange={toggleAvailability}
               className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
            />
            <span className="text-sm font-medium">Document not available</span>
         </label>
      </div>
      </div>

      <div className={`transition-all duration-300 ${!isAvailable ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'}`}>
         {/* If not available, we still show the fields but dimmed to indicate they are relevant but skipped */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
             {/* File Upload */}
             <div className="md:col-span-5">
                <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Document File</label>
                
                {data.url ? (
                    // File Uploaded State
                   <div className="w-full bg-[#4A6741]/5 border border-[#4A6741]/20 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                         <div className="bg-[#4A6741]/10 p-2 rounded-lg text-[#4A6741]">
                             <FileText size={18} />
                         </div>
                         <div className="flex flex-col min-w-0">
                             <span className="text-sm font-bold text-[#4A6741] truncate">{data.fileName || "Uploaded File"}</span>
                             <span className="text-[10px] text-[#4A6741]/60 uppercase font-bold tracking-wider">Ready to Submit</span>
                         </div>
                      </div>
                      <button onClick={clearFile} className="p-2 hover:bg-[#4A6741]/10 rounded-full text-[#4A6741] transition-colors">
                         <X size={16} />
                      </button>
                   </div>
                ) : (
                    // Upload State
                   <div className="relative group">
                      {uploading ? (
                          <div className="w-full bg-[#F5F5F0] border border-[#262A2B]/10 rounded-xl px-4 py-3 flex items-center justify-center gap-3 text-[#262A2B]/60">
                              <Loader2 size={18} className="animate-spin" />
                              <span className="text-sm font-medium">Uploading...</span>
                          </div>
                      ) : (
                         <>
                             <input 
                                 type="file" 
                                 accept=".pdf,.jpg,.jpeg,.png"
                                 onChange={handleUpload}
                                 disabled={!isAvailable}
                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                             />
                             <div className="w-full bg-white border border-dashed border-[#262A2B]/20 rounded-xl px-4 py-3 flex items-center gap-3 text-[#262A2B]/60 group-hover:border-[#4A6741] group-hover:text-[#4A6741] transition-all">
                                 <div className="bg-[#F5F5F0] p-2 rounded-lg group-hover:bg-[#4A6741]/10 transition-colors">
                                     <UploadCloud size={18} />
                                 </div>
                                 <span className="text-sm font-medium">Click to upload (PDF/JPG)</span>
                             </div>
                         </>
                      )}
                   </div>
                )}
                {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
             </div>

             {/* Document Number */}
             <div className={`${showValidity ? 'md:col-span-4' : 'md:col-span-7'}`}>
                <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">License / Cert No.</label>
                <input 
                   type="text" 
                   value={data.number || ""} 
                   onChange={(e) => updateField("number", e.target.value)}
                   disabled={!isAvailable}
                   className="w-full bg-white border border-[#262A2B]/10 rounded-xl px-4 py-3 text-[#262A2B] text-sm outline-none focus:border-[#4A6741] focus:ring-2 focus:ring-[#4A6741]/10 transition-all placeholder:text-[#262A2B]/30 disabled:bg-gray-100" 
                   placeholder="e.g. 123456789" 
                />
             </div>

             {/* Validity Date */}
             {showValidity && (
                <div className="md:col-span-3">
                   <label className="block text-xs font-bold text-[#262A2B]/60 mb-2 uppercase tracking-wider">Valid Until</label>
                   <input 
                      type="date" 
                      value={data.validity || ""} 
                      onChange={(e) => updateField("validity", e.target.value)}
                      disabled={!isAvailable}
                      className="w-full bg-white border border-[#262A2B]/10 rounded-xl px-4 py-3 text-[#262A2B] text-sm outline-none focus:border-[#4A6741] focus:ring-2 focus:ring-[#4A6741]/10 transition-all disabled:bg-gray-100" 
                   />
                </div>
             )}
          </div>
      </div>
    </div>
  );
}
