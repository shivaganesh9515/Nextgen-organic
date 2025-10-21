'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { Product } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { AnimatedTagPill } from '../ui/AnimatedTagPill';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  const discountedPrice = product.originalPrice 
    ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
    : product.price;

  return (
    <motion.div 
      className="card group flex flex-col h-full overflow-hidden"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg">
        <Link href={`/shop/${product.id}`}>
          <motion.img
            src={product.image || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <AnimatedTagPill variant="success" glow>
              New
            </AnimatedTagPill>
          )}
          {product.discount && product.discount > 0 && (
            <AnimatedTagPill variant="danger" glow>
              {product.discount}% OFF
            </AnimatedTagPill>
          )}
          {product.isOrganic && (
            <AnimatedTagPill variant="info">
              Organic
            </AnimatedTagPill>
          )}
        </div>
        
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition"
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow mt-4">
        <Link href={`/shop/${product.id}`} className="hover:text-primary-600">
          <motion.h3 
            className="font-semibold text-gray-900 line-clamp-2"
            whileHover={{ color: "#16a34a" }}
          >
            {product.name}
          </motion.h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold text-gray-900">
            ₹{discountedPrice.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Unit/Weight */}
        <div className="text-sm text-gray-500 mt-1">
          {product.unit} {product.weight && `(${product.weight})`}
        </div>
        
        {/* Add to Cart */}
        <div className="mt-4 flex items-center space-x-2">
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
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 btn-primary flex items-center justify-center space-x-1 disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isAdding ? 'Adding...' : 'Add'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};