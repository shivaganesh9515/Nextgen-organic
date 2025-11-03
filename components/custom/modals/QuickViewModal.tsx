'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCartStore } from '@/store/cartStore';
import Rating from '@/components/shared/Rating';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    discountedPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    description: string;
    image: string;
    vendorId: string;
  };
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  const displayPrice = product.discountedPrice || product.price;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.image,
      vendorId: product.vendorId,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="my-2">
              <Rating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
            <div className="my-4">
              {product.discount && product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-green-600">${displayPrice.toFixed(2)}</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="mr-2">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-2 w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              Add to Cart - ${(displayPrice * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}