import { View, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 20;
const COLUMN_WIDTH = (width - (PADDING * 2) - GAP) / 2;

// Mock Data matching the screenshot visually + new premium fields
const MEALS = [
  {
    id: '1',
    name: 'Spaghetti Shrimp',
    price: 8.00,
    rating: 4.9,
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Glazed Wings',
    price: 8.00,
    rating: 4.9,
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1527477396000-64ca9c00173e?w=600',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Chicken Salad',
    price: 8.00,
    rating: 4.9,
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600',
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Tom Yum Soup',
    price: 8.00,
    rating: 4.9,
    time: '12 min',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=600',
    isFavorite: true,
  },
  {
    id: '5',
    name: 'Fresh Salad',
    price: 6.50,
    rating: 4.7,
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    isFavorite: true,
  },
   {
    id: '6',
    name: 'Grilled Salmon',
    price: 12.99,
    rating: 4.8,
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=600',
    isFavorite: true,
  }
];

const CATEGORY_TABS = ['All', 'Vegetables', 'Fruits', 'Bakery', 'Drinks'];

export default function CategoriesScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const renderItem = ({ item }: { item: typeof MEALS[0] }) => (
    <TouchableOpacity 
        className="mb-4 relative rounded-[28px] overflow-hidden bg-gray-100 shadow-sm" 
        style={{ width: COLUMN_WIDTH, height: COLUMN_WIDTH * 1.5 }} // Aspect Ratio 2:3
        activeOpacity={0.9}
        onPress={() => router.push(`/product/${item.id}` as any)}
    >
        {/* Full Height Image */}
        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />

        {/* Floating Heart - Top Right (Outline for Categories, Filled for Favs usually, but sticking to design request) */}
        <TouchableOpacity className="absolute top-3 right-3 w-9 h-9 items-center justify-center bg-white/90 rounded-full shadow-sm">
             <Ionicons name="heart-outline" size={18} color="#FF4B4B" />
        </TouchableOpacity>

        {/* Floating Info Card - Bottom */}
        <View className="absolute bottom-2 left-2 right-2 p-3 bg-white/95 rounded-[20px] shadow-sm">
             
             {/* Title & Rating */}
             <View className="flex-row justify-between items-start mb-1">
                 <ThemedText weight="bold" color="dark" className="text-[15px] flex-1 mr-1 leading-5" numberOfLines={1}>
                     {item.name}
                 </ThemedText>
                 <View className="flex-row items-center bg-orange-50 px-1.5 py-0.5 rounded-lg">
                    <Ionicons name="star" size={10} color="#FF9800" />
                    <ThemedText className="text-[10px] ml-0.5 font-bold text-orange-600">{item.rating}</ThemedText>
                 </View>
             </View>

             {/* Meta & Price */}
             <View className="flex-row justify-between items-end">
                 <View>
                     <View className="flex-row items-center mb-1.5">
                        <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                        <ThemedText color="gray" className="text-xs ml-1 opacity-70">{item.time}</ThemedText>
                     </View>
                     <ThemedText weight="bold" color="primary" className="text-base">
                         ${item.price.toFixed(2)}
                     </ThemedText>
                 </View>
                 
                 {/* Add Button */}
                 <TouchableOpacity className="w-8 h-8 bg-[#262A2B] rounded-full items-center justify-center">
                     <Ionicons name="add" size={20} color="white" />
                 </TouchableOpacity>
             </View>
        </View>
    </TouchableOpacity>
  );

  // Basic filtering for demo purposes
  const filteredMeals = activeTab === 'All' 
    ? MEALS 
    : MEALS.filter(() => Math.random() > 0.5); // Randomly filter to simulate categories for now

  return (
    <ScreenWrapper bg="bg-[#F4F5F7]">
      <View className="flex-1">
        
        {/* Header with Back Button */}
        <View className="px-5 pt-2 pb-4 flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
                <TouchableOpacity 
                   onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      router.replace('/(tabs)');
                    }
                  }}
                  className="w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm border border-gray-100"
                >
                     <Ionicons name="arrow-back" size={20} color="#262A2B" />
                </TouchableOpacity>
                <ThemedText variant="h3" weight="bold" color="dark" className="text-2xl">Categories</ThemedText>
            </View>
            <TouchableOpacity className="w-11 h-11 items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
                 <Ionicons name="search" size={22} color="#262A2B" />
            </TouchableOpacity>
        </View>

        {/* Categories Tabs - Scrollable but with modern styling */}
        <View className="mb-6 pl-5">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                 <View className="flex-row gap-3">
                     {CATEGORY_TABS.map((tab) => (
                         <TouchableOpacity 
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-6 py-3.5 rounded-[24px] border ${activeTab === tab ? 'bg-[#262A2B] border-[#262A2B] shadow-sm' : 'bg-white border-transparent'}`}
                         >
                             <ThemedText 
                                weight="bold" 
                                className={activeTab === tab ? 'text-white' : 'text-gray-500'}
                             >
                                 {tab}
                             </ThemedText>
                         </TouchableOpacity>
                     ))}
                 </View>
            </ScrollView>
        </View>

        {/* Product Grid */}
        <FlatList
            data={filteredMeals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: PADDING }}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
            showsVerticalScrollIndicator={false}
        />

      </View>
    </ScreenWrapper>
  );
}
