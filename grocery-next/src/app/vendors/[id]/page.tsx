'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { vendors } from '../../../lib/data/vendors';
import { products } from '../../../lib/data/products';
import { Vendor, Product } from '../../../lib/types';
import { VendorProfile } from '../../../components/vendors/VendorProfile';
import { ProductGrid } from '../../../components/shop/ProductGrid';
import { SearchBar } from '../../../components/common/SearchBar';
import { Pagination } from '../../../components/common/Pagination';
import { MapPin, Clock, Phone } from 'lucide-react';
import GlassyButton from '../../../components/ui/GlassyButton';

export default function VendorDetailPage() {
  const params = useParams();
  const vendorId = params.id as string;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 12;

  useEffect(() => {
    // In a real app, this would be API calls
    const foundVendor = vendors.find(v => v.id === vendorId);
    setVendor(foundVendor || null);
    
    if (foundVendor) {
      const productsByVendor = products.filter(p => p.vendor.id === foundVendor.id);
      setVendorProducts(productsByVendor);
      setFilteredProducts(productsByVendor);
    }
  }, [vendorId]);

  useEffect(() => {
    let result = [...vendorProducts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, vendorProducts]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Vendor not found</h1>
          <p className="mt-2 text-gray-600">The vendor you{`'`}re looking for doesn{`'`}t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VendorProfile vendor={vendor} />
      
      {/* Animated Map Section */}
      <motion.div 
        className="card mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Location</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Map Placeholder with Animated Marker */}
            <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="absolute top-0 left-0 w-8 h-8 bg-red-500 rounded-full opacity-30 animate-ping"></div>
              </motion.div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Store Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-gray-600">{vendor.address}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-gray-600">{vendor.phone}</span>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="ml-2 text-gray-600">
                  <div>Opening Hours:</div>
                  <div className="mt-1 text-sm">
                    {vendor.openingHours?.monday || '8:00 AM - 10:00 PM'}
                  </div>
                </div>
              </div>
              
              <GlassyButton className="w-full mt-4">
                Get Directions
              </GlassyButton>
              
              <button className="w-full btn-outline py-2 text-center">
                Call Store
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {vendor.name}{`'`}s Products ({vendorProducts.length})
          </h2>
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search products from this vendor..." 
            initialValue={searchQuery}
          />
        </div>
        
        {filteredProducts.length > 0 ? (
          <>
            <ProductGrid products={paginatedProducts} />
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              This vendor doesn{`'`}t have any products matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}