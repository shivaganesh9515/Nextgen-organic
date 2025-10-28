import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle payment success
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      // Update order
      const order = await prisma.order.update({
        where: { razorpayOrderId },
        data: {
          paymentStatus: 'COMPLETED',
          status: 'CONFIRMED',
          razorpayPaymentId,
        },
      });

      // Add tracking entry
      await prisma.orderTracking.create({
        data: {
          orderId: order.id,
          status: 'CONFIRMED',
          description: 'Payment received and order confirmed',
        },
      });

      // TODO: Send confirmation email and notify vendor

      console.log(`Payment successful for order: ${order.orderNumber}`);
    }

    // Handle payment failure
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      await prisma.order.update({
        where: { razorpayOrderId },
        data: {
          paymentStatus: 'FAILED',
          status: 'CANCELLED',
        },
      });

      console.log(`Payment failed for order: ${razorpayOrderId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}