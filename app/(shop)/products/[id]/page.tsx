'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        // setProduct(data.data);
        
        // Mock data for now
        const mockProduct: Product = {
          id: id as string,
          vendorId: 'vendor1',
          name: 'Organic Apples',
          description: 'Fresh organic apples from local farms. Grown without pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
          price: 2.99,
          discount: 10,
          discountedPrice: 2.69,
          category: 'Fruits',
          images: ['/placeholder.svg'],
          stock: 50,
          status: 'approved',
          rating: 4.8,
          reviewCount: 24,
          sales: 120,
          tags: ['organic', 'fruit', 'healthy'],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        image: product.images[0],
        vendorId: product.vendorId,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-24" />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-gray-500">{product.category}</span>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 fill-current ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-4">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold text-green-600">${product.discountedPrice.toFixed(2)}</span>
                  <span className="ml-4 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-4 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-4 w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                size="lg"
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Category: {product.category}</li>
              <li>Vendor: Local Farm</li>
              <li>Origin: Locally sourced</li>
              <li>Storage: Keep in a cool, dry place</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="p-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">Product {i}</CardTitle>
                <CardDescription>Fresh and healthy</CardDescription>
                <p className="text-lg font-bold mt-2">$2.99</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}