'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { RazorpayCheckout } from '../../../components/payments/RazorpayCheckout';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay',
  });

  const steps = [
    { id: '1', title: 'Delivery Address' },
    { id: '2', title: 'Payment Method' },
    { id: '3', title: 'Order Summary' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSuccess = (response: unknown) => {
    console.log('Payment successful:', response);
    setPaymentSuccess(true);
    setOrderPlaced(true);
  };

  const handlePaymentFailure = (error: string) => {
    console.log('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  const placeOrder = () => {
    // In a real application, this would create an order in the database
    console.log('Order placed with data:', { formData, cartItems });
    handleNext();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto card">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some organic products to your cart before checking out.</p>
          <Button onClick={() => window.location.href = '/shop'}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Checkout" 
        subtitle="Complete your order and payment information"
      />

      {/* Order Placed Success */}
      {orderPlaced && (
        <motion.div
          className="max-w-md mx-auto card text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            {paymentSuccess 
              ? 'Your payment has been processed and your order is confirmed.' 
              : 'Your order has been placed. Please complete the payment.'}
          </p>
          <div className="space-y-3">
            <Button className="w-full" onClick={() => window.location.href = '/account/orders'}>
              View Order Status
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/shop'}>
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      )}

      {/* Checkout Steps */}
      {!orderPlaced && (
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute top-4 left-0 h-1 bg-green-500 z-10 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="relative z-20 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <span className="text-sm font-medium text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Delivery Address */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Delivery Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    label="Pincode"
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => updateFormData('pincode', e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    rows={3}
                    className="input-field w-full"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="Street address, apartment, building, etc."
                    required
                  />
                </div>
                
                <div>
                  <Input
                    label="City"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    label="State"
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <div></div> {/* Empty div for spacing */}
                <Button onClick={handleNext}>
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                Payment Method
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 border-2 border-green-500 rounded-lg">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                    className="h-4 w-4 text-green-600"
                  />
                  <label htmlFor="razorpay" className="ml-3 flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <span className="block text-sm font-medium text-gray-700">Razorpay</span>
                      <span className="block text-xs text-gray-500">Pay with credit/debit card, UPI, net banking</span>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                    className="h-4 w-4 text-green-600"
                  />
                  <label htmlFor="cod" className="ml-3 flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <span className="block text-sm font-medium text-gray-700">Cash on Delivery</span>
                      <span className="block text-xs text-gray-500">Pay when your order is delivered</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrev}>
                  Back
                </Button>
                <Button onClick={placeOrder}>
                  Review Order
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Order Summary */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Order Summary */}
              <div className="lg:col-span-2 card">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-green-600" />
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee</span>
                    <span>₹40</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Discount</span>
                    <span className="text-green-600">-₹0</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{(getTotalPrice() + 40).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Complete Payment</h3>
                
                {formData.paymentMethod === 'razorpay' ? (
                  <RazorpayCheckout
                    orderDetails={{
                      amount: getTotalPrice() + 40,
                      currency: 'INR',
                      orderId: `ORD-${Date.now()}`,
                      customerName: formData.fullName,
                      customerEmail: formData.email,
                      customerPhone: formData.phone,
                    }}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                  />
                ) : (
                  <div className="space-y-4">
                    <Button className="w-full" onClick={() => setOrderPlaced(true)}>
                      Place Order (Cash on Delivery)
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                      You will pay ₹{(getTotalPrice() + 40).toLocaleString('en-IN')} when your order is delivered.
                    </p>
                  </div>
                )}
                
                <Button variant="outline" className="w-full mt-4" onClick={handlePrev}>
                  Back to Edit
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}