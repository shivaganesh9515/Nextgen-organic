'use client';

import React from "react";
import Link from "next/link";
import { Product } from '../../lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onWishlist?: (id: string) => void;
  onCompare?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onWishlist,
  onCompare
}) => {
  // Handle Add to Cart click
  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  // Handle Quick View click
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product.id);
    }
  };

  // Handle Wishlist click
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onWishlist) {
      onWishlist(product.id);
    }
  };

  // Handle Compare click
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCompare) {
      onCompare(product.id);
    }
  };

  // Render star ratings
  const renderRating = (ratingValue: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  // Determine badge type and text
  const getBadge = () => {
    if (product.isNew) {
      return { type: 'hot', text: 'New' };
    }
    if (product.discount && product.discount > 0) {
      return { type: 'discount', text: `-${product.discount}%` };
    }
    if (product.isOrganic) {
      return { type: 'sale', text: 'Organic' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <div className="card card-product h-full flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden touch-optimized">
      <div className="card-body p-5 flex flex-col flex-grow">
        {/* Badge and Image Container */}
        <div className="text-center relative">
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`badge px-3 py-1.5 text-xs font-semibold rounded-full ${
                badge.type === 'sale' ? 'bg-red-500 text-white' : 
                badge.type === 'discount' ? 'bg-green-500 text-white' : 
                badge.type === 'hot' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                {badge.text}
              </span>
            </div>
          )}

          {/* Product Image */}
          <Link href={`/shop/${product.id}`} className="block mb-4">
            <img
              src={product.image || '/images/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-56 object-cover rounded-lg mx-auto"
              style={{ height: '224px', objectFit: 'cover' }}
              loading="lazy"
            />
          </Link>

          {/* Action Buttons */}
          <div className="card-product-action absolute top-3 right-3 flex flex-col gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button
              className="btn-action w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleQuickView}
              title="Quick View"
              aria-label="Quick view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              className="btn-action w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleWishlist}
              title="Wishlist"
              aria-label="Add to wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              className="btn-action w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleCompare}
              title="Compare"
              aria-label="Compare product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="text-small mb-2">
          <Link href={`/shop?category=${product.category}`} className="text-decoration-none text-gray-500 hover:text-green-600">
            <small>{product.category}</small>
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3">
          <Link href={`/shop/${product.id}`} className="text-inherit text-decoration-none text-gray-900 hover:text-green-600">
            {product.name}
          </Link>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mb-3">
          <span className="text-warning flex items-center">
            {renderRating(product.rating)}
          </span>
          <span className="text-gray-500 text-sm ml-2">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div>
            <span className="text-dark font-bold text-2xl text-green-600">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="line-through text-gray-500 text-base ml-3">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          {/* Add to Cart Button */}
          <div>
            <button
              className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:-translate-y-0.5"
              onClick={handleAddClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;