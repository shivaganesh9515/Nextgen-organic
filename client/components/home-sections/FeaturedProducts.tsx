'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function FeaturedProducts() {
  const { addItem } = useCartStore();

  // Indian featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Aam (Mango)',
      price: 250,
      originalPrice: 299,
      discount: 16,
      image: '',
      description: 'Premium Alphonso mangoes from Ratnagiri, Maharashtra',
      rating: 4.9,
      reviewCount: 892,
      unit: '1kg',
      vendor: 'Nature\'s Best',
    },
    {
      id: 2,
      name: 'Desi Ghee',
      price: 800,
      originalPrice: 850,
      discount: 6,
      image: '',
      description: 'Pure cow ghee, traditional bilona method',
      rating: 4.9,
      reviewCount: 1245,
      unit: '500g',
      vendor: 'Farm Fresh Direct',
    },
    {
      id: 3,
      name: 'Organic Basmati Rice',
      price: 220,
      originalPrice: 250,
      discount: 12,
      image: '',
      description: 'Premium Dehradun basmati, aged 1 year',
      rating: 4.8,
      reviewCount: 567,
      unit: '1kg',
      vendor: 'Organic Harvest',
    },
    {
      id: 4,
      name: 'Fresh Palak (Spinach)',
      price: 40,
      originalPrice: 45,
      discount: 11,
      image: '',
      description: 'Organic spinach, freshly harvested',
      rating: 4.7,
      reviewCount: 445,
      unit: '500g',
      vendor: 'Green Valley Farm',
    },
    {
      id: 5,
      name: 'Turmeric Powder (Haldi)',
      price: 110,
      originalPrice: 120,
      discount: 8,
      image: '',
      description: 'Pure organic turmeric, Erode sourced',
      rating: 4.9,
      reviewCount: 1023,
      unit: '250g',
      vendor: 'Nature\'s Best',
    },
    {
      id: 6,
      name: 'Organic Paneer',
      price: 250,
      originalPrice: 280,
      discount: 11,
      image: '',
      description: 'Fresh homemade paneer, made daily',
      rating: 4.8,
      reviewCount: 634,
      unit: '500g',
      vendor: 'Farm Fresh Direct',
    },
    {
      id: 7,
      name: 'Sarson Ka Tel (Mustard Oil)',
      price: 165,
      originalPrice: 180,
      discount: 8,
      image: '',
      description: 'Cold-pressed mustard oil, Kachhi Ghani',
      rating: 4.7,
      reviewCount: 723,
      unit: '1 liter',
      vendor: 'Organic Harvest',
    },
    {
      id: 8,
      name: 'Organic Full Cream Milk',
      price: 60,
      originalPrice: 65,
      discount: 8,
      image: '',
      description: 'Farm fresh organic milk, daily delivery',
      rating: 4.8,
      reviewCount: 1456,
      unit: '1 liter',
      vendor: 'Green Valley Farm',
    },
  ];

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || '/placeholder.svg',
      vendorId: product.vendor || 'vendor1',
    });
  };

  return (
    <section className="py-20 bg-nature-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#87a96b]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8b6f47]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient-organic">
              Featured Organic Products
            </h2>
            <p className="text-[#5a5a5a] text-lg">Handpicked natural goodness from trusted Indian farms</p>
          </div>
          <Button 
            variant="organic" 
            size="lg"
            className="mt-4 md:mt-0"
            asChild
          >
            <Link href="/products">
              <Leaf className="w-5 h-5 mr-2" />
              View All Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden card-organic border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Discount Badge */}
              {product.discount && (
                <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white animate-gentle-pulse">
                  -{product.discount}%
                </Badge>
              )}

              {/* Wishlist Button */}
              <button
                className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-[#e8f5e9] transition-all opacity-0 group-hover:opacity-100 border border-[#d4c4a8]/30"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5 text-[#4a7c59] hover:text-[#c17767]" />
              </button>

              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                {/* Organic Badge */}
                <div className="absolute bottom-2 left-2">
                  <Badge className="badge-organic text-xs">
                    <Leaf className="w-3 h-3 mr-1 inline" />
                    Organic
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  <span className="text-sm font-semibold text-[#2d5016]">{product.rating}</span>
                  <span className="text-xs text-[#8b8b8b]">({product.reviewCount})</span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c59] transition-colors line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#5a5a5a] mb-3 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                {/* Unit */}
                <p className="text-xs text-[#8b8b8b] mb-3">{product.unit}</p>

                {/* Vendor */}
                <p className="text-xs text-[#5a5a5a] mb-4">by {product.vendor}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#4a7c59]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#8b8b8b] line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="organic"
                    className="flex-1"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}