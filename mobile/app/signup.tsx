import { View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Mock signup logic
    router.replace('/(tabs)');
  };

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6">
        
        {/* Header */}
        <View className="mt-12 mb-8">
             <ThemedText variant="h1" color="dark" className="font-heading mb-2 text-3xl">Sign Up</ThemedText>
             <ThemedText variant="body" color="gray" className="text-base text-gray-400">Please fill out the form below!</ThemedText>
        </View>

        {/* Form */}
        <View className="space-y-4 mb-8">
            {/* Name Input */}
            <View className="w-full flex-row items-center border border-gray-200 rounded-full px-4 h-14 bg-white focus:border-primary">
                <ThemedText className="mr-3 text-gray-400">👤</ThemedText>
                <TextInput 
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-base font-body text-dark h-full"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email Input */}
            <View className="w-full flex-row items-center border border-gray-200 rounded-full px-4 h-14 bg-white focus:border-primary">
                <ThemedText className="mr-3 text-gray-400">✉️</ThemedText>
                <TextInput 
                    placeholder="Type your email"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-base font-body text-dark h-full"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            {/* Password Input */}
            <View className="w-full flex-row items-center border border-gray-200 rounded-full px-4 h-14 bg-white focus:border-primary">
                <ThemedText className="mr-3 text-gray-400">🔒</ThemedText>
                <TextInput 
                    placeholder="Type your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    className="flex-1 text-base font-body text-dark h-full"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity>
                    <ThemedText className="text-gray-400">👁️</ThemedText>
                </TouchableOpacity>
            </View>
        </View>

        {/* Primary Action */}
        <TouchableOpacity 
           onPress={handleSignup}
           activeOpacity={0.8}
           className="w-full bg-primary h-14 rounded-full items-center justify-center shadow-lg shadow-primary/20 mb-8"
        >
           <ThemedText color="white" weight="bold" variant="body" className="text-lg">Sign Up</ThemedText>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-100" />
            <ThemedText variant="caption" color="gray" className="mx-4 text-gray-400">Or sign up with</ThemedText>
            <View className="flex-1 h-[1px] bg-gray-100" />
        </View>

        {/* Social Actions */}
        <View className="space-y-4 mb-8 gap-4">
            <TouchableOpacity className="w-full bg-white border border-gray-100 h-14 rounded-full items-center flex-row justify-center space-x-3 shadow-sm">
                <ThemedText className="mr-2">🍎</ThemedText>
                <ThemedText weight="medium">Sign Up with Apple</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="w-full bg-white border border-gray-100 h-14 rounded-full items-center flex-row justify-center space-x-3 shadow-sm">
                <ThemedText className="mr-2">🔵</ThemedText>
                <ThemedText weight="medium">Sign Up with Google</ThemedText>
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
            
            <ThemedText variant="caption" color="gray" className="text-center text-xs text-gray-400 px-8 leading-5">
                By using our services you are agreeing to our <ThemedText color="primary" weight="bold" className="text-xs">Terms</ThemedText> and <ThemedText color="primary" weight="bold" className="text-xs">Privacy Policy</ThemedText>
            </ThemedText>
        </View>

      </View>
    </ScreenWrapper>
  );
}
