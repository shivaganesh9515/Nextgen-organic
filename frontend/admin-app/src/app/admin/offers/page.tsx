"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Tag, Calendar, AlertCircle } from "lucide-react";

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: "", discount: "", code: "", expiresAt: "" });

  const fetchOffers = async () => {
      try {
          const res = await fetch("http://localhost:8000/api/v1/offers");
          if(res.ok) {
              const data = await res.json();
              setOffers(data);
          }
      } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCreateOffer = async () => {
    if(!newOffer.title) return;
    try {
        const res = await fetch("http://localhost:8000/api/v1/offers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newOffer, status: "Active" })
        });
        if(res.ok) {
            fetchOffers();
            setIsAdding(false);
            setNewOffer({ title: "", discount: "", code: "", expiresAt: "" });
        }
    } catch(e) { console.error(e); }
  };

  return (
    <div className="space-y-8 text-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Offers & Promotions</h1>
           <p className="text-[#A1A1AA]">Create custom discount codes and sales.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all">
           <Plus size={18} strokeWidth={2.5} /> Create Offer
        </button>
      </div>

       {/* Add Offer Modal (Inline) */}
       {isAdding && (
          <div className="bg-[#18181B] border border-white/10 p-6 rounded-2xl animate-fade-in mb-8">
              <h3 className="text-lg font-bold text-white mb-4">New Custom Offer</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Offer Title (e.g. Summer Sale)" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Discount (e.g. 20%)" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Code (e.g. SUMMER20)" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newOffer.code}
                    onChange={(e) => setNewOffer({...newOffer, code: e.target.value})}
                  />
                   <input 
                    type="date" 
                    className="bg-[#27272A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#BEF264]"
                    value={newOffer.expiresAt}
                    onChange={(e) => setNewOffer({...newOffer, expiresAt: e.target.value})}
                  />
              </div>
              <div className="flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-[#A1A1AA] hover:text-white">Cancel</button>
                  <button onClick={handleCreateOffer} className="px-4 py-2 bg-[#BEF264] text-black font-bold rounded-lg hover:bg-[#A3D651]">Save Offer</button>
              </div>
          </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {offers.map((offer) => (
             <div key={offer.id} className="bg-[#18181B] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors relative group">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#27272A] rounded-full flex items-center justify-center text-[#BEF264]">
                        <Tag size={20} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                         offer.status === "Active" ? "bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}>
                        {offer.status}
                    </span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                 <div className="text-2xl font-bold text-[#BEF264] mb-4">{offer.discount}</div>
                 
                 <div className="space-y-2 text-sm text-[#A1A1AA]">
                     <div className="flex items-center gap-2">
                        <span className="font-mono bg-[#27272A] px-2 py-0.5 rounded text-white">{offer.code}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar size={14} /> Expires: {offer.expiresAt}
                     </div>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
}
