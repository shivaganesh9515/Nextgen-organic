'use client';

import React from 'react';

interface MealKit {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  servings: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  image: string;
}

export default function MealKits() {
  // Mock data for meal kits
  const mealKits: MealKit[] = [
    {
      id: '1',
      name: 'Mediterranean Veggie Bowl',
      description: 'Fresh vegetables with hummus, olives, and Mediterranean spices. Ready in 15 minutes!',
      price: 129,
      originalPrice: 169,
      discount: 24,
      rating: 4.8,
      reviewCount: 342,
      servings: 2,
      prepTime: '15 mins',
      difficulty: 'Easy',
      ingredients: ['Bell Peppers', 'Cucumbers', 'Cherry Tomatoes', 'Hummus', 'Olives'],
      image: '',
    },
    {
      id: '2',
      name: 'Hearty Lentil Soup',
      description: 'Nutritious lentil soup with vegetables and aromatic spices. Perfect for cold days.',
      price: 99,
      rating: 4.9,
      reviewCount: 278,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Easy',
      ingredients: ['Red Lentils', 'Carrots', 'Celery', 'Onions', 'Garlic'],
      image: '',
    },
    {
      id: '3',
      name: 'Berry Smoothie Kit',
      description: 'Mix of frozen berries, banana, and yogurt for a healthy breakfast smoothie.',
      price: 79,
      originalPrice: 99,
      discount: 20,
      rating: 4.7,
      reviewCount: 156,
      servings: 2,
      prepTime: '5 mins',
      difficulty: 'Easy',
      ingredients: ['Mixed Berries', 'Banana', 'Greek Yogurt', 'Honey'],
      image: '',
    },
  ];

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
            🍽️ Quick & Healthy Meals
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Meal Kits & Bundles
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready-to-cook meal kits with fresh organic ingredients and easy recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealKits.map((kit) => (
            <div 
              key={kit.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-organic hover:shadow-organic-xl transition-all duration-500"
            >
              <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl">
                    {kit.name.includes('Mediterranean') ? '🥗' : 
                     kit.name.includes('Lentil') ? '🍲' : '🥤'}
                  </span>
                </div>
                {kit.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {kit.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {kit.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[kit.difficulty]}`}>
                    {kit.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm">{kit.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {kit.ingredients.slice(0, 3).map((ingredient, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {kit.ingredients.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      +{kit.ingredients.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">⏱️</span>
                      <span className="text-sm text-gray-600">{kit.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">👥</span>
                      <span className="text-sm text-gray-600">{kit.servings} servings</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(kit.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{kit.rating}</span>
                  <span className="text-sm text-gray-500">({kit.reviewCount})</span>
                </div>
                
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-amber-600">₹{kit.price}</span>
                  {kit.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{kit.originalPrice}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-organic hover:shadow-organic-lg transition-all hover:-translate-y-1">
                    Add to Cart
                  </button>
                  <button className="px-4 py-2 bg-white text-amber-700 rounded-xl font-bold text-sm shadow-organic hover:shadow-organic-lg transition-all border-2 border-amber-200 hover:border-amber-400 hover:-translate-y-1">
                    View Recipe
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-2xl opacity-10 pointer-events-none">
                🥣
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}