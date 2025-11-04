'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter,
  Grid,
  List,
  Loader2,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      image: '/placeholder.svg',
      description: 'Fresh organic apples from local farms',
      rating: 4.8,
      reviews: 124,
      category: 'Fruits',
      inStock: true,
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      price: 3.49,
      image: '/placeholder.svg',
      description: 'Freshly baked whole grain bread',
      rating: 4.6,
      reviews: 89,
      category: 'Bakery',
      inStock: true,
    },
    {
      id: 3,
      name: 'Free Range Eggs',
      price: 4.99,
      image: '/placeholder.svg',
      description: 'Farm fresh free range eggs',
      rating: 4.9,
      reviews: 203,
      category: 'Dairy',
      inStock: true,
    },
    {
      id: 4,
      name: 'Organic Spinach',
      price: 3.29,
      image: '/placeholder.svg',
      description: 'Fresh organic spinach leaves',
      rating: 4.7,
      reviews: 96,
      category: 'Vegetables',
      inStock: true,
    },
    {
      id: 5,
      name: 'Greek Yogurt',
      price: 5.49,
      image: '/placeholder.svg',
      description: 'Creamy organic Greek yogurt',
      rating: 4.5,
      reviews: 156,
      category: 'Dairy',
      inStock: true,
    },
    {
      id: 6,
      name: 'Avocados',
      price: 1.99,
      image: '/placeholder.svg',
      description: 'Ripe organic avocados',
      rating: 4.8,
      reviews: 178,
      category: 'Fruits',
      inStock: true,
    },
  ];

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Fruits', count: 24, icon: '🍎' },
    { id: 2, name: 'Vegetables', count: 36, icon: '🥕' },
    { id: 3, name: 'Dairy', count: 18, icon: '🥛' },
    { id: 4, name: 'Bakery', count: 15, icon: '🍞' },
    { id: 5, name: 'Meat', count: 12, icon: '🥩' },
    { id: 6, name: 'Pantry', count: 42, icon: '🥫' },
  ];

  const handleAddToCart = (productId: number, productName: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [productId]: true }));
      setLoading(false);
      
      // Reset button state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => ({ ...prev, [productId]: false }));
      }, 2000);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate search
    setTimeout(() => {
      setLoading(false);
      // Show a simple alert for search results
      alert(`Found results for "${searchQuery}"`);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered</h1>
        <p className="text-xl text-gray-600 mb-8">Quality products from local vendors</p>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <Input 
                type="text" 
                placeholder="Search for products..." 
                className="rounded-r-none pl-10 h-12" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button type="submit" className="rounded-l-none h-12" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </Button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <CardDescription>{category.count} products</CardDescription>
              </CardContent>
              <CardFooter className="justify-center pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/categories/${category.id}`}>
                    Browse {category.name}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-gray-600">Handpicked organic products for you</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg overflow-hidden">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm" 
                className="rounded-r-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm" 
                className="rounded-l-none"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Tabs defaultValue="popular">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="sale">Sale</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <Tabs defaultValue="popular">
          <TabsContent value="popular">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={viewMode === 'list' ? "flex" : ""}
                >
                  <CardHeader className={viewMode === 'list' ? "w-1/3" : ""}>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent className={viewMode === 'list' ? "w-2/3" : ""}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{product.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <CardDescription className="mt-2">{product.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
                    {product.inStock ? (
                      <Badge variant="default" className="mt-2">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                    )}
                  </CardContent>
                  <CardFooter className={`flex ${viewMode === 'list' ? 'flex-col items-start' : 'justify-between'} gap-2`}>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={loading || addedToCart[product.id]}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="new">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={viewMode === 'list' ? "flex" : ""}
                >
                  <CardHeader className={viewMode === 'list' ? "w-1/3" : ""}>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent className={viewMode === 'list' ? "w-2/3" : ""}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{product.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <CardDescription className="mt-2">{product.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
                    {product.inStock ? (
                      <Badge variant="default" className="mt-2">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                    )}
                  </CardContent>
                  <CardFooter className={`flex ${viewMode === 'list' ? 'flex-col items-start' : 'justify-between'} gap-2`}>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={loading || addedToCart[product.id]}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sale">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={viewMode === 'list' ? "flex" : ""}
                >
                  <CardHeader className={viewMode === 'list' ? "w-1/3" : ""}>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  </CardHeader>
                  <CardContent className={viewMode === 'list' ? "w-2/3" : ""}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{product.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <CardDescription className="mt-2">{product.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
                    {product.inStock ? (
                      <Badge variant="default" className="mt-2">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                    )}
                  </CardContent>
                  <CardFooter className={`flex ${viewMode === 'list' ? 'flex-col items-start' : 'justify-between'} gap-2`}>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={loading || addedToCart[product.id]}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button className="w-full" asChild>
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