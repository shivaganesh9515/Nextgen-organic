'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function CategoryPage() {
  const { slug } = useParams();
  const [sortOption, setSortOption] = useState('popular');
  
  // Mock data for products in this category
  const products = [
    {
      id: '1',
      name: 'Organic Apples',
      price: 2.99,
      discountedPrice: 2.69,
      discount: 10,
      rating: 4.8,
      reviewCount: 24,
      image: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Fresh Oranges',
      price: 3.49,
      discountedPrice: 3.49,
      discount: 0,
      rating: 4.6,
      reviewCount: 18,
      image: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Bananas',
      price: 1.99,
      discountedPrice: 1.79,
      discount: 10,
      rating: 4.7,
      reviewCount: 32,
      image: '/placeholder.svg',
    },
    {
      id: '4',
      name: 'Grapes',
      price: 4.99,
      discountedPrice: 4.99,
      discount: 0,
      rating: 4.9,
      reviewCount: 15,
      image: '/placeholder.svg',
    },
    {
      id: '5',
      name: 'Strawberries',
      price: 3.99,
      discountedPrice: 3.99,
      discount: 0,
      rating: 4.8,
      reviewCount: 20,
      image: '/placeholder.svg',
    },
    {
      id: '6',
      name: 'Blueberries',
      price: 4.49,
      discountedPrice: 3.99,
      discount: 11,
      rating: 4.7,
      reviewCount: 17,
      image: '/placeholder.svg',
    },
  ];

  // Mock category name based on slug
  const categoryName = slug ? (slug as string).replace(/-/g, ' ') : 'Fruits';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize">{categoryName}</h1>
        <p className="text-gray-600">
          {products.length} products found in this category
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <span className="mr-2">Filter:</span>
          <Input 
            placeholder="Search in category..." 
            className="w-48" 
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{product.name}</CardTitle>
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
                <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-lg font-bold">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.price.toFixed(2)}
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
  );
}