"use client";

import { useState } from "react";
import { X, UploadCloud, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { api } from "@/lib/api";

export default function AddProductModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    productType: "ORGANIC", // Default
    category: "1" // Default ID 1 (Vegetables) - Dynamic later
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        let imageUrl = "";
        
        // 1. Upload Image
        if (image) {
            const fileExt = image.name.split('.').pop();
            const fileName = `products/${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
              .from('products') // Ensure this bucket exists!
              .upload(fileName, image);
            
            if (uploadError) throw uploadError;
            
            const { data: { publicUrl } } = supabase.storage
              .from('products')
              .getPublicUrl(fileName);
              
            imageUrl = publicUrl;
        }

        // 2. Submit to Backend
        await api.vendors.addProduct({
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            stock_quantity: parseInt(form.stock),
            category_id: parseInt(form.category),
            product_type: form.productType,
            image_url: imageUrl
        });
        
        onSuccess();
        onClose();
    } catch (error) {
        console.error(error);
        alert("Failed to add product");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-[#E5E5E0] flex justify-between items-center bg-[#F9FAFB]">
            <h3 className="font-bold text-lg text-[#262A2B]">Add New Product</h3>
            <button onClick={onClose} className="p-2 hover:bg-[#E5E5E0] rounded-full transition-colors"><X size={20}/></button>
        </div>
        
        <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                   <label className="block text-sm font-bold text-[#262A2B] mb-1">Product Name</label>
                   <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741]" placeholder="e.g. Fresh Organic Carrots" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-[#262A2B] mb-1">Price (₹)</label>
                       <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741]" placeholder="0.00" />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-[#262A2B] mb-1">Stock (kg)</label>
                       <input required type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741]" placeholder="0" />
                    </div>
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-[#262A2B] mb-1">Type</label>
                   <select value={form.productType} onChange={e => setForm({...form, productType: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741] bg-white">
                        <option value="ORGANIC">Organic (NPOP Verified)</option>
                        <option value="NATURAL">Natural (Chemical Free)</option>
                        <option value="ECO_FRIENDLY">Eco Friendly</option>
                   </select>
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-[#262A2B] mb-1">Category</label>
                   <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741] bg-white">
                        {/* Dynamic categories ideally, static for MVP */}
                        <option value="1">Vegetables</option>
                        <option value="2">Fruits</option>
                        <option value="3">Grains</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-bold text-[#262A2B] mb-1">Description</label>
                   <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 outline-none focus:border-[#4A6741]" placeholder="Describe your produce..." />
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-[#262A2B] mb-1">Product Image</label>
                   <div className="relative">
                        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full border border-[#E5E5E0] rounded-xl px-4 py-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#4A6741]/10 file:text-[#4A6741] hover:file:bg-[#4A6741]/20 cursor-pointer" />
                   </div>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full bg-[#4A6741] text-white font-bold py-3 rounded-xl hover:bg-[#3A5233] transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        {loading ? "Publishing..." : "Publish Product"}
                    </button>
                    <p className="text-xs text-center text-[#262A2B]/40 mt-2">Product will be live on the app immediately.</p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
