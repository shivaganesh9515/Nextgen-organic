'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Store, MapPin, CheckCircle, ArrowRight, Leaf } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  productsCount: number;
  location: string;
  specialties: string[];
  sustainabilityBadges: string[];
  image: string;
}

export default function VendorSpotlight() {
  // Indian vendors data
  const featuredVendors: Vendor[] = [
    {
      id: '1',
      name: 'Green Valley Organic Farm',
      description: 'Family-owned farm in Himachal Pradesh specializing in organic vegetables and herbs since 1995. NPOP certified organic.',
      rating: 4.9,
      reviewCount: 1247,
      productsCount: 86,
      location: 'Himachal Pradesh, India',
      specialties: ['Leafy Greens', 'Herbs', 'Root Vegetables'],
      sustainabilityBadges: ['NPOP Certified', 'Carbon Neutral', 'Water Efficient'],
      image: '',
    },
    {
      id: '2',
      name: 'Amul Organic Dairy',
      description: 'Trusted dairy farm producing organic milk, ghee, and paneer. Grass-fed cows and traditional methods.',
      rating: 4.8,
      reviewCount: 892,
      productsCount: 42,
      location: 'Gujarat, India',
      specialties: ['Milk', 'Ghee', 'Paneer'],
      sustainabilityBadges: ['NPOP Certified', 'Animal Welfare', 'Local Producer'],
      image: '',
    },
    {
      id: '3',
      name: 'Dehradun Basmati Farm',
      description: 'Premium organic basmati rice from the foothills of Himalayas. Aged basmati with authentic aroma.',
      rating: 4.9,
      reviewCount: 634,
      productsCount: 28,
      location: 'Uttarakhand, India',
      specialties: ['Basmati Rice', 'Brown Rice', 'Red Rice'],
      sustainabilityBadges: ['Geographical Indication', 'Organic Certified', 'Traditional Methods'],
      image: '',
    },
    {
      id: '4',
      name: 'Kerala Spice Garden',
      description: 'Authentic organic spices from God\'s Own Country. Turmeric, cardamom, black pepper, and more.',
      rating: 4.7,
      reviewCount: 567,
      productsCount: 52,
      location: 'Kerala, India',
      specialties: ['Turmeric', 'Cardamom', 'Black Pepper', 'Cinnamon'],
      sustainabilityBadges: ['Organic Certified', 'Fair Trade', 'Single Origin'],
      image: '',
    },
  ];

  return (
    <section className="py-20 bg-nature-pattern relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient-organic">
            Featured Vendors
          </h2>
          <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
            Trusted organic vendors from across India delivering fresh products to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredVendors.map((vendor) => (
            <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
              <Card className="card-organic group overflow-hidden border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer h-full">
                <div className="md:flex h-full">
                  {/* Vendor Image */}
                  <div className="md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] relative flex items-center justify-center">
                    <div className="text-center">
                      <Store className="w-20 h-20 text-[#4a7c59] mx-auto mb-2" />
                      <Badge className="badge-organic mt-2">
                        <Leaf className="w-3 h-3 mr-1 inline" />
                        Organic Certified
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Vendor Info */}
                  <div className="p-8 md:w-3/5 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-[#2d5016] group-hover:text-[#4a7c59] transition-colors">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center bg-[#e8f5e9] px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24] mr-1" />
                        <span className="font-bold text-[#2d5016]">{vendor.rating}</span>
                        <span className="text-[#5a5a5a] text-sm ml-1">({vendor.reviewCount})</span>
                      </div>
                    </div>
                    
                    <p className="text-[#5a5a5a] mb-4 line-clamp-2 flex-grow">{vendor.description}</p>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 mb-4 text-[#5a5a5a]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>

                    {/* Products Count */}
                    <div className="mb-4">
                      <span className="text-sm text-[#5a5a5a]">
                        <strong className="text-[#2d5016]">{vendor.productsCount}</strong> products available
                      </span>
                    </div>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {vendor.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge 
                          key={index} 
                          className="badge-organic text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {vendor.specialties.length > 3 && (
                        <Badge className="badge-organic text-xs">
                          +{vendor.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Sustainability Badges */}
                    <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                      {vendor.sustainabilityBadges.slice(0, 2).map((badge, index) => (
                        <Badge 
                          key={index} 
                          className="bg-[#f5f1e8] text-[#4a7c59] border border-[#87a96b] text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 inline" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* View Store Button */}
                    <div className="mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#f5f1e8] group-hover:border-[#4a7c59] group-hover:text-[#4a7c59] transition-all"
                      >
                        View Store & Products
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Vendors */}
        <div className="text-center mt-12">
          <Button variant="organic" size="lg" asChild>
            <Link href="/vendors">
              View All Vendors
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}