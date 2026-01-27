/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4A6741', // Next360 Green
        secondary: '#8AA881', // Sage Leaf
        accent: '#D4A373', // Harvest Gold
        dark: '#262A2B', // Charcoal Soil
        light: '#F5F5F0', // Organic Cream
        white: '#FFFFFF',
        gray: '#E5E7EB', // Stone Gray
        error: '#D64045',
        warning: '#E9C46A',
        success: '#4A6741',
      },
      fontFamily: {
        heading: ['Outfit_700Bold'],
        body: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        bold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
}
