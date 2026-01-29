import { View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, VENDORS } from '@/constants/mocks';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  
  const product = PRODUCTS.find(p => p.id === productId);
  
  if (!product) return null; // Or loader
  
  const vendor = VENDORS.find(v => v.id === product.vendorId);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Navbar Overlay */}
      <View className="absolute top-12 left-5 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full items-center justify-center">
         <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
         </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
         {/* IMAGE */}
         <View className="w-full h-96 bg-gray-100 relative">
             <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
             {product.oldPrice && (
                 <View className="absolute bottom-5 right-5 bg-red-500 px-3 py-1 rounded-lg">
                    <ThemedText weight="bold" className="text-white text-xs">
                        SAVE {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </ThemedText>
                 </View>
             )}
         </View>
         
         {/* DETAILS */}
         <View className="px-5 pt-6 pb-24 rounded-t-[2.5rem] -mt-10 bg-white shadow-xl">
             
             {/* Vendor Link */}
             {vendor && (
                <TouchableOpacity 
                   onPress={() => router.push(`/vendor/${vendor.id}`)}
                   className="flex-row items-center mb-3 opacity-80"
                >
                   <Image source={{ uri: vendor.image }} className="w-6 h-6 rounded-full mr-2" />
                   <ThemedText className="text-gray-600 text-sm font-medium">{vendor.name} • {vendor.location}</ThemedText>
                </TouchableOpacity>
             )}
             
             <ThemedText weight="bold" className="text-2xl text-gray-900 mb-2 leading-tight">{product.name}</ThemedText>
             
             {/* Rating & Category */}
             <View className="flex-row justify-between items-center mb-6">
                 <View className="bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                     <ThemedText className="text-emerald-700 text-xs font-bold uppercase tracking-wider">{product.category}</ThemedText>
                 </View>
                 <View className="flex-row items-center">
                     <Ionicons name="star" size={16} color="#F59E0B" />
                     <ThemedText className="ml-1 font-bold text-gray-900">{product.rating.toFixed(1)}</ThemedText>
                     <ThemedText className="ml-1 text-gray-500 text-xs">({product.reviews} reviews)</ThemedText>
                 </View>
             </View>
             
             {/* Price Section */}
             <View className="flex-row items-center mb-8">
                 <ThemedText className="text-3xl font-bold text-emerald-800">₹{product.price}</ThemedText>
                 {product.oldPrice && (
                     <ThemedText className="text-lg text-gray-400 line-through ml-3">₹{product.oldPrice}</ThemedText>
                 )}
                 <ThemedText className="text-gray-500 ml-auto lowercase text-sm">per unit/kg</ThemedText>
             </View>
             
             <View className="h-px bg-gray-100 mb-6" />
             
             {/* Description */}
             <ThemedText weight="bold" className="text-lg mb-2 text-gray-900">Description</ThemedText>
             <ThemedText className="text-gray-600 leading-6 mb-8">{product.description}</ThemedText>
             
             {/* Delivery Info */}
             <View className="bg-gray-50 p-4 rounded-2xl flex-row items-center mb-8">
                 <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-4">
                     <Ionicons name="bicycle" size={20} color="#2D6A4F" />
                 </View>
                 <View>
                     <ThemedText weight="bold" className="text-gray-900 text-sm">Fast Delivery</ThemedText>
                     <ThemedText className="text-gray-500 text-xs">Order by 2PM, get it today.</ThemedText>
                 </View>
             </View>

         </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 flex-row items-center justify-between pb-8">
          {/* Qty Stepper */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mr-4">
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
                 <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <ThemedText weight="bold" className="mx-4 text-lg">{qty}</ThemedText>
              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                 <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
          </View>
          
          {/* Add Cart Btn */}
          <TouchableOpacity 
             onPress={() => addToCart(product, qty)}
             className="flex-1 bg-[#2D6A4F] py-4 rounded-2xl shadow-lg shadow-emerald-200 items-center justify-center flex-row"
          >
              <Ionicons name="cart" size={20} color="white" className="mr-2" />
              <ThemedText weight="bold" className="text-white text-lg">Add to Cart</ThemedText>
          </TouchableOpacity>
      </View>
    </View>
  );
}
