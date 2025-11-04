'use client';

import React from 'react';
import ecommerceComponents from '@/components/ecommerce-components-v3';
import { useParams } from 'next/navigation';

const { ProductDetailPage } = ecommerceComponents;

export default function ProductDetailPageWrapper() {
  const { id } = useParams();
  
  return (
    <div>
      <ProductDetailPage productId={id as string} />
    </div>
  );
}