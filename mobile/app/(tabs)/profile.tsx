import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
      { label: 'My Orders', icon: 'cube-outline', route: '/orders' },
      { label: 'Delivery Address', icon: 'location-outline', route: '/profile' }, 
      { label: 'Payment Methods', icon: 'card-outline', route: '/profile' },
      { label: 'Help & Support', icon: 'help-circle-outline', route: '/profile' },
      { label: 'Log In / Sign Up', icon: 'log-in-outline', route: '/login', color: 'text-primary', iconColor: '#2D6A4F' },
  ];

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
         
         {/* Profile Header - Generic / Zero State */}
         <View className="flex-row items-center mb-8 bg-white p-6 rounded-[32px] shadow-sm shadow-black/5 border border-gray-100">
             <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mr-5 border-2 border-white shadow-sm overflow-hidden">
                 <Ionicons name="person" size={40} color="#9CA3AF" />
             </View>
             <View>
                 <ThemedText variant="h2" weight="bold" className="text-xl text-gray-900 mb-1">Welcome!</ThemedText>
                 <ThemedText color="gray" className="text-sm opacity-60 mb-2">Guest User</ThemedText>
                 <TouchableOpacity 
                    onPress={() => router.push('/login')}
                    className="bg-emerald-100 px-3 py-1 rounded-full self-start"
                 >
                     <ThemedText color="primary" weight="bold" className="text-xs text-[#2D6A4F]">Sign In</ThemedText>
                 </TouchableOpacity>
             </View>
         </View>

         {/* Menu */}
         <View className="bg-white rounded-[32px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-8">
             {menuItems.map((item, index) => (
                 <TouchableOpacity 
                    key={index} 
                    onPress={() => router.push(item.route as any)}
                    activeOpacity={0.7}
                    className={`flex-row items-center p-5 ${index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
                 >
                     <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${item.color ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <Ionicons name={item.icon as any} size={22} color={item.iconColor || '#262A2B'} />
                     </View>
                     <ThemedText weight="semibold" className={`flex-1 text-base ${item.color || 'text-gray-900'}`}>
                         {item.label}
                     </ThemedText>
                     <Ionicons name="chevron-forward" size={20} color="#E5E7EB" />
                 </TouchableOpacity>
             ))}
         </View>
         
         <ThemedText className="text-center text-gray-400 text-xs">Version 1.0.0 (NextGen Organics)</ThemedText>
      </ScrollView>
    </ScreenWrapper>
  );
}
