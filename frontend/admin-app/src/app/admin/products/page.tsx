"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Filter, MoreHorizontal, Package, ArrowUpRight, CheckCircle, XCircle, Eye, Flag, Trash2, RefreshCw, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  vendor: string;
  vendor_id: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  is_active: boolean;
  image_url: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:8000/api/v1/products/all", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewVendor = (product: Product) => {
    setActiveDropdown(null);
    window.location.href = `/admin/vendors?id=${product.vendor_id}`;
  };

  const handleApprove = async (product: Product) => {
    setActiveDropdown(null);
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/products/${product.id}/approve`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchProducts();
      alert("Product approved successfully");
    } catch (e) {
      alert("Error approving product");
    }
  };

  const handleReject = async (product: Product) => {
    setActiveDropdown(null);
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/products/${product.id}/reject`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reason })
      });
      fetchProducts();
      alert("Product rejected");
    } catch (e) {
      alert("Error rejecting product");
    }
  };

  const handleFlag = async (product: Product) => {
    setActiveDropdown(null);
    const reason = prompt("Enter reason for flagging (e.g., suspicious pricing, misleading info):");
    if (!reason) return;
    
    alert(`Product "${product.name}" flagged for review: ${reason}`);
    // In production, this would call an API endpoint
  };

  const handleRemove = async (product: Product) => {
    setActiveDropdown(null);
    if (!confirm(`Are you sure you want to remove "${product.name}" from the marketplace?`)) return;
    
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`http://localhost:8000/api/v1/admin/products/${product.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchProducts();
      alert("Product removed from listing");
    } catch (e) {
      alert("Error removing product");
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === "PUBLISHED") return "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20";
    if (status === "PENDING") return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    if (status === "REJECTED") return "bg-red-500/10 text-red-500 border-red-500/20";
    return "bg-[#27272A] text-[#71717A] border-white/5";
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      "PUBLISHED": "Active",
      "PENDING": "Pending",
      "REJECTED": "Rejected",
      "DRAFT": "Draft"
    };
    return map[status] || status;
  };

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Global Inventory</h1>
          <p className="text-[#A1A1AA]">Monitor and manage products across all vendors. Total: {products.length} products</p>
        </div>
        <button 
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-[#18181B] border border-white/5 p-2 rounded-2xl">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name, vendor or ID..." 
              className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#52525B]" 
            />
         </div>
         <div className="h-6 w-px bg-white/10" />
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Filter size={16} /> Filter
         </button>
      </div>

      {/* Products Table */}
      <div className="bg-[#18181B] border border-white/5 rounded-[2rem] overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-white/5">
                <tr>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Product</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Vendor</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Category</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Price</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Stock</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-[#71717A]">
                      <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                      Loading products...
                    </td>
                  </tr>
                )}
                {!loading && products.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-[#71717A]">
                      <Package size={48} className="mx-auto mb-3 text-[#27272A]" />
                      No products found
                    </td>
                  </tr>
                )}
                {products.map((product) => (
                   <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#27272A] flex items-center justify-center text-[#BEF264]">
                               <Package size={20} />
                            </div>
                            <div className="font-medium text-white">{product.name}</div>
                         </div>
                      </td>
                      <td className="py-5 px-6">
                          <button 
                            onClick={() => handleViewVendor(product)}
                            className="flex items-center gap-2 text-[#A1A1AA] text-sm hover:text-[#BEF264] transition-colors"
                          >
                              {product.vendor} <ArrowUpRight size={14} />
                          </button>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{product.category}</td>
                      <td className="py-5 px-6 text-white text-sm font-medium">₹{product.price}</td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{product.stock} units</td>
                      <td className="py-5 px-6">
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(product.status)}`}>
                            {getStatusText(product.status)}
                         </span>
                      </td>
                      <td className="py-5 px-6 text-right relative">
                         <div ref={activeDropdown === product.id ? dropdownRef : null}>
                           <button 
                             onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                             className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#71717A] hover:text-white"
                           >
                              <MoreHorizontal size={18} />
                           </button>
                           
                           {/* Dropdown Menu */}
                           {activeDropdown === product.id && (
                             <div className="absolute right-6 top-12 w-52 bg-[#27272A] border border-[#3f3f46] rounded-xl shadow-xl z-50 overflow-hidden">
                               <button onClick={() => handleViewVendor(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                 <Eye size={16} className="text-[#BEF264]" /> View Vendor
                               </button>
                               {product.status === "PENDING" && (
                                 <>
                                   <button onClick={() => handleApprove(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                     <CheckCircle size={16} className="text-green-400" /> Approve Listing
                                   </button>
                                   <button onClick={() => handleReject(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                     <XCircle size={16} className="text-red-400" /> Reject Listing
                                   </button>
                                 </>
                               )}
                               <button onClick={() => handleFlag(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-[#3f3f46] transition-colors text-left">
                                 <Flag size={16} className="text-orange-400" /> Flag for Review
                               </button>
                               <div className="border-t border-[#3f3f46]" />
                               <button onClick={() => handleRemove(product)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left">
                                 <Trash2 size={16} /> Remove Listing
                               </button>
                             </div>
                           )}
                         </div>
                      </td>
                   </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}

