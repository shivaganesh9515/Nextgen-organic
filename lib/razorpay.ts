// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function createRazorpayOrder(amount: number, currency: string = 'INR') {
//   try {
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay expects amount in paise
//       currency,
//       receipt: `order_${Date.now()}`,
//     });
//     return order;
//   } catch (error) {
//     console.error('Error creating Razorpay order:', error);
//     throw error;
//   }
// }

// For now, just return mock data
export async function createRazorpayOrder(amount: number, currency: string = 'INR') {
  console.log('Razorpay order would be created here');
  return {
    id: 'order_mock',
    amount: amount * 100,
    currency,
    receipt: `order_${Date.now()}`,
  };
}