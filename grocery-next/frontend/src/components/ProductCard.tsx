
import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Image as ImageIcon } from 'lucide-react';

export default function ProductCard({ 
  name, 
  price, 
  image, 
  description 
}: {
  name: string;
  price: number;
  image?: string;
  description?: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    // In a real app, this would dispatch an action to add the product to cart
    console.log(`Added ${quantity} of ${name} to cart`);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full bg-white">
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description || 'Fresh organic product'}</p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-primary-600">${price.toFixed(2)}</span>
            <div className="flex items-center">
              <button 
                className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold px-4 py-1">{quantity}</span>
              <button 
                className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button 
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 disabled:bg-primary-400"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
