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

export default function Home() {
  return (
    <>
      <OrganicHero />
      <OrganicCategories />
      <PersonalizedRecommendations />
      <MealKits />
      <VendorSpotlight />
      <LoyaltyProgram />
      <FeaturedProducts />
      <SubscriptionService />
    </>
  );
}