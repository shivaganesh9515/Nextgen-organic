'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FeaturedProducts() {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      originalPrice: 3.99,
      discount: 25,
      image: '/placeholder.svg',
      description: 'Fresh organic apples from local farms',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      price: 3.49,
      image: '/placeholder.svg',
      description: 'Freshly baked whole grain bread',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Free Range Eggs',
      price: 4.99,
      originalPrice: 5.99,
      discount: 17,
      image: '/placeholder.svg',
      description: 'Farm fresh free range eggs',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Greek Yogurt',
      price: 1.99,
      image: '/placeholder.svg',
      description: 'Creamy Greek yogurt, 100% natural',
      rating: 4.7,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="mt-2">{product.description}</CardDescription>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm">
                  Add to Cart
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}