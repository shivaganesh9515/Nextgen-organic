import { View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleInput = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text.length === 1 && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    // Handle backspace (move to previous) - Logic handled in onKeyPress
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 px-6 pt-10">
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-10 w-full">
             <ThemedText variant="h1" color="dark" className="font-heading mb-3 text-3xl text-left">Verification Code</ThemedText>
             <ThemedText variant="body" color="gray" className="text-left text-base text-gray-500 leading-6">
                Please enter the verification code that we have sent to your email
             </ThemedText>
        </View>

        {/* OTP Inputs */}
        <View className="flex-row justify-between gap-4 mb-8 px-2">
            {code.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={ref => { inputs.current[index] = ref; }}
                    className={`w-16 h-16 rounded-full border-2 text-center text-2xl font-heading text-dark
                        ${digit ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}
                        ${index === code.findIndex(c => c === '') ? 'border-primary' : ''} 
                    `}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleInput(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                    selectionColor="#4A6741"
                />
            ))}
        </View>

        {/* Resend Code */}
        <TouchableOpacity className="mb-10 items-center">
            <ThemedText color="primary" weight="bold" className="text-base">Resend Code</ThemedText>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity 
           onPress={handleVerify}
           activeOpacity={0.9}
           className="w-full bg-primary h-14 rounded-full items-center justify-center shadow-lg shadow-primary/25"
        >
           <ThemedText color="white" weight="bold" variant="body" className="text-lg">Continue</ThemedText>
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
}
