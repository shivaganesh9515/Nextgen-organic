import React, { useState } from 'react';

export default function OrganicCategories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: 1,
      name: 'Fresh Vegetables',
      icon: '🥬',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      count: 156,
      trending: true,
    },
    {
      id: 2,
      name: 'Organic Fruits',
      icon: '🍎',
      color: 'from-red-400 to-rose-500',
      bgColor: 'bg-red-50',
      count: 124,
      trending: true,
    },
    {
      id: 3,
      name: 'Dairy Products',
      icon: '🥛',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      count: 89,
      trending: false,
    },
    {
      id: 4,
      name: 'Fresh Herbs',
      icon: '🌿',
      color: 'from-lime-400 to-green-500',
      bgColor: 'bg-lime-50',
      count: 45,
      trending: false,
    },
    {
      id: 5,
      name: 'Bakery Items',
      icon: '🍞',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      count: 67,
      trending: false,
    },
    {
      id: 6,
      name: 'Spices & Oils',
      icon: '🌶️',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
      count: 92,
      trending: true,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            🌱 Explore Our Range
          </span>
          <h2 className="text-5xl font-bold text-gray-900">
            Shop by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh, organic products handpicked from local farms to your kitchen
          </p>
        </div>

        {/* Categories Grid - Modern Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative cursor-pointer transition-all duration-300 ${
                activeCategory === index ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setActiveCategory(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveCategory(index);
                }
              }}
            >
              {/* Category Card */}
              <div className={`relative ${category.bgColor} rounded-3xl p-6 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    🔥 Hot
                  </div>
                )}

                {/* Icon */}
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-bold text-gray-900 text-center mb-2">
                  {category.name}
                </h3>

                {/* Product Count */}
                <span className="text-xs text-gray-500 font-semibold">
                  {category.count} Products
                </span>

                {/* Hover Effect - Arrow */}
                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Decorative Leaf */}
                <div className="absolute -bottom-2 -right-2 text-4xl opacity-5 group-hover:opacity-10 transition-opacity">
                  🍃
                </div>
              </div>

              {/* Active Indicator */}
              {activeCategory === index && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Featured Category Banner */}
        <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 8.28-6.72 15-15 15s-15-6.72-15-15S6.72 0 15 0s15 6.72 15 15z' fill='white' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 p-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                🎉 Special Offer
              </span>
              <h3 className="text-4xl font-bold leading-tight">
                Get 30% OFF on<br />
                First Order
              </h3>
              <p className="text-green-50 text-lg">
                Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">ORGANIC30</span> at checkout
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Shop Now
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Floating Products */}
            <div className="relative h-64 hidden md:block">
              <div className="absolute top-0 right-20 animate-float">
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-6xl shadow-xl">
                  🥕
                </div>
              </div>
              <div className="absolute top-20 right-0 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-xl">
                  🍅
                </div>
              </div>
              <div className="absolute bottom-0 right-32 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-xl">
                  🥬
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: '✓', title: '100% Organic', desc: 'Certified fresh products' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Within 24 hours' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive rates' },
            { icon: '🎁', title: 'Easy Returns', desc: '7-day return policy' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}