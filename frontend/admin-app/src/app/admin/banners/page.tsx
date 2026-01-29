"use client";

import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Image as ImageIcon, Link as LinkIcon, Edit, Trash, X, ExternalLink } from "lucide-react";
import { adminApi } from "@/lib/api";

type Banner = {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  location: string;
  status: string;
  views?: number;
  clicks?: number;
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
      title: "",
      location: "Home - Hero",
      status: "Active",
      image_url: "",
      link_url: ""
  });

  const fetchBanners = async () => {
      try {
          const data = await adminApi.getBanners();
          setBanners(data as unknown as Banner[]);
      } catch (err) {
          console.error("Failed to fetch banners", err);
      }
  };

  useEffect(() => {
    fetchBanners();
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
      const handleClickOutside = () => setActionMenuOpen(null);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (editingBanner) {
              await adminApi.updateBanner(editingBanner.id, formData);
          } else {
              await adminApi.createBanner(formData);
          }
          setIsModalOpen(false);
          setEditingBanner(null);
          resetForm();
          fetchBanners();
      } catch (err) {
          console.error("Failed to save banner", err);
      }
  };
  
  const handleEdit = (banner: Banner) => {
      setEditingBanner(banner);
      setFormData({
          title: banner.title,
          location: banner.location,
          status: banner.status,
          image_url: banner.image_url,
          link_url: banner.link_url || ""
      });
      setIsModalOpen(true);
      setActionMenuOpen(null);
  };
  
  const handleDelete = async (id: number) => {
      if(!confirm("Are you sure you want to delete this banner?")) return;
      try {
          await adminApi.deleteBanner(id);
          fetchBanners();
      } catch(err) {
          console.error(err);
      }
  };
  
  const resetForm = () => {
      setFormData({
          title: "",
          location: "Home - Hero",
          status: "Active",
          image_url: "",
          link_url: ""
      });
  };

  const openModal = () => {
      setEditingBanner(null);
      resetForm();
      setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Banner Management</h1>
           <p className="text-[#A1A1AA]">Manage promotional banners and advertisements.</p>
        </div>
        <button 
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all"
        >
           <Plus size={18} strokeWidth={2.5} /> Add Banner
        </button>
      </div>

      {/* Banners List */}
      <div className="grid grid-cols-1 gap-4">
         {banners.length === 0 ? (
             <div className="text-center p-12 bg-[#18181B] border border-white/5 rounded-2xl">
                 <p className="text-[#71717A]">No banners found. Create one to get started.</p>
             </div>
         ) : (
             banners.map((banner) => (
                 <div key={banner.id} className="relative bg-[#18181B] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                     <div className="flex items-center gap-6">
                         {/* Preview */}
                         <div className="w-32 h-16 bg-[#27272A] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center text-[#71717A] relative">
                             {banner.image_url ? (
                                 <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                             ) : (
                                 <ImageIcon size={24} />
                             )}
                         </div>
                         
                         <div>
                             <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-lg">{banner.title}</h3>
                                {banner.link_url && (
                                    <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="text-[#BEF264] hover:underline text-xs flex items-center gap-1">
                                        <ExternalLink size={10} /> {banner.link_url}
                                    </a>
                                )}
                             </div>
                             <div className="flex items-center gap-4 mt-1 text-sm text-[#A1A1AA]">
                                 <span className="bg-[#27272A] px-2 py-0.5 rounded text-xs">{banner.location}</span>
                             </div>
                         </div>
                     </div>

                     <div className="flex items-center gap-6">
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            banner.status === "Active" 
                            ? "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20" 
                            : "bg-[#27272A] text-[#71717A] border-white/5"
                         }`}>
                            {banner.status}
                         </span>
                         
                         <div className="relative">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActionMenuOpen(actionMenuOpen === banner.id ? null : banner.id);
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#71717A] hover:text-white"
                            >
                               <MoreHorizontal size={18} />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {actionMenuOpen === banner.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#27272A] border border-[#3f3f46] rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <button 
                                        onClick={() => handleEdit(banner)}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 text-left"
                                    >
                                        <Edit size={16} className="text-[#BEF264]" /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(banner.id)}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 text-left"
                                    >
                                        <Trash size={16} /> Delete
                                    </button>
                                </div>
                            )}
                         </div>
                     </div>
                 </div>
             ))
         )}
      </div>

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
              <div className="bg-[#18181B] border border-[#27272A] w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">{editingBanner ? "Edit Banner" : "Add New Banner"}</h2>
                      <button onClick={() => setIsModalOpen(false)} className="text-[#A1A1AA] hover:text-white"><X size={20} /></button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Banner Title</label>
                          <input 
                              type="text" 
                              required
                              value={formData.title}
                              onChange={e => setFormData({...formData, title: e.target.value})}
                              className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF264]"
                              placeholder="e.g. Summer Sale"
                          />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Location</label>
                              <select 
                                  value={formData.location}
                                  onChange={e => setFormData({...formData, location: e.target.value})}
                                  className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF264]"
                              >
                                  <option value="Home - Hero">Home - Hero</option>
                                  <option value="Home - Mid">Home - Mid</option>
                                  <option value="Sidebar">Sidebar</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Status</label>
                              <select 
                                  value={formData.status}
                                  onChange={e => setFormData({...formData, status: e.target.value})}
                                  className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF264]"
                              >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Image URL</label>
                          <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
                              <input 
                                  type="url" 
                                  required
                                  value={formData.image_url}
                                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                                  className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#BEF264]"
                                  placeholder="https://..."
                              />
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Target Link (Redirect)</label>
                          <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
                              <input 
                                  type="text" 
                                  value={formData.link_url}
                                  onChange={e => setFormData({...formData, link_url: e.target.value})}
                                  className="w-full bg-[#27272A] border border-[#3f3f46] rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#BEF264]"
                                  placeholder="/offers/summer or https://..."
                              />
                          </div>
                          <p className="text-xs text-[#71717A] mt-1 ml-1">Where should the user go when clicking this banner?</p>
                      </div>
                      
                      <div className="pt-4 flex justify-end gap-3">
                          <button 
                              type="button" 
                              onClick={() => setIsModalOpen(false)}
                              className="px-5 py-2.5 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-medium transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              className="px-6 py-2.5 bg-[#BEF264] hover:bg-[#A3D651] text-black rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#BEF264]/20"
                          >
                              {editingBanner ? "Save Changes" : "Create Banner"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
