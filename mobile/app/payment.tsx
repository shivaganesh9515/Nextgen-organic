import { View, Image, TouchableOpacity, ScrollView, Modal, Dimensions, Switch, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { api } from '@/services/api';

export default function PaymentScreen() {
  const router = useRouter();
  const [showVouchers, setShowVouchers] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'Card' | 'UPI' | 'COD'>('Card');
  const [isDefault, setIsDefault] = useState(false);
  
  // Dynamic Vouchers State
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const [loadingVouchers, setLoadingVouchers] = useState(false);
  
  const { height } = Dimensions.get('window');
  
  const { total } = useCart();
  const shippingCost = 40.00; 

  // Load Vouchers
  useEffect(() => {
     const loadVouchers = async () => {
         setLoadingVouchers(true);
         try {
             const fetchedOffers = await api.fetchOffers();
             if (fetchedOffers && fetchedOffers.length > 0) {
                 const mappedVouchers = fetchedOffers.map((o: any) => ({
                     id: o.id.toString(),
                     title: o.title,
                     code: o.code,
                     // Parse discount type (simple heuristic)
                     type: o.discount.includes('%') ? 'percent' : 'fixed',
                     value: parseFloat(o.discount.replace(/[^0-9.]/g, '')),
                     valid: o.expires_at ? `Valid till ${new Date(o.expires_at).toLocaleDateString()}` : 'Limited Time'
                 }));
                 setVouchers(mappedVouchers);
             } else {
                 setVouchers([]);
             }
         } catch (e) {
             console.log("Error fetching vouchers:", e);
             setVouchers([]);
         } finally {
             setLoadingVouchers(false);
         }
     };
     loadVouchers();
  }, []);

  const discountAmount = selectedVoucher 
      ? (selectedVoucher.type === 'percent' ? (total * selectedVoucher.value / 100) : selectedVoucher.value)
      : 0;
  
  const finalTotal = Math.max(0, total + shippingCost - discountAmount);

  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCart(); 

  const handlePay = async () => {
      setLoading(true);
      try {
          const orderPayload = {
              user_id: "ded8126b-6080-4595-bf89-40b38343e742", 
              customer_name: "Mobile User",
              customer_email: "mobile@nextgen.com",
              shipping_address: {
                  line1: "4th Block, Koramangala",
                  city: "Bangalore",
                  state: "KA",
                  pincode: "560034"
              },
              items: items.map(i => ({
                  product_id: parseInt(i.id) || 0,
                  quantity: i.quantity,
                  price: i.price
              }))
          };
          
          orderPayload.items = orderPayload.items.map(i => ({
              ...i,
              product_id: typeof i.product_id === 'string' && (i.product_id as string).startsWith('p') 
                ? parseInt((i.product_id as string).substring(1)) 
                : 1 
          }));

          await api.createOrder(orderPayload);
          Alert.alert("Success", "Order placed successfully! Check Admin Dashboard.");
          clearCart();
          router.replace('/(tabs)');
      } catch (error: any) {
          Alert.alert("Error", error.message || "Failed to place order.");
      } finally {
          setLoading(false);
      }
  };
  
  return (
    <ScreenWrapper bg="bg-white">
      <View className="flex-1 relative">
        
        {/* Header */}
        <View className="px-6 pt-4 mb-6 flex-row justify-between items-center relative">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2 z-10">
                <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <View className="absolute inset-0 items-center justify-center">
                <ThemedText variant="h3" color="dark" weight="bold" className="text-xl">Payment</ThemedText>
            </View>
            <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            <View className="px-6">
                
                {/* Address Section */}
                <View className="mb-8">
                    <ThemedText variant="h3" weight="bold" color="dark" className="mb-4 text-lg">Address</ThemedText>
                    <View className="flex-row items-center">
                        <View className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 relative mr-4 border border-gray-100">
                             <View className="absolute top-0 left-0 w-full h-full bg-[#EBF5FF]" />
                             <View className="absolute top-0 left-8 w-4 h-full bg-white rotate-12" />
                             <View className="absolute top-10 -left-2 w-full h-3 bg-white -rotate-12" />
                             <View className="absolute top-8 left-8 w-4 h-4 bg-orange-100 rounded-full items-center justify-center border-2 border-white shadow-sm z-10">
                                <View className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                             </View>
                        </View>
                        
                        <View className="flex-1 justify-center">
                            <ThemedText weight="bold" color="dark" className="text-base mb-1">Home</ThemedText>
                            <ThemedText color="gray" className="leading-5 opacity-70">
                                4th Block, Koramangala, Bangalore, India
                            </ThemedText>
                        </View> 
                    </View>
                </View>

                {/* Payment Method */}
                <View className="mb-8">
                    <ThemedText variant="h3" weight="bold" color="dark" className="mb-4 text-lg">Payment Method</ThemedText>
                    <TouchableOpacity 
                        onPress={() => setShowPaymentSheet(true)}
                        className="flex-row items-center border border-gray-100 rounded-[20px] p-4 bg-white shadow-sm"
                    >
                        <View className="w-12 h-8 relative mr-4 items-center justify-center">
                            {selectedPayment === 'Card' ? (
                                <>
                                    <View className="absolute left-0 w-6 h-6 rounded-full bg-red-500 opacity-80 top-1" />
                                    <View className="absolute right-2 w-6 h-6 rounded-full bg-yellow-500 opacity-80 top-1" />
                                </>
                            ) : selectedPayment === 'UPI' ? (
                                <View className="w-10 h-8 rounded bg-gray-50 items-center justify-center border border-gray-200">
                                    <Ionicons name="wallet-outline" size={20} color="#262A2B" />
                                </View>
                            ) : (
                                <View className="w-10 h-8 rounded bg-gray-50 items-center justify-center border border-gray-200">
                                     <Ionicons name="cash-outline" size={20} color="#262A2B" />
                                </View>
                            )}
                        </View>
                        
                        <View className="flex-1">
                            <ThemedText weight="bold" color="dark" className="text-base">
                                {selectedPayment === 'Card' ? 'Master Card' : selectedPayment === 'UPI' ? 'UPI' : 'Cash on Delivery'}
                            </ThemedText>
                            <ThemedText color="gray" className="text-xs opacity-60">
                                {selectedPayment === 'Card' ? '**** **** **** 8329' : selectedPayment === 'UPI' ? 'Pay via UPI' : 'Pay when received'}
                            </ThemedText>
                        </View>
                        
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Voucher */}
                <View className="mb-8">
                    <ThemedText variant="h3" weight="bold" color="dark" className="mb-4 text-lg">Voucher</ThemedText>
                    <TouchableOpacity 
                        className={`flex-row items-center justify-between ${selectedVoucher ? 'bg-orange-50/50 p-3 rounded-2xl border border-orange-100' : ''}`}
                        onPress={() => setShowVouchers(true)}
                    >
                         <View className="flex-row items-center gap-3">
                             <View className="w-8 h-8 items-center justify-center">
                                <Ionicons name="ticket-outline" size={24} color="#FF6B00" />
                             </View>
                             <View>
                                <ThemedText color="dark" className="text-base opacity-80">
                                    {selectedVoucher ? selectedVoucher.code : 'Add Voucher or Promo Code'}
                                </ThemedText>
                                {selectedVoucher && (
                                    <ThemedText color="gray" className="text-xs text-[#FF6B00]">
                                        {selectedVoucher.title} Applied
                                    </ThemedText>
                                )}
                             </View>
                         </View>
                         <View className={`w-10 h-10 rounded-full items-center justify-center ${selectedVoucher ? 'bg-[#FF6B00]' : 'bg-orange-50'}`}>
                             <Ionicons name={selectedVoucher ? "checkmark" : "add"} size={20} color={selectedVoucher ? "white" : "#FF6B00"} />
                         </View>
                    </TouchableOpacity>
                </View>

                {/* Cost Breakdown */}
                <View className="mb-8">
                    <View className="flex-row justify-between mb-3">
                        <ThemedText color="gray" className="opacity-60 text-base">Sub total</ThemedText>
                        <ThemedText weight="bold" color="dark" className="text-base">₹ {total.toFixed(2)}</ThemedText>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <ThemedText color="gray" className="opacity-60 text-base">Shipping cost</ThemedText>
                        <ThemedText weight="bold" color="dark" className="text-base">₹ {shippingCost.toFixed(2)}</ThemedText>
                    </View>
                    {selectedVoucher && (
                         <View className="flex-row justify-between mb-3">
                            <ThemedText color="gray" className="opacity-60 text-base text-[#FF6B00]">Discount ({selectedVoucher.code})</ThemedText>
                            <ThemedText weight="bold" className="text-base text-[#FF6B00]">- ₹ {discountAmount.toFixed(2)}</ThemedText>
                        </View>
                    )}
                    
                    {/* Dashed Line */}
                    <View className="h-[1px] w-full bg-transparent border-t border-dashed border-gray-300 mb-6 mt-2 relative" style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: '#E5E7EB' }} />

                    <View className="flex-row justify-between items-center">
                        <ThemedText weight="bold" color="dark" className="text-xl">Total</ThemedText>
                        <ThemedText weight="bold" color="dark" className="text-xl">₹ {finalTotal.toFixed(2)}</ThemedText>
                    </View>
                </View>

            </View>
        </ScrollView>

        {/* Footer Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-6 pb-10 border-t border-gray-50 shadow-lg shadow-black/5 rounded-t-[32px]">

             <TouchableOpacity 
                activeOpacity={0.9}
                className={`w-full bg-[#2D6A4F] h-16 rounded-[32px] items-center justify-center shadow-lg shadow-[#2D6A4F]/25 ${loading ? 'opacity-70' : ''}`}
                onPress={handlePay}
                disabled={loading}
            >
                <ThemedText color="white" weight="bold" className="text-lg">
                    {loading ? "Processing..." : `Pay ₹${finalTotal.toFixed(2)}`}
                </ThemedText>
            </TouchableOpacity>
        </View>

        {/* Voucher Modal Overlay */}
        {showVouchers && (
            <View className="absolute top-0 bottom-0 left-0 right-0 z-50">
                <TouchableOpacity className="absolute inset-0 bg-black/40" activeOpacity={1} onPress={() => setShowVouchers(false)} />
                <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] pt-4 pb-10 px-6 h-[50%]">
                    <View className="items-center mb-6">
                        <View className="w-10 h-1 bg-gray-200 rounded-full" />
                    </View>
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="w-10" />
                        <ThemedText variant="h3" color="dark" weight="bold" className="text-center">Select Voucher</ThemedText>
                        <TouchableOpacity onPress={() => setShowVouchers(false)}>
                            <ThemedText weight="bold" className="text-[#FF5A5F]">Cancel</ThemedText>
                        </TouchableOpacity>
                    </View>
                    
                    {loadingVouchers ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator color="#2D6A4F" />
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="gap-4">
                                {vouchers.length === 0 ? (
                                    <View className="items-center py-6">
                                        <Ionicons name="ticket-outline" size={48} color="#E5E7EB" />
                                        <ThemedText className="text-gray-400 mt-2">No active vouchers</ThemedText>
                                    </View>
                                ) : (
                                    vouchers.map((voucher) => {
                                        const isSelected = selectedVoucher?.id === voucher.id;
                                        return (
                                        <View key={voucher.id} className={`flex-row items-center p-4 border rounded-[24px] bg-white shadow-sm relative overflow-hidden ${isSelected ? 'border-[#FF5A5F]' : 'border-gray-100'}`}>
                                             <View className="w-12 h-12 bg-orange-50 rounded-xl items-center justify-center mr-4">
                                                  <Ionicons name="ticket" size={24} color="#FFD180" />
                                             </View>
                                             <View className="flex-1">
                                                  <ThemedText weight="bold" color="dark" className="text-base mb-1">{voucher.title}</ThemedText>
                                                  <ThemedText variant="caption" color="gray" className="opacity-60">{voucher.valid}</ThemedText>
                                                  <ThemedText className="text-xs text-gray-400 mt-1">Code: {voucher.code}</ThemedText>
                                             </View>
                                             <TouchableOpacity 
                                                className={`px-4 py-2 rounded-xl ${isSelected ? 'bg-gray-100' : 'bg-[#FF5A5F]'}`}
                                                onPress={() => {
                                                    if (isSelected) setSelectedVoucher(null); // Toggle off
                                                    else setSelectedVoucher(voucher);
                                                    setShowVouchers(false);
                                                }}
                                             >
                                                  <ThemedText color={isSelected ? 'gray' : 'white'} weight="bold" className="text-sm">
                                                    {isSelected ? 'Remove' : 'Apply'}
                                                  </ThemedText>
                                             </TouchableOpacity>
                                        </View>
                                    )})
                                )}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
        )}

        {/* Payment Method Modal Overlay */}
        {showPaymentSheet && (
            <View className="absolute top-0 bottom-0 left-0 right-0 z-50">
                <TouchableOpacity className="absolute inset-0 bg-black/40" activeOpacity={1} onPress={() => setShowPaymentSheet(false)} />
                <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] pt-4 pb-10 px-6">
                    <View className="items-center mb-6">
                        <View className="w-10 h-1 bg-gray-200 rounded-full" />
                    </View>
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="w-10" />
                        <ThemedText variant="h3" color="dark" weight="bold" className="text-center">Select Payment</ThemedText>
                        <TouchableOpacity onPress={() => setShowPaymentSheet(false)}>
                            <ThemedText weight="bold" className="text-[#FF5A5F]">Cancel</ThemedText>
                        </TouchableOpacity>
                    </View>
                    
                    <View className="gap-4 mb-4">
                        {/* Card Option */}
                        <TouchableOpacity 
                            onPress={() => { setSelectedPayment('Card'); setShowPaymentSheet(false); }}
                            className={`flex-row items-center p-4 border rounded-[24px] bg-white shadow-sm ${selectedPayment === 'Card' ? 'border-primary' : 'border-gray-100'}`}
                        >
                             <View className="w-12 h-8 relative mr-4 bg-gray-50 rounded items-center justify-center border border-gray-200">
                                  <Ionicons name="card" size={20} color="#262A2B" />
                             </View>
                             <View className="flex-1">
                                  <ThemedText weight="bold" color="dark" className="text-base">Card</ThemedText>
                                  <ThemedText color="gray" className="text-xs opacity-60">**** **** **** 8329</ThemedText>
                             </View>
                             <View className={`w-6 h-6 rounded-full border items-center justify-center ${selectedPayment === 'Card' ? 'border-primary' : 'border-gray-300'}`}>
                                  {selectedPayment === 'Card' && <View className="w-3 h-3 rounded-full bg-primary" />}
                             </View>
                        </TouchableOpacity>

                        {/* UPI Option */}
                        <TouchableOpacity 
                            onPress={() => { setSelectedPayment('UPI'); setShowPaymentSheet(false); }}
                            className={`flex-row items-center p-4 border rounded-[24px] bg-white shadow-sm ${selectedPayment === 'UPI' ? 'border-primary' : 'border-gray-100'}`}
                        >
                             <View className="w-12 h-8 relative mr-4 bg-gray-50 rounded items-center justify-center border border-gray-200">
                                  <Ionicons name="wallet-outline" size={20} color="#262A2B" />
                             </View>
                             <View className="flex-1">
                                  <ThemedText weight="bold" color="dark" className="text-base">UPI</ThemedText>
                                  <ThemedText color="gray" className="text-xs opacity-60">Pay via UPI Apps</ThemedText>
                             </View>
                             <View className={`w-6 h-6 rounded-full border items-center justify-center ${selectedPayment === 'UPI' ? 'border-primary' : 'border-gray-300'}`}>
                                  {selectedPayment === 'UPI' && <View className="w-3 h-3 rounded-full bg-primary" />}
                             </View>
                        </TouchableOpacity>

                        {/* COD Option */}
                        <TouchableOpacity 
                            onPress={() => { setSelectedPayment('COD'); setShowPaymentSheet(false); }}
                            className={`flex-row items-center p-4 border rounded-[24px] bg-white shadow-sm ${selectedPayment === 'COD' ? 'border-primary' : 'border-gray-100'}`}
                        >
                             <View className="w-12 h-8 relative mr-4 bg-gray-50 rounded items-center justify-center border border-gray-200">
                                  <Ionicons name="cash-outline" size={20} color="#262A2B" />
                             </View>
                             <View className="flex-1">
                                  <ThemedText weight="bold" color="dark" className="text-base">Cash on Delivery</ThemedText>
                                  <ThemedText color="gray" className="text-xs opacity-60">Pay when you receive</ThemedText>
                             </View>
                             <View className={`w-6 h-6 rounded-full border items-center justify-center ${selectedPayment === 'COD' ? 'border-primary' : 'border-gray-300'}`}>
                                  {selectedPayment === 'COD' && <View className="w-3 h-3 rounded-full bg-primary" />}
                             </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                         onPress={() => { setShowPaymentSheet(false); setShowAddCard(true); }}
                         className="flex-row items-center justify-center py-4 mb-4"
                    >
                         <Ionicons name="add-circle-outline" size={24} color="#FF5A5F" style={{ marginRight: 8 }} />
                         <ThemedText color="primary" weight="bold" className="text-[#FF5A5F]">Add Card</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        )}

        {/* Add Card Modal Overlay */}
        {showAddCard && (
            <View className="absolute top-0 bottom-0 left-0 right-0 z-50">
                <TouchableOpacity className="absolute inset-0 bg-black/40" activeOpacity={1} onPress={() => setShowAddCard(false)} />
                <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] pt-4 pb-10 px-6">
                    <View className="items-center mb-6">
                        <View className="w-10 h-1 bg-gray-200 rounded-full" />
                    </View>
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="w-10" />
                        <ThemedText variant="h3" color="dark" weight="bold" className="text-center">Add Card</ThemedText>
                        <TouchableOpacity onPress={() => setShowAddCard(false)}>
                            <ThemedText weight="bold" className="text-[#FF5A5F]">Cancel</ThemedText>
                        </TouchableOpacity>
                    </View>

                    <ThemedText color="gray" className="mb-6 opacity-60 leading-5">
                       Start typing to add your credit card details. Everything will update according to your data.
                    </ThemedText>
                    
                    <View className="gap-4 mb-6">
                        {/* Card Number Input */}
                        <View className="flex-row items-center border border-gray-100 rounded-[20px] px-4 h-14 bg-white shadow-sm">
                            <View className="w-8 h-5 bg-gray-100 rounded items-center justify-center mr-3 relative overflow-hidden">
                                <View className="absolute left-0 w-4 h-4 rounded-full bg-red-500 opacity-80" />
                                <View className="absolute right-0 w-4 h-4 rounded-full bg-yellow-500 opacity-80" />
                            </View>
                            <ThemedText color="dark" weight="medium" className="flex-1 text-base">0192 - 1245 - 0000 - 0000</ThemedText>
                            <Ionicons name="checkmark-circle" size={20} color="#00C853" />
                        </View>

                        <View className="flex-row gap-4">
                            {/* Expiry Input */}
                            <View className="flex-1 flex-row items-center border border-gray-100 rounded-[20px] px-4 h-14 bg-white shadow-sm">
                                <ThemedText color="dark" weight="medium" className="flex-1 text-base">12/22</ThemedText>
                                <Ionicons name="checkmark-circle" size={20} color="#00C853" />
                            </View>

                            {/* CVC Input */}
                            <View className="flex-1 flex-row items-center border border-gray-100 rounded-[20px] px-4 h-14 bg-white shadow-sm">
                                <ThemedText color="dark" weight="medium" className="flex-1 text-base">234</ThemedText>
                                <Ionicons name="checkmark-circle" size={20} color="#00C853" />
                            </View>
                        </View>
                    </View>

                    {/* Set Default Toggle */}
                    <View className="flex-row items-center justify-between mb-8">
                        <View className="flex-row items-center gap-2">
                             <Switch 
                                trackColor={{ false: "#767577", true: "#FF6B00" }}
                                thumbColor={isDefault ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={setIsDefault}
                                value={isDefault}
                                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                             />
                             <ThemedText color="gray" className="text-base opacity-60">Set as default</ThemedText>
                        </View>
                    </View>

                    {/* Save Button */}
                     <TouchableOpacity 
                        className="w-full bg-[#FF5A5F] h-14 rounded-[28px] items-center justify-center shadow-lg shadow-[#FF5A5F]/25"
                        onPress={() => { setShowAddCard(false); setSelectedPayment('Card'); }}
                    >
                        <ThemedText color="white" weight="bold" className="text-lg">Save Card</ThemedText>
                    </TouchableOpacity>

                </View>
            </View>
        )}

      </View>
    </ScreenWrapper>
  );
}
