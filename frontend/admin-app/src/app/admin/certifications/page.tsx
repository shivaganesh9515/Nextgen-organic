"use client";

import { useState } from "react";
import { Share2, Eye, CheckCircle, XCircle, FileText, Calendar, ShieldCheck } from "lucide-react";

const REQUESTS = [
  { 
    id: "REQ-001", 
    farm: "Prakruthi Farms", 
    type: "NPOP Organic", 
    date: "2h ago", 
    urgent: true,
    submittedBy: "Rajesh K.",
    appliedDate: "Jan 24, 2026",
    docs: [
       { name: "Soil Test Report.pdf", size: "2.4 MB", verified: true },
       { name: "Land Ownership.pdf", size: "1.1 MB", verified: false }
    ],
    analysis: "Soil test results match local NPOP standards. Geolocation confirms Vikarabad agricultural zone."
  },
  { 
    id: "REQ-002", 
    farm: "Lakshmi Organics", 
    type: "PGS-India", 
    date: "5h ago", 
    urgent: false,
    submittedBy: "Lakshmi Narayana",
    appliedDate: "Jan 23, 2026",
    docs: [
       { name: "Water Quality Report.pdf", size: "3.2 MB", verified: true },
       { name: "PGS Group Agreement.pdf", size: "0.8 MB", verified: true }
    ],
    analysis: "Water PH level is optimal. Group verification signatures validated against registry."
  },
  { 
    id: "REQ-003", 
    farm: "Reddy's Millet Hub", 
    type: "Lab Report", 
    date: "1d ago", 
    urgent: false,
    submittedBy: "Venkat Reddy",
    appliedDate: "Jan 22, 2026",
    docs: [
       { name: "Pesticide Residue Analysis.pdf", size: "5.6 MB", verified: false }
    ],
    analysis: "Waiting for secondary lab confirmation on pesticide residue screen."
  },
];

export default function CertificationsPage() {
  const [selectedId, setSelectedId] = useState("REQ-001");
  const activeReq = REQUESTS.find(r => r.id === selectedId) || REQUESTS[0];

  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
       {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Certification Requests</h1>
           <p className="text-[#A1A1AA]">Review and approve NPOP/Nal layout certifications.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-4 py-2 bg-[#18181B] border border-white/10 rounded-full text-sm text-[#A1A1AA]">
               <span className="text-white font-bold mr-1">12</span> Pending
            </span>
            <span className="px-4 py-2 bg-[#18181B] border border-white/10 rounded-full text-sm text-[#A1A1AA]">
               <span className="text-white font-bold mr-1">4</span> Requires Action
            </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
         {/* Request List */}
         <div className="col-span-4 space-y-4">
            <div className="text-xs font-bold text-[#71717A] uppercase tracking-wider mb-2">Priority Queue</div>
            {REQUESTS.map((req, i) => {
               const isActive = req.id === selectedId;
               return (
                  <div 
                     key={i} 
                     onClick={() => setSelectedId(req.id)}
                     className={`p-5 rounded-2xl border cursor-pointer transition-all ${isActive ? 'bg-[#BEF264] border-[#BEF264]' : 'bg-[#18181B] border-white/5 hover:border-white/20'}`}
                  >
                     <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs font-mono font-bold ${isActive ? 'text-black/60' : 'text-[#71717A]'}`}>{req.id}</span>
                        {req.urgent && !isActive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                     </div>
                     <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-black' : 'text-white'}`}>{req.farm}</h3>
                     <div className={`text-sm ${isActive ? 'text-black/80' : 'text-[#A1A1AA]'}`}>{req.type}</div>
                     <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-medium ${isActive ? 'border-black/10 text-black/60' : 'border-white/5 text-[#52525B]'}`}>
                        <span>{req.date}</span>
                        <span>View Details →</span>
                     </div>
                  </div>
               );
            })}
         </div>
         
         {/* Detail View */}
         <div className="col-span-8 bg-[#18181B] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden animate-in fade-in fill-mode-both duration-300" key={selectedId}>
             
             {/* Status Badge */}
             <div className="absolute top-8 right-8 flex gap-3">
                <button className="px-4 py-2 rounded-full border border-white/10 text-white hover:bg-white/5 text-sm font-medium transition-colors">
                   Request Info
                </button>
                <button className="px-4 py-2 rounded-full bg-[#BEF264] text-black hover:bg-[#A3D651] text-sm font-bold transition-colors shadow-[0_0_20px_rgba(190,242,100,0.2)]">
                   Approve & Verify
                </button>
             </div>

             <div className="mb-10">
                <div className="flex items-center gap-3 text-[#A1A1AA] text-sm mb-2">
                   <ShieldCheck size={16} className="text-[#BEF264]" /> {activeReq.type} Standard
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{activeReq.farm}</h2>
                <div className="flex gap-6 text-sm text-[#A1A1AA]">
                   <span className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#27272A]"/> Submitted by {activeReq.submittedBy}</span>
                   <span className="flex items-center gap-2"><Calendar size={16}/> Applied on {activeReq.appliedDate}</span>
                </div>
             </div>

             {/* Document Preview */}
             <div className="bg-[#09090B] rounded-2xl border border-white/5 p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-white">Submitted Documents ({activeReq.docs.length})</h3>
                   <button className="text-[#BEF264] text-xs hover:underline">Download All</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {activeReq.docs.map((doc, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#18181B] border border-white/5 flex gap-4 items-center group cursor-pointer hover:border-[#BEF264]/50 transition-colors">
                         <div className="w-12 h-12 bg-[#27272A] rounded-lg flex items-center justify-center text-[#A1A1AA] group-hover:text-white">
                            <FileText size={24} />
                         </div>
                         <div>
                            <div className="text-white text-sm font-medium group-hover:text-[#BEF264] transition-colors">{doc.name}</div>
                            <div className="text-[#52525B] text-xs">{doc.size} {doc.verified && "• Verified"}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="font-bold text-white">AI Analysis</h3>
                <div className="p-4 rounded-xl bg-[#BEF264]/5 border border-[#BEF264]/10 text-[#BEF264] text-sm leading-relaxed">
                   ✨ <strong>Analysis Report:</strong> {activeReq.analysis}
                </div>
             </div>

         </div>
      </div>
    </div>
  );
}
