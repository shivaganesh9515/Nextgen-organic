import { View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

/* Mock Promos Data */
const PROMOS = [
  {
    id: '1',
    brand: 'PureHarvest Farms',
    logo: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200',
    title: 'Get 25% off on your first order',
    validity: 'Valid till 15 Feb 2026',
    color: '#4CAF50',
  },
  {
    id: '2',
    brand: 'GreenValley Organics',
    logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200',
    title: 'Flat 15% off on orders above $30',
    validity: 'Valid till 28 Feb 2026',
    color: '#8BC34A',
  },
  {
    id: '3',
    brand: 'Next360 Organics',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    title: 'Buy 2 Get 1 Free on all vegetables',
    validity: 'Valid till 10 Feb 2026',
    color: '#2D6A4F',
  },
  {
    id: '4',
    brand: 'Fresh Dairy Co.',
    logo: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200',
    title: 'Free delivery on dairy products',
    validity: 'Valid till 20 Feb 2026',
    color: '#03A9F4',
  },
  {
    id: '5',
    brand: 'Organic Bakery',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
    title: 'Get 20% off for 3 months!',
    validity: 'Valid till 30 Mar 2026',
    color: '#FF9800',
  },
];

export default function OffersScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper bg="bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View className="px-5 pt-4 pb-5 flex-row items-center justify-between">
        <ThemedText weight="bold" className="text-3xl text-gray-900">Promos</ThemedText>
        <TouchableOpacity 
          onPress={() => router.push('/search')}
          className="w-11 h-11 bg-white rounded-full items-center justify-center border border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Ionicons name="search" size={20} color="#262A2B" />
        </TouchableOpacity>
      </View>

      {/* Promo Cards */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        {PROMOS.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            activeOpacity={0.7}
            className="bg-white mb-4 flex-row items-center"
            style={{
              borderRadius: 20,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            {/* Brand Logo */}
            <View 
              className="items-center justify-center overflow-hidden"
              style={{
                width: 70,
                height: 70,
                borderRadius: 16,
                backgroundColor: promo.color + '15',
              }}
            >
              <Image 
                source={{ uri: promo.logo }} 
                style={{ width: 50, height: 50, borderRadius: 12 }}
                resizeMode="cover"
              />
            </View>

            {/* Promo Details */}
            <View className="flex-1 ml-4">
              <ThemedText weight="bold" className="text-base text-gray-900 mb-1" numberOfLines={2}>
                {promo.title}
              </ThemedText>
              <ThemedText className="text-sm text-emerald-600">
                {promo.validity}
              </ThemedText>
            </View>

            {/* Arrow */}
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        {/* Empty State Message */}
        <View className="items-center py-8">
          <ThemedText className="text-gray-400 text-sm">More promos coming soon!</ThemedText>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
