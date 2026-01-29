import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/constants/mocks';

const { width } = Dimensions.get('window');
const PADDING = 20;

export default function FavoritesScreen() {
  const router = useRouter();

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
            </View>
            <View className="flex-row gap-3">
                <TouchableOpacity className="w-11 h-11 items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
                     <Ionicons name="search" size={22} color="#262A2B" />
                </TouchableOpacity>
            </View>
        </View>

        <FlatList
            data={PRODUCTS}
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
