import "../global.css";
import { Stack, SplashScreen } from 'expo-router';
import { useFonts, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '@/context/CartContext';

// Prevent auto-hiding splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="category/[id]" />
          <Stack.Screen name="vendor/[id]" />
          <Stack.Screen name="categories" />
          <Stack.Screen name="payment" />
          
          {/* Modals */}
          <Stack.Screen 
            name="location" 
            options={{ presentation: 'modal' }} 
          />
          <Stack.Screen 
            name="notifications" 
            options={{ presentation: 'modal' }} 
          />
           <Stack.Screen 
            name="search" 
            options={{ presentation: 'modal' }} 
          />
          
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </CartProvider>
    </GestureHandlerRootView>
  );
}
