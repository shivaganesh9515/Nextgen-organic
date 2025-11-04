'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CategoriesSection() {
  // Mock data for categories
  const categories = [
    { id: 1, name: 'Fruits', count: 24, image: '/placeholder.svg' },
    { id: 2, name: 'Vegetables', count: 36, image: '/placeholder.svg' },
    { id: 3, name: 'Dairy', count: 18, image: '/placeholder.svg' },
    { id: 4, name: 'Bakery', count: 15, image: '/placeholder.svg' },
    { id: 5, name: 'Meat', count: 12, image: '/placeholder.svg' },
    { id: 6, name: 'Beverages', count: 30, image: '/placeholder.svg' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of organic grocery categories and find exactly what you need for your next meal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="text-center hover:shadow-lg transition-all transform hover:-translate-y-2 border border-border-light rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              </CardHeader>
              <CardContent className="pb-4">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription>{category.count} products</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                  asChild
                >
                  <Link href={`/categories/${category.id}`}>Browse</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary-green to-secondary-green text-white hover:shadow-lg"
            asChild
          >
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}