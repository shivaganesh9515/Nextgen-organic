import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/ThemedText';
import { PRODUCTS, VENDORS } from '@/constants/mocks';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, interpolate, useSharedValue } from 'react-native-reanimated';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const IMG_HEIGHT = 200;

export default function VendorScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  
  const vendor = VENDORS.find(v => v.id === id);
  const vendorProducts = PRODUCTS.filter(p => p.vendorId === id);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [-IMG_HEIGHT, 0, IMG_HEIGHT],
        [IMG_HEIGHT * 1.5, IMG_HEIGHT, IMG_HEIGHT * 0.8]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-IMG_HEIGHT, 0],
            [-IMG_HEIGHT / 2, 0],
            'clamp' // Prevent moving up too much
          ),
        },
      ],
    };
  });

  if (!vendor) return <View className="flex-1 bg-white" />;

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Animated Header Background */}
      <Animated.View className="absolute top-0 left-0 right-0 bg-primary z-0" style={headerAnimatedStyle}>
           {/* Placeholder for vendor cover */}
           <View className="absolute inset-0 bg-black/20" />
      </Animated.View>

      <SafeAreaView className="absolute top-0 left-0 right-0 p-4 z-50">
           <AnimatedPressable onPress={() => router.back()} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <ThemedText color="white">←</ThemedText>
           </AnimatedPressable>
      </SafeAreaView>

      <Animated.ScrollView 
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1 pt-32" // Push content down to show initial header
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
          <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10 min-h-screen shadow-lg">
            <View className="flex-row items-center justify-between mb-2">
                <ThemedText variant="h1" weight="bold">{vendor.name}</ThemedText>
                <View className="bg-secondary/10 px-3 py-1 rounded-full">
                    <ThemedText color="primary" weight="bold">★ {vendor.rating}</ThemedText>
                </View>
            </View>
            <ThemedText color="gray" className="mb-6">📍 {vendor.location}</ThemedText>
            
            <ThemedText variant="h3" weight="semibold" className="mb-4">Fresh from Farm</ThemedText>
            <View className="flex-row flex-wrap justify-between">
                {vendorProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                ))}
            </View>
          </View>
      </Animated.ScrollView>
    </View>
  );
}
