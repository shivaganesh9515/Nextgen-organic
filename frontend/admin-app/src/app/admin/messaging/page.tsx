"use client";

import { useState, useEffect } from "react";
import { Send, Users, User, MessageSquare, Star, History, Loader2, Check, ChevronDown } from "lucide-react";

interface Vendor {
  id: string;
  business_name: string;
  contact_email: string;
  status: string;
}

interface SentNotification {
  id: string;
  vendor_id: string;
  vendor_name: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagingPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [history, setHistory] = useState<SentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [recipientType, setRecipientType] = useState<"all" | "specific">("all");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("MESSAGE");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose");

  useEffect(() => {
    fetchVendors();
    fetchHistory();
  }, []);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/v1/admin/vendors/approved", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setVendors(data);
      }
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/v1/admin/notifications/history", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    setSending(true);
    setSuccess(false);
    
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;
      
      const endpoint = messageType === "BEST_SELLER" 
        ? "http://localhost:8000/api/v1/admin/notifications/best-seller-invite"
        : "http://localhost:8000/api/v1/admin/notifications/send";
      
      const body = messageType === "BEST_SELLER" 
        ? { vendor_id: selectedVendor, message }
        : {
            vendor_id: recipientType === "specific" ? selectedVendor : null,
            type: messageType,
            title,
            message
          };
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        setSuccess(true);
        setTitle("");
        setMessage("");
        setSelectedVendor("");
        fetchHistory();
        
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        alert("Error: " + (data.detail || "Failed to send"));
      }
    } catch (error) {
      console.error("Failed to send notification", error);
      alert("Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SYSTEM": return "⚠️";
      case "BEST_SELLER": return "🌟";
      case "PROMOTION": return "🎉";
      default: return "📩";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#BEF264]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#BEF264]/10 rounded-xl flex items-center justify-center">
          <MessageSquare className="text-[#BEF264]" size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Messaging Center</h1>
          <p className="text-sm text-[#71717A]">Send notifications and messages to vendors</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("compose")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "compose" 
              ? "bg-[#BEF264] text-black" 
              : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
          }`}
        >
          <Send size={16} />
          Compose
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "history" 
              ? "bg-[#BEF264] text-black" 
              : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
          }`}
        >
          <History size={16} />
          History
        </button>
      </div>

      {activeTab === "compose" ? (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Compose Form */}
          <div className="md:col-span-2 bg-[#18181B] border border-[#27272A] rounded-2xl p-6">
            <form onSubmit={handleSend} className="space-y-5">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Send To</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRecipientType("all")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      recipientType === "all"
                        ? "bg-[#BEF264] text-black"
                        : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
                    }`}
                  >
                    <Users size={16} />
                    All Vendors
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipientType("specific")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      recipientType === "specific"
                        ? "bg-[#BEF264] text-black"
                        : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
                    }`}
                  >
                    <User size={16} />
                    Specific Vendor
                  </button>
                </div>
              </div>

              {/* Vendor Select */}
              {recipientType === "specific" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Select Vendor</label>
                  <div className="relative">
                    <select
                      value={selectedVendor}
                      onChange={(e) => setSelectedVendor(e.target.value)}
                      required={recipientType === "specific"}
                      className="w-full bg-[#27272A] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
                    >
                      <option value="">Choose a vendor...</option>
                      {vendors.map(v => (
                        <option key={v.id} value={v.id}>{v.business_name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Message Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message Type</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: "MESSAGE", label: "General", icon: "📩" },
                    { value: "PROMOTION", label: "Promotion", icon: "🎉" },
                    { value: "BEST_SELLER", label: "Best Seller Invite", icon: "🌟" },
                  ].map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setMessageType(type.value);
                        if (type.value === "BEST_SELLER") {
                          setRecipientType("specific");
                          setTitle("🌟 Best Seller Feature Invitation");
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        messageType === type.value
                          ? "bg-[#BEF264] text-black"
                          : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
                      }`}
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              {messageType !== "BEST_SELLER" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Subject</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notification subject..."
                    required
                    className="w-full bg-[#27272A] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={messageType === "BEST_SELLER" 
                    ? "Enter a custom message for the best seller invitation (optional)..." 
                    : "Write your message here..."}
                  required={messageType !== "BEST_SELLER"}
                  rows={5}
                  className="w-full bg-[#27272A] border border-[#3f3f46] rounded-lg px-4 py-3 text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#BEF264] resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#BEF264] text-black font-semibold rounded-xl hover:bg-[#a3d939] transition-colors disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : success ? (
                  <>
                    <Check size={18} />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Notification
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMessageType("MESSAGE");
                    setRecipientType("all");
                    setTitle("📢 Important Update");
                    setMessage("");
                  }}
                  className="w-full text-left px-4 py-3 bg-[#27272A] hover:bg-[#3f3f46] rounded-lg text-sm text-white transition-colors"
                >
                  📢 Announce to All Vendors
                </button>
                <button
                  onClick={() => {
                    setMessageType("PROMOTION");
                    setRecipientType("all");
                    setTitle("🎉 Exciting Promotion Opportunity");
                    setMessage("");
                  }}
                  className="w-full text-left px-4 py-3 bg-[#27272A] hover:bg-[#3f3f46] rounded-lg text-sm text-white transition-colors"
                >
                  🎉 Promotion Campaign
                </button>
                <button
                  onClick={() => {
                    setMessageType("BEST_SELLER");
                    setRecipientType("specific");
                    setTitle("🌟 Best Seller Feature Invitation");
                    setMessage("");
                  }}
                  className="w-full text-left px-4 py-3 bg-[#27272A] hover:bg-[#3f3f46] rounded-lg text-sm text-white transition-colors"
                >
                  🌟 Best Seller Invite
                </button>
              </div>
            </div>

            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-2">Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Active Vendors</span>
                  <span className="text-white font-medium">{vendors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Messages Sent</span>
                  <span className="text-white font-medium">{history.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden">
          {history.length === 0 ? (
            <div className="p-12 text-center">
              <History className="mx-auto mb-4 text-[#3f3f46]" size={48} />
              <h3 className="text-lg font-medium text-white mb-1">No Messages Sent Yet</h3>
              <p className="text-[#71717A] text-sm">Your sent messages will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#27272A]">
              {history.map(notif => (
                <div key={notif.id} className="p-5 hover:bg-[#27272A]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{getTypeIcon(notif.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-white">{notif.title}</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#27272A] text-[#A1A1AA] rounded-full">
                          {notif.type}
                        </span>
                        {notif.is_read && (
                          <span className="text-xs px-2 py-0.5 bg-[#BEF264]/10 text-[#BEF264] rounded-full">
                            Read
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#A1A1AA] mb-2">{notif.message}</p>
                      <div className="flex items-center gap-4 text-xs text-[#71717A]">
                        <span>To: {notif.vendor_name}</span>
                        <span>{new Date(notif.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
