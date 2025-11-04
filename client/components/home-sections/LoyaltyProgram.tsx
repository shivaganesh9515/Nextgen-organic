'use client';

import React from 'react';

export default function LoyaltyProgram() {
  // Mock data for loyalty tiers
  const loyaltyTiers = [
    {
      name: 'Seedling',
      minPoints: 0,
      maxPoints: 499,
      benefits: ['5% off orders', 'Free delivery on orders over ₹500', 'Early access to sales'],
      color: 'from-green-100 to-emerald-100',
      icon: '🌱',
    },
    {
      name: 'Sprout',
      minPoints: 500,
      maxPoints: 1999,
      benefits: ['10% off orders', 'Free delivery on orders over ₹300', 'Early access to sales', 'Birthday gift'],
      color: 'from-green-200 to-emerald-200',
      icon: '🌿',
    },
    {
      name: 'Sapling',
      minPoints: 2000,
      maxPoints: 4999,
      benefits: ['15% off orders', 'Free delivery on all orders', 'Early access to sales', 'Birthday gift', 'Exclusive products'],
      color: 'from-green-300 to-emerald-300',
      icon: '🌳',
    },
    {
      name: 'Tree',
      minPoints: 5000,
      maxPoints: Infinity,
      benefits: ['20% off orders', 'Free delivery on all orders', 'Early access to sales', 'Birthday gift', 'Exclusive products', 'Personal shopping assistant'],
      color: 'from-green-400 to-emerald-400',
      icon: '🌲',
    },
  ];

  // Mock user data
  const userPoints = 1250;
  const currentTier = loyaltyTiers[1]; // Sprout tier
  const nextTier = loyaltyTiers[2]; // Sapling tier
  const pointsToNextTier = nextTier.minPoints - userPoints;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            🌟 Earn Rewards
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Loyalty Program
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Earn points for every purchase and unlock exclusive benefits
          </p>
        </div>

        {/* User Progress */}
        <div className="bg-white rounded-3xl p-8 shadow-organic mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h3>
              <p className="text-gray-600">You{`'`}re a <span className="font-bold text-green-600">{currentTier.name}</span></p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{userPoints}</div>
              <p className="text-gray-600">Loyalty Points</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{currentTier.name} ({currentTier.minPoints} pts)</span>
              <span>{nextTier.name} ({nextTier.minPoints} pts)</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                style={{ width: `${(userPoints / nextTier.minPoints) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Earn <span className="font-bold text-green-600">{pointsToNextTier}</span> more points to become a <span className="font-bold">{nextTier.name}</span>
            </p>
          </div>
        </div>

        {/* Loyalty Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loyaltyTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`relative rounded-3xl p-6 shadow-organic transition-all duration-300 ${
                userPoints >= tier.minPoints && userPoints <= (tier.maxPoints === Infinity ? 100000 : tier.maxPoints)
                  ? 'ring-4 ring-green-500 scale-105'
                  : 'hover:shadow-organic-lg'
              }`}
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br ${tier.color} rounded-3xl opacity-50"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-gray-600 mt-2">
                    {tier.maxPoints === Infinity ? `${tier.minPoints}+ pts` : `${tier.minPoints}-${tier.maxPoints} pts`}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {userPoints >= tier.minPoints && userPoints <= (tier.maxPoints === Infinity ? 100000 : tier.maxPoints) && (
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                      Your Current Tier
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
          <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Earn Points</h4>
              <p className="text-green-100">Get 1 point for every ₹10 spent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Level Up</h4>
              <p className="text-green-100">Unlock higher tiers with more benefits</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Redeem Rewards</h4>
              <p className="text-green-100">Use points for discounts and exclusive perks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}