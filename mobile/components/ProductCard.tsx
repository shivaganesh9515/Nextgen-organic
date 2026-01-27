import { View, Image, TouchableOpacity } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';
import { Link } from 'expo-router';
import { Product } from '../constants/mocks';
import { ThemedText } from './ThemedText';
import { ComponentProps } from 'react';

interface ProductCardProps extends ComponentProps<typeof AnimatedPressable> {
  product: Product;
  horizontal?: boolean;
}

export function ProductCard({ product, horizontal = false, className = "", ...props }: ProductCardProps) {
  const containerClass = horizontal 
    ? "w-40 mr-4" 
    : "w-[48%] mb-4"; // 2-column grid style for vertical

  return (
    <Link href={`/product/${product.id}`} asChild>
      <AnimatedPressable 
        className={`bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden ${containerClass} ${className}`}
        {...props}
      >
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-32 bg-gray-50"
          resizeMode="cover"
        />
        <View className="p-3 bg-white">
            <View className="flex-row justify-between items-start mb-1">
                <ThemedText variant="caption" color="secondary" weight="medium" numberOfLines={1}>
                    ⭐ {product.rating}
                </ThemedText>
            </View>
          <ThemedText variant="body" weight="semibold" numberOfLines={2} className="h-10 mb-1 font-heading">
            {product.name}
          </ThemedText>
          <ThemedText variant="h3" color="primary" weight="bold">
            ${product.price.toFixed(2)}
          </ThemedText>
        </View>
      </AnimatedPressable>
    </Link>
  );
}
