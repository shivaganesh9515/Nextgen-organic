import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  bg?: string;
  safeArea?: boolean;
}

export function ScreenWrapper({ 
  children, 
  bg = "bg-light", 
  safeArea = true,
  className = "",
  ...props 
}: ScreenWrapperProps) {
  
  if (safeArea) {
    return (
      <SafeAreaView className={`flex-1 ${bg} ${className}`} edges={['top', 'left', 'right']} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View className={`flex-1 ${bg} ${className}`} {...props}>
      {children}
    </View>
  );
}
