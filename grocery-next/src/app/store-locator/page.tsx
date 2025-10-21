'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, Plus, Minus } from 'lucide-react';
import { vendors } from '../../lib/data/vendors';
import { Vendor } from '../../lib/types';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { VendorCard } from '../../components/vendors/VendorCard';
import GlassyButton from '../../components/ui/GlassyButton';

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    let result = [...vendors];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(vendor => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query) ||
        vendor.address.toLowerCase().includes(query) ||
        vendor.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    // Sort by proximity if user location is available
    if (userLocation) {
      result.sort((a, b) => {
        // In a real app, we would calculate actual distance
        // For demo purposes, we'll just sort by vendor ID
        return a.id.localeCompare(b.id);
      });
    }
    
    setFilteredVendors(result);
  }, [searchQuery, userLocation]);

  const handleFindNearMe = () => {
    setIsLoadingLocation(true);
    
    // Simulate geolocation API call
    setTimeout(() => {
      // For demo purposes, we'll use a fixed location
      setUserLocation({ lat: 19.0760, lng: 72.8777 }); // Mumbai coordinates
      setIsLoadingLocation(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader 
          title="Store Locator"
          subtitle="Find grocery stores near you"
        />
        
        <div className="mb-8">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search by store name, category, or location..." 
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="lg:w-2/3">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Map View</h2>
                <GlassyButton
                  onClick={handleFindNearMe}
                  disabled={isLoadingLocation}
                  className="flex items-center"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {isLoadingLocation ? 'Locating...' : 'Find Near Me'}
                </GlassyButton>
              </div>
              
              {/* Animated Map Container */}
              <motion.div 
                className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-96 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-200"></div>
                    ))}
                  </div>
                </div>
                
                {/* User Location Marker */}
                {userLocation && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute inset-0"></div>
                      <div className="w-4 h-4 bg-blue-600 rounded-full relative"></div>
                    </div>
                  </motion.div>
                )}
                
                {/* Vendor Pins */}
                {filteredVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    className="absolute group"
                    style={{
                      top: `${20 + (index * 15) % 70}%`,
                      left: `${10 + (index * 20) % 80}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {vendor.name.charAt(0)}
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {vendor.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <button 
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition"
                    aria-label="Zoom in"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                  <button 
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition"
                    aria-label="Zoom out"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Vendor List */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Nearby Stores ({filteredVendors.length})
              </h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor, index) => (
                    <motion.div
                      key={vendor.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VendorCard vendor={vendor} />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No stores found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}