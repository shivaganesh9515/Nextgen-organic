import { View, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { CATEGORIES, PRODUCTS, VENDORS } from '@/constants/mocks';
import { ProductCard } from '@/components/ProductCard';

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
  const [activeType, setActiveType] = useState<'Eco-friendly' | 'Natural' | 'Organic'>('Organic');

  // Filter products based on active toggle (Mock logic)
  const getFilteredProducts = () => {
    switch (activeType) {
      case 'Eco-friendly':
        return PRODUCTS.slice(2, 6); // Simulate different products
      case 'Natural':
        return [...PRODUCTS].reverse().slice(0, 4);
      case 'Organic':
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const bestOffers = getFilteredProducts();
  
  // Farm products remain consistent for now, or could also be filtered
  const farm1Products = PRODUCTS.filter(p => p.vendorId === 'v1');
  const farm2Products = PRODUCTS.filter(p => p.vendorId === 'v2');

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <View className="px-5 pt-3 pb-4">
          <View className="flex-row justify-between items-center">
            {/* Location */}
            <TouchableOpacity 
              onPress={() => router.push('/location')}
              className="flex-row items-center flex-1"
            >
              <View className="w-11 h-11 bg-emerald-50 rounded-full items-center justify-center mr-3">
                <Ionicons name="location" size={22} color="#2D6A4F" />
              </View>
              <View>
                <View className="flex-row items-center">
                  <ThemedText weight="bold" className="text-lg text-gray-900 mr-1">New York</ThemedText>
                  <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </View>
                <ThemedText className="text-xs text-gray-500">Times Square, NYC</ThemedText>
              </View>
            </TouchableOpacity>
            
            {/* Right Actions: Search + Profile */}
            <View className="flex-row items-center gap-3">
              {/* Search Button */}
              <TouchableOpacity 
                onPress={() => router.push('/search')} 
                className="w-11 h-11 bg-white rounded-full items-center justify-center border border-gray-100"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons name="search" size={20} color="#2D6A4F" />
              </TouchableOpacity>

              {/* Notification Button */}
              <TouchableOpacity 
                onPress={() => router.push('/notifications')} 
                className="w-11 h-11 bg-white rounded-full items-center justify-center border border-gray-100"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons name="notifications-outline" size={20} color="#2D6A4F" />
              </TouchableOpacity>
              
              {/* Profile */}
              <TouchableOpacity 
                onPress={() => router.navigate('profile')} 
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md"
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }} 
                  className="w-full h-full" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>





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
                style={{ width: SCREEN_WIDTH - 50, height: 220 }}
              >
                <Image source={{ uri: banner.image }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <View className="absolute bottom-5 left-5 right-5">
                  <ThemedText weight="bold" className="text-2xl text-white mb-1">{banner.title}</ThemedText>
                  <ThemedText className="text-white/80">{banner.subtitle}</ThemedText>
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
            <ThemedText weight="bold" className="text-lg text-gray-900">What's on your mind?</ThemedText>
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
                  className="w-20 h-20 rounded-full mb-2 bg-white p-1 border border-gray-100"
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
                <ThemedText weight="semibold" className="text-xs text-gray-700">{cat.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ============================================ */}
        {/* TYPE TOGGLE - Pill Shaped */}
        {/* ============================================ */}
        <View className="px-5 mb-8">
          <View 
            className="flex-row bg-white p-1.5 rounded-full border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {['Eco-friendly', 'Natural', 'Organic'].map((type) => {
              const isActive = activeType === type;
              return (
                <TouchableOpacity 
                  key={type} 
                  onPress={() => setActiveType(type as any)}
                  className={`flex-1 py-3.5 rounded-full items-center ${isActive ? 'bg-[#262A2B]' : ''}`}
                  style={isActive ? {
                    shadowColor: '#262A2B',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  } : {}}
                >
                  <ThemedText 
                    weight="bold" 
                    className={isActive ? 'text-white' : 'text-gray-500'}
                  >
                    {type}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================ */}
        {/* BEST OFFERS SECTION */}
        {/* ============================================ */}
        <View className="mb-10">
          {/* Section Header */}
          <View className="px-5 mb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <ThemedText weight="bold" className="text-xl text-gray-900 mr-2">Best Offers</ThemedText>
              <View className="bg-orange-100 px-2 py-1 rounded-lg">
                <ThemedText className="text-orange-600 text-[10px] font-bold">DEALS 🔥</ThemedText>
              </View>
            </View>
            <TouchableOpacity>
              <ThemedText weight="semibold" className="text-[#2D6A4F] text-sm">See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          {/* Products Carousel */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 40, alignItems: 'flex-start' }}
          >
            {bestOffers.map((product) => (
              <ProductCard key={product.id} product={product} horizontal />
            ))}
          </ScrollView>
        </View>

        {/* ============================================ */}
        {/* FARM 1 SECTION */}
        {/* ============================================ */}
        <View className="bg-white py-6 mb-3">
          {/* Farm Header */}
          <View className="px-5 mb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image 
                source={{ uri: VENDORS[0].image }} 
                className="w-14 h-14 rounded-full bg-gray-100 border-2 border-emerald-100 mr-3" 
              />
              <View>
                <ThemedText weight="bold" className="text-base text-gray-900">{VENDORS[0].name}</ThemedText>
                <View className="flex-row items-center mt-0.5">
                  <Ionicons name="checkmark-circle" size={12} color="#2D6A4F" />
                  <ThemedText className="text-xs text-gray-500 ml-1">Verified Farm</ThemedText>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-[#2D6A4F] px-4 py-2 rounded-xl">
              <ThemedText weight="bold" className="text-white text-xs">Visit</ThemedText>
            </TouchableOpacity>
          </View>
          
          {/* Farm Products */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 40, alignItems: 'flex-start' }}
          >
            {farm1Products.map((product) => (
              <ProductCard key={product.id} product={product} horizontal />
            ))}
          </ScrollView>
        </View>

        {/* ============================================ */}
        {/* FARM 2 SECTION */}
        {/* ============================================ */}
        <View className="bg-white py-6">
          {/* Farm Header */}
          <View className="px-5 mb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image 
                source={{ uri: VENDORS[1].image }} 
                className="w-14 h-14 rounded-full bg-gray-100 border-2 border-emerald-100 mr-3" 
              />
              <View>
                <ThemedText weight="bold" className="text-base text-gray-900">{VENDORS[1].name}</ThemedText>
                <View className="flex-row items-center mt-0.5">
                  <Ionicons name="leaf" size={12} color="#2D6A4F" />
                  <ThemedText className="text-xs text-gray-500 ml-1">100% Organic</ThemedText>
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-gray-900 px-4 py-2 rounded-xl">
              <ThemedText weight="bold" className="text-white text-xs">Visit</ThemedText>
            </TouchableOpacity>
          </View>
          
          {/* Farm Products */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 40, alignItems: 'flex-start' }}
          >
            {farm2Products.map((product) => (
              <ProductCard key={product.id} product={product} horizontal />
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}
