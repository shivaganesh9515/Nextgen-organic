import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/constants/mocks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryListingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const category = CATEGORIES.find(c => c.id === id);
  const categoryProducts = PRODUCTS.filter(p => p.categoryId === id);

  return (
    <ScreenWrapper>
       <Stack.Screen options={{ headerShown: false }} />
       
       <SafeAreaView edges={['top']} className="px-6 pb-4 bg-white border-b border-stone-100 shadow-sm z-10">
          <View className="flex-row items-center">
             <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2">
                 <ThemedText variant="h3">←</ThemedText>
             </TouchableOpacity>
             <View>
                 <ThemedText variant="label" color="gray">Category</ThemedText>
                 <ThemedText variant="h2" weight="bold">{category?.name || 'Unknown'}</ThemedText>
             </View>
          </View>
       </SafeAreaView>

      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
         {categoryProducts.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
                {categoryProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                ))}
            </View>
         ) : (
             <View className="items-center mt-10">
                 <ThemedText color="gray">No products found in this category.</ThemedText>
             </View>
         )}
      </ScrollView>
    </ScreenWrapper>
  );
}
