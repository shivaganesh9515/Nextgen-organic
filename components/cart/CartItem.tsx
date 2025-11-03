'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  // image is passed but not used in this component
  image: _image, // eslint-disable-line @typescript-eslint/no-unused-vars
}: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </Button>
        <span className="mx-2 w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </div>
      <div className="ml-4 w-20 text-right font-bold">
        ${(price * quantity).toFixed(2)}
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => removeItem(id)}
        className="ml-4 text-red-600 hover:text-red-800"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </Button>
    </div>
  );
}