import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '@/constants/mocks';
import { ProductCard } from '@/components/ProductCard';
import { useState, useMemo } from 'react';

export default function SearchScreen() {
  const router = useRouter();
  const { category, query: initialQuery } = useLocalSearchParams<{ category?: string, query?: string }>();
  
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  
  const filteredProducts = useMemo(() => {
     let data = PRODUCTS;
     
     if (category) {
        data = data.filter(p => p.category === category);
     }
     
     if (searchQuery) {
        const q = searchQuery.toLowerCase();
        data = data.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
     }
     
     return data;
  }, [category, searchQuery]);

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      {/* Header with Search Input */}
      <View className="px-5 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
         <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
               <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5">
               <Ionicons name="search" size={20} color="#9CA3AF" />
               <TextInput 
                  placeholder={category ? `Search in ${category}...` : "Search products..."}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-2 text-base text-black"
                  autoFocus={!category}
               />
               {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
               )}
            </View>
         </View>
      </View>
      
      {/* Results */}
      <FlatList
         data={filteredProducts}
         keyExtractor={item => item.id}
         numColumns={2}
         contentContainerStyle={{ padding: 15 }}
         columnWrapperStyle={{ justifyContent: 'space-between' }}
         renderItem={({ item }) => (
             <ProductCard product={item} />
         )}
         ListHeaderComponent={
            <View className="mb-4">
                <ThemedText className="text-gray-500">
                    {filteredProducts.length} results found {category ? `for ${category}` : ''}
                </ThemedText>
            </View>
         }
         ListEmptyComponent={
             <View className="items-center py-20">
                 <Ionicons name="search-outline" size={64} color="#E5E7EB" />
                 <ThemedText className="text-gray-400 mt-4">No products found</ThemedText>
             </View>
         }
      />
    </ScreenWrapper>
  );
}
