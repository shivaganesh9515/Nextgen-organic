'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Package, Truck, Shield, CheckCircle, Users, DollarSign } from 'lucide-react';
import { products } from '../lib/data/products';
import { categories } from '../lib/data/categories';
import { vendors } from '../lib/data/vendors';
import { Product } from '../lib/types';
import { Vendor } from '../lib/types';
import { ProductGrid } from '../components/shop/ProductGrid';
import { CategoryCard } from '../components/common/CategoryCard';
import { VendorGrid } from '../components/vendors/VendorGrid';
import { Carousel } from '../components/common/Carousel';
import { Button } from '../components/ui/Button';
import GlassyButton from '../components/ui/GlassyButton';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topVendors, setTopVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    // Get featured products
    const featured = products.filter(product => product.isFeatured);
    setFeaturedProducts(featured);
    
    // Get top vendors by rating
    const top = [...vendors]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setTopVendors(top);
  }, []);

  // Hero carousel items
  const heroItems = [
    {
      id: 1,
      title: "Fresh Organic Groceries",
      subtitle: "Delivered to your doorstep",
      description: "Shop from local farmers and producers for the freshest organic produce",
      image: "/images/hero/organic-groceries.jpg",
      ctaText: "Shop Now",
      ctaLink: "/shop",
    },
    {
      id: 2,
      title: "Special Offers This Week",
      subtitle: "Up to 50% off on selected items",
      description: "Don't miss out on our weekly deals and discounts",
      image: "/images/hero/special-offers.jpg",
      ctaText: "View Offers",
      ctaLink: "/offers",
    },
    {
      id: 3,
      title: "Become a Vendor",
      subtitle: "Join our marketplace",
      description: "Reach more customers by selling your products on OrganicNext",
      image: "/images/hero/vendor.jpg",
      ctaText: "Learn More",
      ctaLink: "/vendors/join",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <div className="mb-12 rounded-xl overflow-hidden">
        <Carousel autoPlay interval={7000}>
          {heroItems.map((item) => (
            <div key={item.id} className="relative h-96">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{item.title}</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">{item.subtitle}</h2>
                    <p className="text-lg mb-6">{item.description}</p>
                    <div className="flex gap-4">
                      <Button size="lg">
                        <Link href={item.ctaLink} className="block w-full">
                          {item.ctaText}
                        </Link>
                      </Button>
                      <GlassyButton>
                        Quick Shop 🛒
                      </GlassyButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Categories */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose OrganicNext?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Shopping</h3>
            <p className="text-gray-600">
              Browse and order from thousands of organic products with just a few clicks
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We source only the best organic products from trusted vendors
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your organic groceries delivered fresh and on time, every time
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">
              Multiple payment options with bank-level security
            </p>
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Top Vendors</h2>
          <Link href="/vendors" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <VendorGrid vendors={topVendors} />
      </section>

      {/* Vendor CTA Section */}
      <section className="mb-16 bg-gradient-to-r from-primary-50 to-green-50 rounded-2xl p-8">
        <div className="container mx-auto">
          <div className="row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="vendor-cta-content">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Join Our Marketplace
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Wanna Become a Vendor?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Partner with us to reach thousands of health-conscious customers 
                  looking for authentic organic products. Grow your organic business 
                  and contribute to a healthier planet.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Zero Listing Fees for First 3 Months</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Dedicated Vendor Dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Real-time Sales Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Direct Payments via Razorpay</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Marketing & SEO Support</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="btn-primary text-center py-3 px-6 rounded-lg font-medium"
                  >
                    Contact Us to Get Started
                  </Link>
                  <Link 
                    href="/vendors/join" 
                    className="btn-outline text-center py-3 px-6 rounded-lg font-medium"
                  >
                    Apply as Vendor
                  </Link>
                </div>
                
                <p className="text-gray-500 mt-4">
                  <small>Already a vendor? <Link href="/vendor/signin" className="text-primary-600 hover:underline">Sign in to your dashboard</Link></small>
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="vendor-cta-image relative">
                <img 
                  src="/images/hero/vendor.jpg" 
                  alt="Become a Vendor" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-gray-900">500+</h3>
                    <p className="text-sm text-gray-600">Active Vendors</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-gray-900">50K+</h3>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <CheckCircle className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-gray-900">100%</h3>
                    <p className="text-sm text-gray-600">Organic Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}