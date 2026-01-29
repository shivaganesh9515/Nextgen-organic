import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF5A5F', // Using brand kit accent or green 
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            height: 80,
            position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? "#4A6741" : "#9CA3AF"} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={focused ? "#4A6741" : "#9CA3AF"} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: () => (
            <View className="mb-8 items-center justify-center w-16 h-16 bg-[#262A2B] rounded-full shadow-lg shadow-black/30">
                <Ionicons name="bag-handle-outline" size={26} color="white" />
                <View className="absolute top-3 right-3 bg-[#FF5A5F] w-5 h-5 rounded-full items-center justify-center border-2 border-[#262A2B]">
                   <Text className="text-white text-[10px] font-bold">2</Text>
                </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="offers"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "pricetag" : "pricetag-outline"} size={24} color={focused ? "#4A6741" : "#9CA3AF"} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "receipt" : "receipt-outline"} size={24} color={focused ? "#4A6741" : "#9CA3AF"} />
          ),
        }}
      />
      
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
