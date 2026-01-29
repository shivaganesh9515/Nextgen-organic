"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Filter, MoreHorizontal, Download, MapPin, Check, X, ShieldCheck, User, Eye, Ban, Mail, Trash2, Package, RefreshCw, PlayCircle } from "lucide-react";

interface Vendor {
  id: string;
  business_name: string;
  contact_email: string;
  phone_number: string;
  seller_category: string;
  status: string;
  city?: string;
  is_verified?: boolean;
}

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredVendors = vendors.filter(v => 
      activeTab === "all" ? true : v.status === "PENDING"
  );

  useEffect(() => {
    fetchVendors();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:8000/api/v1/admin/vendors", {
          headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
          const data = await res.json();
          setVendors(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
      try {
           const token = localStorage.getItem("admin_token");
           const res = await fetch(`http://localhost:8000/api/v1/admin/vendors/${id}/approve`, {
              method: "POST",
               headers: { "Authorization": `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) {
              fetchVendors();
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

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this vendor?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/vendors/${id}/reject`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchVendors();
    } catch (e) {
      alert("Error rejecting vendor");
    }
  };

  const handleSuspend = async (vendor: Vendor) => {
    setActiveDropdown(null);
    if (!confirm(`Are you sure you want to suspend ${vendor.business_name}?`)) return;
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/vendors/${vendor.id}/suspend`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchVendors();
      alert("Vendor suspended successfully");
    } catch (e) {
      alert("Error suspending vendor");
    }
  };

  const handleReactivate = async (vendor: Vendor) => {
    setActiveDropdown(null);
    if (!confirm(`Are you sure you want to reactivate ${vendor.business_name}?`)) return;
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/vendors/${vendor.id}/reactivate`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchVendors();
      alert("Vendor reactivated successfully");
    } catch (e) {
      alert("Error reactivating vendor");
    }
  };

  const handleViewProducts = (vendor: Vendor) => {
    setActiveDropdown(null);
    // Navigate to products filtered by vendor
    window.location.href = `/admin/products?vendor=${vendor.id}`;
  };

  const handleContact = (vendor: Vendor) => {
    setActiveDropdown(null);
    window.open(`mailto:${vendor.contact_email}?subject=NextGen Organics - Regarding Your Account`, '_blank');
  };

  const handleDelete = async (vendor: Vendor) => {
    setActiveDropdown(null);
    if (!confirm(`Are you sure you want to permanently delete ${vendor.business_name}? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/vendors/${vendor.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchVendors();
      alert("Vendor deleted successfully");
    } catch (e) {
      alert("Error deleting vendor");
    }
  };

  const getStatusDisplay = (status: string) => {
    const map: Record<string, string> = {
      "APPROVED": "Active",
      "PENDING": "Pending",
      "REJECTED": "Rejected",
      "SUSPENDED": "Suspended"
    };
    return map[status] || status;
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
             <button onClick={() => fetchVendors()} className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all">
                <RefreshCw size={16} /> Refresh
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
               All Vendors ({vendors.length})
               {activeTab === "all" && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#BEF264]" />}
           </button>
           <button 
                onClick={() => setActiveTab("pending")}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-t-xl transition-all relative ${activeTab === "pending" ? "text-white bg-[#18181B]" : "text-[#71717A] hover:text-white"}`}
           >
               Pending Approval
               {vendors.filter(v => v.status === "PENDING").length > 0 && (
                   <span className="w-5 h-5 rounded-full bg-[#BEF264] text-black flex items-center justify-center text-[10px] font-bold">
                       {vendors.filter(v => v.status === "PENDING").length}
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
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-[#71717A]">Loading vendors...</td>
                  </tr>
                )}
                {!loading && filteredVendors.length === 0 && (
                    <tr>
                        <td colSpan={5} className="py-20 text-center text-[#71717A]">
                            <div className="flex flex-col items-center gap-3">
                                <ShieldCheck size={48} className="text-[#27272A]" />
                                <p>{activeTab === "pending" ? "No pending approvals" : "No vendors found"}</p>
                            </div>
                        </td>
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
                                <div className="font-medium text-white flex items-center gap-2">
                                  {vendor.business_name}
                                  {vendor.is_verified && <ShieldCheck size={14} className="text-[#BEF264]" />}
                                </div>
                                <div className="text-xs text-[#71717A]">{vendor.city || "Location N/A"}</div>
                             </div>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">
                          <div>{vendor.contact_email}</div>
                          <div className="text-xs">{vendor.phone_number}</div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{vendor.seller_category.replace(/_/g, " ")}</td>
                      <td className="py-5 px-6">
                         <StatusBadge status={vendor.status} />
                      </td>
                      <td className="py-5 px-6 text-right relative">
                         {vendor.status === "PENDING" ? (
                             <div className="flex justify-end gap-2">
                                <button onClick={() => handleApprove(vendor.id)} className="flex items-center gap-1 px-3 py-1.5 bg-[#BEF264]/10 text-[#BEF264] hover:bg-[#BEF264]/20 rounded-lg text-xs font-medium transition cursor-pointer">
                                    <Check size={14} /> Approve
                                </button>
                                <button onClick={() => handleReject(vendor.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-xs font-medium transition cursor-pointer">
                                    <X size={14} /> Reject
                                </button>
                             </div>
                         ) : (
                             <div ref={activeDropdown === vendor.id ? dropdownRef : null}>
                                <button 
                                  onClick={() => setActiveDropdown(activeDropdown === vendor.id ? null : vendor.id)}
                                  className="p-2 hover:bg-white/10 rounded-lg text-[#71717A] hover:text-white transition-colors"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {activeDropdown === vendor.id && (
                                  <div className="absolute right-6 top-12 w-52 bg-[#27272A] border border-[#3f3f46] rounded-xl shadow-xl z-50 overflow-hidden">
                                    <button onClick={() => handleViewProducts(vendor)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                      <Package size={16} className="text-[#BEF264]" /> View Products
                                    </button>
                                    <button onClick={() => handleContact(vendor)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                      <Mail size={16} className="text-blue-400" /> Contact Vendor
                                    </button>
                                    {vendor.status === "SUSPENDED" ? (
                                      <button onClick={() => handleReactivate(vendor)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                        <PlayCircle size={16} className="text-green-400" /> Reactivate Vendor
                                      </button>
                                    ) : (
                                      <button onClick={() => handleSuspend(vendor)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                        <Ban size={16} className="text-orange-400" /> Suspend Vendor
                                      </button>
                                    )}
                                    <div className="border-t border-[#3f3f46]" />
                                    <button onClick={() => handleDelete(vendor)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left">
                                      <Trash2 size={16} /> Delete Vendor
                                    </button>
                                  </div>
                                )}
                             </div>
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
   if (status === "APPROVED") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264] text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]" /> Active
         </div>
      );
   }
   if (status === "PENDING") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Pending
         </div>
      );
   }
   if (status === "REJECTED") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Rejected
         </div>
      );
   }
   if (status === "SUSPENDED") {
      return (
         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Suspended
         </div>
      );
   }
   return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27272A] border border-white/5 text-[#71717A] text-xs font-medium">
         <div className="w-1.5 h-1.5 rounded-full bg-[#71717A]" /> {status}
      </div>
   );
}

