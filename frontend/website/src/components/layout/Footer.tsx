import Link from "next/link";
import Image from "next/image";
import { Leaf, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#262A2B] text-[#F5F5F0] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          {/* Brand */}
          <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden shadow-sm">
                  <Image 
                    src="/final-logo.png" 
                    alt="Next360 Logo" 
                    fill
                    className="object-cover scale-[1.75]"
                  />
                </div>
                <span className="text-2xl font-heading font-bold text-[#262A2B]">
                  Next360
                </span>
              </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Connecting organic farmers directly to local communities. 
              Fresh, transparent, and built on trust.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4A6741] hover:text-white transition-all duration-300 text-white/60"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-[#4A6741] transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#4A6741] transition-colors">How It Works</Link></li>
              <li><Link href="/careers" className="hover:text-[#4A6741] transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-[#4A6741] transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/vendors" className="hover:text-[#4A6741] transition-colors">For Vendors</Link></li>
              <li><Link href="/hubs" className="hover:text-[#4A6741] transition-colors">Hub Stores</Link></li>
              <li><Link href="/farmers" className="hover:text-[#4A6741] transition-colors">Our Farmers</Link></li>
              <li><Link href="/quality" className="hover:text-[#4A6741] transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>hello@next360organics.in</li>
              <li>+91 40-1234-5678</li>
              <li className="pt-2">
                 Hitech City, Madhapur,<br />
                 Hyderabad, Telangana 500081
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {currentYear} Next360 Organics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-white transition-colors opacity-50">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
