import { Search, Filter, Plus, MoreHorizontal, Image as ImageIcon, Box } from "lucide-react";

export default function VendorProductsPage() {
  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">My Produce</h1>
            <p className="text-[#A1A1AA]">Manage your active listings and inventory batches.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]">
            <Plus size={18} strokeWidth={2.5} /> Add New Listing
         </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-[#18181B] border border-white/5 p-2 rounded-2xl">
         <div className="flex-1 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
             <input type="text" placeholder="Search products..." className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#52525B]" />
         </div>
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium border-l border-white/10">
            <Filter size={16} /> Category
         </button>
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Box size={16} /> Stock Status
         </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6">
         {[
            { name: "Organic Red Tomatoes", category: "Vegetables", stock: "120 kg", price: "₹40/kg", image: "bg-red-500/10 text-red-500", status: "Active" },
            { name: "Fresh Spinach Batch 2", category: "Leafy Greens", stock: "45 bundles", price: "₹15/bun", image: "bg-green-500/10 text-green-500", status: "Active" },
            { name: "Raw Honey (Wild)", category: "Essentials", stock: "12 L", price: "₹850/L", image: "bg-yellow-500/10 text-yellow-500", status: "Low Stock" },
            { name: "Sona Masoori Rice", category: "Grains", stock: "500 kg", price: "₹65/kg", image: "bg-stone-500/10 text-stone-300", status: "Active" },
            { name: "Guntur Chillies", category: "Spices", stock: "0 kg", price: "₹120/kg", image: "bg-red-600/10 text-red-600", status: "Out of Stock" },
         ].map((product, i) => (
            <div key={i} className="bg-[#18181B] border border-white/5 p-6 rounded-[2.5rem] group hover:border-[#BEF264]/50 transition-all hover:-translate-y-1 duration-300">
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${product.image}`}>
                     <ImageIcon size={24} />
                  </div>
                  <div className="relative">
                     <button className="p-2 hover:bg-[#27272A] rounded-full text-[#71717A] hover:text-white transition-colors">
                        <MoreHorizontal size={20} />
                     </button>
                  </div>
               </div>
               
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#BEF264] transition-colors line-clamp-1">{product.name}</h3>
               <div className="text-sm text-[#A1A1AA] mb-6">{product.category}</div>
               
               <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <div>
                     <div className="text-sm font-bold text-white">{product.price}</div>
                     <div className={`text-xs font-medium ${product.status === 'Active' ? 'text-[#BEF264]' : product.status === 'Low Stock' ? 'text-orange-500' : 'text-red-500'}`}>
                        ● {product.stock} left
                     </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-[#27272A] text-white text-xs font-bold hover:bg-white hover:text-black transition-colors">
                     Edit
                  </button>
               </div>
            </div>
         ))}
         
         {/* Add New Placeholder */}
         <div className="border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-[#52525B] hover:text-[#BEF264] hover:border-[#BEF264]/30 hover:bg-[#BEF264]/5 transition-all cursor-pointer group p-8 min-h-[240px]">
            <div className="w-16 h-16 rounded-full bg-[#18181B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Plus size={32} />
            </div>
            <span className="font-bold">Add New Product</span>
         </div>
      </div>
    </div>
  );
}
