import { ArrowUpRight, Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

import { useState, useEffect } from "react";
import { vendorApi } from "@/lib/api";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
      earnings: 0,
      activeProducts: 0,
      pendingOrders: 0,
      recentOrders: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      loadStats();
  }, []);

  const loadStats = async () => {
      try {
          const [products, orders] = await Promise.all([
              vendorApi.getProducts(),
              vendorApi.getOrders()
          ]);

          // Calculate Metrics
          const activeProducts = products.length;
          
          // Filter Orders for this vendor (Mock: Assuming all orders returned are for this vendor for now)
          const pendingOrders = orders.filter((o: any) => o.status === "Pending" || !o.status).length;
          
          // Calculate Earnings (Mock: Parsing "₹800" string)
          const earnings = orders.reduce((acc: number, order: any) => {
             if (order.price) {
                 const val = parseInt(order.price.replace(/[^\d]/g, '')) || 0;
                 return acc + val;
             }
             return acc;
          }, 0);

          setStats({
              earnings,
              activeProducts,
              pendingOrders,
              recentOrders: orders.slice(0, 5)
          });

      } catch (e) {
          console.error("Failed to load dashboard stats");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Farm Overview</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all">
           + Add New Harvest
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
          {/* Main Earnings Card */}
          <div className="col-span-8 bg-gradient-to-br from-[#18181B] to-[#27272A] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <div className="text-[#A1A1AA] font-medium text-sm uppercase tracking-wider mb-2">Total Earnings</div>
                   <div className="text-5xl font-bold text-white">₹{stats.earnings.toLocaleString()}</div>
                </div>
                <div className="px-4 py-2 bg-[#BEF264]/10 rounded-full flex items-center gap-2 text-sm font-bold text-[#BEF264] border border-[#BEF264]/20">
                   <TrendingUp size={16} /> +24% vs last harvest
                </div>
             </div>
             
             {/* Simple Area Chart Mockup */}
             <div className="h-48 w-full flex items-end justify-between gap-2">
                {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100, 95, 85].map((h, i) => (
                   <div key={i} className="flex-1 bg-[#BEF264]/20 rounded-t-lg relative group h-full flex items-end">
                      <div style={{ height: `${h}%` }} className="w-full bg-[#BEF264] rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 relative group-hover:shadow-[0_0_20px_rgba(190,242,100,0.3)]"></div>
                   </div>
                ))}
             </div>
          </div>

          {/* Quick Stats */}
          <div className="col-span-4 space-y-4">
             <div className="bg-[#18181B] border border-white/5 p-6 rounded-[2rem] hover:border-[#BEF264]/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-[#27272A] rounded-2xl text-white group-hover:text-[#BEF264] transition-colors"><Package size={24}/></div>
                   <ArrowUpRight className="text-[#A1A1AA]" size={20} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.activeProducts}</div>
                <div className="text-[#A1A1AA] text-sm">Active Products Listed</div>
             </div>
             <div className="bg-[#18181B] border border-white/5 p-6 rounded-[2rem] hover:border-[#BEF264]/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-[#27272A] rounded-2xl text-white group-hover:text-[#BEF264] transition-colors"><ShoppingCart size={24}/></div>
                   <ArrowUpRight className="text-[#A1A1AA]" size={20} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.pendingOrders}</div>
                <div className="text-[#A1A1AA] text-sm">Pending Orders</div>
             </div>
          </div>
      </div>

      <div className="bg-[#18181B] border border-white/5 rounded-[2.5rem] p-8">
         <h3 className="text-white font-bold text-xl mb-6">Recent Orders</h3>
         <table className="w-full text-left">
            <thead className="text-xs text-[#71717A] uppercase tracking-wider border-b border-white/5">
                <tr>
                   <th className="pb-4 pl-2">Order ID</th>
                   <th className="pb-4">Product</th>
                   <th className="pb-4">Date</th>
                   <th className="pb-4">Status</th>
                   <th className="pb-4 text-right pr-2">Total</th>
                </tr>
            </thead>
            <tbody className="text-sm">
               {stats.recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02]">
                     <td className="py-4 pl-2 font-mono text-[#A1A1AA]">{order.id || `#ORD-${i}`}</td>
                     <td className="py-4 text-white font-medium">{order.item || "Unknown Item"}</td>
                     <td className="py-4 text-[#A1A1AA]">{order.time || "Just now"}</td>
                     <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">{order.status || "Pending"}</span>
                     </td>
                     <td className="py-4 text-right pr-2 text-white font-bold">{order.price}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
