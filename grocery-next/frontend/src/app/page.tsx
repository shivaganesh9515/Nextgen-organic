'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Package, Truck, Shield, CheckCircle, Users, DollarSign, Star } from 'lucide-react';
import { products } from '../lib/data/products';
import { categories } from '../lib/data/categories';
import { vendors } from '../lib/data/vendors';
import { reviews } from '../lib/data/reviews';
import { Product } from '../lib/types';
import { Vendor } from '../lib/types';
import { ProductGrid } from '../components/shop/ProductGrid';
import { CategoryCard } from '../components/common/CategoryCard';
import { VendorGrid } from '../components/vendors/VendorGrid';
import { Carousel } from '../components/common/Carousel';
import { Button } from '../components/ui/Button';
import GlassyButton from '../components/ui/GlassyButton';
import { typographyClasses } from '../lib/typography';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topVendors, setTopVendors] = useState<Vendor[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    // Get featured products
    const featured = products.filter(product => product.isFeatured);
    setFeaturedProducts(featured);
    
    // Get top vendors by rating
    const top = [...vendors]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setTopVendors(top);
    
    // Get best sellers (products with highest review count)
    const best = [...products]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 8);
    setBestSellers(best);
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
      <div className="mb-16 rounded-2xl overflow-hidden shadow-xl">
        <Carousel autoPlay interval={7000}>
          {heroItems.map((item) => (
            <div key={item.id} className="relative h-80 sm:h-96 md:h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-2xl text-white text-center md:text-left ml-0 md:ml-12">
                    <span className="inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                      FRESH & ORGANIC
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                      {item.title}
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-6 text-green-300 leading-snug">
                      {item.subtitle}
                    </h2>
                    <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button size="lg" className="text-base font-semibold px-8 py-4 bg-brand-green hover:bg-brand-dark-green transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <Link href={item.ctaLink} className="block w-full">
                          {item.ctaText}
                        </Link>
                      </Button>
                      <GlassyButton className="text-base font-semibold px-8 py-4 backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg">
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

      {/* Social Proof Elements */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">95%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Verified Reviews</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">25+</div>
            <div className="text-gray-600">Trusted Vendors</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${typographyClasses.h2} text-gray-900`}>Shop by Category</h2>
          <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <div className="responsive-grid">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-16 bg-gradient-to-br from-green-50 to-brand-beige rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="inline-block bg-green-500/20 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-2">
              MOST POPULAR
            </span>
            <h2 className={`${typographyClasses.h2} text-gray-900`}>Our Best Sellers</h2>
          </div>
          <Link href="/shop?sort=bestSelling" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
              <div className="relative flex-shrink-0">
                <img 
                  src={product.image || '/images/placeholder-product.jpg'} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between mt-3 mt-auto">
                  <div>
                    <span className="text-lg font-bold text-primary-600">₹{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-brand-green text-white p-2 rounded-full hover:bg-brand-dark-green transition-colors duration-200 shadow-md hover:shadow-lg" aria-label="Add to cart">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${typographyClasses.h2} text-gray-900`}>Featured Products</h2>
          <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Why Choose Us */}
      <section className="mb-20 py-12 bg-gradient-to-r from-green-50 to-brand-beige rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-500/20 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              WHY CHOOSE US
            </span>
            <h2 className={`${typographyClasses.h2} text-gray-900 mb-4`}>Nurtured by Nature, Chosen by Moms</h2>
            <p className={`${typographyClasses.bodyLarge} text-gray-600 max-w-2xl mx-auto`}>
              In a world where wellness begins at the table, making mindful food choices is essential. 
              We bring you thoughtfully curated organic products that preserve high levels of vitamins and minerals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className={`${typographyClasses.h4} mb-2 text-gray-900`}>100% Fresh</h3>
              <p className={`${typographyClasses.body} text-gray-600`}>
                Bringing 100% fresh, pure and indigenous foods, from the farms to your table.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className={`${typographyClasses.h4} mb-2 text-gray-900`}>Wellness with Natural</h3>
              <p className={`${typographyClasses.body} text-gray-600`}>
                Inspiring wellness with natural food that preserves high levels of Vitamins and Minerals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className={`${typographyClasses.h4} mb-2 text-gray-900`}>From Native Seeds</h3>
              <p className={`${typographyClasses.body} text-gray-600`}>
                Supporting the farmer community who use native seeds and avoid preservatives & chemicals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className={`${typographyClasses.h4} mb-2 text-gray-900`}>Packaging with a Purpose</h3>
              <p className={`${typographyClasses.body} text-gray-600`}>
                Promoting sustainable farming and packaging techniques to boost environmental conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16 py-10 bg-white rounded-2xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className={`${typographyClasses.h2} text-gray-900 mb-2`}>Trusted Certifications</h2>
            <p className={`${typographyClasses.body} text-gray-600`}>
              Our products meet the highest standards of quality and safety
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">NPOP</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">National Programme for Organic Production</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">USDA</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">USDA Organic</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">Jaivik</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">Jaivik Bharat</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">ISO</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">ISO 22000</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">FSSAI</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">Food Safety and Standards Authority</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold text-lg">GAP</span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">Good Agricultural Practices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Collections */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="inline-block bg-green-500/20 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-2">
              EXCLUSIVE COLLECTIONS
            </span>
            <h2 className={`${typographyClasses.h2} text-gray-900`}>Shop by Category</h2>
          </div>
          <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="responsive-grid">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                  <div className="inline-flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                    Shop Collection
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="mb-16 bg-gradient-to-br from-green-50 to-brand-beige rounded-2xl p-6 md:p-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-green-500/20 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-2">
            CUSTOMER LOVE
          </span>
          <h2 className={`${typographyClasses.h2} text-gray-900 mb-2`}>What Our Customers Say</h2>
          <p className={`${typographyClasses.bodyLarge} text-gray-600 max-w-2xl mx-auto`}>
            Don&apos;t just take our word for it. Hear from our satisfied customers who have transformed their health with our organic products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{review.comment}&quot;</p>
              <div className="mt-4 flex items-center">
                <span className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                {review.verified && (
                  <span className="ml-2 inline-flex items-center text-xs text-green-600">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/testimonials" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Read More Reviews
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${typographyClasses.h2} text-gray-900`}>Top Vendors</h2>
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
                <h2 className={`${typographyClasses.h2} text-gray-900 mb-4`}>
                  Wanna Become a Vendor?
                </h2>
                <p className={`${typographyClasses.bodyLarge} text-gray-600 mb-6`}>
                  Partner with us to reach thousands of health-conscious customers 
                  looking for authentic organic products. Grow your organic business 
                  and contribute to a healthier planet.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className={typographyClasses.body}>Zero Listing Fees for First 3 Months</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className={typographyClasses.body}>Dedicated Vendor Dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className={typographyClasses.body}>Real-time Sales Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className={typographyClasses.body}>Direct Payments via Razorpay</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className={typographyClasses.body}>Marketing & SEO Support</span>
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
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className={`${typographyClasses.h3} text-gray-900`}>500+</h3>
                    <p className={`${typographyClasses.bodySmall} text-gray-600`}>Active Vendors</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className={`${typographyClasses.h3} text-gray-900`}>50K+</h3>
                    <p className={`${typographyClasses.bodySmall} text-gray-600`}>Happy Customers</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <CheckCircle className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <h3 className={`${typographyClasses.h3} text-gray-900`}>100%</h3>
                    <p className={`${typographyClasses.bodySmall} text-gray-600`}>Organic Certified</p>
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