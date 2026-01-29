"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreHorizontal, Download, Plus, MapPin, Check, X, ShieldCheck, User } from "lucide-react";

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter vendors based on active tab
  const filteredVendors = vendors.filter(v => 
      activeTab === "all" ? true : v.status === "Pending"
  );

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/admin/vendors", {
          headers: { "Authorization": "Bearer DEV_ADMIN_TOKEN" }
      });
      if (res.ok) {
          const data = await res.json();
          setVendors(data);
      }
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
      try {
          const res = await fetch(`http://localhost:8000/api/v1/admin/vendors/${id}/approve`, {
              method: "POST",
               headers: { "Authorization": "Bearer DEV_ADMIN_TOKEN" }
          });
          const data = await res.json();
          if (res.ok) {
              fetchVendors();
              // Show credentials to the user
              if(data.temp_credentials) {
                  prompt("Vendor Approved! Copy the temporary password:", data.temp_credentials.password);
              } else {
                  alert("Vendor Approved!");
              }
          } else {
              alert("Error: " + data.message);
          }
      } catch (e) {
          alert("Error approving vendor");
      }
  };

  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Vendor Management</h1>
           <p className="text-[#A1A1AA]">Monitor, approve, and manage seller accounts.</p>
        </div>
        <div className="flex gap-3">
             <button onClick={() => fetchVendors()} className="px-4 py-2 border border-white/10 rounded-full text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all">
                Refresh
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]">
                <Download size={18} /> Export List
            </button>
        </div>
      </div>

       {/* Tabs */}
       <div className="flex gap-2 border-b border-white/5 pb-1">
           <button 
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 text-sm font-medium rounded-t-xl transition-all relative ${activeTab === "all" ? "text-white bg-[#18181B]" : "text-[#71717A] hover:text-white"}`}
           >
               All Vendors
               {activeTab === "all" && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#BEF264]" />}
           </button>
           <button 
                onClick={() => setActiveTab("pending")}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-t-xl transition-all relative ${activeTab === "pending" ? "text-white bg-[#18181B]" : "text-[#71717A] hover:text-white"}`}
           >
               Pending Approval
               {vendors.filter(v => v.status === "Pending").length > 0 && (
                   <span className="w-5 h-5 rounded-full bg-[#BEF264] text-black flex items-center justify-center text-[10px] font-bold">
                       {vendors.filter(v => v.status === "Pending").length}
                   </span>
               )}
               {activeTab === "pending" && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#BEF264]" />}
           </button>
       </div>

      {/* Vendors Table */}
      <div className="bg-[#18181B] border border-white/5 rounded-b-[2rem] rounded-tr-[2rem] overflow-hidden min-h-[400px]">
         <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-white/5">
                <tr>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Business Name</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Contact</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Category</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {activeTab === "pending" && filteredVendors.length === 0 && !loading && (
                    <tr>
                        <td colSpan={5} className="py-20 text-center text-[#71717A]">
                            <div className="flex flex-col items-center gap-3">
                                <ShieldCheck size={48} className="text-[#27272A]" />
                                <p>No pending approvals</p>
                            </div>
                        </td>
                    </tr>
                )}
                {activeTab === "all" && filteredVendors.length === 0 && !loading && (
                    <tr>
                        <td colSpan={5} className="py-20 text-center text-[#71717A]">No vendors found.</td>
                    </tr>
                )}
                
                {filteredVendors.map((vendor) => (
                   <tr key={vendor.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-[#27272A] flex items-center justify-center text-[#A1A1AA]">
                                 <User size={20} />
                             </div>
                             <div>
                                <div className="font-medium text-white">{vendor.business_name}</div>
                                <div className="text-xs text-[#71717A]">ID: {vendor.id.substring(0,8)}...</div>
                             </div>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">
                          <div>{vendor.contact_email}</div>
                          <div className="text-xs">{vendor.phone_number}</div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{vendor.seller_category}</td>
                      <td className="py-5 px-6">
                         <StatusBadge status={vendor.status} />
                      </td>
                      <td className="py-5 px-6 text-right flex justify-end gap-2">
                         {vendor.status === "Pending" ? (
                             <>
                                <button onClick={() => handleApprove(vendor.id)} className="flex items-center gap-1 px-3 py-1.5 bg-[#BEF264]/10 text-[#BEF264] hover:bg-[#BEF264]/20 rounded-lg text-xs font-medium transition cursor-pointer">
                                    <Check size={14} /> Approve
                                </button>
                                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-xs font-medium transition cursor-pointer">
                                    <X size={14} /> Reject
                                </button>
                             </>
                         ) : (
                             <button className="p-2 hover:bg-white/10 rounded-lg text-[#71717A] hover:text-white transition-colors">
                                 <MoreHorizontal size={18} />
                             </button>
                         )}
                      </td>
                   </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
   if (status === "Approved") { // Changed from Active to Approved based on Backend Enum usually
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264] text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]" /> Active
         </div>
      );
   }
   if (status === "Pending") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Pending
         </div>
      );
   }
   if (status === "Rejected") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Rejected
         </div>
      );
   }
   return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27272A] border border-white/5 text-[#71717A] text-xs font-medium">
         <div className="w-1.5 h-1.5 rounded-full bg-[#71717A]" /> {status}
      </div>
   );
}
