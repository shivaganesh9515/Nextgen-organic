'use client';

import React from 'react';
import MealKits from '@/components/home-sections/MealKits';

export default function MealKitsPage() {
  return (
    <div className="min-h-screen bg-nature-pattern">
      <MealKits showAll={true} />
    </div>
  );
}
