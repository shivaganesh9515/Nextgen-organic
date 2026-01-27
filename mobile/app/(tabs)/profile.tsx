import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const menuItems = [
      { label: 'My Orders', icon: '📦', route: '/orders' },
      { label: 'Delivery Address', icon: '📍', route: '/profile' }, // Placeholder route
      { label: 'Payment Methods', icon: '💳', route: '/profile' },
      { label: 'Help & Support', icon: '❓', route: '/profile' },
      { label: 'Log Out', icon: '🚪', route: '/login', color: 'text-error' },
  ];

  return (
    <ScreenWrapper className="bg-light flex-1">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
         {/* Profile Header */}
         <View className="flex-row items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
             <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mr-4">
                 <ThemedText variant="h1">👨‍🌾</ThemedText>
             </View>
             <View>
                 <ThemedText variant="h2" weight="bold" className="font-heading">Farmer John</ThemedText>
                 <ThemedText color="gray">john.doe@example.com</ThemedText>
                 <View className="bg-success/10 px-3 py-1 rounded-full self-start mt-2">
                     <ThemedText variant="caption" color="success" weight="bold">Gold Member</ThemedText>
                 </View>
             </View>
         </View>

         {/* Menu */}
         <View className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
             {menuItems.map((item, index) => (
                 <Link key={index} href={item.route as any} asChild>
                     <TouchableOpacity className={`flex-row items-center p-5 ${index !== menuItems.length - 1 ? 'border-b border-dashed border-stone-100' : ''}`}>
                         <View className="w-10 h-10 bg-light rounded-full items-center justify-center mr-4">
                            <ThemedText>{item.icon}</ThemedText>
                         </View>
                         <ThemedText variant="body" weight="medium" className={`flex-1 font-heading ${item.color || 'text-dark'}`}>
                             {item.label}
                         </ThemedText>
                         <ThemedText color="gray">›</ThemedText>
                     </TouchableOpacity>
                 </Link>
             ))}
         </View>
         
         <ThemedText variant="caption" color="gray" className="text-center mt-8">Version 1.0.0 (Green Earth)</ThemedText>
      </ScrollView>
    </ScreenWrapper>
  );
}
