import { View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';


import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem } = useCart();
  
  const handleRemoveItem = (id: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: 'destructive', onPress: () => removeItem(id) }
    ]);
  };

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6">
        
        {/* Header */}
        <View className="pt-4 mb-8 flex-row justify-between items-center relative">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2 z-10">
                <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <View className="absolute inset-0 items-center justify-center">
                <ThemedText variant="h3" color="dark" weight="bold" className="text-xl">Cart</ThemedText>
            </View>
            <View className="w-10" />
        </View>

        {/* Total Section */}
        <View className="items-center mb-8">
            <ThemedText variant="body" color="gray" className="mb-2 text-lg opacity-60">Total</ThemedText>
            <ThemedText variant="h1" color="dark" weight="bold" className="text-4xl">
                ₹ {total.toFixed(2)}
            </ThemedText>
        </View>

        {/* Cart Items List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 320 }}>
            <View className="gap-5">
                {items.map((item) => (
                    <View key={item.id} className="bg-[#F6F6F9] rounded-[32px] p-4 flex-row items-center shadow-sm relative">
                        {/* Image */}
                        <Image source={{ uri: item.image }} className="w-20 h-20 rounded-full bg-gray-200" resizeMode="cover" />
                        
                        {/* Content */}
                        <View className="flex-1 ml-4 py-2">
                            {/* Title & Delete Row */}
                            <View className="flex-row justify-between items-start mb-2">
                                <ThemedText weight="bold" color="dark" className="text-base flex-1 pr-2 leading-5" numberOfLines={2}>
                                    {item.name}
                                </ThemedText>
                                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} className="p-1 -mt-1 -mr-2">
                                    <Ionicons name="trash-outline" size={20} color="#FF5A5F" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-between items-center mt-1">
                                <ThemedText color="primary" weight="bold" className="text-lg">
                                    ₹ {item.price.toFixed(2)}
                                </ThemedText>
                                
                                {/* Controls */}
                                <View className="flex-row items-center bg-white rounded-full px-1 py-1 shadow-sm">
                                    <TouchableOpacity 
                                        onPress={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 items-center justify-center bg-gray-100 rounded-full"
                                    >
                                        <Ionicons name="remove" size={18} color="#262A2B" />
                                    </TouchableOpacity>
                                    
                                    <ThemedText weight="bold" color="dark" className="w-8 text-center text-base">
                                        {item.quantity}
                                    </ThemedText>
                                    
                                    <TouchableOpacity 
                                        onPress={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 items-center justify-center bg-[#262A2B] rounded-full"
                                    >
                                        <Ionicons name="add" size={18} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                {items.length === 0 && (
                    <View className="items-center py-10 opacity-50">
                        <Ionicons name="cart-outline" size={48} color="gray" />
                        <ThemedText className="mt-4">Your cart is empty</ThemedText>
                    </View>
                )}
            </View>
        </ScrollView>

        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-6 pb-40 border-t border-gray-50 shadow-lg shadow-black/5 rounded-t-[32px]">
             <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => router.push('/payment')}
                className="w-full bg-primary h-16 rounded-[32px] items-center justify-center shadow-lg shadow-primary/25 mb-4"
            >
                <ThemedText color="white" weight="bold" className="text-lg">Checkout</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/(tabs)')} className="items-center py-2">
                <ThemedText color="primary" weight="bold">Add more items</ThemedText>
            </TouchableOpacity>
        </View>

      </View>
    </ScreenWrapper>
  );
}
