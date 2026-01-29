import { Sidebar } from "@/components/dashboard/Sidebar";
import { AdminNavbar } from "@/components/dashboard/AdminNavbar";

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
          <AdminNavbar />

          {/* Scrollable Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
