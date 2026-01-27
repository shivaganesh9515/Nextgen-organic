"use client";

import { Leaf, DollarSign, Package, TrendingUp, Bell, Search, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E5E0] fixed inset-y-0 hidden md:flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-12">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#4A6741]/20">
                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-heading font-bold text-lg text-[#262A2B]">Next360</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { name: "Overview", icon: TrendingUp, active: true },
            { name: "My Harvests", icon: Leaf },
            { name: "Orders", icon: Package },
            { name: "Earnings", icon: DollarSign },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? "bg-[#4A6741] text-white shadow-md" 
                  : "text-[#262A2B]/70 hover:bg-[#F5F5F0]"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-[#F5F5F0]">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F0E5] flex items-center justify-center text-[#4A6741] font-bold">RK</div>
                <div>
                    <h4 className="text-sm font-bold text-[#262A2B]">Rajesh Kumar</h4>
                    <p className="text-xs text-[#262A2B]/50">Organic Roots Farm</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
           <div>
             <h1 className="font-heading font-bold text-3xl text-[#262A2B]">Dashboard</h1>
             <p className="text-[#262A2B]/60">Welcome back, Rajesh! Here's what's happening today.</p>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-3 bg-white rounded-full text-[#262A2B]/60 hover:text-[#4A6741] shadow-sm"><Search size={20}/></button>
              <button className="p-3 bg-white rounded-full text-[#262A2B]/60 hover:text-[#4A6741] shadow-sm"><Bell size={20}/></button>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {[
             { label: "Total Earnings", value: "$4,250", change: "+12%", icon: DollarSign, color: "bg-[#4A6741]" },
             { label: "Active Harvests", value: "125 kg", change: "On track", icon: Leaf, color: "bg-[#D4A373]" },
             { label: "Pending Orders", value: "8", change: "Needs Action", icon: Package, color: "bg-[#262A2B]" },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E5E0] hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-4">
                   <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                      <stat.icon size={24} />
                   </div>
                   <span className="text-xs font-bold bg-[#F5F5F0] px-2 py-1 rounded text-[#262A2B]/60">{stat.change}</span>
                </div>
                <h3 className="text-[#262A2B]/60 text-sm font-medium">{stat.label}</h3>
                <p className="text-3xl font-bold text-[#262A2B]">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 border border-[#E5E5E0] shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-[#262A2B]">Recent Orders</h3>
              <Link href="#" className="text-sm text-[#4A6741] font-medium hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {[
                { id: "#4821", item: "Fresh Carrots (50kg)", status: "Hub Verified", amount: "$120.00", time: "2 hrs ago" },
                { id: "#4820", item: "Organic Spinach (20kg)", status: "In Transit", amount: "$85.50", time: "5 hrs ago" },
                { id: "#4819", item: "Red Onions (100kg)", status: "Delivered", amount: "$210.00", time: "Yesterday" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-[#F5F5F0] rounded-xl transition-colors border border-transparent hover:border-[#E5E5E0]">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E8F0E5] flex items-center justify-center text-[#4A6741] font-bold text-xs">
                        {order.id}
                      </div>
                      <div>
                         <p className="font-bold text-[#262A2B]">{order.item}</p>
                         <p className="text-xs text-[#262A2B]/50">{order.time}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F0] text-[#262A2B]/70 border border-[#E5E5E0]">
                        {order.status}
                      </span>
                      <span className="font-bold text-[#262A2B]">{order.amount}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
