import { useState } from 'react';

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

  const handleAddToCart = () => {
    // In a real app, this would dispatch an action to add the product to cart
    console.log(`Added ${quantity} of ${name} to cart`);
    alert(`Added ${quantity} of ${name} to cart`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description || 'Fresh organic product'}</p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
            <div className="flex items-center">
              <button 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="bg-gray-100 px-3 py-1">{quantity}</span>
              <button 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button 
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}