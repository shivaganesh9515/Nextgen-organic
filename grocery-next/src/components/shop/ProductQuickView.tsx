'use client';

import { useState } from 'react';
import { X, Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { Product } from '../../lib/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  const discountedPrice = product.originalPrice 
    ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
    : product.price;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-lg shadow-xl transform transition-all w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 bg-gray-100 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary-600' : 'border-transparent'}`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-gray-500 mt-1">{product.vendor.name}</p>
                </div>
                
                <button
                  onClick={handleToggleWishlist}
                  className="p-2 text-gray-400 hover:text-red-500"
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </button>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="mt-4 flex items-center">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through ml-3">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <Badge variant="danger" className="ml-3">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Unit/Weight */}
              <div className="text-gray-500 mt-1">
                {product.unit} {product.weight && `(${product.weight})`}
              </div>
              
              {/* Description */}
              <p className="mt-4 text-gray-600">{product.description}</p>
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Nutrition Info */}
              {product.nutritionInfo && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900">Nutrition Facts</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span className="font-medium">{product.nutritionInfo.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-medium">{product.nutritionInfo.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs</span>
                      <span className="font-medium">{product.nutritionInfo.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat</span>
                      <span className="font-medium">{product.nutritionInfo.fat}g</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add to Cart */}
              <div className="mt-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};