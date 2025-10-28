'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingCart, Share2, Package, Truck, Shield } from 'lucide-react';
import { products } from '../../../lib/data/products';
import { Product } from '../../../lib/types';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';
import { Button } from '../../../components/ui/Button';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import { ReviewCard } from '../../../components/common/ReviewCard';
import { Rating } from '../../../components/common/Rating';
import { toast } from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you{`'`}re looking for doesn{`'`}t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
    // Simulate a slight delay to show the loading state
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  const discountedPrice = product.originalPrice 
    ? product.originalPrice - (product.originalPrice * (product.discount || 0) / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/shop?category=${product.category}` },
          { label: product.name },
        ]} 
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 bg-gray-100 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary-600' : 'border-transparent'}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-1 text-gray-500">{product.vendor.name}</p>
            </div>
            
            <button
              onClick={handleToggleWishlist}
              className="p-2 text-gray-400 hover:text-red-500"
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </button>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="mt-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">
                ₹{discountedPrice.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through ml-4">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="ml-4 badge badge-danger">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="mt-1 text-sm text-green-600">
                You save ₹{(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Unit/Weight */}
          <div className="mt-4 text-gray-600">
            {product.unit} {product.weight && `(${product.weight})`}
          </div>
          
          {/* Description */}
          <p className="mt-6 text-gray-700">{product.description}</p>
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Nutrition Facts</h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Calories</span>
                  <span className="font-medium">{product.nutritionInfo.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-medium">{product.nutritionInfo.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbs</span>
                  <span className="font-medium">{product.nutritionInfo.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fat</span>
                  <span className="font-medium">{product.nutritionInfo.fat}g</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Add to Cart */}
          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </Button>
              
              <button
                className="p-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Info Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-primary-600 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Description
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Reviews ({product.reviewCount})
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Shipping
            </button>
          </nav>
        </div>
        
        <div className="py-8">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
            
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900">Ingredients</h4>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600">{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <Button variant="outline">Write a Review</Button>
        </div>
        
        <div className="space-y-6">
          {/* Review Summary */}
          <div className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                <div className="ml-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Rating value={Math.floor(product.rating)} readonly />
              </div>
            </div>
          </div>
          
          {/* Individual Reviews */}
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Shipping Info */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="font-medium text-gray-900">Free Delivery</h3>
          <p className="mt-2 text-sm text-gray-600">
            On orders over ₹500
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Truck className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="font-medium text-gray-900">Fast Delivery</h3>
          <p className="mt-2 text-sm text-gray-600">
            Within 24-48 hours
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="font-medium text-gray-900">Secure Payment</h3>
          <p className="mt-2 text-sm text-gray-600">
            100% secure payment
          </p>
        </div>
      </div>
    </div>
  );
}