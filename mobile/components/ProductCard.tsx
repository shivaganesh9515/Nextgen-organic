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
        className="items-center justify-center bg-[#2D6A4F] rounded-full shadow-sm shadow-green-900/20 active:bg-green-800"
        style={{ width: size, height: size }}
        activeOpacity={0.8}
    >
        <Ionicons name="add" size={iconSize} color="white" />
    </TouchableOpacity>
  );

  const renderQuantityControls = (height: number, iconSize: number, fontSize: string) => (
      <View className="flex-row items-center bg-[#2D6A4F] rounded-full px-1 shadow-sm" style={{ height }}>
          <TouchableOpacity onPress={handleDecrease} className="px-2 h-full justify-center items-center">
              <Ionicons name="remove" size={iconSize} color="white" />
          </TouchableOpacity>
          <ThemedText weight="bold" className={`text-white px-1 ${fontSize} min-w-[20px] text-center`}>{quantity}</ThemedText>
          <TouchableOpacity onPress={handleIncrease} className="px-2 h-full justify-center items-center">
              <Ionicons name="add" size={iconSize} color="white" />
          </TouchableOpacity>
      </View>
  );

  // ========================================
  // UNIFIED CARD DESIGN (Horizontal & Vertical)
  // ========================================
  
  // Dimensions & Styles for Vertical vs Horizontal
  const containerStyle = horizontal 
    ? { width: 150, marginRight: 16 } 
    : { width: '48%', marginBottom: 16 };

  return (
      <AnimatedPressable 
        onPress={handlePressCard}
        className={`overflow-hidden bg-white ${className}`}
        style={{
          ...containerStyle,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: '#F3F4F6',
        }}
        {...props}
      >
        {/* Image Section */}
        <View className="relative w-full h-32 bg-gray-50">
           <Image 
             source={{ uri: product.image }} 
             className="w-full h-full"
             resizeMode="cover"
           />
           
           {/* Rating Badge */}
           <View className="absolute top-2 left-2 bg-white/90 px-1.5 py-0.5 rounded-full flex-row items-center shadow-sm">
              <Ionicons name="star" size={10} color="#F59E0B" />
              <ThemedText className="text-[10px] font-bold text-gray-800 ml-1">{product.rating}</ThemedText>
           </View>
        </View>

        {/* Content Section */}
        <View className="p-3">
          {/* Product Name */}
          <ThemedText 
            weight="medium" 
            numberOfLines={2} 
            className="text-xs text-gray-800 mb-1 h-8 leading-4"
          >
            {product.name}
          </ThemedText>
          
          {/* Price & Action */}
          <View className="flex-row items-center justify-between mt-1 h-8">
            <View>
              {product.oldPrice && (
                  <ThemedText className="text-[10px] text-gray-400 line-through">₹{product.oldPrice}</ThemedText>
              )}
              <ThemedText weight="bold" className="text-sm text-[#2D6A4F]">
                ₹{product.price}
              </ThemedText>
            </View>
            
            <View>
                {quantity > 0 
                    ? renderQuantityControls(28, 14, 'text-xs') 
                    : renderAddButton(28, 16)
                }
            </View>
          </View>
        </View>
      </AnimatedPressable>
  );
}
