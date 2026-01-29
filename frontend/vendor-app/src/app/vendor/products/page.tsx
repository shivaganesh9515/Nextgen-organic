"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Package } from "lucide-react";

export default function VendorProductsPage() {
  const [products, setProducts] = useState<any[]>([
    // Mock Data for MVP
    { id: 1, name: "Organic Tomatoes", price: "₹40/kg", stock: "120 kg", status: "Active" },
    { id: 2, name: "Fresh Spinach", price: "₹25/bunch", stock: "60 bunches", status: "Low Stock" },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-[#262A2B] tracking-tight mb-2">My Products</h1>
           <p className="text-[#64748B]">Manage your inventory and pricing.</p>
        </div>
        <Link href="/vendor/products/add" className="flex items-center gap-2 px-5 py-2.5 bg-[#4A6741] text-white rounded-full text-sm font-bold hover:bg-[#3D5536] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
           <Plus size={18} strokeWidth={2.5} /> Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white border border-gray-100 p-2 rounded-2xl shadow-sm">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-transparent border-none outline-none text-[#262A2B] pl-12 pr-4 py-2 placeholder:text-gray-400" 
            />
         </div>
         <div className="h-6 w-px bg-gray-100" />
         <button className="flex items-center gap-2 px-4 py-2 text-[#64748B] hover:text-[#4A6741] transition-colors text-sm font-medium">
            <Filter size={16} /> Status
         </button>
      </div>

      {/* Product List */}
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
         {products.length > 0 ? (
             <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                       <th className="py-5 px-6 font-medium text-xs text-[#64748B] uppercase tracking-wider">Product Name</th>
                       <th className="py-5 px-6 font-medium text-xs text-[#64748B] uppercase tracking-wider">Price</th>
                       <th className="py-5 px-6 font-medium text-xs text-[#64748B] uppercase tracking-wider">Stock</th>
                       <th className="py-5 px-6 font-medium text-xs text-[#64748B] uppercase tracking-wider">Status</th>
                       <th className="py-5 px-6 font-medium text-xs text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                       <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-6">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#F5F5F0] flex items-center justify-center text-[#4A6741]">
                                   <Package size={20} />
                                </div>
                                <div className="font-medium text-[#262A2B]">{product.name}</div>
                             </div>
                          </td>
                          <td className="py-5 px-6 text-[#64748B] text-sm">{product.price}</td>
                          <td className="py-5 px-6 text-[#64748B] text-sm">{product.stock}</td>
                          <td className="py-5 px-6">
                             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                product.status === "Active" 
                                ? "bg-green-50 text-green-700 border-green-100" 
                                : "bg-orange-50 text-orange-700 border-orange-100"
                             }`}>
                                {product.status}
                             </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#64748B] hover:text-[#262A2B]">
                                <MoreHorizontal size={18} />
                             </button>
                          </td>
                       </tr>
                    ))}
                </tbody>
             </table>
         ) : (
             <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#262A2B] mb-2">No Products Yet</h3>
                <p className="text-[#64748B] mb-6">Start adding your organic produce to the marketplace.</p>
                <Link href="/vendor/products/add" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A6741] text-white rounded-xl font-medium hover:bg-[#3D5536] transition-colors">
                    Add First Product
                </Link>
             </div>
         )}
      </div>
    </div>
  );
}
