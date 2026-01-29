"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Loader2, AlertCircle } from "lucide-react";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement Product Creation Logic
    setTimeout(() => {
        setLoading(false);
        alert("Product Created (Mock)");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/vendor/products" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-gray-900">
           <ArrowLeft size={20} />
        </Link>
        <div>
           <h1 className="text-2xl font-bold text-[#262A2B]">Add New Product</h1>
           <p className="text-[#64748B] text-sm">List your organic produce for customers.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
         <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div>
               <label className="block text-sm font-medium text-[#262A2B] mb-2">Product Image</label>
               <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#4A6741] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-gray-400 group-hover:bg-[#4A6741]/10 group-hover:text-[#4A6741] transition-colors">
                     <Upload size={24} />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Click to upload photo</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                  <input type="file" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
               </div>
               {image && <p className="mt-2 text-sm text-[#4A6741] font-medium flex items-center gap-2">✅ {image.name}</p>}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-[#262A2B] mb-2">Product Name</label>
                  <input type="text" required placeholder="e.g. Organic Red Tomatoes" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-[#262A2B] mb-2">Category</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all">
                     <option>Select Category</option>
                     <option>Vegetables</option>
                     <option>Fruits</option>
                     <option>Grains</option>
                  </select>
               </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className="block text-sm font-medium text-[#262A2B] mb-2">Price (₹)</label>
                  <input type="number" required placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-[#262A2B] mb-2">Unit</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all">
                     <option>kg</option>
                     <option>gm</option>
                     <option>bunch</option>
                     <option>piece</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-[#262A2B] mb-2">Stock Qty</label>
                  <input type="number" required placeholder="100" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all" />
               </div>
            </div>

            {/* Type */}
            <div>
               <label className="block text-sm font-medium text-[#262A2B] mb-2">Product Type</label>
               <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#4A6741] has-[:checked]:border-[#4A6741] has-[:checked]:bg-[#4A6741]/5 transition-all">
                     <input type="radio" name="type" className="w-4 h-4 text-[#4A6741] focus:ring-[#4A6741]" defaultChecked />
                     <span className="font-medium text-[#262A2B]">Organic (NPOP)</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#4A6741] has-[:checked]:border-[#4A6741] has-[:checked]:bg-[#4A6741]/5 transition-all">
                     <input type="radio" name="type" className="w-4 h-4 text-[#4A6741] focus:ring-[#4A6741]" />
                     <span className="font-medium text-[#262A2B]">Residue Free / Natural</span>
                  </label>
               </div>
            </div>

            {/* Description */}
            <div>
               <label className="block text-sm font-medium text-[#262A2B] mb-2">Description</label>
               <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4A6741]/20 focus:border-[#4A6741] outline-none transition-all" placeholder="Tell customers about your product..."></textarea>
            </div>

            <div className="pt-4 flex items-center gap-4">
               <button type="button" className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
               </button>
               <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-[#4A6741] text-white font-bold rounded-xl shadow-lg hover:bg-[#3D5536] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <> <Save size={20} /> Save Product </>}
               </button>
            </div>
         </form>
      </div>
    </div>
  );
}
