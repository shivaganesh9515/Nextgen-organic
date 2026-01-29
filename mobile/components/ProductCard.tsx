import { View, Image, TouchableOpacity } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';
import { useRouter } from 'expo-router';
import { Product } from '../constants/mocks';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps extends ComponentProps<typeof AnimatedPressable> {
  product: Product;
  horizontal?: boolean;
}

export function ProductCard({ product, horizontal = false, className = "", ...props }: ProductCardProps) {
  const router = useRouter();
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAdd = () => addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    vendorId: product.vendorId
  });
  const handleIncrease = () => updateQuantity(product.id, 1);
  const handleDecrease = () => updateQuantity(product.id, -1);
  
  const handlePressCard = () => {
    router.push(`/product/${product.id}`);
  };

  const renderAddButton = (size: number, iconSize: number) => (
    <TouchableOpacity 
        onPress={handleAdd}
        style={{ width: size, height: size, borderRadius: size/2, backgroundColor: '#2D6A4F', alignItems: 'center', justifyContent: 'center' }}
        activeOpacity={0.8}
    >
        <Ionicons name="add" size={iconSize} color="white" />
    </TouchableOpacity>
  );

  const renderQuantityControls = (height: number, iconSize: number, fontSize: string) => (
      <View className="flex-row items-center bg-[#2D6A4F] rounded-full px-1" style={{ height }}>
          <TouchableOpacity onPress={handleDecrease} className="px-1.5 h-full justify-center items-center">
              <Ionicons name="remove" size={iconSize} color="white" />
          </TouchableOpacity>
          <ThemedText weight="bold" className={`text-white px-1 ${fontSize}`}>{quantity}</ThemedText>
          <TouchableOpacity onPress={handleIncrease} className="px-1.5 h-full justify-center items-center">
              <Ionicons name="add" size={iconSize} color="white" />
          </TouchableOpacity>
      </View>
  );
  
  if (horizontal) {
    // ========================================
    // HORIZONTAL CARD - Compact & Rounded
    // ========================================
    return (
      <AnimatedPressable 
          onPress={handlePressCard}
          className={`overflow-hidden ${className}`}
          style={{ 
            width: 140,
            marginRight: 14,
            borderRadius: 24,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 14,
            elevation: 8,
          }}
          {...props}
        >
          {/* Image */}
          <Image 
            source={{ uri: product.image }} 
            style={{ 
              width: 140, 
              height: 120, 
              borderTopLeftRadius: 24, 
              borderTopRightRadius: 24,
              backgroundColor: '#f3f4f6'
            }}
            resizeMode="cover"
          />
          
          {/* Rating Badge */}
          <View 
            className="absolute flex-row items-center bg-white px-2 py-1"
            style={{ top: 8, left: 8, borderRadius: 12 }}
          >
            <Ionicons name="star" size={10} color="#FFB800" />
            <ThemedText className="text-[10px] font-bold text-gray-800 ml-1">{product.rating}</ThemedText>
          </View>
          
          {/* Favorite */}
          <TouchableOpacity 
            className="absolute bg-white items-center justify-center"
            style={{ top: 8, right: 8, width: 28, height: 28, borderRadius: 14 }}
            activeOpacity={0.7}
          >
            <Ionicons name="heart-outline" size={14} color="#FF5A5F" />
          </TouchableOpacity>

          {/* Content */}
          <View style={{ padding: 10 }}>
            <ThemedText 
              weight="semibold" 
              numberOfLines={2} 
              className="text-[13px] text-gray-900 leading-4 mb-2"
              style={{ height: 32 }}
            >
              {product.name}
            </ThemedText>
            
            <View className="flex-row items-center justify-between">
              <ThemedText weight="bold" className="text-base text-[#2D6A4F]">
                ₹{product.price.toFixed(2)}
              </ThemedText>
              
              {quantity > 0 
                ? renderQuantityControls(28, 16, 'text-xs') 
                : renderAddButton(28, 18)
              }
            </View>
          </View>
        </AnimatedPressable>
    );
  }

  // ========================================
  // VERTICAL CARD - Compact Grid
  // ========================================
  return (
      <AnimatedPressable 
        onPress={handlePressCard}
        className={`overflow-hidden ${className}`}
        style={{
          width: '46%',
          marginBottom: 16,
          borderRadius: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
        }}
        {...props}
      >
        {/* Image */}
        <Image 
          source={{ uri: product.image }} 
          style={{ 
            width: '100%', 
            height: 110, 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            backgroundColor: '#f3f4f6'
          }}
          resizeMode="cover"
        />
        
        {/* Rating Badge */}
        <View 
          className="absolute flex-row items-center bg-white px-1.5 py-0.5"
          style={{ top: 6, left: 6, borderRadius: 10 }}
        >
          <Ionicons name="star" size={9} color="#FFB800" />
          <ThemedText className="text-[9px] font-bold text-gray-800 ml-0.5">{product.rating}</ThemedText>
        </View>
        
        {/* Favorite */}
        <TouchableOpacity 
          className="absolute bg-white items-center justify-center"
          style={{ top: 6, right: 6, width: 24, height: 24, borderRadius: 12 }}
          activeOpacity={0.7}
        >
          <Ionicons name="heart-outline" size={12} color="#FF5A5F" />
        </TouchableOpacity>

        {/* Content */}
        <View style={{ padding: 8 }}>
          <ThemedText 
            weight="semibold" 
            numberOfLines={2} 
            className="text-xs text-gray-900 leading-4 mb-1.5"
            style={{ height: 28 }}
          >
            {product.name}
          </ThemedText>
          
          <View className="flex-row items-center justify-between">
            <ThemedText weight="bold" className="text-sm text-[#2D6A4F]">
              ₹{product.price.toFixed(2)}
            </ThemedText>
            
            {quantity > 0 
                ? renderQuantityControls(24, 14, 'text-[10px]') 
                : renderAddButton(24, 16)
            }
          </View>
        </View>
      </AnimatedPressable>
  );
}
