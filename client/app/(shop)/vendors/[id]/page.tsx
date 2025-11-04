'use client';

import React from 'react';
import unifiedComponentsV2 from '@/components/unified-components-v2';

const { VendorIDCard } = unifiedComponentsV2;

export default function VendorProfilePage() {
  // Mock vendor data
  const vendor = {
    id: '1',
    name: 'Green Valley Organics',
    image: '',
    rating: 4.8,
    specialties: ['Organic Vegetables', 'Herbs', 'Seasonal Fruits'],
    certifications: ['India Organic', 'FSSAI', 'ISO 22000'],
    city: 'Pune, Maharashtra',
    email: 'contact@greenvalleyorganics.com',
    phone: '+91 98765 43210',
    description: 'We are a certified organic farm specializing in fresh, pesticide-free vegetables and fruits. Our produce is grown using sustainable farming practices and delivered directly from farm to your table.',
    story: 'Green Valley Organics was founded in 2010 with a mission to provide healthy, organic food to our community. What started as a small family farm has grown into a trusted supplier for hundreds of families across Pune. We believe in sustainable farming practices that protect both our health and the environment.\n\nOur farming methods include crop rotation, composting, and natural pest control. We never use synthetic pesticides, herbicides, or fertilizers. All our products are certified organic by the India Organic program.\n\nWe take pride in our direct-to-consumer model that ensures maximum freshness and supports local agriculture. Our team of experienced farmers works year-round to provide you with the best seasonal produce.',
    followers: 12400,
    responseTime: '2 hours',
    productCount: 86,
    verified: true
  };

  return (
    <div>
      <VendorIDCard vendor={vendor} />
    </div>
  );
}