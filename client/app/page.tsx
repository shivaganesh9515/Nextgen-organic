'use client';

import React from 'react';
import OrganicHero from '@/components/home-sections/OrganicHero';
import OrganicCategories from '@/components/home-sections/OrganicCategories';
import PersonalizedRecommendations from '@/components/home-sections/PersonalizedRecommendations';
import MealKits from '@/components/home-sections/MealKits';
import VendorSpotlight from '@/components/home-sections/VendorSpotlight';
import FeaturedProducts from '@/components/home-sections/FeaturedProducts';
import SubscriptionService from '@/components/home-sections/SubscriptionService';
import LoyaltyProgram from '@/components/home-sections/LoyaltyProgram';
import WhyChooseUs from '@/components/home-sections/WhyChooseUs';
import TrustedCertificates from '@/components/home-sections/TrustedCertificates';
import TestimonialsBlock from '@/components/home-sections/TestimonialsBlock';
import VendorCTA from '@/components/home-sections/VendorCTA';

export default function Home() {
  return (
    <>
      <OrganicHero />
      <WhyChooseUs />
      <OrganicCategories />
      <PersonalizedRecommendations />
      <MealKits />
      <VendorSpotlight />
      <LoyaltyProgram />
      <FeaturedProducts />
      <SubscriptionService />
      <TrustedCertificates />
      <TestimonialsBlock />
      <VendorCTA />
    </>
  );
}