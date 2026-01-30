import { View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, CATEGORIES, Product } from '@/constants/mocks';
import { ProductCard } from '@/components/ProductCard';
import { useState, useMemo } from 'react';

export default function CollectionScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    if (!type) return [];
    
    // 1. Filter by Collection Type (Tag)
    let data = PRODUCTS.filter(p => p.tags?.includes(type));

    // 2. Filter by Active Category
    if (activeCategory !== 'All') {
      data = data.filter(p => p.category === activeCategory);
    }

    return data;
  }, [type, activeCategory]);

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      
      {/* Header */}
      <View className="px-5 py-4 bg-white border-b border-gray-100 flex-row items-center gap-3">
         <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
         </TouchableOpacity>
         <View>
            <ThemedText className="text-xs text-[#2D6A4F] font-bold uppercase tracking-wider">Collection</ThemedText>
            <ThemedText weight="bold" className="text-xl capitalize">{type?.replace('-', ' ')}</ThemedText>
         </View>
      </View>

      {/* Categories Filter (Pills) */}
      <View className="py-4 bg-white/50">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          <TouchableOpacity 
             onPress={() => setActiveCategory('All')}
             className={`px-5 py-2 rounded-full border ${activeCategory === 'All' ? 'bg-[#2D6A4F] border-[#2D6A4F]' : 'bg-white border-gray-200'}`}
          >
             <ThemedText weight="medium" className={activeCategory === 'All' ? 'text-white' : 'text-gray-600'}>All</ThemedText>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
               key={cat.id}
               onPress={() => setActiveCategory(cat.name)}
               className={`px-4 py-2 rounded-full border flex-row items-center gap-2 ${activeCategory === cat.name ? 'bg-[#2D6A4F] border-[#2D6A4F]' : 'bg-white border-gray-200'}`}
            >
               {/* Tiny Image for context */}
               <Image source={{ uri: cat.image }} className="w-4 h-4 rounded-full" /> 
               <ThemedText weight="medium" className={activeCategory === cat.name ? 'text-white' : 'text-gray-600'}>{cat.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
         data={filteredProducts}
         keyExtractor={item => item.id}
         numColumns={2}
         contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 16 }}
         columnWrapperStyle={{ gap: 16 }} 
         renderItem={({ item }) => (
             <ProductCard product={item} />
         )}
         ListEmptyComponent={
             <View className="items-center py-20">
                 <Ionicons name="leaf-outline" size={64} color="#E5E7EB" />
                 <ThemedText className="text-gray-400 mt-4 text-center">
                    No {activeCategory !== 'All' ? activeCategory : ''} products found in this collection.
                 </ThemedText>
             </View>
         }
      />

    </ScreenWrapper>
  );
}
