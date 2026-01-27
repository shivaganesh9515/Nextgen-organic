import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { PRODUCTS } from '@/constants/mocks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  // Mock cart items
  const cartItems = [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[3], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;
  
  return (
    <ScreenWrapper className="bg-light flex-1">
      <View className="px-6 py-4 bg-white border-b border-stone-100 mb-4 rounded-b-3xl shadow-sm">
        <ThemedText variant="h2" weight="bold" className="font-heading">My Cart</ThemedText>
        <ThemedText color="gray">{cartItems.length} items</ThemedText>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          {cartItems.map((item, index) => (
             <View key={index} className="flex-row bg-white p-4 rounded-2xl mb-4 shadow-sm border border-stone-100">
                  <Image source={{ uri: item.product.image }} className="w-20 h-20 rounded-xl bg-gray-100" />
                  <View className="flex-1 ml-4 justify-between">
                      <View>
                        <ThemedText variant="body" weight="semibold" className="font-heading">{item.product.name}</ThemedText>
                        <ThemedText variant="caption" color="gray">Qty: {item.quantity}</ThemedText>
                      </View>
                      <ThemedText variant="h3" color="primary" weight="bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                      </ThemedText>
                  </View>
             </View>
          ))}
          
          <View className="mt-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <View className="flex-row justify-between mb-2">
                  <ThemedText color="gray">Subtotal</ThemedText>
                  <ThemedText weight="bold">${subtotal.toFixed(2)}</ThemedText>
              </View>
              <View className="flex-row justify-between mb-2">
                  <ThemedText color="gray">Delivery Fee</ThemedText>
                  <ThemedText weight="bold">${deliveryFee.toFixed(2)}</ThemedText>
              </View>
              <View className="h-[1px] bg-gray-100 my-3" />
               <View className="flex-row justify-between">
                  <ThemedText variant="h3" weight="bold" className="font-heading">Total</ThemedText>
                  <ThemedText variant="h3" color="primary" weight="bold">${total.toFixed(2)}</ThemedText>
              </View>
          </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
          <TouchableOpacity 
             activeOpacity={0.8}
             className="w-full bg-primary py-4 rounded-2xl items-center shadow-lg shadow-primary/30 transform active:scale-95 transition-transform"
          >
              <ThemedText variant="body" color="white" weight="bold">Checkout Now</ThemedText>
          </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
