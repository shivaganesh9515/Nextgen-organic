'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CategoriesPage() {
  // Mock data for categories
  const categories = [
    { id: 1, name: 'Fruits', count: 24, image: '/placeholder.svg' },
    { id: 2, name: 'Vegetables', count: 36, image: '/placeholder.svg' },
    { id: 3, name: 'Dairy', count: 18, image: '/placeholder.svg' },
    { id: 4, name: 'Bakery', count: 15, image: '/placeholder.svg' },
    { id: 5, name: 'Meat', count: 12, image: '/placeholder.svg' },
    { id: 6, name: 'Beverages', count: 30, image: '/placeholder.svg' },
    { id: 7, name: 'Snacks', count: 42, image: '/placeholder.svg' },
    { id: 8, name: 'Frozen Foods', count: 28, image: '/placeholder.svg' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <p className="text-gray-600 mb-8">
        Browse our wide selection of grocery categories and find exactly what you need.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto" />
            </CardHeader>
            <CardContent className="pb-4">
              <CardTitle className="text-xl">{category.name}</CardTitle>
              <CardDescription>{category.count} products</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/categories/${category.id}`}>Browse</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}