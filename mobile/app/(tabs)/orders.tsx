import { View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/services/api';
import { useState, useCallback } from 'react';

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders when screen is focused
  useFocusEffect(
    useCallback(() => {
        loadOrders();
    }, [])
  );

  const loadOrders = async () => {
    setIsLoading(true);
    try {
        const fetchedOrders = await api.fetchMyOrders();
        setOrders(fetchedOrders || []);
    } catch (e) {
        console.log("Error loading orders:", e);
    } finally {
        setIsLoading(false);
    }
  };

  const renderOrder = ({ item }: { item: any }) => (
    <View className="bg-white rounded-[24px] p-4 mb-4 shadow-sm shadow-gray-200 border border-gray-50">
        <View className="flex-row gap-4">
            {/* Image Source */}
            <View className="h-16 w-16 rounded-2xl bg-gray-100 overflow-hidden">
                <Image 
                    source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                    className="w-full h-full" 
                    resizeMode="cover" 
                />
            </View>
            
            {/* Details */}
            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <ThemedText weight="bold" color="dark" className="text-base">{item.restaurant}</ThemedText>
                    <View className={`px-2 py-0.5 rounded-full ${item.status === 'DELIVERED' ? 'bg-green-100' : 'bg-orange-100'}`}>
                        <ThemedText className={`text-[10px] font-bold ${item.status === 'DELIVERED' ? 'text-green-700' : 'text-orange-600'}`}>
                            {item.status}
                        </ThemedText>
                    </View>
                </View>
                <ThemedText color="gray" className="text-sm opacity-60 mb-2 truncate" numberOfLines={1}>
                    {item.items.join(', ')}
                </ThemedText>
                <View className="flex-row items-center gap-1">
                     <ThemedText className="text-xs text-gray-400">Order #{item.id.slice(0, 8)}</ThemedText>
                     <View className="w-1 h-1 rounded-full bg-gray-300" />
                     <ThemedText className="text-xs text-gray-400">{item.date}</ThemedText>
                </View>
            </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 my-4" />

        {/* Actions */}
        <View className="flex-row justify-between items-center">
            <ThemedText weight="bold" color="dark" className="text-base">₹{item.total.toFixed(2)}</ThemedText>
            
            <View className="flex-row gap-3">
                 <TouchableOpacity className="px-4 py-2 rounded-xl border border-gray-200">
                     <ThemedText weight="bold" color="dark" className="text-sm">Help</ThemedText>
                 </TouchableOpacity>
                 <TouchableOpacity className="px-4 py-2 rounded-xl bg-primary">
                     <ThemedText weight="bold" color="white" className="text-sm">Reorder</ThemedText>
                 </TouchableOpacity>
            </View>
        </View>
    </View>
  );

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      <View className="flex-1 px-5">
        
        {/* Header */}
        <View className="py-4 mb-2 flex-row items-center gap-3">
             <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#262A2B" />
             </TouchableOpacity>
             <ThemedText variant="h3" weight="bold" color="dark" className="text-2xl">My Orders</ThemedText>
        </View>

        {isLoading ? (
            <View className="mt-20 items-center">
                <ActivityIndicator size="large" color="#2D6A4F" />
            </View>
        ) : (
            <FlatList 
                data={orders}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-20 opacity-50 mt-10">
                        <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                            <Ionicons name="receipt-outline" size={40} color="#9CA3AF" />
                        </View>
                        <ThemedText weight="bold" className="text-lg text-gray-500">No past orders</ThemedText>
                        <ThemedText className="text-sm text-gray-400 mt-1 text-center px-10">
                            Your past orders across all vendors will appear here.
                        </ThemedText>
                        <TouchableOpacity 
                            onPress={() => router.push('/(tabs)')}
                            className="mt-6 bg-[#2D6A4F] px-6 py-3 rounded-full shadow-sm"
                        >
                            <ThemedText weight="bold" className="text-white">Start Shopping</ThemedText>
                        </TouchableOpacity>
                    </View>
                }
            />
        )}
        
      </View>
    </ScreenWrapper>
  );
}
