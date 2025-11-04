'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  ShoppingCart, 
  X, 
  ArrowRight,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      originalPrice: 3.99,
      image: '/placeholder.svg',
      rating: 4.8,
      vendor: 'Fresh Farms',
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      price: 3.49,
      originalPrice: 4.49,
      image: '/placeholder.svg',
      rating: 4.6,
      vendor: 'Bakery Delight',
    },
    {
      id: 3,
      name: 'Free Range Eggs',
      price: 4.99,
      originalPrice: 5.99,
      image: '/placeholder.svg',
      rating: 4.9,
      vendor: 'Happy Hens',
    },
  ];

  const handleRemoveItem = (id: number) => {
    // In a real app, this would remove the item from the wishlist
    alert(`Removed item ${id} from wishlist`);
  };

  const handleAddToCart = (id: number, name: string) => {
    // In a real app, this would add the item to the cart
    alert(`Added ${name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-gray-600 mb-8">Save items you love for later</p>

        {wishlistItems.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist
              </p>
              <Button asChild>
                <Link href="/shop">
                  Start Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Save ₹{(item.originalPrice! - item.price).toFixed(2)}
                  </div>
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{item.rating}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.vendor}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-green-600">₹{item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAddToCart(item.id, item.name)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/shop">
                Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}