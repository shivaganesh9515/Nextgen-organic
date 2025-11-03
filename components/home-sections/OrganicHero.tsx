import React, { useState, useEffect } from 'react';

export default function OrganicHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leaves = [
    { delay: '0s', left: '10%' },
    { delay: '2s', left: '30%' },
    { delay: '4s', left: '50%' },
    { delay: '1s', left: '70%' },
    { delay: '3s', left: '90%' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Animated Background Leaves */}
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="absolute text-6xl opacity-20"
          style={{
            left: leaf.left,
            animation: `leaf-fall 8s linear infinite`,
            animationDelay: leaf.delay,
          }}
        >
          🍃
        </div>
      ))}

      {/* Organic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 8.28-6.72 15-15 15s-15-6.72-15-15S6.72 0 15 0s15 6.72 15 15z' fill='%232D5016' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="space-y-8 animate-grow"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            {/* Organic Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-organic">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-semibold text-green-800">100% Organic & Fresh</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">
                Farm Fresh
              </span>
              <span className="block text-green-900 mt-2">
                Organic Groceries
              </span>
              <span className="block text-amber-600 text-5xl mt-2" style={{ fontFamily: 'Caveat, cursive' }}>
                to Your Doorstep
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Experience the goodness of nature with our handpicked organic products. 
              Fresh from local farms, delivered with love. 🍅🥕🥬
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-organic-lg hover:shadow-organic-xl transition-all duration-300 hover:-translate-y-1">
                <span className="relative z-10 flex items-center">
                  Shop Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button className="px-8 py-4 bg-white text-green-700 rounded-2xl font-bold text-lg shadow-organic hover:shadow-organic-lg transition-all duration-300 border-2 border-green-200 hover:border-green-400 hover:-translate-y-1">
                View Products
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Certified Organic</p>
                  <p className="text-sm text-gray-600">100% Natural</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Same Day Delivery</p>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-float">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-200 rounded-full opacity-30 blur-3xl" />
              
              {/* Product Showcase */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-organic-xl">
                {/* Placeholder for Product Image */}
                <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl">🥗</div>
                    <p className="text-2xl font-bold text-green-900">Fresh Organic Basket</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-green-600">₹299</span>
                      <span className="text-xl text-gray-500 line-through">₹450</span>
                    </div>
                    <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      34% OFF
                    </div>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-organic-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">⭐</span>
                    <div>
                      <p className="text-2xl font-bold text-green-900">4.8</p>
                      <p className="text-xs text-gray-600">2.5k+ reviews</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stock Card */}
                <div className="absolute -bottom-6 -left-6 bg-green-600 text-white rounded-2xl p-4 shadow-organic-lg">
                  <p className="text-sm font-semibold">🔥 Trending</p>
                  <p className="text-xs opacity-90">500+ sold today</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌿</div>
            <div className="absolute bottom-20 left-0 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🍊</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes leaf-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes grow {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}