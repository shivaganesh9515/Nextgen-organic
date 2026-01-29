"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Users, Mail, Phone, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/customers", {
          headers: { "Authorization": "Bearer DEV_ADMIN_TOKEN" }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Customer Base</h1>
         <p className="text-[#A1A1AA]">Insights into registered consumers.</p>
      </div>

       {/* Filters */}
       <div className="flex items-center gap-4 bg-[#18181B] border border-white/5 p-2 rounded-2xl">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#52525B]" 
            />
         </div>
         <div className="h-6 w-px bg-white/10" />
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Filter size={16} /> Filter
         </button>
      </div>

      {/* Customers List */}
      <div className="bg-[#18181B] border border-white/5 rounded-[2rem] overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#27272A]/50 border-b border-white/5">
                <tr>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Customer</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Contact</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Orders</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Spent</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider">Status</th>
                   <th className="py-5 px-6 font-medium text-xs text-[#71717A] uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {customers.map((cust) => (
                   <tr key={cust.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#27272A] flex items-center justify-center text-[#BEF264]">
                               <Users size={20} />
                            </div>
                            <div>
                                <div className="font-medium text-white">{cust.name}</div>
                                <div className="text-xs text-[#71717A]">ID: #{cust.id}</div>
                            </div>
                         </div>
                      </td>
                      <td className="py-5 px-6">
                          <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                                  <Mail size={12} /> {cust.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                                  <Phone size={12} /> {cust.phone}
                              </div>
                          </div>
                      </td>
                      <td className="py-5 px-6 text-white text-sm font-medium">
                          <div className="flex items-center gap-2">
                              <ShoppingBag size={14} className="text-[#BEF264]" /> {cust.orders}
                          </div>
                      </td>
                      <td className="py-5 px-6 text-[#A1A1AA] text-sm">{cust.spent}</td>
                      <td className="py-5 px-6">
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            cust.status === "Active" 
                            ? "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20" 
                            : "bg-[#27272A] text-[#71717A] border-white/5"
                         }`}>
                            {cust.status}
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
