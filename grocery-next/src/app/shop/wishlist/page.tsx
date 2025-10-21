'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { products } from '../../../lib/data/products';
import { Product } from '../../../lib/types';
import { useWishlist } from '../../../hooks/useWishlist';
import { useCart } from '../../../hooks/useCart';
import { ProductGrid } from '../../../components/shop/ProductGrid';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call to get wishlist products
    const wishlistProducts = products.filter(product => 
      wishlistItems.includes(product.id)
    );
    setWishlistProducts(wishlistProducts);
  }, [wishlistItems]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Your wishlist is empty"
          description="Start adding products to your wishlist"
          actionText="Continue Shopping"
          actionHref="/shop"
          icon={<Heart className="h-12 w-12 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist ({wishlistItems.length})
        </h1>
        <Button variant="outline" onClick={() => wishlistItems.forEach(id => removeFromWishlist(id))}>
          Clear Wishlist
        </Button>
      </div>
      
      <ProductGrid products={wishlistProducts} />
      
      <div className="mt-8 text-center">
        <Button>
          <Link href="/shop" className="block w-full">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}