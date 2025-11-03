'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import Rating from '@/components/shared/Rating';

interface WishlistItemProps {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  vendorId: string;
  onRemove: () => void;
}

export default function WishlistItem({
  id,
  name,
  price,
  discountedPrice,
  rating,
  reviewCount,
  image,
  vendorId,
  onRemove,
}: WishlistItemProps) {
  const { addItem } = useCartStore();
  const displayPrice = discountedPrice || price;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: displayPrice,
      image,
      vendorId,
    });
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <div className="mt-1">
          <Rating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>
        <div className="mt-1">
          {discountedPrice ? (
            <>
              <span className="text-green-600 font-bold">${displayPrice.toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-green-600 font-bold">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}