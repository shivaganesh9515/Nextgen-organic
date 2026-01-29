import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '@/constants/mocks';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper bg="bg-white">
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
           <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText weight="bold" className="text-xl">all Categories</ThemedText>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 20, gap: 15 }}
        columnWrapperStyle={{ gap: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-1 bg-gray-50 rounded-2xl p-4 items-center border border-gray-100"
            // onPress={() => router.push(`/search?category=${item.name}`)}
            onPress={() => router.push({ pathname: '/search', params: { category: item.name } })}
          >
             <Image source={{ uri: item.image }} className="w-24 h-24 rounded-full mb-3" />
             <ThemedText weight="bold" className="text-gray-900">{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
}
