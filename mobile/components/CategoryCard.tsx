import { View, Image, TouchableOpacity } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';
import { Link } from 'expo-router';
import { Category } from '../constants/mocks';
import { ThemedText } from './ThemedText';
import { ComponentProps } from 'react';

interface CategoryCardProps extends ComponentProps<typeof AnimatedPressable> {
  category: Category;
  compact?: boolean; // For home screen vs category list
}

export function CategoryCard({ category, compact = false, ...rest }: CategoryCardProps) {
  const sizeClass = compact ? "w-24 mr-3" : "w-[48%] mb-4";
  const imageSize = compact ? "h-24 w-24" : "h-36 w-full";

  return (
    <Link href={`/category/${category.id}`} asChild>
      <AnimatedPressable className={`${sizeClass} items-center`}>
        <View className={`${imageSize} rounded-3xl bg-white shadow-sm border border-stone-100 mb-2 overflow-hidden items-center justify-center`}>
           <Image 
            source={{ uri: category.image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <ThemedText variant={compact ? "caption" : "body"} weight="medium" className="text-center font-heading">
          {category.name}
        </ThemedText>
      </AnimatedPressable>
    </Link>
  );
}
