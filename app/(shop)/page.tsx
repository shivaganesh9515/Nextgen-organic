'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function ShopPage() {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      image: '/placeholder.svg',
      description: 'Fresh organic apples from local farms',
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      price: 3.49,
      image: '/placeholder.svg',
      description: 'Freshly baked whole grain bread',
    },
    {
      id: 3,
      name: 'Free Range Eggs',
      price: 4.99,
      image: '/placeholder.svg',
      description: 'Farm fresh free range eggs',
    },
  ];

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Fruits', count: 24 },
    { id: 2, name: 'Vegetables', count: 36 },
    { id: 3, name: 'Dairy', count: 18 },
    { id: 4, name: 'Bakery', count: 15 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered</h1>
        <p className="text-xl text-gray-600 mb-8">Quality products from local vendors</p>
        <div className="max-w-md mx-auto">
          <div className="flex">
            <Input 
              type="text" 
              placeholder="Search for products..." 
              className="rounded-r-none" 
            />
            <Button className="rounded-l-none">Search</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="text-center">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.count} products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Link href={`/categories/${category.id}`}>Browse</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Tabs defaultValue="popular">
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Tabs defaultValue="popular">
          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add to Cart</Button>
                    <Button>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add to Cart</Button>
                    <Button>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sale">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add to Cart</Button>
                    <Button>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}