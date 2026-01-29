"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, ShoppingCart, Calendar, MapPin, Loader2 } from "lucide-react";

interface OrderItem {
  product: string;
  quantity: number;
  vendor: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "DELIVERED" | "PENDING" | string;
  total: number;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/orders", {
          headers: { "Authorization": "Bearer DEV_ADMIN_TOKEN" }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-[400px] flex items-center justify-center text-[#BEF264]"><Loader2 className="animate-spin" size={32}/></div>;

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Order Management</h1>
         <p className="text-[#A1A1AA]">Track and fulfill customer orders globally.</p>
      </div>

       {/* Filters */}
       <div className="flex items-center gap-4 bg-[#18181B] border border-white/5 p-2 rounded-2xl">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer Name..." 
              className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 py-2 placeholder:text-[#52525B]" 
            />
         </div>
         <div className="h-6 w-px bg-white/10" />
         <button className="flex items-center gap-2 px-4 py-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
            <Filter size={16} /> Status
         </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
         {orders.map((order) => (
             <div key={order.id} className="bg-[#18181B] border border-white/5 p-6 rounded-2xl group hover:bg-white/[0.02] transition-colors">
                 <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-[#27272A] rounded-xl flex items-center justify-center text-[#BEF264]">
                             <ShoppingCart size={20} />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-white">Order #{order.id}</h3>
                             <div className="text-sm text-[#A1A1AA] flex items-center gap-2 mt-1">
                                 <span>{order.customer}</span>
                                 <span className="w-1 h-1 bg-[#52525B] rounded-full" />
                                 <span className="flex items-center gap-1"><Calendar size={12}/> {order.date}</span>
                             </div>
                         </div>
                     </div>
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                         order.status === "DELIVERED" ? "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20" : 
                         order.status === "PENDING" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                         "bg-[#27272A] text-[#71717A] border-white/5"
                     }`}>
                        {order.status}
                     </span>
                 </div>

                 <div className="border-t border-white/5 py-4 mb-4">
                     <div className="space-y-3">
                         {order.items.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center text-sm">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-[#27272A] rounded-lg"></div>
                                     <span className="text-white">{item.product}</span>
                                     <span className="text-[#71717A]">x{item.quantity}</span>
                                 </div>
                                 <span className="text-[#A1A1AA] text-xs">Vendor: {item.vendor}</span>
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="flex justify-between items-center pt-2">
                     <div className="font-bold text-xl text-white">₹{order.total}</div>
                     <button className="px-4 py-2 border border-white/10 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all">
                         View Details
                     </button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
}
