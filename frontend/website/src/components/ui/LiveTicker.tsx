"use client";

import { useEffect, useState } from "react";

const TICKER_ITEMS = [
  "100% Organic Certified",
  "•",
  "Direct from Farms",
  "•",
  "QR Traceable Produce",
  "•",
  "Zero Chemical Residue",
  "•",
  "NextDay Delivery",
  "•",
  "Fair Pay for Farmers",
  "•",
  "Sustainable Packaging",
  "•",
];

export function LiveTicker() {
  return (
    <div className="w-full bg-[#4A6741] text-[#F5F5F0] py-3 overflow-hidden whitespace-nowrap relative z-50 border-y border-[#3D5536]">
      <div className="inline-block animate-marquee">
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="mx-4 text-xs font-bold uppercase tracking-widest">
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {TICKER_ITEMS.map((item, i) => (
          <span key={`dup-${i}`} className="mx-4 text-xs font-bold uppercase tracking-widest">
            {item}
          </span>
        ))}
        {TICKER_ITEMS.map((item, i) => (
            <span key={`dup2-${i}`} className="mx-4 text-xs font-bold uppercase tracking-widest">
              {item}
            </span>
        ))}
      </div>
    </div>
  );
}
