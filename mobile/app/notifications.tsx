import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

// Zero State: Empty Arrays
const NEW_NOTIFICATIONS: Notification[] = [];
const WEEK_NOTIFICATIONS: Notification[] = [];

export default function NotificationsScreen() {
  const router = useRouter();

  const renderItem = (item: Notification, index: number, isLast: boolean) => (
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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            {/* Empty State Check */}
            {NEW_NOTIFICATIONS.length === 0 && WEEK_NOTIFICATIONS.length === 0 ? (
                <View className="flex-1 items-center justify-center py-20 opacity-50">
                    <Ionicons name="notifications-off-outline" size={64} color="gray" />
                    <ThemedText className="mt-4 text-center text-gray-500">No notifications yet</ThemedText>
                </View>
            ) : (
                <>
                    {/* New Notification Section */}
                    {NEW_NOTIFICATIONS.length > 0 && (
                        <View className="mb-6">
                            <ThemedText weight="bold" color="gray" className="text-base mb-2 opacity-80">New Notification</ThemedText>
                            {NEW_NOTIFICATIONS.map((item, index) => renderItem(item, index, index === NEW_NOTIFICATIONS.length - 1))}
                        </View>
                    )}

                    {/* This Week Section */}
                    {WEEK_NOTIFICATIONS.length > 0 && (
                        <View className="mb-10">
                            <ThemedText weight="bold" color="gray" className="text-base mb-2 opacity-80">This week</ThemedText>
                            {WEEK_NOTIFICATIONS.map((item, index) => renderItem(item, index, index === WEEK_NOTIFICATIONS.length - 1))}
                        </View>
                    )}
                </>
            )}
        </ScrollView>
        
      </View>
    </ScreenWrapper>
  );
}
