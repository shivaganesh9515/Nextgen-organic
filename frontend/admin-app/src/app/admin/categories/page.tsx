"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, FileCheck, Loader2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if(!newCategory.name) return;
    try {
        const res = await fetch("http://localhost:8000/api/v1/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer DEV_ADMIN_TOKEN"
            },
            body: JSON.stringify({ ...newCategory, slug: newCategory.slug || newCategory.name.toLowerCase().replace(/ /g, '-') })
        });
        if (res.ok) {
            fetchCategories();
            setIsAdding(false);
            setNewCategory({ name: "", slug: "" });
        }
    } catch (error) {
        console.error("Failed to create category", error);
    }
  };

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Categories</h1>
           <p className="text-[#A1A1AA]">Organize products into logical groups.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all">
           <Plus size={18} strokeWidth={2.5} /> Add Category
        </button>
      </div>

      {/* Add Category Modal (Inline for MVP) */}
      {isAdding && (
          <div className="bg-[#18181B] border border-white/10 p-6 rounded-2xl animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-4">New Category</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Category Name" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Slug (optional)" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  />
              </div>
              <div className="flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-[#A1A1AA] hover:text-white">Cancel</button>
                  <button onClick={handleAddCategory} className="px-4 py-2 bg-[#BEF264] text-black font-bold rounded-lg hover:bg-[#A3D651]">Save Category</button>
              </div>
          </div>
      )}

      {/* Category List */}
      <div className="bg-[#18181B] border border-white/5 rounded-[2rem] overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-white/5">
                <tr>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Name</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Slug</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Products</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {categories.map((cat) => (
                   <tr key={cat.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#27272A] flex items-center justify-center text-[#BEF264]">
                               <FileCheck size={20} />
                            </div>
                            <div className="font-medium text-white">{cat.name}</div>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm font-mono">{cat.slug}</td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{cat.count} items</td>
                      <td className="py-5 px-6">
                         <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#BEF264]/10 text-[#BEF264] text-xs font-medium border border-[#BEF264]/20">
                            {cat.status}
                         </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                         <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#71717A] hover:text-white">
                            <MoreHorizontal size={18} />
                         </button>
                      </td>
                   </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
