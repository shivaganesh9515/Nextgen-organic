'use client';

import ProductCard from '@/components/custom/cards/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  vendorId: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          discountedPrice={product.discountedPrice}
          discount={product.discount}
          rating={product.rating}
          reviewCount={product.reviewCount}
          image={product.image}
          vendorId={product.vendorId}
        />
      ))}
    </div>
  );
}