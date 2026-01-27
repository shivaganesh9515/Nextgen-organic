import { Save, User, MapPin, Bell, Lock, CreditCard } from "lucide-react";

export default function VendorSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto font-sans text-[#E4E4E7]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]">
           <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
         {/* Sidebar Navigation */}
         <div className="col-span-3 space-y-2">
             <NavButton active icon={User} label="Profile" />
             <NavButton icon={MapPin} label="Farm Location" />
             <NavButton icon={CreditCard} label="Bank Details" />
             <NavButton icon={Bell} label="Notifications" />
             <NavButton icon={Lock} label="Security" />
         </div>

         {/* Main Content */}
         <div className="col-span-9 space-y-8">
            
            {/* Profile Section */}
            <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8">
               <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#27272A] border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white">Change</div>
                  </div>
                  <div>
                     <div className="text-white font-bold text-lg">Ramesh Kumar</div>
                     <div className="text-[#A1A1AA] text-sm mb-2">Lead Farmer • Prakruthi Farms</div>
                     <div className="inline-flex px-3 py-1 rounded-full bg-[#BEF264]/10 text-[#BEF264] text-xs font-bold border border-[#BEF264]/20">Verified Partner</div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="Full Name" value="Ramesh Kumar" />
                  <InputGroup label="Email Address" value="ramesh.k@example.com" />
                  <InputGroup label="Phone Number" value="+91 98765 43210" />
                  <InputGroup label="Farm Name" value="Prakruthi Farms" />
               </div>
            </div>

            {/* Farm Details */}
            <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8">
               <h2 className="text-xl font-bold text-white mb-6">Farm Details</h2>
               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#27272A]/50 border border-white/5 flex items-start gap-4">
                     <div className="p-3 bg-[#BEF264]/10 rounded-lg text-[#BEF264]">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <div className="text-white font-bold mb-1">Primary Location</div>
                        <div className="text-[#A1A1AA] text-sm mb-2">Survey No. 45/2, Vikarabad Road, Chevella Mandal, Telangana - 501503</div>
                        <button className="text-[#BEF264] text-xs font-bold hover:underline">Edit on Map</button>
                     </div>
                  </div>
                  
                  <div>
                     <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Certification Documents</label>
                     <div className="flex gap-4">
                        <div className="px-4 py-3 rounded-xl bg-[#27272A] border border-white/5 text-white text-sm flex items-center gap-2">
                           <CheckCircle size={16} className="text-[#BEF264]" /> NPOP Certificate.pdf
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-[#27272A] border border-white/5 text-white text-sm flex items-center gap-2">
                           <CheckCircle size={16} className="text-[#BEF264]" /> Soil Test 2024.pdf
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}

function NavButton({ active, icon: Icon, label }: any) {
   return (
      <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[#BEF264] text-black font-bold' : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'}`}>
         <Icon size={18} /> {label}
      </button>
   );
}

function InputGroup({ label, value }: any) {
   return (
      <div>
         <label className="block text-xs font-bold text-[#71717A] uppercase tracking-wider mb-2">{label}</label>
         <input type="text" defaultValue={value} className="w-full bg-[#27272A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BEF264] transition-colors" />
      </div>
   );
}
