"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, User, MapPin, Bell, Lock, CreditCard, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function VendorSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
      try {
          console.log("Fetching session...");
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) console.error("Session error:", sessionError);
          
          if (!session) {
             console.warn("No session found - waiting for user to login");
             // router.push("/login"); // Let the UI handle the prompt instead of forcing redirect
             setLoading(false);
             return;
          }

          console.log("Session found, fetching profile...", session.user.id);

          const res = await fetch("http://localhost:8000/api/v1/vendor/me/profile", {
              headers: {
                  "Authorization": `Bearer ${session.access_token}`
              }
          });
          
          console.log("Fetch response:", res.status);
          
          if (res.ok) {
              const data = await res.json();
              console.log("Profile data:", data);
              setProfile(data);
              setPhoneNumber(data.phone_number);
          } else {
              console.error("Fetch failed:", res.status, res.statusText);
              const text = await res.text();
              console.error("Error body:", text);
          }
      } catch (error) {
          console.error("Error fetching profile:", error);
      } finally {
          setLoading(false);
      }
  };

  const handleSave = async () => {
      setSaving(true);
      try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;

          // Pass phone_number as query param for simplicity given the backend implementation
          // Or change backend to accept Body. Current backend impl: `phone_number: str = None` implies query param by default in FastAPI if not Body()
          // Let's assume query param for now based on the python code snippet added.
          const res = await fetch(`http://localhost:8000/api/v1/vendor/me/profile?phone_number=${encodeURIComponent(phoneNumber)}`, {
              method: "PATCH",
              headers: {
                  "Authorization": `Bearer ${session.access_token}`
              }
          });
          
          if (res.ok) {
              alert("Profile updated successfully!");
              fetchProfile();
          } else {
              alert("Failed to update profile.");
          }
      } catch (error) {
          console.error("Error updating profile:", error);
          alert("Error updating profile.");
      } finally {
          setSaving(false);
      }
  };

  if (loading) {
      return (
          <div className="flex h-[50vh] items-center justify-center text-[#A1A1AA]">
              <Loader2 className="animate-spin mr-2" /> Loading settings...
          </div>
      );
  }
  
  // If we finished loading and still have no profile (likely no session or fetch error)
  if (!profile) {
      return (
          <div className="flex flex-col h-[50vh] items-center justify-center text-[#A1A1AA] space-y-6">
              <div className="p-6 bg-red-500/10 rounded-full text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <AlertCircle size={48} />
              </div>
              <div className="text-center px-4">
                  <h2 className="text-xl font-bold text-white mb-2">Unavailable</h2>
                  <p className="text-[#A1A1AA] max-w-md mx-auto mb-4">
                     We couldn't load your settings. This is usually due to a missing session.
                  </p>
                  
                  {/* Debug Info for User/Dev */}
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-red-400 mb-6 text-left max-w-sm mx-auto overflow-auto border border-red-500/20">
                     <p>Status: {loading ? "Loading" : "Loaded"}</p>
                     <p>Has Profile: {profile ? "Yes" : "No"}</p>
                     <p>Time: {new Date().toLocaleTimeString()}</p>
                  </div>

              </div>
              <button 
                onClick={() => router.push("/login")}
                className="px-8 py-3 bg-[#BEF264] text-black rounded-xl text-sm font-bold hover:bg-[#A3D651] shadow-lg hover:shadow-[0_0_20px_rgba(190,242,100,0.3)] transition-all"
              >
                  Log In Again
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto font-sans text-[#E4E4E7]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#BEF264] text-black rounded-full text-sm font-bold hover:bg-[#A3D651] transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)] disabled:opacity-50"
        >
           {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
           Save Changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
         {/* Sidebar Navigation */}
         <div className="col-span-3 space-y-2">
             <NavButton 
                active={activeTab === "profile"} 
                onClick={() => setActiveTab("profile")} 
                icon={User} 
                label="Profile" 
             />
             <NavButton 
                active={activeTab === "farm"} 
                onClick={() => setActiveTab("farm")} 
                icon={MapPin} 
                label="Farm Location" 
             />
             <NavButton 
                active={activeTab === "bank"} 
                onClick={() => setActiveTab("bank")} 
                icon={CreditCard} 
                label="Bank Details" 
             />
             <NavButton 
                active={activeTab === "notifications"} 
                onClick={() => setActiveTab("notifications")} 
                icon={Bell} 
                label="Notifications" 
             />
             <NavButton 
                active={activeTab === "security"} 
                onClick={() => setActiveTab("security")} 
                icon={Lock} 
                label="Security" 
             />
         </div>

         {/* Main Content */}
         <div className="col-span-9 space-y-8">
            
            {/* Profile Section */}
            {activeTab === "profile" && profile && (
                <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                   
                   <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-full bg-[#27272A] border border-white/10 flex items-center justify-center overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${profile.business_name}&background=BEF264&color=000`} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <div className="text-white font-bold text-lg">{profile.business_name}</div>
                         <div className="text-[#A1A1AA] text-sm mb-2">{profile.seller_category} • {profile.business_address}</div>
                         <div className="inline-flex px-3 py-1 rounded-full bg-[#BEF264]/10 text-[#BEF264] text-xs font-bold border border-[#BEF264]/20">Verified Partner</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <InputGroup label="Full Name / Business" value={profile.business_name} readOnly />
                      <InputGroup label="Email Address" value={profile.contact_email} readOnly />
                      <InputGroup 
                            label="Phone Number" 
                            value={phoneNumber} 
                            onChange={(e: any) => setPhoneNumber(e.target.value)} 
                            readOnly={false} 
                      />
                      <InputGroup label="Tax ID" value={profile.tax_id} readOnly />
                   </div>
                   <p className="text-xs text-[#71717A] mt-6 bg-[#27272A] p-3 rounded-lg border border-white/5">
                       Note: To update sensitive business details like Business Name or Email, please contact Admin Support.
                   </p>
                </div>
            )}

            {/* Farm Details */}
            {activeTab === "farm" && profile && (
                <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-white mb-6">Farm Details</h2>
                   <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[#27272A]/50 border border-white/5 flex items-start gap-4">
                         <div className="p-3 bg-[#BEF264]/10 rounded-lg text-[#BEF264]">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <div className="text-white font-bold mb-1">Registered Address</div>
                            <div className="text-[#A1A1AA] text-sm mb-2">{profile.business_address}</div>
                         </div>
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Documents</label>
                         <div className="flex gap-4">
                            <div className="px-4 py-3 rounded-xl bg-[#27272A] border border-white/5 text-white text-sm flex items-center gap-2">
                               <CheckCircle size={16} className="text-[#BEF264]" /> Registration Document
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            )}

            {/* Bank Details Placeholder */}
            {activeTab === "bank" && (
                <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-white mb-6">Bank Details</h2>
                   <div className="p-8 text-center border-2 border-dashed border-[#27272A] rounded-2xl">
                        <CreditCard className="mx-auto text-[#71717A] mb-4" size={48} />
                        <h3 className="text-white font-medium mb-1">No Bank Account Linked</h3>
                        <p className="text-[#71717A] text-sm mb-4">Add your bank details to receive payments.</p>
                        <button className="px-4 py-2 bg-[#27272A] text-white rounded-full text-sm font-medium hover:bg-[#3F3F46]">Add Bank Account</button>
                   </div>
                </div>
            )}

            {/* Notifications Placeholder */}
            {activeTab === "notifications" && (
                <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                   <div className="space-y-4">
                        {["Order Updates", "Payment Received", "Low Stock Alerts", "Marketing Emails"].map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-[#27272A]/50 rounded-xl">
                                <span className="text-white font-medium">{item}</span>
                                <div className="w-10 h-6 bg-[#BEF264] rounded-full p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-black rounded-full ml-auto" />
                                </div>
                            </div>
                        ))}
                   </div>
                </div>
            )}

            {/* Security Placeholder */}
            {activeTab === "security" && (
                <div className="bg-[#18181B] border border-white/5 rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                   <div className="space-y-6">
                        <div className="p-4 bg-[#27272A]/50 rounded-xl">
                            <h3 className="text-white font-bold mb-1">Change Password</h3>
                            <p className="text-[#A1A1AA] text-sm mb-4">Last changed 3 months ago</p>
                            <div className="space-y-3">
                                <input type="password" placeholder="Current Password" className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                                <input type="password" placeholder="New Password" className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                                <button className="px-4 py-2 bg-[#BEF264] text-black rounded-lg text-sm font-bold">Update Password</button>
                            </div>
                        </div>
                   </div>
                </div>
            )}
            
         </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: any) {
   return (
      <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[#BEF264] text-black font-bold' : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'}`}
      >
         <Icon size={18} /> {label}
      </button>
   );
}

function InputGroup({ label, value, onChange, readOnly }: any) {
   return (
      <div>
         <label className="block text-xs font-bold text-[#71717A] uppercase tracking-wider mb-2">{label}</label>
         <input 
            type="text" 
            value={value || ""} 
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full bg-[#27272A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${readOnly ? "opacity-60 cursor-not-allowed" : "focus:border-[#BEF264]"}`} 
         />
      </div>
   );
}
