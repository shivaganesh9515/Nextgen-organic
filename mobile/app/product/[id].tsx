import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { PRODUCTS, VENDORS } from '@/constants/mocks';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation, useSharedValue } from 'react-native-reanimated';
import { AnimatedPressable } from '@/components/AnimatedPressable';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  
  const product = PRODUCTS.find(p => p.id === id);
  const vendor = product ? VENDORS.find(v => v.id === product.vendorId) : null;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollY.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
        },
      ],
    };
  });

  if (!product) {
      return (
          <ScreenWrapper className="justify-center items-center">
              <ThemedText>Product not found</ThemedText>
          </ScreenWrapper>
      )
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      <Animated.ScrollView 
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Parallax Image Header */}
        <Animated.View style={[{ height: IMG_HEIGHT, width: '100%' }, imageAnimatedStyle]}>
             <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
        </Animated.View>
        
        {/* Content */}
        <View className="px-6 py-8 -mt-6 bg-white rounded-t-3xl shadow-lg pb-32 min-h-screen">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-4">
                    <ThemedText variant="h2" weight="bold" className="mb-2">{product.name}</ThemedText>
                    {vendor && (
                        <ThemedText variant="caption" color="secondary" weight="medium">
                            By {vendor.name} • {vendor.location}
                        </ThemedText>
                    )}
                </View>
                <ThemedText variant="h2" color="primary" weight="bold">
                    ${product.price.toFixed(2)}
                </ThemedText>
            </View>

            <View className="h-[1px] bg-stone-100 my-4" />

            <ThemedText variant="h3" weight="semibold" className="mb-3">Description</ThemedText>
            <ThemedText variant="body" color="gray" className="leading-6 mb-8">
                {product.description}
            </ThemedText>

             <ThemedText variant="h3" weight="semibold" className="mb-3">Reviews ({product.reviews})</ThemedText>
             <View className="flex-row items-center mb-4">
                 <ThemedText variant="body" weight="bold" className="mr-2">{product.rating} / 5.0</ThemedText>
                 <ThemedText variant="caption" color="gray">Based on customer feedback</ThemedText>
             </View>
        </View>
      </Animated.ScrollView>
      
      {/* Back Button Overlay */}
      <SafeAreaView className="absolute top-0 left-0 right-0 p-4 z-50">
           <AnimatedPressable onPress={() => router.back()} className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-sm">
              <ThemedText>←</ThemedText>
           </AnimatedPressable>
      </SafeAreaView>

      {/* Sticky Bottom Bar */}
      <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-100 p-6 z-50">
          <AnimatedPressable 
             scale={0.97}
             className="w-full bg-primary py-4 rounded-xl items-center shadow-lg transform active:scale-95 transition-transform"
          >
              <ThemedText variant="body" color="white" weight="bold">Add to Cart - ${product.price.toFixed(2)}</ThemedText>
          </AnimatedPressable>
      </SafeAreaView>
    </View>
  );
}
