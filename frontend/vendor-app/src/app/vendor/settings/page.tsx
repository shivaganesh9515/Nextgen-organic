"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, User, MapPin, Bell, Lock, CreditCard, CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface VendorProfile {
  business_name: string;
  seller_category: string;
  business_address: string;
  contact_email: string;
  tax_id: string;
  phone_number: string;
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

interface InputGroupProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export default function VendorSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
      try {
          const token = localStorage.getItem("vendor_token");
          
          if (!token) {
             console.warn("No token found - redirecting to login");
             setLoading(false);
             return;
          }

          console.log("Token found, fetching profile...");

          const res = await fetch("http://localhost:8000/api/v1/vendor/me/profile", {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });
          
          console.log("Fetch response:", res.status);
          
          if (res.ok) {
              const data = await res.json();
              console.log("Profile data:", data);
              setProfile(data);
              setPhoneNumber(data.phone_number);
          } else if (res.status === 401) {
              // Token expired or invalid
              console.warn("Token invalid, redirecting to login");
              localStorage.removeItem("vendor_token");
              router.push("/login");
          } else {
              console.error("Fetch failed:", res.status, res.statusText);
              // Use demo fallback profile
              setProfile({
                  business_name: "Green Valley Farms",
                  seller_category: "NPOP Organic",
                  business_address: "123 Country Road, Hyderabad",
                  contact_email: "farm@nextgen.com",
                  tax_id: "DEMO12345",
                  phone_number: "9876543210"
              });
              setPhoneNumber("9876543210");
          }
      } catch (error) {
          console.error("Error fetching profile:", error);
          // Use demo fallback profile on network error
          setProfile({
              business_name: "Green Valley Farms",
              seller_category: "NPOP Organic",
              business_address: "123 Country Road, Hyderabad",
              contact_email: "farm@nextgen.com",
              tax_id: "DEMO12345",
              phone_number: "9876543210"
          });
          setPhoneNumber("9876543210");
      } finally {
          setLoading(false);
      }
  };

  const handleSave = async () => {
      setSaving(true);
      try {
          const token = localStorage.getItem("vendor_token");
          if (!token) {
              router.push("/login");
              return;
          }

          const res = await fetch(`http://localhost:8000/api/v1/vendor/me/profile?phone_number=${encodeURIComponent(phoneNumber)}`, {
              method: "PATCH",
              headers: {
                  "Authorization": `Bearer ${token}`
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
          <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
              <Loader2 className="animate-spin mr-2" /> Loading settings...
          </div>
      );
  }
  
  // If we finished loading and still have no profile (likely no session or fetch error)
  if (!profile) {
      return (
          <div className="flex flex-col h-[50vh] items-center justify-center text-muted-foreground space-y-6">
              <div className="p-6 bg-error/10 rounded-full text-error shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <AlertCircle size={48} />
              </div>
              <div className="text-center px-4">
                  <h2 className="text-xl font-bold text-foreground mb-2">Unavailable</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                     We couldn't load your settings. This is usually due to a missing session.
                  </p>
                  
                  {/* Debug Info for User/Dev */}
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-error mb-6 text-left max-w-sm mx-auto overflow-auto border border-error/20">
                     <p>Status: {loading ? "Loading" : "Loaded"}</p>
                     <p>Has Profile: {profile ? "Yes" : "No"}</p>
                     <p>Time: {new Date().toLocaleTimeString()}</p>
                  </div>

              </div>
              <button 
                onClick={() => router.push("/login")}
                className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all"
              >
                  Log In Again
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto font-sans text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
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
                <div className="bg-card border border-border rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-foreground mb-6">Profile Information</h2>
                   
                   <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${profile.business_name}&background=4A6741&color=fff`} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <div className="text-foreground font-bold text-lg">{profile.business_name}</div>
                         <div className="text-muted-foreground text-sm mb-2">{profile.seller_category} • {profile.business_address}</div>
                         <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">Verified Partner</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <InputGroup label="Full Name / Business" value={profile.business_name} readOnly />
                      <InputGroup label="Email Address" value={profile.contact_email} readOnly />
                      <InputGroup 
                            label="Phone Number" 
                            value={phoneNumber} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)} 
                            readOnly={false} 
                      />
                      <InputGroup label="Tax ID" value={profile.tax_id} readOnly />
                   </div>
                   <p className="text-xs text-muted-foreground mt-6 bg-muted p-3 rounded-lg border border-border">
                       Note: To update sensitive business details like Business Name or Email, please contact Admin Support.
                   </p>
                </div>
            )}

            {/* Farm Details */}
            {activeTab === "farm" && profile && (
                <div className="bg-card border border-border rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-foreground mb-6">Farm Details</h2>
                   <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-4">
                         <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <div className="text-foreground font-bold mb-1">Registered Address</div>
                            <div className="text-muted-foreground text-sm mb-2">{profile.business_address}</div>
                         </div>
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-muted-foreground mb-2">Documents</label>
                         <div className="flex gap-4">
                            <div className="px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm flex items-center gap-2">
                               <CheckCircle size={16} className="text-primary" /> Registration Document
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            )}

            {/* Bank Details Placeholder */}
            {activeTab === "bank" && (
                <div className="bg-card border border-border rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-foreground mb-6">Bank Details</h2>
                   <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl">
                        <CreditCard className="mx-auto text-muted-foreground mb-4" size={48} />
                        <h3 className="text-foreground font-medium mb-1">No Bank Account Linked</h3>
                        <p className="text-muted-foreground text-sm mb-4">Add your bank details to receive payments.</p>
                        <button className="px-4 py-2 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted-foreground/20">Add Bank Account</button>
                   </div>
                </div>
            )}

            {/* Notifications Placeholder */}
            {activeTab === "notifications" && (
                <div className="bg-card border border-border rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-foreground mb-6">Notification Preferences</h2>
                   <div className="space-y-4">
                        {["Order Updates", "Payment Received", "Low Stock Alerts", "Marketing Emails"].map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                                <span className="text-foreground font-medium">{item}</span>
                                <div className="w-10 h-6 bg-primary rounded-full p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                </div>
                            </div>
                        ))}
                   </div>
                </div>
            )}

            {/* Security Placeholder */}
            {activeTab === "security" && (
                <div className="bg-card border border-border rounded-[2rem] p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <h2 className="text-xl font-bold text-foreground mb-6">Security Settings</h2>
                   <div className="space-y-6">
                        <div className="p-4 bg-muted/50 rounded-xl">
                            <h3 className="text-foreground font-bold mb-1">Change Password</h3>
                            <p className="text-muted-foreground text-sm mb-4">Last changed 3 months ago</p>
                            <div className="space-y-3">
                                <input type="password" placeholder="Current Password" className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground text-sm" />
                                <input type="password" placeholder="New Password" className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground text-sm" />
                                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Update Password</button>
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

function NavButton({ active, onClick, icon: Icon, label }: NavButtonProps) {
    return (
       <button 
         onClick={onClick}
         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-primary text-white font-bold shadow-lg shadow-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
       >
          <Icon size={18} /> {label}
       </button>
    );
}

function InputGroup({ label, value, onChange, readOnly }: InputGroupProps) {
   return (
      <div>
         <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
         <input 
            type="text" 
            value={value || ""} 
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors ${readOnly ? "opacity-60 cursor-not-allowed" : "focus:border-primary focus:ring-1 focus:ring-primary/20"}`} 
         />
      </div>
   );
}
