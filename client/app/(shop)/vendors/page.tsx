'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Store, Star, MapPin, Verified, ArrowRight, Users } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
  category: string;
  image?: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchVendors = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock vendor data
      const mockVendors: Vendor[] = [
        {
          id: '1',
          name: 'Green Valley Organic Farm',
          storeName: 'Green Valley Store',
          rating: 4.8,
          reviewCount: 124,
          location: 'Mumbai, Maharashtra',
          verified: true,
          category: 'Farm Fresh',
        },
        {
          id: '2',
          name: 'Nature\'s Best',
          storeName: 'Nature\'s Best Organic',
          rating: 4.6,
          reviewCount: 89,
          location: 'Delhi, NCR',
          verified: true,
          category: 'Organic Products',
        },
        {
          id: '3',
          name: 'Farm Fresh Direct',
          storeName: 'Farm Fresh',
          rating: 4.9,
          reviewCount: 203,
          location: 'Bangalore, Karnataka',
          verified: true,
          category: 'Fresh Produce',
        },
        {
          id: '4',
          name: 'Organic Harvest',
          storeName: 'Organic Harvest Store',
          rating: 4.7,
          reviewCount: 156,
          location: 'Pune, Maharashtra',
          verified: false,
          category: 'Organic Products',
        },
      ];
      
      setVendors(mockVendors);
      setLoading(false);
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(vendor =>
    vendor.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vendors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredVendors.length === 0 && searchQuery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search vendors by name, location, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Card className="shadow-xl text-center py-12">
            <CardContent className="pt-6">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold mb-2">No Vendors Found</CardTitle>
              <CardDescription className="text-lg mb-6">
                We couldn&apos;t find any vendors matching &quot;{searchQuery}&quot;
              </CardDescription>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Our Verified Vendors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover trusted organic vendors committed to providing you with the freshest, highest quality products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search vendors by name, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <Store className="w-8 h-8 text-green-600" />
                  </div>
                  {vendor.verified && (
                    <Badge className="bg-green-100 text-green-700">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{vendor.storeName}</CardTitle>
                <CardDescription className="text-sm">{vendor.name}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-sm text-gray-500">({vendor.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {vendor.location}
                </div>

                <Badge variant="outline" className="text-xs">
                  {vendor.category}
                </Badge>
              </CardContent>

              <CardFooter>
                <Button variant="organic" className="w-full" asChild>
                  <Link href={`/vendors/${vendor.id}`}>
                    View Store
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-xl">
          <CardContent className="py-8 text-center">
            <Store className="w-12 h-12 mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2">Become a Vendor</CardTitle>
            <CardDescription className="text-green-100 mb-6">
              Join our marketplace and start selling your organic products to thousands of customers
            </CardDescription>
            <Button variant="outline" size="lg" className="bg-white text-green-600 hover:bg-green-50" asChild>
              <Link href="/auth/vendor-register">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}