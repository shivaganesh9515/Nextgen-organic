'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VideoBackgroundSection() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Video background - using placeholder for now */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gray-300 border-2 border-dashed z-0"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Commitment to Quality</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We work directly with local farmers and producers to ensure you get the freshest, highest quality groceries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg py-6 px-8" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600 text-lg py-6 px-8" asChild>
            <Link href="/vendors">Our Vendors</Link>
          </Button>
        </div>
      </div>
      
      {/* Play button overlay */}
      <div className="absolute bottom-8 right-8 z-20">
        <Button size="icon" className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </Button>
      </div>
    </section>
  );
}