'use client';

import React from 'react';
import OrganicHero from '@/components/home-sections/OrganicHero';
import OrganicCategories from '@/components/home-sections/OrganicCategories';
import FeaturedProducts from '@/components/home-sections/FeaturedProducts';

export default function Home() {
  return (
    <>
      <OrganicHero />
      <OrganicCategories />
      <FeaturedProducts />
    </>
  );
}