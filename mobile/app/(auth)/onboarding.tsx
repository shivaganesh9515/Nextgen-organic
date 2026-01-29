import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Farm to Table',
    description: 'Fresh, organic produce delivered directly from local farmers to your doorstep.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop', // Stock organic food image
    iconName: 'leaf-outline'
  },
  {
    id: 2,
    title: '100% Organic',
    description: 'Certified organic quality you can trust. No pesticides, just pure nature.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2680&auto=format&fit=crop',
    iconName: 'nutrition-outline'
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Track your order in real-time and get fresh groceries in minutes.',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2689&auto=format&fit=crop',
    iconName: 'bicycle-outline'
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/signup');
    }
  };

  return (
    <ScreenWrapper className="bg-light flex-1">
      <View className="flex-1 justify-between">
        
        {/* Skip Button */}
        <View className="px-6 items-end w-full pt-4">
           <TouchableOpacity onPress={() => router.push('/login')}>
              <ThemedText color="primary" weight="medium">Skip</ThemedText>
           </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View className="flex-1 items-center justify-center -mt-10">
           
           <MotiView
             key={currentIndex}
             from={{ opacity: 0, translateX: 50 }}
             animate={{ opacity: 1, translateX: 0 }}
             transition={{ type: 'spring', damping: 20 }}
             className="items-center px-8"
           >
              {/* Image Circle */}
              <View className="w-64 h-64 bg-primary/10 rounded-full items-center justify-center mb-10 relative overflow-hidden">
                   <Image 
                      source={{ uri: SLIDES[currentIndex].image }} 
                      className="w-full h-full opacity-90"
                      resizeMode="cover"
                   />
                   <View className="absolute bg-white/90 p-3 rounded-full shadow-sm bottom-4 right-4">
                      <Ionicons name={SLIDES[currentIndex].iconName as any} size={28} color="#4A6741" />
                   </View>
              </View>

              <ThemedText variant="h1" color="primary" className="text-center mb-4 font-heading">{SLIDES[currentIndex].title}</ThemedText>
              <ThemedText variant="body" color="gray" className="text-center leading-6 opacity-80">{SLIDES[currentIndex].description}</ThemedText>
           </MotiView>
        </View>

        {/* Footer Actions */}
        <View className="px-6 py-6 w-full items-center">
            
            {/* Pagination Dots */}
            <View className="flex-row space-x-2 mb-8 gap-2">
               {SLIDES.map((_, index) => (
                  <View 
                    key={index} 
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'}`}
                  />
               ))}
            </View>

            {/* Primary Button */}
            <TouchableOpacity 
               onPress={handleNext}
               activeOpacity={0.8}
               className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-primary/20"
            >
               <ThemedText color="white" weight="bold" variant="body">
                  {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
               </ThemedText>
            </TouchableOpacity>

        </View>

      </View>
    </ScreenWrapper>
  );
}
