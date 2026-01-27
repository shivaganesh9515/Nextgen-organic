import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'dark' | 'gray' | 'white' | 'error';
  weight?: 'bold' | 'semibold' | 'medium' | 'regular';
}

export function ThemedText({ 
  children, 
  variant = 'body', 
  color = 'dark',
  weight = 'regular',
  className = '', 
  ...props 
}: ThemedTextProps) {
  
  const baseStyle = "font-sans";
  
  const variants = {
    h1: "text-3xl",
    h2: "text-2xl",
    h3: "text-xl",
    body: "text-base",
    caption: "text-sm",
    label: "text-xs uppercase tracking-wider",
  };

  const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    dark: "text-dark",
    gray: "text-gray-500",
    white: "text-white",
    error: "text-red-500",
  };

  const weights = {
    bold: "font-bold",
    semibold: "font-semibold",
    medium: "font-medium",
    regular: "font-normal",
  };

  return (
    <Text 
      className={`${baseStyle} ${variants[variant]} ${colors[color]} ${weights[weight]} ${className}`} 
      {...props}
    >
      {children}
    </Text>
  );
}
