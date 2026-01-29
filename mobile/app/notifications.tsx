import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

const NEW_NOTIFICATIONS = [
  { 
      id: 1, 
      title: 'Fresh Harvest Sale', 
      subtitle: '50% Off Organic Tomatoes - Valid till 20 May', 
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200' 
  },
  { 
      id: 2, 
      title: 'New Stock Alert', 
      subtitle: 'Alphonso Mangoes are back!', 
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200' 
  },
];

const WEEK_NOTIFICATIONS = [
  { 
      id: 3, 
      title: 'Flash Deal: Honey', 
      subtitle: '20% Off Wild Honey - Today Only', 
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200' 
  },
  { 
      id: 4, 
      title: 'Weekend Special', 
      subtitle: 'Buy 2 Get 1 Free on Spinach', 
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' 
  },
  { 
      id: 5, 
      title: 'Restock: Brown Rice', 
      subtitle: 'Premium Sona Masoori Rice available', 
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' 
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const renderItem = (item: any, index: number, isLast: boolean) => (
      <View key={item.id} className={`flex-row items-center py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
          <View className="w-12 h-12 rounded-full border border-gray-100 items-center justify-center bg-white mr-4 p-2 shadow-sm">
             <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
          </View>
          <View>
              <ThemedText weight="bold" color="dark" className="text-base mb-1">{item.title}</ThemedText>
              <ThemedText color="gray" className="text-sm opacity-60">{item.subtitle}</ThemedText>
          </View>
      </View>
  );

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6">
          
        {/* Header */}
        <View className="py-4 flex-row items-center justify-between mb-2">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <ThemedText variant="h3" weight="bold" color="dark" className="text-xl">Notification</ThemedText>
            <View className="w-8" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            {/* New Notification Section */}
            <View className="mb-6">
                <ThemedText weight="bold" color="gray" className="text-base mb-2 opacity-80">New Notification</ThemedText>
                {NEW_NOTIFICATIONS.map((item, index) => renderItem(item, index, index === NEW_NOTIFICATIONS.length - 1))}
            </View>

            {/* This Week Section */}
            <View className="mb-10">
                <ThemedText weight="bold" color="gray" className="text-base mb-2 opacity-80">This week</ThemedText>
                {WEEK_NOTIFICATIONS.map((item, index) => renderItem(item, index, index === WEEK_NOTIFICATIONS.length - 1))}
            </View>
        </ScrollView>
        
      </View>
    </ScreenWrapper>
  );
}
