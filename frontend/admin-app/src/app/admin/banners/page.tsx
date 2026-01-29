"use client";

import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Image as ImageIcon, Check, X } from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  
  const fetchBanners = async () => {
      try {
          const res = await fetch("http://localhost:8000/api/v1/banners");
          if(res.ok) {
              const data = await res.json();
              setBanners(data);
          }
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAddBanner = async () => {
      // Mock creation for now via API
      try {
        await fetch("http://localhost:8000/api/v1/banners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                title: "New Banner", 
                location: "Home", 
                status: "Active",
                image_url: "https://via.placeholder.com/800" 
            })
        });
        fetchBanners();
      } catch(e) { console.error(e); }
  };

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Banner Management</h1>
           <p className="text-[#A1A1AA]">Manage promotional banners and advertisements.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all">
           <Plus size={18} strokeWidth={2.5} /> Add Banner
        </button>
      </div>

      {/* Banners List */}
      <div className="grid grid-cols-1 gap-4">
         {banners.map((banner) => (
             <div key={banner.id} className="bg-[#18181B] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                 <div className="flex items-center gap-6">
                     {/* Preview Placeholder */}
                     <div className="w-32 h-16 bg-[#27272A] rounded-lg border border-white/5 flex items-center justify-center text-[#71717A]">
                         <ImageIcon size={24} />
                     </div>
                     
                     <div>
                         <h3 className="font-bold text-white text-lg">{banner.title}</h3>
                         <div className="flex items-center gap-4 mt-1 text-sm text-[#A1A1AA]">
                             <span className="bg-[#27272A] px-2 py-0.5 rounded text-xs">{banner.location}</span>
                             <span>{banner.views} views</span>
                             <span>{banner.clicks} clicks</span>
                         </div>
                     </div>
                 </div>

                 <div className="flex items-center gap-6">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        banner.status === "Active" 
                        ? "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20" 
                        : banner.status === "Inactive"
                        ? "bg-[#27272A] text-[#71717A] border-white/5"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                     }`}>
                        {banner.status}
                     </span>
                     
                     <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#71717A] hover:text-white">
                           <MoreHorizontal size={18} />
                        </button>
                     </div>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
}
