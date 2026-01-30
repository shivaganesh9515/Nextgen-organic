import { View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export default function OffersScreen() {
  const router = useRouter();
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    const loadPromos = async () => {
        try {
            // Combine Offers and Banners as "Promos" for this screen
            const fetchedOffers = await api.fetchOffers();
            const fetchedBanners = await api.fetchBanners();
            
            let combined = [];

            // Add Banners as first items
            if (fetchedBanners && fetchedBanners.length > 0) {
                 combined.push(...fetchedBanners.map((b: any) => ({
                     id: `banner-${b.id}`,
                     brand: 'Next360 Special',
                     logo: b.image_url,
                     title: b.title,
                     validity: 'Limited Time Offer',
                     color: '#2D6A4F'
                 })));
            }

            // Add Offers
            if (fetchedOffers && fetchedOffers.length > 0) {
                combined.push(...fetchedOffers.map((o: any) => ({
                    id: `offer-${o.id}`,
                    brand: 'Exclusive Offer',
                    logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200', // Placeholder or use category image
                    title: `${o.discount} - ${o.title}`,
                    validity: o.expires_at ? `Valid till ${new Date(o.expires_at).toLocaleDateString()}` : 'Limited Time',
                    color: '#FF9800'
                })));
            }
            
            setPromos(combined);
        } catch (e) {
            console.log("Error loading promos:", e);
        }
    };
    loadPromos();
  }, []);

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
        {promos.length === 0 ? (
             <View className="items-center py-20">
                <Ionicons name="gift-outline" size={60} color="#E5E7EB" />
                <ThemedText className="text-gray-400 text-base mt-4">No active promos right now</ThemedText>
                <ThemedText className="text-gray-300 text-sm mt-1">Check back later!</ThemedText>
             </View>
        ) : (
            promos.map((promo) => (
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
            ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
