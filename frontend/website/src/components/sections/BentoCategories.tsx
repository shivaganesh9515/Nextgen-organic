"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";

// Style mappings for specific categories to maintain design
const STYLE_MAP: Record<string, any> = {
  vegetables: {
    className: "md:col-span-2 md:row-span-2 bg-[#F0FDF4]",
    textColor: "text-green-800",
    accentColor: "text-green-600",
    subtitle: "Harvested Daily"
  },
  fruits: {
    className: "md:col-span-1 md:row-span-1 bg-[#FFF7ED]",
    textColor: "text-orange-800",
    accentColor: "text-orange-600",
    subtitle: "Naturally Ripened"
  },
  bakery: {
    className: "md:col-span-1 md:row-span-1 bg-[#FEFCE8]",
    textColor: "text-yellow-800",
    accentColor: "text-yellow-600",
    subtitle: "Gluten Free"
  },
  essentials: {
    className: "md:col-span-2 md:row-span-1 bg-[#FAFAF9]",
    textColor: "text-stone-800",
    accentColor: "text-stone-600",
    subtitle: "Spices, Honey, & More"
  }
};

export function BentoCategories() {
  const [bentoItems, setBentoItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.categories.list();
        if (data) {
          // Filter only the ones we have styles for (or all if we add default)
          const validItems = data
            .filter((cat: any) => STYLE_MAP[cat.slug])
            .map((cat: any) => ({
              id: cat.id,
              title: cat.name,
              // Fallback image if not in DB, though seed script puts it there
              image: cat.image_url || "/icons/3d/carrot.png", 
              link: `/collections/${cat.slug}`,
              ...STYLE_MAP[cat.slug]
            }));
          setBentoItems(validItems);
        }
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      }
    }
    fetchCategories();
  }, []);

  if (bentoItems.length === 0) return null; // Or return a skeleton

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
             <span className="text-[#4A6741] font-bold tracking-widest text-sm uppercase mb-3 block">Shop by Category</span>
             <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#262A2B]">Groceries Reimagined.</h2>
          </div>
          <Link href="/collections/all" className="hidden md:flex items-center gap-2 text-[#262A2B] font-medium hover:text-[#4A6741] transition-colors group">
             View Full Catalog 
             <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {bentoItems.map((item) => (
            <Link key={item.id} href={item.link} className={`${item.className} group relative rounded-[2rem] overflow-hidden p-8 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between border border-black/5`}>
               
               {/* Content */}
               <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                 <div className={`p-3 rounded-full bg-white/50 backdrop-blur-md w-fit mb-4 ${item.accentColor} font-bold text-xs uppercase tracking-wider`}>
                    {item.subtitle}
                 </div>
                 <h3 className={`font-heading font-bold text-3xl md:text-4xl leading-tight ${item.textColor}`}>
                    {item.title}
                 </h3>
               </div>

               {/* Action Button */}
               <div className="relative z-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="inline-flex items-center gap-2 font-bold text-sm bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-[#262A2B]">
                    Shop Now <ArrowUpRight size={14} />
                  </span>
               </div>

               {/* Image Background */}
               <div className="absolute right-0 bottom-0 w-2/3 h-2/3 md:w-full md:h-full transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-3 pointer-events-none">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain object-bottom md:object-right-bottom p-4 opacity-90"
                  />
               </div>

               {/* Soft overlay gradient on hover */}
               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
