import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const checkoutSchema = z.object({
  addressId: z.string(),
  paymentMethod: z.enum(['razorpay', 'cod']),
  deliveryDate: z.string().optional(),
  deliverySlot: z.enum(['morning', 'afternoon', 'evening']).optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = checkoutSchema.parse(body);

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            vendor: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: validatedData.addressId,
        userId: session.user.id,
      },
    });

    if (!address) {
      return NextResponse.json(
        { error: 'Invalid address' },
        { status: 400 }
      );
    }

    // Group cart items by vendor
    const vendorGroups: Record<string, typeof cartItems> = {};
    for (const item of cartItems) {
      const vendorId = item.product.vendorId;
      if (!vendorGroups[vendorId]) {
        vendorGroups[vendorId] = [];
      }
      vendorGroups[vendorId].push(item);
    }

    const orders = [];

    // Create separate order for each vendor
    for (const [vendorId, items] of Object.entries(vendorGroups)) {
      // Calculate totals
      let subtotal = 0;
      for (const item of items) {
        const price = item.product.discountPrice || item.product.price;
        subtotal += price * item.quantity;
      }
      
      const deliveryFee = subtotal > 500 ? 0 : 40;
      const tax = subtotal * 0.05;
      const total = subtotal + deliveryFee + tax;

      // Generate order number
      const orderNumber = `ORG${Date.now()}${Math.floor(Math.random() * 1000)}`;

      // Create Razorpay order if payment method is razorpay
      let razorpayOrderId = null;
      if (validatedData.paymentMethod === 'razorpay') {
        const razorpayOrder = await razorpay.orders.create({
          amount: Math.round(total * 100), // Amount in paise
          currency: 'INR',
          receipt: orderNumber,
          notes: {
            orderId: orderNumber,
            customerId: session.user.id,
            vendorId,
          },
        });
        razorpayOrderId = razorpayOrder.id;
      }

      // Create order
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerId: session.user.id,
          vendorId,
          addressId: validatedData.addressId,
          status: 'PENDING',
          paymentStatus: validatedData.paymentMethod === 'cod' ? 'PENDING' : 'PROCESSING',
          paymentMethod: validatedData.paymentMethod,
          razorpayOrderId,
          subtotal,
          deliveryFee,
          tax,
          total,
          notes: validatedData.notes,
          deliveryDate: validatedData.deliveryDate
            ? new Date(validatedData.deliveryDate)
            : null,
          deliverySlot: validatedData.deliverySlot,
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unit: item.product.unit,
              price: item.product.discountPrice || item.product.price,
              total:
                (item.product.discountPrice || item.product.price) * item.quantity,
            })),
          },
          tracking: {
            create: {
              status: 'PENDING',
              description: 'Order placed successfully',
            },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          vendor: {
            select: {
              businessName: true,
              phone: true,
            },
          },
          address: true,
        },
      });

      // Update product stock
      for (const item of items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            sales: { increment: item.quantity },
          },
        });
      }

      orders.push(order);
    }

    // Clear cart after successful order creation
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id },
    });

    // TODO: Send order confirmation email

    return NextResponse.json({
      message: 'Order placed successfully',
      orders,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error during checkout:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}