'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Repeat, Leaf, ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface SubscriptionProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  image: string;
  category: string;
  description?: string;
  savings?: string;
}

export default function SubscriptionService() {
  const [selectedFrequency, setSelectedFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const { addItem } = useCartStore();
  
  // Indian subscription products
  const subscriptionProducts: SubscriptionProduct[] = [
    {
      id: 'sub1',
      name: 'Fresh Vegetable Box',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      frequency: 'weekly',
      image: '',
      category: 'Vegetables',
      description: 'Weekly box of fresh organic vegetables - Bhindi, Baingan, Tamatar, Aloo, and more',
      savings: 'Save ₹300/month',
    },
    {
      id: 'sub2',
      name: 'Organic Fruit Basket',
      price: 1099,
      originalPrice: 1499,
      discount: 27,
      frequency: 'weekly',
      image: '',
      category: 'Fruits',
      description: 'Assorted seasonal fruits - Mango, Apple, Orange, Banana, and more',
      savings: 'Save ₹400/month',
    },
    {
      id: 'sub3',
      name: 'Dairy Essentials Pack',
      price: 599,
      originalPrice: 799,
      discount: 25,
      frequency: 'weekly',
      image: '',
      category: 'Dairy',
      description: 'Milk, Curd, Paneer, and Ghee - Fresh dairy products weekly',
      savings: 'Save ₹200/month',
    },
    {
      id: 'sub4',
      name: 'Herbs & Spices Set',
      price: 399,
      originalPrice: 549,
      discount: 27,
      frequency: 'biweekly',
      image: '',
      category: 'Spices',
      description: 'Fresh herbs and ground spices - Turmeric, Cumin, Coriander, and more',
      savings: 'Save ₹150/month',
    },
    {
      id: 'sub5',
      name: 'Complete Grocery Box',
      price: 2499,
      originalPrice: 3499,
      discount: 29,
      frequency: 'weekly',
      image: '',
      category: 'Mixed',
      description: 'Everything you need - Vegetables, Fruits, Dairy, Spices, and Bakery items',
      savings: 'Save ₹1000/month',
    },
    {
      id: 'sub6',
      name: 'Basmati Rice Subscription',
      price: 649,
      originalPrice: 899,
      discount: 28,
      frequency: 'monthly',
      image: '',
      category: 'Grains',
      description: 'Premium Dehradun basmati rice delivered monthly',
      savings: 'Save ₹250/month',
    },
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', icon: '📅' },
    { value: 'biweekly', label: 'Bi-weekly', icon: '📆' },
    { value: 'monthly', label: 'Monthly', icon: '🗓️' },
  ];

  const filteredProducts = subscriptionProducts.filter(
    product => product.frequency === selectedFrequency
  );

  const handleSubscribe = (product: SubscriptionProduct) => {
    // In a real app, this would handle subscription logic
    console.log('Subscribing to:', product.name, 'Frequency:', product.frequency);
    // For now, add to cart as a one-time purchase
    addItem({
      id: product.id,
      name: product.name + ` (${product.frequency} subscription)`,
      price: product.price,
      image: product.image || '/placeholder.svg',
      vendorId: 'subscription-service',
    });
  };

  return (
    <section className="py-20 bg-nature-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#87a96b]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8b6f47]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 badge-organic">
            <Repeat className="w-4 h-4 mr-2 inline" />
            Save with Subscriptions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-organic">
            Subscribe & Save
          </h2>
          <p className="text-xl text-[#5a5a5a] max-w-2xl mx-auto">
            Get your favorite organic products delivered regularly with exclusive discounts
          </p>
        </div>

        {/* Frequency Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#d4c4a8]/30">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedFrequency === option.value
                    ? 'bg-gradient-to-r from-[#4a7c59] to-[#5a9d6e] text-white shadow-lg'
                    : 'text-[#5a5a5a] hover:text-[#2d5016] hover:bg-[#f5f1e8]'
                }`}
                onClick={() => setSelectedFrequency(option.value as 'weekly' | 'biweekly' | 'monthly')}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#5a5a5a] text-lg">No subscriptions available for {frequencyOptions.find(o => o.value === selectedFrequency)?.label.toLowerCase()} delivery</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="card-organic group overflow-hidden border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white">
                    Save {product.discount}%
                  </Badge>
                )}

                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="badge-organic text-xs">
                      <Leaf className="w-3 h-3 mr-1 inline" />
                      Organic
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#4a7c59]/90 text-white text-xs">
                      <Repeat className="w-3 h-3 mr-1 inline" />
                      {frequencyOptions.find(o => o.value === product.frequency)?.label}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category */}
                  <p className="text-xs text-[#8b8b8b] mb-2 uppercase tracking-wide">{product.category}</p>
                  
                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c59] transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p className="text-sm text-[#5a5a5a] mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Savings */}
                  {product.savings && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-[#e8f5e9] rounded-lg">
                      <CheckCircle className="w-4 h-4 text-[#4a7c59] flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#2d5016]">{product.savings}</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#4a7c59]">₹{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-[#8b8b8b] line-through">₹{product.originalPrice}</span>
                          <span className="text-sm text-[#c17767] font-semibold">/{frequencyOptions.find(o => o.value === product.frequency)?.label.toLowerCase()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <Button
                    variant="organic"
                    className="w-full"
                    size="lg"
                    onClick={() => handleSubscribe(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Subscribe Now
                  </Button>

                  {/* Features */}
                  <div className="mt-4 pt-4 border-t border-[#d4c4a8]/30">
                    <ul className="space-y-2 text-xs text-[#5a5a5a]">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#4a7c59]" />
                        <span>Auto-delivery every {frequencyOptions.find(o => o.value === product.frequency)?.label.toLowerCase()}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#4a7c59]" />
                        <span>Cancel anytime</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#4a7c59]" />
                        <span>Free delivery</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#d4c4a8]/30 shadow-lg">
          <h3 className="text-2xl font-bold text-[#2d5016] mb-6 text-center">Why Subscribe?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className="font-semibold text-[#2d5016] mb-2">Save Up to 30%</h4>
              <p className="text-sm text-[#5a5a5a]">Exclusive discounts on all subscription boxes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fff8e1] to-[#ffe7cc] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h4 className="font-semibold text-[#2d5016] mb-2">Free Delivery</h4>
              <p className="text-sm text-[#5a5a5a]">No delivery charges on subscription orders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h4 className="font-semibold text-[#2d5016] mb-2">Flexible & Cancel Anytime</h4>
              <p className="text-sm text-[#5a5a5a]">Pause, modify, or cancel your subscription anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}