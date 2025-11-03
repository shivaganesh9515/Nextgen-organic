'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
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

export default function ProductCard({
  id,
  name,
  price,
  discountedPrice,
  discount,
  rating,
  reviewCount,
  image,
  vendorId,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  
  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: discountedPrice || price,
      image,
      vendorId,
    });
  };

  const displayPrice = discountedPrice || price;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="relative">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          {discount && discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 fill-current ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold">${displayPrice.toFixed(2)}</span>
          {discountedPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button size="sm" asChild>
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}