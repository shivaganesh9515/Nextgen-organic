import { View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Mock login logic
    router.push('/verify');
  };

  return (
    <ScreenWrapper bg="bg-light">
      <View className="flex-1 px-8 justify-center">
        
        {/* Header Section */}
        <View className="items-center mb-10">
             <View className="mb-6">
                <Image 
                  source={require('@/assets/logo.png')} 
                  className="w-40 h-40"
                  resizeMode="contain"
                />
             </View>
             <ThemedText variant="h1" color="dark" className="font-heading mb-2 text-3xl text-center">Welcome Back!</ThemedText>
             <ThemedText variant="body" color="gray" className="text-center text-base opacity-80">Sign in to continue your organic journey</ThemedText>
        </View>

        {/* Form */}
        <View className="mb-8 gap-5">
            {/* Email Input */}
            <View>
                 <View className="w-full flex-row items-center border border-gray-200/60 rounded-2xl px-4 h-14 bg-white shadow-sm focus:border-primary">
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                    <TextInput 
                       placeholder="Email Address"
                       placeholderTextColor="#9CA3AF"
                       className="flex-1 text-base font-body text-dark h-full"
                       value={email}
                       onChangeText={setEmail}
                       autoCapitalize="none"
                       keyboardType="email-address"
                    />
                 </View>
            </View>

            {/* Password Input */}
            <View>
                 <View className="w-full flex-row items-center border border-gray-200/60 rounded-2xl px-4 h-14 bg-white shadow-sm focus:border-primary">
                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                    <TextInput 
                       placeholder="Password"
                       placeholderTextColor="#9CA3AF"
                       secureTextEntry={!showPassword}
                       className="flex-1 text-base font-body text-dark h-full"
                       value={password}
                       onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                 </View>
                 <TouchableOpacity 
                    className="items-end mt-3" 
                    onPress={() => router.push('/forgot-password')}
                 >
                    <ThemedText variant="caption" color="primary" weight="bold">Forgot Password?</ThemedText>
                 </TouchableOpacity>
            </View>
        </View>

        {/* Primary Action */}
        <TouchableOpacity 
           onPress={handleLogin}
           activeOpacity={0.8}
           className="w-full bg-primary h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/25 mb-8"
        >
           <ThemedText color="white" weight="bold" variant="body" className="text-lg">Sign In</ThemedText>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <ThemedText variant="caption" color="gray" className="mx-4 text-gray-400">Or continue with</ThemedText>
            <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        {/* Social Actions */}
        <View className="flex-row gap-4 mb-10 justify-center">
            <TouchableOpacity className="w-16 h-16 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm">
                <Ionicons name="logo-apple" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="w-16 h-16 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm">
                <Ionicons name="logo-google" size={28} color="black" />
            </TouchableOpacity>
             <TouchableOpacity className="w-16 h-16 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm">
                <Ionicons name="logo-facebook" size={28} color="#1877F2" />
            </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-auto mb-6 items-center">
            <View className="flex-row justify-center">
                <ThemedText color="gray">Don't have an account? </ThemedText>
                <Link href="/signup" asChild>
                    <TouchableOpacity>
                        <ThemedText color="primary" weight="bold">Sign Up</ThemedText>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>

      </View>
    </ScreenWrapper>
  );
}

