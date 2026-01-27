import { Hero } from "@/components/sections/Hero";
import { FoodTypes } from "@/components/sections/FoodTypes";
import { TrustModel } from "@/components/sections/TrustModel";
import { Categories } from "@/components/sections/Categories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { VendorCTA } from "@/components/sections/VendorCTA";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveTicker } from "@/components/ui/LiveTicker";
import { FarmerStories } from "@/components/sections/FarmerStories";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyNext360 } from "@/components/sections/WhyNext360";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FadeIn direction="up" fullWidth><WhatWeDo /></FadeIn>
      <FadeIn direction="up" fullWidth><Categories /></FadeIn>
      <FadeIn direction="up" fullWidth><WhyNext360 /></FadeIn>
      <FadeIn direction="up" fullWidth><FoodTypes /></FadeIn>
      <FadeIn direction="up" fullWidth><TrustModel /></FadeIn>
      <FadeIn direction="up" fullWidth><HowItWorks /></FadeIn>
      <FadeIn direction="up" fullWidth><FarmerStories /></FadeIn>
      <FadeIn direction="up" fullWidth><AppShowcase /></FadeIn>
      <FadeIn direction="up" fullWidth><Testimonials /></FadeIn>
      <FadeIn direction="up" fullWidth><VendorCTA /></FadeIn>
    </div>
  );
}
