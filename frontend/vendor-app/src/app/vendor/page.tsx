"use client";

import { ArrowUpRight, Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardStats {
  earnings: number;
  active_products: number;
  pending_orders: number;
  total_products: number;
  revenue_graph: { name: string; total: number }[];
}

export default function VendorDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
      earnings: 0,
      active_products: 0,
      pending_orders: 0,
      total_products: 0,
      revenue_graph: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      loadStats();
  }, []);

  const loadStats = async () => {
      try {
          const token = localStorage.getItem("vendor_token");
          if (!token) {
              setError("Not authenticated");
              setLoading(false);
              return;
          }

          const res = await fetch("http://localhost:8000/api/v1/analytics/vendor/dashboard", {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });

          if (res.ok) {
              const data = await res.json();
              setStats(data);
          } else {
              setError("Failed to load dashboard");
          }
      } catch (e) {
          console.error("Failed to load dashboard stats:", e);
          setError("Network error");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Farm Overview</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-md shadow-[#BEF264]/20">
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
             
              <div className="h-48 w-full flex items-end justify-between gap-2">
                 {stats.revenue_graph && stats.revenue_graph.length > 0 ? (
                    stats.revenue_graph.map((item, i) => {
                       // Normalize height based on max value (or default to 100 if all zero)
                       const maxVal = Math.max(...stats.revenue_graph.map(d => d.total)) || 100;
                       const height = Math.max((item.total / maxVal) * 100, 5); // Min 5% height
                       
                       return (
                        <div key={i} className="flex-1 rounded-t-lg relative group h-full flex items-end flex-col justify-end">
                            <div className="w-full bg-[#BEF264]/20 rounded-t-lg relative h-full flex items-end">
                                <div style={{ height: `${height}%` }} className="w-full bg-[#BEF264] rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 relative group-hover:shadow-[0_0_20px_rgba(190,242,100,0.3)]"></div>
                            </div>
                            <span className="text-[10px] text-center w-full block mt-1 text-[#71717A]">{item.name}</span>
                            
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#09090B] border border-[#27272A] px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap z-10 pointer-events-none transition-opacity">
                                ₹{item.total.toLocaleString()}
                            </div>
                        </div>
                       );
                    })
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#71717A]">No revenue data available</div>
                 )}
              </div>
          </div>

          {/* Quick Stats */}
          <div className="col-span-4 space-y-4">
             <div className="bg-[#18181B] border border-white/5 p-6 rounded-[2rem] hover:border-[#BEF264]/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-[#27272A] rounded-2xl text-white group-hover:text-[#BEF264] transition-colors"><Package size={24}/></div>
                   <ArrowUpRight className="text-[#A1A1AA]" size={20} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.active_products}</div>
                <div className="text-[#A1A1AA] text-sm">Active Products Listed</div>
             </div>
             <div className="bg-[#18181B] border border-white/5 p-6 rounded-[2rem] hover:border-[#BEF264]/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-[#27272A] rounded-2xl text-white group-hover:text-[#BEF264] transition-colors"><ShoppingCart size={24}/></div>
                   <ArrowUpRight className="text-[#A1A1AA]" size={20} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.pending_orders}</div>
                <div className="text-[#A1A1AA] text-sm">Pending Orders</div>
             </div>
          </div>
      </div>

      <div className="bg-[#18181B] border border-white/5 rounded-[2.5rem] p-8">
         <h3 className="text-white font-bold text-xl mb-6">Recent Orders</h3>
         <div className="text-center py-8 text-[#71717A]">
            <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
            <p>No orders yet</p>
            <p className="text-xs mt-1">Orders will appear here when customers place them</p>
         </div>
      </div>
    </div>
  );
}
