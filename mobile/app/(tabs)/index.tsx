import { View, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS as MOCK_PRODUCTS, VENDORS as MOCK_VENDORS, Product, Vendor } from '@/constants/mocks';
import { ProductCard } from '@/components/ProductCard';
import { api } from '@/services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* Mock Banners */
const BANNERS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', title: 'Farm Fresh', subtitle: 'Daily harvest deals' },
  { id: 2, image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800', title: '100% Organic', subtitle: 'Pure & certified' },
];

/* Quick Categories - Circular with Images */
const QUICK_CATEGORIES = [
  { id: '1', name: 'Veggies', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=200' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200' },
  { id: '3', name: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200' },
  { id: '4', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200' },
  { id: '5', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200' },
  { id: '6', name: 'Juices', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200' },
];

export default function HomeScreen() {
  const router = useRouter(); 
  const [activeMode, setActiveMode] = useState<'Hub' | 'Farms'>('Hub');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [vendors, setVendors] = useState(MOCK_VENDORS);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts = await api.fetchProducts();
        if (fetchedProducts && fetchedProducts.length > 0) setProducts(fetchedProducts);
        
        const fetchedVendors = await api.fetchVendors();
        if (fetchedVendors && fetchedVendors.length > 0) setVendors(fetchedVendors);
      } catch (e) {
        console.log("Using Mock Data");
      }
    };
    loadData();
  }, []);

  // Filter products for Hub View
  const bestOffers = products.slice(0, 6);
  const trendingProducts = products.slice(6, 12);

  const renderHubView = () => (
    <>
      {/* ============================================ */}
      {/* HERO BANNER */}
      {/* ============================================ */}
      <View className="px-5 mb-8">
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
        >
          {BANNERS.map((banner) => (
            <View 
              key={banner.id} 
              className="relative rounded-3xl overflow-hidden mr-4" 
              style={{ width: SCREEN_WIDTH - 40, height: 200 }}
            >
              <Image source={{ uri: banner.image }} className="w-full h-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <View className="absolute bottom-5 left-5 right-5">
                <ThemedText weight="bold" className="text-2xl text-white mb-1">{banner.title}</ThemedText>
                <ThemedText className="text-white/90 font-medium">{banner.subtitle}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ============================================ */}
      {/* CIRCULAR CATEGORIES */}
      {/* ============================================ */}
      <View className="mb-8">
        <View className="px-5 mb-4 flex-row justify-between items-center">
          <ThemedText weight="bold" className="text-lg text-gray-900">Categories</ThemedText>
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <ThemedText weight="semibold" className="text-sm text-[#2D6A4F]">View All</ThemedText>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        >
          {QUICK_CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              onPress={() => router.push('/categories')}
              className="mr-5 items-center"
            >
              <View 
                className="w-18 h-18 rounded-full mb-2 bg-white p-1 border border-gray-100"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Image source={{ uri: cat.image }} className="w-full h-full rounded-full" />
              </View>
              <ThemedText weight="medium" className="text-xs text-gray-700">{cat.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ============================================ */}
      {/* BEST OFFERS SECTION */}
      {/* ============================================ */}
      <View className="mb-8">
        <View className="px-5 mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ThemedText weight="bold" className="text-xl text-gray-900 mr-2">Best Offers</ThemedText>
            <View className="bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
              <ThemedText className="text-red-500 text-[10px] font-bold">SALE</ThemedText>
            </View>
          </View>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        >
          {bestOffers.map((product: Product) => (
            <ProductCard key={product.id} product={product} horizontal />
          ))}
        </ScrollView>
      </View>

      {/* ============================================ */}
      {/* TRENDING SECTION */}
      {/* ============================================ */}
      <View className="mb-6">
        <View className="px-5 mb-5">
           <ThemedText weight="bold" className="text-xl text-gray-900">Trending Now</ThemedText>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        >
          {trendingProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} horizontal className="mr-4" />
          ))}
        </ScrollView>
      </View>
    </>
  );

  const renderFarmsView = () => (
    <View className="pt-2">
      {vendors.map((vendor: Vendor) => {
         // Filter products for this specific vendor
         // Note: API returns vendorId as string, Mocks might be string. Ensure comparison works.
         const vendorProducts = products.filter((p: Product) => String(p.vendorId) === String(vendor.id)).slice(0, 5);
         
         return (
          <View key={vendor.id} className="bg-white mb-4 pb-4 border-b border-gray-100">
            {/* Vendor Header Card */}
            <View className="px-5 mb-4">
               <View className="relative h-32 rounded-2xl overflow-hidden mb-[-24px] z-0">
                  <Image source={{ uri: vendor.banner }} className="w-full h-full opacity-90" resizeMode="cover" />
                  <View className="absolute inset-0 bg-black/20" />
               </View>
               
               <View className="flex-row justify-between items-end pl-2 pr-1 z-10">
                   {/* Logo & Info */}
                   <View className="flex-row items-end">
                      <Image 
                        source={{ uri: vendor.image }} 
                        className="w-16 h-16 rounded-2xl border-4 border-white bg-gray-100" 
                      />
                      <View className="ml-3 mb-1">
                          <ThemedText weight="bold" className="text-lg text-gray-900 leading-6">{vendor.name}</ThemedText>
                          <View className="flex-row items-center">
                              <Ionicons name="location-sharp" size={12} color="#6B7280" />
                              <ThemedText className="text-xs text-gray-500 ml-0.5 mr-2">{vendor.location}</ThemedText>
                              <Ionicons name="star" size={12} color="#F59E0B" />
                              <ThemedText className="text-xs text-gray-700 ml-0.5 font-bold">{vendor.rating}</ThemedText>
                          </View>
                      </View>
                   </View>

                   {/* CTA */}
                   <TouchableOpacity 
                      onPress={() => router.push(`/vendor/${vendor.id}`)}
                      className="bg-[#2D6A4F] px-4 py-2 rounded-xl mb-1 shadow-sm shadow-emerald-700/20"
                   >
                     <ThemedText weight="bold" className="text-white text-xs">Visit Farm</ThemedText>
                   </TouchableOpacity>
               </View>
            </View>
            
            {/* Horizontal Product Scroll */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              className="mt-2"
            >
              {vendorProducts.map((product: Product) => (
                <View key={product.id} className="mr-3 w-28">
                    <View className="h-28 w-28 rounded-xl bg-gray-50 mb-2 overflow-hidden border border-gray-100">
                        <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
                    </View>
                    <ThemedText numberOfLines={1} weight="medium" className="text-xs text-gray-800">{product.name}</ThemedText>
                    <ThemedText weight="bold" className="text-xs text-[#2D6A4F]">₹{product.price}</ThemedText>
                </View>
              ))}
            </ScrollView>
          </View>
         );
      })}
    </View>
  );

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // Sticky Header for toggle
      >
        
        {/* ============================================ */}
        {/* TOP BAR */}
        {/* ============================================ */}
        <View className="px-5 pt-3 pb-4 bg-[#FAFAFA]">
          <View className="flex-row justify-between items-center">
            {/* Location */}
            <TouchableOpacity 
              onPress={() => router.push('/location')}
              className="flex-row items-center flex-1"
            >
              <View className="w-10 h-10 bg-white border border-gray-100 rounded-full items-center justify-center mr-3 shadow-sm">
                <Ionicons name="location" size={20} color="#2D6A4F" />
              </View>
              <View>
                <ThemedText className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Deliver to</ThemedText>
                <View className="flex-row items-center">
                  <ThemedText weight="bold" className="text-sm text-gray-900 mr-1">Times Square, NYC</ThemedText>
                  <Ionicons name="chevron-down" size={14} color="#2D6A4F" />
                </View>
              </View>
            </TouchableOpacity>
            
            {/* Right Actions */}
            <View className="flex-row items-center gap-3">
              <TouchableOpacity onPress={() => router.push('/search')} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm">
                <Ionicons name="search" size={20} color="#2D6A4F" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/notifications')} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm">
                <Ionicons name="notifications-outline" size={20} color="#2D6A4F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ============================================ */}
        {/* STICKY TOGGLE - Hub vs Farms */}
        {/* ============================================ */}
        <View className="px-5 pb-4 bg-[#FAFAFA] z-50">
          <View className="flex-row bg-white p-1 rounded-full border border-gray-100 shadow-sm">
            <TouchableOpacity 
              onPress={() => setActiveMode('Hub')}
              className={`flex-1 py-2.5 rounded-full items-center flex-row justify-center gap-2 ${activeMode === 'Hub' ? 'bg-[#2D6A4F]' : ''}`}
            >
               <Ionicons name="storefront" size={16} color={activeMode === 'Hub' ? 'white' : '#6B7280'} />
               <ThemedText weight="bold" className={activeMode === 'Hub' ? 'text-white' : 'text-gray-500'}>Hub Store</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveMode('Farms')}
              className={`flex-1 py-2.5 rounded-full items-center flex-row justify-center gap-2 ${activeMode === 'Farms' ? 'bg-[#2D6A4F]' : ''}`}
            >
               <Ionicons name="leaf" size={16} color={activeMode === 'Farms' ? 'white' : '#6B7280'} />
               <ThemedText weight="bold" className={activeMode === 'Farms' ? 'text-white' : 'text-gray-500'}>Farms</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================================ */}
        {/* CONTENT AREA */}
        {/* ============================================ */}
        <View>
           {activeMode === 'Hub' ? renderHubView() : renderFarmsView()}
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}
