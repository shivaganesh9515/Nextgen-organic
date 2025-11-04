'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        // setProducts(data.data);
        
        // Mock data for now
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Organic Apples',
            price: 2.99,
            discountedPrice: 2.69,
            discount: 10,
            category: 'Fruits',
            rating: 4.8,
            reviewCount: 24,
            image: '/placeholder.svg',
          },
          {
            id: '2',
            name: 'Whole Grain Bread',
            price: 3.49,
            discountedPrice: 3.49,
            discount: 0,
            category: 'Bakery',
            rating: 4.6,
            reviewCount: 18,
            image: '/placeholder.svg',
          },
          {
            id: '3',
            name: 'Free Range Eggs',
            price: 4.99,
            discountedPrice: 4.99,
            discount: 0,
            category: 'Dairy',
            rating: 4.9,
            reviewCount: 32,
            image: '/placeholder.svg',
          },
          {
            id: '4',
            name: 'Greek Yogurt',
            price: 1.99,
            discountedPrice: 1.79,
            discount: 10,
            category: 'Dairy',
            rating: 4.7,
            reviewCount: 15,
            image: '/placeholder.svg',
          },
          {
            id: '5',
            name: 'Fresh Spinach',
            price: 2.49,
            discountedPrice: 2.49,
            discount: 0,
            category: 'Vegetables',
            rating: 4.5,
            reviewCount: 12,
            image: '/placeholder.svg',
          },
          {
            id: '6',
            name: 'Organic Bananas',
            price: 1.99,
            discountedPrice: 1.79,
            discount: 10,
            category: 'Fruits',
            rating: 4.6,
            reviewCount: 20,
            image: '/placeholder.svg',
          },
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.image,
      vendorId: 'vendor1',
    });
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.discountedPrice - b.discountedPrice;
      if (sortOption === 'price-high') return b.discountedPrice - a.discountedPrice;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // Default sort by popularity
    });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
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
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                <CardDescription className="mt-2">{product.category}</CardDescription>
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
                <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}