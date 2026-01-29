import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '@/constants/mocks';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  
  const currentCartQty = getItemQuantity(product.id);
  
  const handleAddToCart = () => {
    // Logic: If already in cart, just update/add the selected quantity. 
    // If not, add new item locally.
    // For simplicity: Add the currently selected 'quantity' to the cart.
    
    if (currentCartQty > 0) {
       // If item exists, we add 'quantity' to existing.
       updateQuantity(product.id, quantity);
    } else {
       // Add item
       addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendorId: product.vendorId
      });
      // If user selected more than 1, add the rest
      if (quantity > 1) {
         updateQuantity(product.id, quantity - 1);
      }
    }
    // Navigate to cart
    router.push('/(tabs)/cart');
  };

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View className="px-6 pt-4 mb-6 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Title Section */}
            <View className="px-8 items-center mb-6">
                <ThemedText variant="h2" color="dark" weight="bold" className="text-center text-3xl mb-2 font-heading leading-tight">
                    {product.name}
                </ThemedText>
                <ThemedText variant="body" color="gray" className="text-base opacity-60">
                    By NextGen Farm
                </ThemedText>
            </View>

            {/* Meta Pills */}
            <View className="flex-row justify-center gap-4 mb-8">
                <View className="flex-row items-center bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
                    <Ionicons name="star" size={16} color="#FBBF24" style={{ marginRight: 6 }} />
                    <ThemedText weight="bold" color="dark">{product.rating}</ThemedText>
                </View>
                <View className="flex-row items-center bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
                    <Ionicons name="leaf" size={16} color="#2D6A4F" style={{ marginRight: 6 }} />
                    <ThemedText weight="bold" color="dark">Organic</ThemedText>
                </View>
            </View>

            {/* Image */}
            <View className="px-6 mb-8">
                <View className="w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-sm">
                    <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
                </View>
            </View>

            {/* Price & Quantity Row */}
            <View className="px-6 flex-row items-center justify-between mb-8">
                <View className="flex-row items-center gap-4">
                    {/* Dark Pill Control */}
                    <View className="flex-row items-center bg-[#262A2B] rounded-full p-1.5 pl-4 pr-1.5 gap-4">
                       <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                          <Ionicons name="remove" size={24} color="white" />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                          <Ionicons name="add" size={24} color="white" />
                       </TouchableOpacity>
                    </View>

                    {/* Count */}
                    <View className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                        <ThemedText weight="bold" color="dark" className="text-xl">{quantity}</ThemedText>
                    </View>
                </View>

                {/* Price */}
                <ThemedText variant="h2" color="dark" weight="bold" className="text-3xl font-heading text-[#2D6A4F]">
                    ₹ {(product.price * quantity).toFixed(2)}
                </ThemedText>
            </View>

            {/* Description */}
            <View className="px-6 mb-8">
                <ThemedText variant="h3" color="dark" className="mb-3 text-xl font-bold">Description</ThemedText>
                <ThemedText variant="body" color="gray" className="leading-6 opacity-70">
                    {product.description} Experience the freshest organic produce delivered straight from our verified farms to your doorstep. Guaranteed quality and taste. {' '}
                    <ThemedText className="text-[#2D6A4F]" weight="bold">Read more</ThemedText>
                </ThemedText>
            </View>

        </ScrollView>

        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pb-8 pt-4 flex-row gap-4 items-center shadow-lg shadow-black/5 border-t border-gray-50">
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={handleAddToCart}
                className="flex-1 bg-[#2D6A4F] h-16 rounded-full items-center justify-center shadow-lg shadow-[#2D6A4F]/25"
            >
                <ThemedText color="white" weight="bold" className="text-lg">
                    Add {quantity} to Cart - ₹{(product.price * quantity).toFixed(2)}
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => router.push('/(tabs)/cart')}
                className="w-16 h-16 bg-[#262A2B] rounded-full items-center justify-center relative"
            >
                 <Ionicons name="bag-handle-outline" size={24} color="white" />
                 {currentCartQty > 0 && (
                     <View className="absolute top-4 right-4 bg-[#D64045] w-3 h-3 rounded-full border border-[#262A2B]" />
                 )}
            </TouchableOpacity>
        </View>

      </View>
    </ScreenWrapper>
  );
}
