import { ArrowUpRight, TrendingUp, MoreHorizontal, Filter, Download } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Sales Overview</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#27272A] text-white rounded-full text-sm font-medium hover:bg-[#3F3F46] transition-all border border-white/5">
            Monthly <span className="ml-2 text-[#71717A]">⌄</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#27272A] text-white rounded-full text-sm font-medium hover:bg-[#3F3F46] transition-all border border-white/5">
             <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]">
             <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-12 gap-6">
          {/* Revenue Card - Cleaner Gradient */}
          <div className="col-span-4 bg-[#BEF264] rounded-[2.5rem] p-8 relative overflow-hidden group transition-transform hover:scale-[1.01] duration-500">
             <div className="absolute top-8 right-8 p-3 bg-black/10 rounded-full cursor-pointer hover:bg-black/20 transition-colors backdrop-blur-sm">
                <ArrowUpRight size={24} className="text-black" />
             </div>
             
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className="text-black/70 font-semibold text-lg mb-2">Revenue</div>
                   <div className="text-5xl font-bold text-black tracking-tight">₹1,20,873</div>
                </div>
                
                <div className="mt-8 flex items-center gap-3">
                   <div className="px-4 py-2 bg-white/40 backdrop-blur-md rounded-full flex items-center gap-2 text-sm font-bold text-black border border-black/5 shadow-sm">
                      <TrendingUp size={16} /> +17%
                   </div>
                   <span className="text-black/60 text-sm font-medium">vs last month</span>
                </div>
             </div>
          </div>

          {/* Total Purchase - Ultra Clean Dark */}
          <div className="col-span-4 bg-[#18181B] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
             <div className="absolute top-8 right-8 p-3 bg-[#27272A] rounded-full text-white cursor-pointer hover:bg-[#3F3F46] border border-white/5">
                <ArrowUpRight size={24} />
             </div>
             <div className="flex flex-col h-full justify-between">
                <div>
                   <div className="text-white font-bold text-xl mb-3">Total Purchase</div>
                   <div className="text-4xl font-bold text-white tracking-tight">₹89,203</div>
                </div>
                
                <div className="flex items-center gap-3 mt-8">
                   <div className="px-4 py-2 bg-[#BEF264] rounded-full flex items-center gap-2 text-sm font-bold text-black shadow-[0_0_15px_rgba(190,242,100,0.1)]">
                      <TrendingUp size={16} /> +12%
                   </div>
                   <span className="text-[#A1A1AA] text-sm font-medium">vs last month</span>
                </div>
             </div>
          </div>

          {/* Sales Target - Minimal */}
          <div className="col-span-4 bg-[#18181B] border border-white/5 rounded-[2.5rem] p-8 relative hover:border-white/10 transition-colors">
             <div className="absolute top-8 right-8 text-[#71717A] hover:text-white cursor-pointer p-2 hover:bg-[#27272A] rounded-full transition-colors">
                <MoreHorizontal size={24} />
             </div>
             
             <div className="mb-10">
                <div className="text-white font-bold text-xl mb-3">Sales Target</div>
                <div className="text-4xl font-bold text-white tracking-tight">₹50,901</div>
             </div>
             
             <div className="flex h-3 w-full rounded-full overflow-hidden bg-[#27272A] mb-6">
                <div className="w-2/3 bg-[#3F3F46] relative opacity-50"></div>
                <div className="w-1/4 bg-[#BEF264] shadow-[0_0_10px_#BEF264]" />
             </div>
             
             <div className="flex justify-between text-xs text-[#A1A1AA] font-medium px-1">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3F3F46]"/> Profit</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]"/> Earnings</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#52525B]"/> Target</div>
             </div>
          </div>
      </div>

      {/* Statistics Section - Refined */}
      <div className="grid grid-cols-12 gap-8 bg-[#18181B] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl shadow-black/50">
          <div className="col-span-3 border-r border-white/5 pr-10">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-white font-bold text-lg">Satisfaction</h3>
                <div className="p-2.5 bg-[#27272A] rounded-full text-[#A1A1AA] hover:text-white hover:bg-[#3F3F46] transition-colors border border-white/5"><MoreHorizontal size={20}/></div>
             </div>
             <p className="text-[#A1A1AA] text-sm mb-12 font-medium">Top Positive Feedback</p>
             
             {/* Gauge - SVG Implementation for smoothness */}
             <div className="relative h-40 flex items-center justify-center mb-8">
                <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                   {/* Background Track */}
                   <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#27272A" strokeWidth="20" strokeLinecap="round" />
                   {/* Progress Track (Green) */}
                   <path d="M 20 100 A 80 80 0 0 1 85 24" fill="none" stroke="#BEF264" strokeWidth="20" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(190,242,100,0.3)]" />
                </svg>
                <div className="absolute bottom-2 text-center">
                   <div className="text-5xl font-bold text-white tracking-tighter">250</div>
                   <div className="text-[10px] text-[#A1A1AA] uppercase tracking-[0.2em] font-bold mt-2">Responses</div>
                </div>
             </div>
             
             <div className="bg-[#27272A]/30 rounded-2xl p-5 flex items-center justify-between border border-white/5 backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-[#BEF264] text-black text-xs font-bold rounded-lg">+12%</span>
                    <span className="text-[#A1A1AA] text-xs font-medium">Score: 4.7/5</span>
                 </div>
             </div>
          </div>

          <div className="col-span-9 pl-4">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-bold text-white tracking-tight">Statistics</h3>
                <div className="flex gap-3">
                   <button className="px-5 py-2.5 bg-[#27272A] text-white text-sm font-medium rounded-full flex items-center gap-2 border border-white/5 hover:bg-[#3F3F46] transition-colors">Customer Satisfaction ⌄</button>
                   <button className="px-5 py-2.5 bg-[#27272A] text-white text-sm font-medium rounded-full flex items-center gap-2 border border-white/5 hover:bg-[#3F3F46] transition-colors">Yearly ⌄</button>
                </div>
             </div>

             {/* Bar Chart Mockup - Pixel Perfect */}
             <div className="h-72 flex items-end justify-between gap-5 px-2 relative">
                {/* Y-Axis Grid Lines - Dotted and Subtle */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                   {[1000, 750, 500, 250, 0].map((val, i) => (
                      <div key={i} className="w-full border-b border-dashed border-[#27272A] text-[#52525B] text-[10px] font-medium h-0 flex items-center">
                         <span className="bg-[#18181B] pr-3 py-1">${val}</span>
                      </div>
                   ))}
                </div>
                
                {/* Bars */}
                {[
                   { m: 'Jan', h: 30 }, { m: 'Feb', h: 25 }, { m: 'Mar', h: 45 }, 
                   { m: 'Apr', h: 35 }, { m: 'May', h: 60 }, { m: 'Jun', h: 80, active: true },
                   { m: 'Jul', h: 70 }, { m: 'Aug', h: 85 }, { m: 'Sep', h: 95 },
                   { m: 'Oct', h: 55 }, { m: 'Nov', h: 65 }, { m: 'Dec', h: 75 }
                ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-4 z-10 w-full group relative h-full justify-end">
                      <div className="relative w-full flex items-end justify-center h-full"> 
                         <div 
                           style={{ height: `${item.h}%` }} 
                           className={`w-full max-w-[44px] rounded-t-sm transition-all duration-300 ${item.active ? 'bg-[#BEF264] shadow-[0_0_30px_rgba(190,242,100,0.25)]' : 'bg-[#27272A] group-hover:bg-[#3F3F46]'}`}
                         >
                            {/* Texture */}
                            {item.active && <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.05)_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />}
                         </div>
                         
                         {/* Tooltip for Active */}
                         {item.active && (
                            <div className="absolute -top-24 bg-[#09090B] border border-[#27272A] p-4 rounded-2xl shadow-2xl flex flex-col items-center min-w-[120px] animate-in fade-in zoom-in duration-200 z-50">
                               <div className="text-[#A1A1AA] text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264] shadow-[0_0_5px_#BEF264]"/> Profit
                               </div>
                               <div className="text-white font-bold text-2xl tracking-tight">$720.00</div>
                               {/* Arrow */}
                               <div className="absolute -bottom-2 w-4 h-4 bg-[#09090B] border-b border-r border-[#27272A] rotate-45" />
                            </div>
                         )}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.active ? 'text-white' : 'text-[#52525B]'}`}>{item.m}</span>
                   </div>
                ))}
             </div>
          </div>
      </div>
    </div>
  );
}
