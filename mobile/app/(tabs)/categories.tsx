import { View, ScrollView } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/constants/mocks';

export default function CategoriesScreen() {
  return (
    <ScreenWrapper className="bg-light flex-1">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <ThemedText variant="h1" className="mb-6 font-heading" color="dark">Explore</ThemedText>
        <View className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((cat) => (
             <CategoryCard key={cat.id} category={cat} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
