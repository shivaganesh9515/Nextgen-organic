import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

// Mock Order Data
const ORDERS = [
  {
    id: '1024',
    date: 'Today, 10:30 AM',
    status: 'Delivered',
    items: ['Organic Red Tomatoes', 'Fresh Spinach'],
    total: 55.00,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200',
    restaurant: 'Green Valley Farms'
  },
  {
    id: '1023',
    date: 'Yesterday, 8:15 PM',
    status: 'Delivered',
    items: ['Sona Masoori Rice', 'Mangoes'],
    total: 215.00,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    restaurant: 'Nature\'s Best'
  },
  {
    id: '1022',
    date: '24 Jan, 1:00 PM',
    status: 'Cancelled',
    items: ['Raw Honey'],
    total: 850.00,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200',
    restaurant: 'Organic India'
  }
];

export default function OrdersScreen() {
  const router = useRouter();

  const renderOrder = ({ item }: { item: typeof ORDERS[0] }) => (
    <View className="bg-white rounded-[24px] p-4 mb-4 shadow-sm shadow-gray-200 border border-gray-50">
        <View className="flex-row gap-4">
            {/* Image Source */}
            <View className="h-16 w-16 rounded-2xl bg-gray-100 overflow-hidden">
                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
            </View>
            
            {/* Details */}
            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <ThemedText weight="bold" color="dark" className="text-base">{item.restaurant}</ThemedText>
                    <ThemedText color="gray" className="text-xs opacity-50">{item.status}</ThemedText>
                </View>
                <ThemedText color="gray" className="text-sm opacity-60 mb-2 truncate" numberOfLines={1}>
                    {item.items.join(', ')}
                </ThemedText>
                <View className="flex-row items-center gap-1">
                     <ThemedText className="text-xs text-gray-400">{item.id}</ThemedText>
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
                     <ThemedText weight="bold" color="dark" className="text-sm">Rate</ThemedText>
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
        <View className="py-4 mb-2">
             <ThemedText variant="h3" weight="bold" color="dark" className="text-2xl">My Orders</ThemedText>
        </View>

        <FlatList 
            data={ORDERS}
            renderItem={renderOrder}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
        
      </View>
    </ScreenWrapper>
  );
}
