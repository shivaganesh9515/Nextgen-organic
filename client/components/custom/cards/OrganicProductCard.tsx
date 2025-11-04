import React, { useState } from 'react';

export default function OrganicProductCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '1',
    name: 'Organic Fresh Tomatoes',
    category: 'Vegetables',
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.8,
    reviews: 234,
    unit: '1 kg',
    stock: 50,
    badge: '100% Organic',
    delivery: 'Same Day',
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
        {/* Product Card 1 - Modern Organic */}
        <div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500 transform hover:-translate-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative h-72 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
            {/* Product Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl">🍅</span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                {product.badge}
              </span>
              <span className="block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                {product.discount}% OFF
              </span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Quick View (on hover) */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center animate-grow">
                <button className="px-6 py-3 bg-white text-green-700 rounded-xl font-bold shadow-lg hover:bg-green-50 transition-colors">
                  Quick View 👁️
                </button>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                {product.category}
              </span>
              <span className="text-xs text-gray-500">{product.unit}</span>
            </div>

            {/* Product Name */}
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-2xl">🚚</span>
              <span className="text-gray-600">
                <span className="font-semibold text-green-600">{product.delivery}</span> Delivery
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-sm text-red-500 font-semibold">Save ₹{product.originalPrice - product.price}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center font-bold text-green-600"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center font-bold text-green-600"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Stock Info */}
              <span className="text-xs text-gray-500">
                {product.stock} left in stock
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add
              </button>
              <button className="px-4 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                Buy Now
              </button>
            </div>
          </div>

          {/* Organic Leaf Decoration */}
          <div className="absolute bottom-4 right-4 text-4xl opacity-10 pointer-events-none">
            🌿
          </div>
        </div>

        {/* Product Card 2 - Minimalist Organic */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500">
          <div className="relative">
            {/* Gradient Header */}
            <div className="h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">🥕</span>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                Fresh Today
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-orange-600 font-semibold uppercase">Vegetables</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">Organic Carrots</h3>
                </div>
                <button className="w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors flex items-center justify-center" aria-label="Add to favorites">
                  ❤️
                </button>
              </div>

              {/* Mini Features */}
              <div className="flex items-center space-x-3 text-xs">
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full font-semibold">✓ Certified</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">❄️ Fresh</span>
                <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-semibold">🚀 Fast</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-orange-600">₹65</p>
                  <p className="text-xs text-gray-500">500g</p>
                </div>
                <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Add to Cart
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="font-bold text-gray-900">⭐ 4.9</p>
                  <p className="text-gray-500">Rating</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">🚚 1hr</p>
                  <p className="text-gray-500">Delivery</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">✓ Fresh</p>
                  <p className="text-gray-500">Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-grow {
          animation: grow 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}