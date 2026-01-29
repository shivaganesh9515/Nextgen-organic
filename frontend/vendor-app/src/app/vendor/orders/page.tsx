"use client";

import { Search, Filter, ArrowUpRight, CheckCircle, Clock, Truck } from "lucide-react";

import { useState, useEffect } from "react";
import { vendorApi } from "@/lib/api";

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      loadOrders();
  }, []);

  const loadOrders = async () => {
      try {
          // In a real app, we'd filter by vendor ID here or in the backend
          const data = await vendorApi.getOrders();
          setOrders(data);
      } catch (e) {
          console.error("Failed to load orders");
      } finally {
          setLoading(false);
      }
  };

  // Helper to filter orders by status
  const pendingOrders = orders.filter((o: any) => o.status === "Pending" || !o.status); // Default to pending if no status
  const processingOrders = orders.filter((o: any) => o.status === "Processing" || o.status === "Confirmed");
  const completedOrders = orders.filter((o: any) => o.status === "Completed" || o.status === "Delivered");
  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Order Management</h1>
           <p className="text-[#A1A1AA]">Track and fulfill incoming harvest requests.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-[#27272A] rounded-full border border-white/5 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]"/> Live Updates
           </div>
        </div>
      </div>

      {/* Kanban Board Mockup */}
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-240px)]">
         
         {/* Column: Pending */}
         <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
               <h3 className="font-bold text-white flex items-center gap-2">
                  <Clock size={18} className="text-orange-500" /> Pending
               </h3>
               <span className="bg-[#27272A] text-[#A1A1AA] text-xs font-bold px-2 py-1 rounded-md">3</span>
            </div>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
               {pendingOrders.map((order, i) => (
                  <div key={i} className="bg-[#27272A]/50 border border-white/5 p-4 rounded-xl hover:border-[#BEF264]/30 cursor-pointer group transition-colors">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-mono text-[#71717A]">{order.id}</span>
                        <span className="text-xs text-[#A1A1AA]">{order.time}</span>
                     </div>
                     <h4 className="font-bold text-white mb-1 group-hover:text-[#BEF264] transition-colors">{order.item}</h4>
                     <div className="flex justify-between items-end">
                        <span className="text-sm text-[#A1A1AA]">Qty: {order.qty}</span>
                        <span className="font-bold text-white bg-[#BEF264]/10 text-[#BEF264] px-2 py-1 rounded-lg text-xs">{order.price}</span>
                     </div>
                     <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                        <button className="flex-1 py-1.5 bg-[#BEF264] text-black text-xs font-bold rounded-lg hover:bg-[#A3D651]">Accept</button>
                        <button className="px-3 py-1.5 bg-white/5 text-white text-xs font-bold rounded-lg hover:bg-white/10">Decline</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Column: Ready to Ship */}
         <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
               <h3 className="font-bold text-white flex items-center gap-2">
                  <Truck size={18} className="text-blue-500" /> Processing
               </h3>
               <span className="bg-[#27272A] text-[#A1A1AA] text-xs font-bold px-2 py-1 rounded-md">2</span>
            </div>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
               {processingOrders.map((order, i) => (
                  <div key={i} className="bg-[#27272A]/50 border border-white/5 p-4 rounded-xl hover:border-blue-500/30 cursor-pointer group transition-colors">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-mono text-[#71717A]">{order.id}</span>
                        <span className="text-xs text-[#A1A1AA]">{order.time}</span>
                     </div>
                     <h4 className="font-bold text-white mb-1">{order.item}</h4>
                     <div className="flex justify-between items-end mb-4">
                        <span className="text-sm text-[#A1A1AA]">Qty: {order.qty}</span>
                        <span className="font-bold text-white">{order.price}</span>
                     </div>
                     <button className="w-full py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                        Mark Ready for Pickup
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Column: Completed */}
         <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
               <h3 className="font-bold text-white flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#BEF264]" /> Completed
               </h3>
               <span className="bg-[#27272A] text-[#A1A1AA] text-xs font-bold px-2 py-1 rounded-md">12</span>
            </div>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {completedOrders.map((order, i) => (
                  <div key={i} className="bg-[#27272A]/30 border border-white/5 p-4 rounded-xl opacity-75 hover:opacity-100 transition-opacity">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-[#71717A]">{order.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#BEF264]/10 text-[#BEF264] font-bold">Paid</span>
                     </div>
                     <h4 className="font-bold text-white mb-1">{order.item}</h4>
                     <div className="flex justify-between text-xs text-[#A1A1AA]">
                        <span>{order.qty}</span>
                        <span>{order.time}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}
