import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';

export default function OrdersScreen() {
    const orders = [
        { id: '#ORD-001', date: 'Oct 24, 2023', total: 45.20, status: 'Delivered' },
        { id: '#ORD-002', date: 'Oct 20, 2023', total: 120.50, status: 'Delivered' },
        { id: '#ORD-003', date: 'Oct 15, 2023', total: 32.00, status: 'Cancelled' },
    ];

  return (
    <ScreenWrapper>
       <Stack.Screen options={{ title: 'My Orders', headerBackTitle: 'Profile' }} />
       <ScrollView className="flex-1 px-6 pt-6">
           {orders.map((order, i) => (
               <View key={i} className="bg-white p-4 rounded-xl mb-4 shadow-sm border border-stone-100">
                   <View className="flex-row justify-between mb-2">
                       <ThemedText variant="body" weight="bold">{order.id}</ThemedText>
                       <ThemedText variant="caption" color={order.status === 'Cancelled' ? 'error' : 'primary'} weight="bold">{order.status}</ThemedText>
                   </View>
                   <ThemedText color="gray" className="mb-2">{order.date}</ThemedText>
                   <View className="h-[1px] bg-stone-50 my-2" />
                   <View className="flex-row justify-between items-center">
                       <ThemedText variant="caption">Total Amount</ThemedText>
                       <ThemedText variant="body" weight="bold">${order.total.toFixed(2)}</ThemedText>
                   </View>
               </View>
           ))}
       </ScrollView>
    </ScreenWrapper>
  );
}
