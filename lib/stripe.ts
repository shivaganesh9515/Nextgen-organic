// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// });

// export async function createPaymentIntent(amount: number, currency: string = 'usd') {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       metadata: {
//         integration_check: 'accept_a_payment',
//       },
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     return paymentIntent;
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     throw error;
//   }
// }

// For now, just return mock data
export async function createPaymentIntent(amount: number, _currency: string = 'usd') {
  // _currency is passed but not used in this function
  // This is intentional as we're using mock data for now
  console.log('Payment intent would be created here');
  return {
    id: 'pi_mock',
    client_secret: 'mock_client_secret',
    status: 'requires_payment_method',
  };
}