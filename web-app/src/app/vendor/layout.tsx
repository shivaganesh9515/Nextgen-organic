import { Sidebar } from "@/components/dashboard/Sidebar";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:hidden fixed inset-0 z-[100] bg-[#18181B] flex flex-col items-center justify-center text-center p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Desktop Only</h2>
        <p className="text-[#A1A1AA]">Please access your Vendor Hub from a desktop computer.</p>
      </div>

      <div className="hidden lg:flex min-h-screen bg-[#09090B]">
        {/* Pass 'vendor' role to switch sidebar links */}
        <Sidebar role="vendor" />
        
        <main className="flex-1 ml-64 min-h-screen">
          <header className="h-20 border-b border-[#27272A] bg-[#18181B] px-8 flex items-center justify-between sticky top-0 z-40">
             <div className="flex-1 max-w-xl">
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search your inventory..." 
                   className="w-full bg-[#27272A] border border-[#3F3F46] rounded-full pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors"
                 />
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
               </div>
             </div>

             <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-[#27272A] border border-[#3F3F46] overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Farmer" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden md:block text-left">
                       <div className="text-sm font-medium text-white group-hover:text-[#BEF264] transition-colors">Ramesh Kumar</div>
                       <div className="text-xs text-[#71717A]">Prakruthi Farms</div>
                    </div>
                </div>
             </div>
          </header>

          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
