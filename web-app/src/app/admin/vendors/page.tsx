import { Search, Filter, MoreHorizontal, Download, Plus, MapPin } from "lucide-react";

export default function VendorsPage() {
  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Vendor Management</h1>
           <p className="text-[#A1A1AA]">Manage relationships with farmers and distribution hubs.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]">
           <Plus size={18} strokeWidth={2.5} /> Add Vendor
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4 bg-[#18181B] border border-white/5 p-2 rounded-2xl">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search vendors by name, location or ID..." 
              className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#52525B]" 
            />
         </div>
         <div className="h-6 w-px bg-white/10" />
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Filter size={16} /> Status
         </button>
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <MapPin size={16} /> Location
         </button>
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Download size={16} /> Export
         </button>
      </div>

      {/* Vendors Table */}
      <div className="bg-[#18181B] border border-white/5 rounded-[2rem] overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-white/5">
                <tr>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Vendor ID</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Farmer / Hub</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Location</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Revenue</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {[
                   { id: "#V-9281", name: "Ramesh Organics", type: "Farmer", loc: "Siddipet, TS", status: "Active", rev: "₹2.4L" },
                   { id: "#V-9282", name: "Green Valley Hub", type: "Hub", loc: "Medchal, HYD", status: "Active", rev: "₹14.8L" },
                   { id: "#V-9283", name: "Prakruthi Farms", type: "Farmer", loc: "Vikarabad, TS", status: "Pending", rev: "₹0" },
                   { id: "#V-9284", name: "Soil Soul Collective", type: "Farmer", loc: "Warangal, TS", status: "Active", rev: "₹85k" },
                   { id: "#V-9285", name: "Urban Greens", type: "Hub", loc: "Gachibowli, HYD", status: "Suspended", rev: "₹5.2L" },
                   { id: "#V-9286", name: "Millet Magic", type: "Farmer", loc: "Adilabad, TS", status: "Active", rev: "₹1.1L" },
                ].map((vendor, i) => (
                   <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6 text-[#71717A] text-sm font-mono">{vendor.id}</td>
                      <td className="py-5 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center text-[10px] font-bold text-[#A1A1AA]">
                               {vendor.name.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                               <div className="font-medium text-white">{vendor.name}</div>
                               <div className="text-xs text-[#71717A]">{vendor.type}</div>
                            </div>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{vendor.loc}</td>
                      <td className="py-5 px-6">
                         <StatusBadge status={vendor.status} />
                      </td>
                      <td className="py-5 px-6 text-white font-medium">{vendor.rev}</td>
                      <td className="py-5 px-6 text-right">
                         <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#71717A] hover:text-white">
                            <MoreHorizontal size={18} />
                         </button>
                      </td>
                   </tr>
                ))}
            </tbody>
         </table>
         {/* Pagination Mock */}
         <div className="py-4 px-6 border-t border-white/5 flex justify-between items-center text-xs text-[#71717A]">
            <div>Showing 6 of 84 vendors</div>
            <div className="flex gap-2">
               <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors disabled:opacity-50">Previous</button>
               <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors text-white bg-white/5">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
   if (status === "Active") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264] text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]" /> Active
         </div>
      );
   }
   if (status === "Pending") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Pending Only
         </div>
      );
   }
   return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27272A] border border-white/5 text-[#71717A] text-xs font-medium">
         <div className="w-1.5 h-1.5 rounded-full bg-[#71717A]" /> {status}
      </div>
   );
}
