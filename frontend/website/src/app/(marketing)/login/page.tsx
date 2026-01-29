import Link from "next/link";
import { Store, Tractor, Smartphone, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-4xl">
         <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#262A2B] mb-4">Choose Your Path</h1>
            <p className="text-[#64748B] text-lg">Join the ecosystem where farmers meet communities.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vendor Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center hover:border-green-500 hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-700 mb-6">
                    <Tractor size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#262A2B] mb-3">For Vendors</h3>
                <p className="text-[#64748B] mb-8 leading-relaxed">
                    Are you a farmer or producer? Register your business, manage inventories, and reach new customers.
                </p>
                <div className="mt-auto">
                    <Link href="/register-vendor" className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition">
                        Register Now <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Customer Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-blue-500/10 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-6">
                    <Smartphone size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#262A2B] mb-3">For Customers</h3>
                <p className="text-[#64748B] mb-8 leading-relaxed">
                    Looking for fresh organic produce? Download our mobile app to order directly to your doorstep.
                </p>
                <div className="mt-auto">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#262A2B] text-white rounded-xl font-medium hover:bg-black transition">
                        Get the App <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
         </div>
         
         <div className="mt-12 text-center text-sm text-gray-500">
            Already a partner? <Link href="/login/vendor" className="text-green-700 font-semibold hover:underline">Access Portal</Link>
         </div>
      </div>
    </div>
  );
}
