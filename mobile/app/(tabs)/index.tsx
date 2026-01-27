import { View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/constants/mocks';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <ScreenWrapper className="bg-light flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="px-6 pt-2 pb-6">
          <View className="flex-row justify-between items-center mb-6">
              <View>
                 <ThemedText variant="label" color="primary" weight="bold">Welcome back,</ThemedText>
                 <ThemedText variant="h2" color="dark" weight="bold" className="font-heading">Farmer John</ThemedText>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-stone-100">
                  <ThemedText>🔔</ThemedText>
              </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl shadow-sm border border-stone-100">
              <ThemedText className="mr-3">🔍</ThemedText>
              <TextInput 
                 placeholder="Search fresh vegetables..." 
                 placeholderTextColor="#9CA3AF"
                 className="flex-1 font-body text-dark text-base"
              />
          </View>
        </View>

        {/* Promo Banner */}
        <MotiView 
           from={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ type: 'spring', delay: 200 }}
           className="mx-6 p-6 bg-primary rounded-3xl relative overflow-hidden mb-8 shadow-lg shadow-primary/20"
        >
            <View className="z-10 w-2/3">
                <View className="bg-accent/20 self-start px-3 py-1 rounded-full mb-3">
                   <ThemedText variant="caption" color="white" weight="bold">NEW HARVEST</ThemedText>
                </View>
                <ThemedText variant="h2" color="white" weight="bold" className="mb-2 font-heading">Fresh from the Earth</ThemedText>
                <ThemedText variant="body" color="white" className="opacity-90 mb-4 text-xs">Get 20% off your first order of seasonal greens.</ThemedText>
                <TouchableOpacity className="bg-white px-5 py-2 rounded-xl self-start">
                    <ThemedText variant="caption" color="primary" weight="bold">Order Now</ThemedText>
                </TouchableOpacity>
            </View>
             {/* Decorative Circle */}
            <View className="absolute -right-5 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full" />
            <View className="absolute right-[-10] top-[-10] w-24 h-24 bg-accent opacity-20 rounded-full" />
        </MotiView>

        {/* Categories Horizontal */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <ThemedText variant="h3" weight="bold" className="font-heading">Categories</ThemedText>
            <TouchableOpacity><ThemedText variant="caption" color="primary" weight="bold">See All</ThemedText></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 overflow-visible pr-6">
            {CATEGORIES.map((cat, index) => (
              <MotiView
                key={cat.id}
                from={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', delay: 300 + (index * 100) }}
                className="mr-4"
              >
                  <CategoryCard category={cat} compact />
              </MotiView>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mb-4">
            <ThemedText variant="h3" weight="bold" className="font-heading">Popular Harvest</ThemedText>
             <TouchableOpacity><ThemedText variant="caption" color="primary" weight="bold">View All</ThemedText></TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
             {featuredProducts.map((prod, index) => (
               <MotiView
                 key={prod.id}
                 from={{ opacity: 0, translateY: 20 }}
                 animate={{ opacity: 1, translateY: 0 }}
                 transition={{ type: 'spring', delay: 500 + (index * 100) }}
                 style={{ width: '48%', marginBottom: 16 }}
               >
                   <ProductCard product={prod} style={{ width: '100%' }} />
               </MotiView>
             ))}
          </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}
