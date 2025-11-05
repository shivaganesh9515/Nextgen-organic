'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Leaf, ShoppingCart, ChefHat, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

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
  cuisine?: string;
}

interface MealKitsProps {
  showAll?: boolean;
}

export default function MealKits({ showAll = false }: MealKitsProps) {
  const { addItem } = useCartStore();

  // 25 Indian meal kits with authentic recipes
  const allMealKits: MealKit[] = [
    {
      id: 'mk1',
      name: 'Dal Tadka Kit',
      description: 'Traditional yellow dal with aromatic tadka spices. Ready in 25 minutes!',
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.8,
      reviewCount: 342,
      servings: 4,
      prepTime: '25 mins',
      difficulty: 'Easy',
      ingredients: ['Yellow Lentils', 'Onions', 'Tomatoes', 'Garlic', 'Cumin', 'Turmeric', 'Ghee'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk2',
      name: 'Palak Paneer Kit',
      description: 'Creamy spinach curry with fresh paneer cubes. A vegetarian favorite!',
      price: 249,
      originalPrice: 299,
      discount: 17,
      rating: 4.9,
      reviewCount: 278,
      servings: 3,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Fresh Spinach', 'Paneer', 'Onions', 'Garlic', 'Ginger', 'Cream', 'Spices'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk3',
      name: 'Chana Masala Kit',
      description: 'Spiced chickpea curry with authentic masala blend. Protein-rich meal.',
      price: 179,
      originalPrice: 219,
      discount: 18,
      rating: 4.7,
      reviewCount: 456,
      servings: 4,
      prepTime: '20 mins',
      difficulty: 'Easy',
      ingredients: ['Chickpeas', 'Onions', 'Tomatoes', 'Garam Masala', 'Turmeric', 'Coriander'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk4',
      name: 'Aloo Gobi Kit',
      description: 'Classic potato and cauliflower curry. Simple yet flavorful.',
      price: 159,
      originalPrice: 189,
      discount: 16,
      rating: 4.6,
      reviewCount: 312,
      servings: 3,
      prepTime: '25 mins',
      difficulty: 'Easy',
      ingredients: ['Potatoes', 'Cauliflower', 'Onions', 'Ginger', 'Turmeric', 'Cumin', 'Coriander'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk5',
      name: 'Rajma Masala Kit',
      description: 'Kidney bean curry in rich tomato gravy. Perfect with rice!',
      price: 189,
      originalPrice: 229,
      discount: 17,
      rating: 4.8,
      reviewCount: 389,
      servings: 4,
      prepTime: '35 mins',
      difficulty: 'Medium',
      ingredients: ['Kidney Beans', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Spices', 'Garam Masala'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk6',
      name: 'Hyderabadi Biryani Kit',
      description: 'Aromatic basmati rice with whole spices. Complete biryani experience!',
      price: 299,
      originalPrice: 349,
      discount: 14,
      rating: 4.9,
      reviewCount: 523,
      servings: 4,
      prepTime: '40 mins',
      difficulty: 'Medium',
      ingredients: ['Basmati Rice', 'Onions', 'Whole Spices', 'Ghee', 'Saffron', 'Mint', 'Coriander'],
      image: '',
      cuisine: 'Hyderabadi',
    },
    {
      id: 'mk7',
      name: 'Sambar Kit',
      description: 'South Indian lentil stew with vegetables. Traditional breakfast favorite.',
      price: 169,
      originalPrice: 199,
      discount: 15,
      rating: 4.7,
      reviewCount: 445,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Toor Dal', 'Vegetables', 'Tamarind', 'Sambar Powder', 'Mustard Seeds', 'Curry Leaves'],
      image: '',
      cuisine: 'South Indian',
    },
    {
      id: 'mk8',
      name: 'Rasam Kit',
      description: 'Tangy South Indian soup with tamarind and spices. Light and healthy!',
      price: 129,
      originalPrice: 149,
      discount: 13,
      rating: 4.6,
      reviewCount: 367,
      servings: 4,
      prepTime: '15 mins',
      difficulty: 'Easy',
      ingredients: ['Tomatoes', 'Tamarind', 'Rasam Powder', 'Garlic', 'Curry Leaves', 'Mustard Seeds'],
      image: '',
      cuisine: 'South Indian',
    },
    {
      id: 'mk9',
      name: 'Curry Leaves Pulao Kit',
      description: 'Fragrant rice with curry leaves and South Indian spices.',
      price: 189,
      originalPrice: 219,
      discount: 14,
      rating: 4.7,
      reviewCount: 234,
      servings: 4,
      prepTime: '25 mins',
      difficulty: 'Easy',
      ingredients: ['Basmati Rice', 'Curry Leaves', 'Mustard Seeds', 'Coconut', 'Cashews', 'Spices'],
      image: '',
      cuisine: 'South Indian',
    },
    {
      id: 'mk10',
      name: 'Butter Chicken Kit',
      description: 'Creamy tomato-based curry with tender chicken pieces.',
      price: 349,
      originalPrice: 399,
      discount: 12,
      rating: 4.9,
      reviewCount: 678,
      servings: 3,
      prepTime: '35 mins',
      difficulty: 'Medium',
      ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Garam Masala', 'Kasuri Methi', 'Ginger-Garlic'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk11',
      name: 'Chicken Tikka Masala Kit',
      description: 'Grilled chicken in rich, creamy masala sauce.',
      price: 379,
      originalPrice: 429,
      discount: 12,
      rating: 4.8,
      reviewCount: 567,
      servings: 3,
      prepTime: '40 mins',
      difficulty: 'Medium',
      ingredients: ['Chicken', 'Yogurt', 'Spices', 'Cream', 'Tomatoes', 'Ginger-Garlic', 'Garam Masala'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk12',
      name: 'Fish Curry Kit',
      description: 'Coastal style fish curry with coconut and tamarind.',
      price: 329,
      originalPrice: 379,
      discount: 13,
      rating: 4.7,
      reviewCount: 289,
      servings: 3,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Fish', 'Coconut', 'Tamarind', 'Curry Leaves', 'Red Chili', 'Turmeric', 'Fenugreek'],
      image: '',
      cuisine: 'Coastal Indian',
    },
    {
      id: 'mk13',
      name: 'Pav Bhaji Kit',
      description: 'Spiced vegetable curry with buttery pav buns. Mumbai street food!',
      price: 229,
      originalPrice: 269,
      discount: 15,
      rating: 4.8,
      reviewCount: 456,
      servings: 4,
      prepTime: '25 mins',
      difficulty: 'Easy',
      ingredients: ['Mixed Vegetables', 'Pav Bhaji Masala', 'Butter', 'Onions', 'Tomatoes', 'Pav Buns'],
      image: '',
      cuisine: 'Mumbai Street Food',
    },
    {
      id: 'mk14',
      name: 'Masala Dosa Kit',
      description: 'Crispy dosa with spiced potato filling. South Indian breakfast!',
      price: 199,
      originalPrice: 239,
      discount: 17,
      rating: 4.9,
      reviewCount: 523,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Easy',
      ingredients: ['Dosa Batter', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves', 'Coconut Chutney'],
      image: '',
      cuisine: 'South Indian',
    },
    {
      id: 'mk15',
      name: 'Vegetable Biryani Kit',
      description: 'Aromatic basmati rice with mixed vegetables and spices.',
      price: 259,
      originalPrice: 299,
      discount: 13,
      rating: 4.7,
      reviewCount: 389,
      servings: 4,
      prepTime: '35 mins',
      difficulty: 'Medium',
      ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Whole Spices', 'Yogurt', 'Mint', 'Coriander', 'Ghee'],
      image: '',
      cuisine: 'Hyderabadi',
    },
    {
      id: 'mk16',
      name: 'Kadhi Pakora Kit',
      description: 'Yogurt-based curry with crispy fritters. Comfort food!',
      price: 189,
      originalPrice: 219,
      discount: 14,
      rating: 4.6,
      reviewCount: 267,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Yogurt', 'Besan', 'Onions', 'Fenugreek', 'Mustard Seeds', 'Curry Leaves', 'Spices'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk17',
      name: 'Baingan Bharta Kit',
      description: 'Smoky roasted eggplant mash with spices. Rustic and delicious!',
      price: 179,
      originalPrice: 209,
      discount: 14,
      rating: 4.7,
      reviewCount: 345,
      servings: 3,
      prepTime: '35 mins',
      difficulty: 'Medium',
      ingredients: ['Eggplant', 'Onions', 'Tomatoes', 'Green Chili', 'Ginger', 'Garlic', 'Coriander'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk18',
      name: 'Chole Bhature Kit',
      description: 'Spiced chickpeas with fluffy fried bread. Weekend special!',
      price: 219,
      originalPrice: 259,
      discount: 15,
      rating: 4.8,
      reviewCount: 478,
      servings: 4,
      prepTime: '40 mins',
      difficulty: 'Hard',
      ingredients: ['Chickpeas', 'Flour', 'Onions', 'Tomatoes', 'Chole Masala', 'Yogurt', 'Spices'],
      image: '',
      cuisine: 'Punjabi',
    },
    {
      id: 'mk19',
      name: 'Upma Kit',
      description: 'Savory semolina breakfast with vegetables and spices.',
      price: 139,
      originalPrice: 169,
      discount: 18,
      rating: 4.6,
      reviewCount: 312,
      servings: 3,
      prepTime: '15 mins',
      difficulty: 'Easy',
      ingredients: ['Semolina', 'Onions', 'Vegetables', 'Mustard Seeds', 'Curry Leaves', 'Cashews'],
      image: '',
      cuisine: 'South Indian',
    },
    {
      id: 'mk20',
      name: 'Khichdi Kit',
      description: 'Comforting rice and lentil one-pot meal. Perfect for lazy days!',
      price: 149,
      originalPrice: 179,
      discount: 17,
      rating: 4.7,
      reviewCount: 534,
      servings: 4,
      prepTime: '20 mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Moong Dal', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk21',
      name: 'Sabudana Khichdi Kit',
      description: 'Tapioca pearls with peanuts and spices. Fasting special!',
      price: 159,
      originalPrice: 189,
      discount: 16,
      rating: 4.6,
      reviewCount: 234,
      servings: 3,
      prepTime: '20 mins',
      difficulty: 'Easy',
      ingredients: ['Sabudana', 'Peanuts', 'Potatoes', 'Green Chili', 'Cumin', 'Curry Leaves'],
      image: '',
      cuisine: 'Maharashtrian',
    },
    {
      id: 'mk22',
      name: 'Dhokla Kit',
      description: 'Soft steamed gram flour cakes. Healthy Gujarati snack!',
      price: 169,
      originalPrice: 199,
      discount: 15,
      rating: 4.8,
      reviewCount: 445,
      servings: 4,
      prepTime: '25 mins',
      difficulty: 'Medium',
      ingredients: ['Besan', 'Yogurt', 'Eno', 'Mustard Seeds', 'Green Chili', 'Coriander'],
      image: '',
      cuisine: 'Gujarati',
    },
    {
      id: 'mk23',
      name: 'Thali Meal Kit',
      description: 'Complete thali with dal, sabzi, roti, rice, and pickle. Full meal!',
      price: 399,
      originalPrice: 469,
      discount: 15,
      rating: 4.9,
      reviewCount: 623,
      servings: 2,
      prepTime: '45 mins',
      difficulty: 'Hard',
      ingredients: ['Dal', 'Vegetable Curry', 'Roti', 'Rice', 'Pickle', 'Salad', 'Papad'],
      image: '',
      cuisine: 'North Indian',
    },
    {
      id: 'mk24',
      name: 'Korma Vegetable Kit',
      description: 'Mild, creamy vegetable curry with cashews and cream.',
      price: 249,
      originalPrice: 289,
      discount: 14,
      rating: 4.7,
      reviewCount: 367,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Mixed Vegetables', 'Cashews', 'Cream', 'Yogurt', 'Onions', 'Spices', 'Garam Masala'],
      image: '',
      cuisine: 'Mughlai',
    },
    {
      id: 'mk25',
      name: 'Green Smoothie Kit',
      description: 'Healthy blend of spinach, fruits, and superfoods. Breakfast boost!',
      price: 99,
      originalPrice: 129,
      discount: 23,
      rating: 4.5,
      reviewCount: 189,
      servings: 2,
      prepTime: '5 mins',
      difficulty: 'Easy',
      ingredients: ['Spinach', 'Banana', 'Apple', 'Yogurt', 'Honey', 'Chia Seeds'],
      image: '',
      cuisine: 'Healthy',
    },
    {
      id: 'mk26',
      name: 'Hyderabadi Haleem Kit',
      description: 'Rich and creamy slow-cooked meat and lentil stew. Traditional Ramadan special!',
      price: 349,
      originalPrice: 399,
      discount: 12,
      rating: 4.9,
      reviewCount: 678,
      servings: 4,
      prepTime: '45 mins',
      difficulty: 'Hard',
      ingredients: ['Mutton/Chicken', 'Mixed Lentils', 'Wheat', 'Ghee', 'Whole Spices', 'Ginger-Garlic'],
      image: '',
      cuisine: 'Hyderabadi',
    },
    {
      id: 'mk27',
      name: 'Hyderabadi Mirchi Ka Salan Kit',
      description: 'Spicy and tangy curry with green chilies. Perfect biryani accompaniment!',
      price: 179,
      originalPrice: 209,
      discount: 14,
      rating: 4.8,
      reviewCount: 445,
      servings: 4,
      prepTime: '30 mins',
      difficulty: 'Medium',
      ingredients: ['Green Chilies', 'Peanuts', 'Sesame Seeds', 'Tamarind', 'Spices', 'Curry Leaves'],
      image: '',
      cuisine: 'Hyderabadi',
    },
  ];

  // Filter for home page: 3 Hyderabadi + 3 North Indian
  const mealKits = showAll 
    ? allMealKits 
    : [
        ...allMealKits.filter(kit => kit.cuisine === 'Hyderabadi').slice(0, 3),
        ...allMealKits.filter(kit => kit.cuisine === 'North Indian').slice(0, 3)
      ];

  const difficultyColors = {
    Easy: 'bg-[#e8f5e9] text-[#2d5016] border-[#87a96b]',
    Medium: 'bg-[#fff8e1] text-[#8b6f47] border-[#f59e0b]',
    Hard: 'bg-[#ffe0db] text-[#c17767] border-[#d48777]',
  };

  const handleAddToCart = (kit: MealKit) => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image || '/placeholder.svg',
      vendorId: 'meal-kits',
    });
  };

  return (
    <section className="py-20 bg-nature-pattern relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 badge-organic">
            <ChefHat className="w-4 h-4 mr-2 inline" />
            Quick & Healthy Indian Meals
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-organic">
            Meal Kits & Bundles
          </h2>
          <p className="text-xl text-[#5a5a5a] max-w-2xl mx-auto">
            Ready-to-cook Indian meal kits with fresh organic ingredients and authentic recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mealKits.map((kit) => (
            <Card
              key={kit.id}
              className="card-organic group overflow-hidden border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Discount Badge */}
              {kit.discount && (
                <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white">
                  -{kit.discount}%
                </Badge>
              )}

              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#fff8e1] to-[#ffe7cc] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="badge-organic text-xs">
                    <Leaf className="w-3 h-3 mr-1 inline" />
                    Organic
                  </Badge>
                </div>
                {kit.cuisine && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#4a7c59]/90 text-white text-xs">
                      {kit.cuisine}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  <span className="text-sm font-semibold text-[#2d5016]">{kit.rating}</span>
                  <span className="text-xs text-[#8b8b8b]">({kit.reviewCount})</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c59] transition-colors line-clamp-1">
                  {kit.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#5a5a5a] mb-4 line-clamp-2 flex-grow">
                  {kit.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-xs text-[#8b8b8b]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{kit.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{kit.servings} servings</span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="mb-4">
                  <Badge className={`border ${difficultyColors[kit.difficulty]}`}>
                    {kit.difficulty}
                  </Badge>
                </div>

                {/* Ingredients Preview */}
                <div className="mb-4 flex-grow">
                  <p className="text-xs text-[#8b8b8b] mb-2">Includes:</p>
                  <p className="text-xs text-[#5a5a5a] line-clamp-2">
                    {kit.ingredients.slice(0, 3).join(', ')}...
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#4a7c59]">₹{kit.price}</span>
                    {kit.originalPrice && (
                      <span className="text-sm text-[#8b8b8b] line-through">₹{kit.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto">
                  <Button
                    variant="organic"
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddToCart(kit)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button - Only show on home page */}
        {!showAll && (
          <div className="text-center mt-12">
            <Button variant="organic" size="lg" asChild>
              <Link href="/meal-kits">
                View All Meal Kits
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}