import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <ThemedText variant="h2" weight="bold">This screen doesn't exist.</ThemedText>

        <Link href="/" className="mt-4 p-4">
          <ThemedText color="primary">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}
