import { View, Image, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { VENDORS, PRODUCTS } from '@/constants/mocks';
import { ProductCard } from '@/components/ProductCard';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function VendorDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const vendor = VENDORS.find(v => v.id === id);
  const vendorProducts = PRODUCTS.filter(p => p.vendorId === id);
  
  if (!vendor) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ThemedText>Vendor not found</ThemedText>
          <TouchableOpacity onPress={() => router.back()} className="mt-4 p-4">
             <ThemedText className="text-blue-500">Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="light" />
      
      {/* HEADER BANNER */}
      <View className="h-48 w-full relative">
         <Image source={{ uri: vendor.banner }} className="w-full h-full" resizeMode="cover" />
         <View className="absolute inset-0 bg-black/30" />
         
         {/* Back Button */}
         <TouchableOpacity 
            onPress={() => router.back()}
            className="absolute top-12 left-5 w-10 h-10 bg-black/40 rounded-full items-center justify-center"
         >
            <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         
         <View className="absolute bottom-[-40px] left-5 flex-row items-end">
             <View className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
                <Image source={{ uri: vendor.image }} className="w-full h-full" />
             </View>
         </View>
      </View>
      
      <ScrollView className="pt-12 px-5" showsVerticalScrollIndicator={false}>
         
         {/* INFO SECTION */}
         <View className="mb-6">
            <View className="flex-row justify-between items-start">
               <View>
                  <ThemedText weight="bold" className="text-2xl text-gray-900">{vendor.name}</ThemedText>
                  <View className="flex-row items-center mt-1">
                      <Ionicons name="location" size={16} color="#4B5563" />
                      <ThemedText className="text-gray-600 ml-1">{vendor.location}</ThemedText>
                  </View>
               </View>
               <View className="items-end">
                   <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-lg">
                       <Ionicons name="star" size={14} color="#D97706" />
                       <ThemedText weight="bold" className="text-yellow-700 ml-1 text-xs">{vendor.rating} (500+)</ThemedText>
                   </View>
               </View>
            </View>
            
            {/* Tags */}
            <View className="flex-row gap-2 mt-4 flex-wrap">
               {vendor.tags.map(tag => (
                   <View key={tag} className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                       <ThemedText className="text-xs text-gray-600">{tag}</ThemedText>
                   </View>
               ))}
            </View>
         </View>
         
         {/* PRODUCTS HEADER */}
         <View className="flex-row justify-between items-center mb-4 mt-4">
             <ThemedText weight="bold" className="text-lg">All Products ({vendorProducts.length})</ThemedText>
             <Ionicons name="filter-outline" size={20} color="black" />
         </View>
         
         {/* PRODUCT GRID */}
         <View className="flex-row flex-wrap justify-between pb-10">
              {vendorProducts.map((item) => (
                  <View key={item.id} style={{ width: (SCREEN_WIDTH - 50) / 2, marginBottom: 16 }}>
                      <ProductCard product={item} />
                  </View>
              ))}
         </View>

      </ScrollView>
    </View>
  );
}
