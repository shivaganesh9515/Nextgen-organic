import { View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';

const { width } = Dimensions.get('window');
const PADDING = 20;

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard 
        product={item} 
        style={{ width: (width - (PADDING * 2) - 12) / 2, marginBottom: 16 }} 
    />
  );

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]"> 
      <View className="flex-1">
        
        {/* Header */}
        <View className="px-5 pt-2 pb-4 flex-row justify-between items-center">
            <View>
                 <ThemedText variant="h3" weight="bold" color="dark" className="text-2xl">Favorites</ThemedText>
                 <ThemedText color="gray" className="text-sm opacity-60">
                    {favorites.length} Items saved
                 </ThemedText>
            </View>
            <View className="flex-row gap-3">
                <TouchableOpacity onPress={() => router.push('/search')} className="w-11 h-11 items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
                     <Ionicons name="search" size={22} color="#262A2B" />
                </TouchableOpacity>
            </View>
        </View>

        {favorites.length === 0 ? (
            <View className="flex-1 items-center justify-center -mt-20">
                <View className="w-32 h-32 bg-gray-100 rounded-full items-center justify-center mb-6">
                    <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
                </View>
                <ThemedText weight="bold" className="text-xl text-gray-800 mb-2">Your Wishlist is Empty</ThemedText>
                <ThemedText className="text-gray-400 text-center px-10 mb-8 leading-5">
                    Tap the heart icon on any product to save it here for later.
                </ThemedText>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => router.push('/(tabs)')}
                    className="bg-[#2D6A4F] px-8 py-3 rounded-full shadow-lg shadow-green-900/20"
                >
                    <ThemedText color="white" weight="bold">Explore Products</ThemedText>
                </TouchableOpacity>
            </View>
        ) : (
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: PADDING }}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
                showsVerticalScrollIndicator={false}
            />
        )}

      </View>
    </ScreenWrapper>
  );
}
