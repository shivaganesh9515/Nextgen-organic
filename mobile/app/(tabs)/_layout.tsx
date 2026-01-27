import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

// Text emojis for now to ensure no icon errors
function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View className={`items-center justify-center w-12 h-12 rounded-full ${focused ? 'bg-primary/10' : ''}`}>
       <Text style={{ fontSize: 24 }}>{icon}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A6741', // Next360 Green
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
        },
        tabBarLabelStyle: {
            fontFamily: 'Inter_500Medium',
            fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon icon="🔍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <TabIcon icon="🛒" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
