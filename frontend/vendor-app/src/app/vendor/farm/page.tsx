"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Award, FileCheck, Tractor, Loader2 } from "lucide-react";

interface FarmProfile {
  business_name: string;
  contact_email: string;
  phone_number: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  seller_category: string;
  is_verified: boolean;
}

export default function MyFarmPage() {
  const [profile, setProfile] = useState<FarmProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:8000/api/v1/vendor/me/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        // Fallback demo data
        setProfile({
          business_name: "Green Valley Farms",
          contact_email: "greenvalley@nextgen.com",
          phone_number: "9876543210",
          address_line: "123 Organic Lane",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500001",
          seller_category: "NPOP_ORGANIC",
          is_verified: true
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback demo data
      setProfile({
        business_name: "Green Valley Farms",
        contact_email: "greenvalley@nextgen.com",
        phone_number: "9876543210",
        address_line: "123 Organic Lane",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        seller_category: "NPOP_ORGANIC",
        is_verified: true
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-[#71717A]">
        <Loader2 className="animate-spin mr-2" /> Loading farm details...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-[#71717A] py-20">
        <Tractor size={48} className="mx-auto mb-4 opacity-50" />
        <p>Unable to load farm profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans text-[#E4E4E7]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Farm</h1>
        {profile.is_verified && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#BEF264]/10 rounded-full text-[#BEF264] text-sm font-bold border border-[#BEF264]/20">
            <Award size={16} /> Verified Partner
          </div>
        )}
      </div>

      {/* Farm Header Card */}
      <div className="bg-gradient-to-br from-[#18181B] to-[#27272A] border border-white/5 rounded-[2rem] p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#BEF264] to-[#84cc16] rounded-2xl flex items-center justify-center text-black shadow-lg">
            <Tractor size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{profile.business_name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-[#A1A1AA]">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {profile.city}, {profile.state}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} /> {profile.phone_number}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> {profile.contact_email}
              </span>
            </div>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-[#27272A] rounded-full text-xs font-medium text-white border border-white/10">
                {profile.seller_category.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-[#BEF264]" /> Farm Address
          </h3>
          <div className="space-y-2 text-sm text-[#A1A1AA]">
            <p>{profile.address_line}</p>
            <p>{profile.city}, {profile.state}</p>
            <p>PIN: {profile.pincode}</p>
          </div>
        </div>

        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FileCheck size={18} className="text-[#BEF264]" /> Certifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-[#BEF264] rounded-full"></div>
              <span className="text-white">NPOP Organic Certification</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-[#BEF264] rounded-full"></div>
              <span className="text-white">FSSAI License</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-[#71717A] rounded-full"></div>
              <span className="text-[#71717A]">PGS India (Pending)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
