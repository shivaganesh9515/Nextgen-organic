import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function OrganicCategories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: 'fresh-vegetables',
      name: 'Fresh Vegetables',
      icon: '🥬',
      slug: 'fresh-vegetables',
      color: 'from-[#4a7c59] to-[#87a96b]',
      bgColor: 'bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]',
      count: 156,
      trending: true,
    },
    {
      id: 'organic-fruits',
      name: 'Organic Fruits',
      icon: '🍎',
      slug: 'organic-fruits',
      color: 'from-[#c17767] to-[#d48777]',
      bgColor: 'bg-gradient-to-br from-[#ffe0db] to-[#ffd4cc]',
      count: 124,
      trending: true,
    },
    {
      id: 'dairy-products',
      name: 'Dairy Products',
      icon: '🥛',
      slug: 'dairy-products',
      color: 'from-[#5a9d6e] to-[#6ab882]',
      bgColor: 'bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb]',
      count: 89,
      trending: false,
    },
    {
      id: 'fresh-herbs',
      name: 'Fresh Herbs',
      icon: '🌿',
      slug: 'fresh-herbs',
      color: 'from-[#87a96b] to-[#9bc280]',
      bgColor: 'bg-gradient-to-br from-[#f1f8e9] to-[#dcedc8]',
      count: 45,
      trending: false,
    },
    {
      id: 'bakery-items',
      name: 'Bakery Items',
      icon: '🍞',
      slug: 'bakery-items',
      color: 'from-[#8b6f47] to-[#a68b5b]',
      bgColor: 'bg-gradient-to-br from-[#fff8e1] to-[#ffecb3]',
      count: 67,
      trending: false,
    },
    {
      id: 'spices-oils',
      name: 'Spices & Oils',
      icon: '🌶️',
      slug: 'spices-oils',
      color: 'from-[#f59e0b] to-[#fbbf24]',
      bgColor: 'bg-gradient-to-br from-[#fffbf0] to-[#ffe7cc]',
      count: 92,
      trending: true,
    },
  ];

  return (
    <div className="py-20 bg-nature-pattern relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient-organic">
            Browse by Category
          </h2>
          <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
            Explore our wide range of organic products organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="card-organic group cursor-pointer border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-full">
                <CardHeader className="p-6 pb-4 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center text-4xl border-2 border-[#d4c4a8]/30 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    {category.trending && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c59] transition-colors">
                    {category.name}
                  </CardTitle>
                  <p className="text-[#8b8b8b] text-sm">{category.count} products available</p>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#f5f1e8] hover:border-[#4a7c59] hover:text-[#4a7c59] group-hover:translate-x-1 transition-all"
                    asChild
                  >
                    <div className="flex items-center justify-center">
                      Browse Products
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="organic" size="lg" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}