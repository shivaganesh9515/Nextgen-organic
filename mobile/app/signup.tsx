import { View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // Mock signup logic
    router.push('/verify');
  };

  return (
    <ScreenWrapper bg="bg-light">
      <View className="flex-1 px-8 justify-center">
        
        {/* Header */}
        <View className="items-center mb-10">
             <View className="mb-6">
                <Image 
                  source={require('@/assets/logo.png')} 
                  className="w-40 h-40"
                  resizeMode="contain"
                />
             </View>
             <ThemedText variant="h1" color="dark" className="font-heading mb-2 text-3xl text-center">Create Account</ThemedText>
             <ThemedText variant="body" color="gray" className="text-center text-base opacity-80">Join our community today!</ThemedText>
        </View>

        {/* Form */}
        <View className="mb-8 gap-5">
            {/* Name Input */}
            <View className="w-full flex-row items-center border border-gray-200/60 rounded-2xl px-4 h-14 bg-white shadow-sm focus:border-primary">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                <TextInput 
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-base font-body text-dark h-full"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email Input */}
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

            {/* Password Input */}
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
        </View>

        {/* Primary Action */}
        <TouchableOpacity 
           onPress={handleSignup}
           activeOpacity={0.8}
           className="w-full bg-primary h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/25 mb-8"
        >
           <ThemedText color="white" weight="bold" variant="body" className="text-lg">Sign Up</ThemedText>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <ThemedText variant="caption" color="gray" className="mx-4 text-gray-400">Or sign up with</ThemedText>
            <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        {/* Social Actions */}
        <View className="flex-row gap-4 mb-8 justify-center">
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
            <View className="flex-row justify-center mb-6">
                <ThemedText color="gray">Have an account? </ThemedText>
                <Link href="/login" asChild>
                    <TouchableOpacity>
                        <ThemedText color="primary" weight="bold">Sign In</ThemedText>
                    </TouchableOpacity>
                </Link>
            </View>
            
            <ThemedText variant="caption" color="gray" className="text-center text-xs text-gray-400 px-8 leading-5 max-w-xs">
                By signing up you agree to our <ThemedText color="primary" weight="bold" className="text-xs">Terms</ThemedText> and <ThemedText color="primary" weight="bold" className="text-xs">Privacy Policy</ThemedText>
            </ThemedText>
        </View>

      </View>
    </ScreenWrapper>
  );
}

