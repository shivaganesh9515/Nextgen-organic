import { View, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const SUGGESTIONS = [
  { id: '1', title: 'Bancangan, Sambit', subtitle: 'Etan Telkom Mbibis' },
  { id: '2', title: 'Bancar, Bungkal', subtitle: 'St. Louis, MO, USA' },
  { id: '3', title: 'Bandung City', subtitle: 'West Java, Indonesia' },
  { id: '4', title: 'Bank of America', subtitle: 'New York, NY' },
];

export default function LocationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { height } = Dimensions.get('window');

  const filteredSuggestions = SUGGESTIONS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-4 mb-8 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <ThemedText variant="h3" color="dark" weight="bold">Select Your Location</ThemedText>
            <TouchableOpacity>
                <ThemedText color="primary" weight="bold">On Map</ThemedText>
            </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-8">
            <View className="flex-row items-center bg-white rounded-full px-5 h-14 border border-gray-100 shadow-sm">
               <Ionicons name="search" size={24} color="#262A2B" />
               <TextInput 
                 placeholder="Search location"
                 placeholderTextColor="#9CA3AF"
                 className="flex-1 ml-3 text-base font-body text-dark h-full"
                 value={searchQuery}
                 onChangeText={setSearchQuery}
                 autoFocus
               />
               {searchQuery.length > 0 && (
                   <TouchableOpacity onPress={() => setSearchQuery('')}>
                       <Ionicons name="close" size={24} color="#262A2B" />
                   </TouchableOpacity>
               )}
            </View>
        </View>

        {/* Quick Select Buttons */}
        <View className="px-6 flex-row gap-4 mb-8">
            <TouchableOpacity className="flex-row items-center bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm gap-2">
                <Ionicons name="home" size={20} color="#FF5A5F" />
                <ThemedText weight="medium" color="dark">At Home</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm gap-2">
                <Ionicons name="briefcase" size={20} color="#FF5A5F" />
                <ThemedText weight="medium" color="dark">At Work</ThemedText>
            </TouchableOpacity>
        </View>

        {/* Suggestions List or Background */}
        <View className="flex-1 relative">
            {searchQuery.length > 0 ? (
                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="flex-row items-center mb-6 gap-4">
                            <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center border border-white shadow-sm">
                                <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                            </View>
                            <View>
                                <ThemedText weight="bold" color="dark" className="text-base mb-0.5">{item.title}</ThemedText>
                                <ThemedText variant="caption" color="gray" className="opacity-60">{item.subtitle}</ThemedText>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : null}

            {/* Decorative Background (Geometric Pattern) - Visible behind list or when empty */}
            <View className="absolute bottom-0 right-0 w-full h-[400px] -z-10 opacity-60 pointer-events-none">
                 <View className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rotate-45" />
                 <View className="absolute bottom-40 -left-20 w-60 h-60 bg-gray-50 border-[20px] border-white rotate-12" />
                 <View className="absolute -bottom-10 left-10 w-full h-40 bg-gray-50 -rotate-6" />
                 <View className="absolute bottom-20 right-20 w-40 h-40 border-4 border-gray-100 rotate-45 rounded-3xl" />
            </View>
        </View>

      </View>
    </ScreenWrapper>
  );
}
