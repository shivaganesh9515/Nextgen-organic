import { Sidebar } from "@/components/dashboard/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Mobile Warning Overlay */}
      <div className="lg:hidden fixed inset-0 z-[100] bg-[#18181B] flex flex-col items-center justify-center text-center p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Desktop Only</h2>
        <p className="text-[#A1A1AA]">Please access the Admin Dashboard from a desktop computer.</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-[#09090B]">
        <Sidebar role="admin" />
        
        <main className="flex-1 ml-64 min-h-screen">
          {/* Top Header */}
          <header className="h-20 border-b border-[#27272A] bg-[#18181B] px-8 flex items-center justify-between sticky top-0 z-40">
             {/* Search Bar */}
             <div className="flex-1 max-w-xl">
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search or ask a question..." 
                   className="w-full bg-[#27272A] border border-[#3F3F46] rounded-full pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors"
                 />
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#3F3F46] rounded text-[10px] text-[#A1A1AA]">CTRL K</div>
               </div>
             </div>

             {/* Right Actions */}
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 border-r border-[#27272A] pr-6">
                   <button className="p-2 text-[#A1A1AA] hover:text-white relative">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                   </button>
                   <button className="p-2 text-[#A1A1AA] hover:text-white relative">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-[#BEF264] rounded-full border border-[#18181B]" />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                   </button>
                </div>
                
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-[#27272A] border border-[#3F3F46] overflow-hidden">
                       <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden md:block text-left">
                       <div className="text-sm font-medium text-white group-hover:text-[#BEF264] transition-colors">Admin User</div>
                       <div className="text-xs text-[#71717A]">Super Admin</div>
                    </div>
                    <svg className="text-[#71717A] group-hover:text-white transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
             </div>
          </header>

          {/* Scrollable Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
