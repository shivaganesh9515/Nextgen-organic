import { View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6 pt-10">
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-8 w-10 h-10 items-center justify-center -ml-2">
            <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-10 w-full">
             <ThemedText variant="h1" color="dark" className="font-heading mb-3 text-3xl text-left">Forgot Password</ThemedText>
             <ThemedText variant="body" color="gray" className="text-left text-base text-gray-500 leading-6 max-w-xs">
                Select which contact details should we use to reset your password
             </ThemedText>
        </View>

        {/* Contact Options */}
        <View className="gap-6">
            
            {/* Email Card */}
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => router.push('/verify')} // Assuming next step is verify
                className="w-full flex-row items-center p-6 border-2 border-gray-100 rounded-[32px] bg-white gap-4"
            >
                <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
                    <Ionicons name="mail" size={24} color="#4A6741" />
                </View>
                <View>
                    <ThemedText weight="medium" color="gray" className="text-sm mb-1 opacity-60">Email</ThemedText>
                    <ThemedText weight="bold" color="dark" className="text-base">********@mail.com</ThemedText>
                </View>
            </TouchableOpacity>

            {/* Phone Card */}
            <TouchableOpacity 
                activeOpacity={0.7}
                className="w-full flex-row items-center p-6 border-2 border-gray-100 rounded-[32px] bg-white gap-4"
            >
                <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
                    <Ionicons name="call" size={24} color="#4A6741" />
                </View>
                <View>
                    <ThemedText weight="medium" color="gray" className="text-sm mb-1 opacity-60">Phone Number</ThemedText>
                    <ThemedText weight="bold" color="dark" className="text-base">**** **** **** 2345</ThemedText>
                </View>
            </TouchableOpacity>

        </View>

      </View>
    </ScreenWrapper>
  );
}
