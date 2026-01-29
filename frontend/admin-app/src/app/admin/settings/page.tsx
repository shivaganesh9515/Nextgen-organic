"use client";

import { useState } from "react";
import { Save, Lock, Bell, Store, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Platform Settings</h1>
         <p className="text-[#A1A1AA]">Configure global application preferences.</p>
      </div>

      {/* General Settings */}
      <div className="bg-[#18181B] border border-white/5 p-8 rounded-[2rem]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe size={20} className="text-[#BEF264]" />
              General Configuration
          </h2>
          <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Platform Name</label>
                  <input type="text" defaultValue="Next360 Organics" className="w-full bg-[#27272A] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#BEF264]" />
              </div>
              <div>
                   <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Support Email</label>
                   <input type="email" defaultValue="admin@nextgen.com" className="w-full bg-[#27272A] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#BEF264]" />
              </div>
              <div className="col-span-2">
                   <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Platform Description</label>
                   <textarea rows={3} defaultValue="The leading marketplace for organic produce." className="w-full bg-[#27272A] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#BEF264]" />
              </div>
          </div>
      </div>

       {/* Notifications */}
       <div className="bg-[#18181B] border border-white/5 p-8 rounded-[2rem]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell size={20} className="text-[#BEF264]" />
              Notifications
          </h2>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#27272A]/50 rounded-xl">
                  <div>
                      <div className="font-medium text-white">New Vendor Alerts</div>
                      <div className="text-sm text-[#71717A]">Receive email when a new vendor registers.</div>
                  </div>
                  <div className="w-12 h-6 bg-[#BEF264] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                  </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#27272A]/50 rounded-xl">
                  <div>
                      <div className="font-medium text-white">Order Notifications</div>
                      <div className="text-sm text-[#71717A]">Get notified about high-value orders.</div>
                  </div>
                   <div className="w-12 h-6 bg-[#27272A] border border-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-[#71717A] rounded-full shadow-sm" />
                  </div>
              </div>
          </div>
      </div>

      {/* Security */}
      <div className="bg-[#18181B] border border-white/5 p-8 rounded-[2rem]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock size={20} className="text-[#BEF264]" />
              Security
          </h2>
          <div className="flex justify-between items-center">
              <div>
                  <div className="font-bold text-white">Admin Password</div>
                  <div className="text-sm text-[#A1A1AA]">Last changed: 30 days ago</div>
              </div>
              <button className="px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 text-sm font-medium">Change Password</button>
          </div>
      </div>

       <div className="flex justify-end pt-4">
           <button className="flex items-center gap-2 px-8 py-3 bg-[#BEF264] text-black font-bold rounded-xl hover:bg-[#A3D651] shadow-lg shadow-[#BEF264]/20 transition-all">
               <Save size={20} /> Save Changes
           </button>
       </div>
    </div>
  );
}
