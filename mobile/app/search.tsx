import { View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const FILTERS = ['Nearby', 'All', 'Main Course', 'Dessert', 'Drinks'];

const TOP_SEARCHES = [
  { id: '1', name: 'Pasta spaghetti with shrimps', price: 9.1, vendor: 'Dapur Umami', rating: 4.9, category: 'Main Course', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200' },
  { id: '2', name: 'Baked chicken wings with sauce', price: 6.9, vendor: 'Eco Kitchen', rating: 4.9, category: 'Main Course', image: 'https://images.unsplash.com/photo-1527477396000-64ca9c00173d?w=200' },
  { id: '3', name: 'Chicken steak with salad', price: 8.4, vendor: 'Joglo Manis', rating: 4.9, category: 'Main Course', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=200' },
  { id: '4', name: 'Tom yum kung or river prawn', price: 8.0, vendor: 'RM Citra Alam', rating: 4.9, category: 'Main Course', image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=200' },
  { id: '5', name: 'Bakso Malang Ciamik', price: 6.9, vendor: 'Bakso Pak Man', rating: 4.8, category: 'Main Course', image: 'https://images.unsplash.com/photo-1610137312678-c84eb6c0c2a2?w=200' },
  { id: '6', name: 'Chocolate Lava Cake', price: 4.5, vendor: 'Sweet Tooth', rating: 4.7, category: 'Dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200' },
  { id: '7', name: 'Fresh Orange Juice', price: 3.0, vendor: 'Juice Bar', rating: 4.6, category: 'Drinks', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200' },
  { id: '8', name: 'Strawberry Cheesecake', price: 5.5, vendor: 'Cake Factory', rating: 4.8, category: 'Dessert', image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=200' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = TOP_SEARCHES.filter(item => {
      const matchesCategory = activeFilter === 'All' || activeFilter === 'Nearby' ? true : item.category === activeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6">
        
        {/* Search Header */}
        <View className="flex-row items-center gap-4 mt-2 mb-6">
           <Ionicons name="search-outline" size={28} color="#262A2B" />
           <TextInput 
              placeholder="What would you like to eat?"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base font-body text-dark h-full"
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
           />
           <TouchableOpacity onPress={() => router.back()}>
               <ThemedText color="primary" weight="bold">Cancel</ThemedText>
           </TouchableOpacity>
        </View>

        {/* Filters */}
        <View className="mb-8 h-10">
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
               {FILTERS.map((filter) => {
                   const isActive = activeFilter === filter;
                   const isNearby = filter === 'Nearby';
                   return (
                       <TouchableOpacity 
                          key={filter} 
                          onPress={() => setActiveFilter(filter)}
                          className={`px-5 py-2 rounded-full border ${isActive ? 'bg-primary border-primary' : 'bg-white border-gray-200'} flex-row items-center`}
                       >
                           {isNearby && (
                               <Ionicons name="location-sharp" size={14} color={isActive ? "white" : "#9CA3AF"} style={{ marginRight: 6 }} />
                           )}
                           <ThemedText weight={isActive ? "bold" : "medium"} color={isActive ? "white" : "gray"}>
                               {filter}
                           </ThemedText>
                       </TouchableOpacity>
                   )
               })}
           </ScrollView>
        </View>

        {/* Top Searches / Results */}
        <View className="flex-1">
            <ThemedText variant="h3" color="dark" className="mb-4">
                {searchQuery ? `Result "${searchQuery}"` : activeFilter !== 'All' ? `${activeFilter}` : 'Top Searches'}
            </ThemedText>
            <FlatList
                data={filteredItems}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-10">
                        {/* Illustration Approximation */}
                        <View className="w-48 h-48 bg-gray-50 rounded-full items-center justify-center mb-6">
                            <Ionicons name="basket" size={80} color="#E5E7EB" />
                        </View>
                        <ThemedText variant="h3" color="dark" className="mb-2 text-center text-xl">
                            No result for "{searchQuery}"
                        </ThemedText>
                        <ThemedText variant="body" color="gray" className="text-center opacity-60 px-10">
                            Try to enter another keyword that related
                        </ThemedText>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        className="flex-row items-start mb-6 gap-4"
                        onPress={() => router.push(`/product/${item.id}`)}
                    >
                        <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl bg-gray-100" resizeMode="cover" />
                        <View className="flex-1 pt-1">
                            <ThemedText weight="bold" color="dark" className="text-base mb-1" numberOfLines={2}>{item.name}</ThemedText>
                            <ThemedText color="dark" weight="bold" className="text-sm mb-2">$ {item.price.toFixed(1)}</ThemedText>
                            <View className="flex-row justify-between items-center">
                                <ThemedText variant="caption" color="gray" className="opacity-60">by {item.vendor}</ThemedText>
                                <View className="flex-row items-center">
                                    <Ionicons name="star" size={14} color="#FBBF24" style={{ marginRight: 4 }} />
                                    <ThemedText weight="bold" color="dark" className="text-xs">{item.rating}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

      </View>
    </ScreenWrapper>
  );
}
