import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// GET - Get user's cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            vendor: {
              select: {
                id: true,
                businessName: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate totals
    let subtotal = 0;
    for (const item of cartItems) {
      const price = item.product.discountPrice || item.product.price;
      subtotal += price * item.quantity;
    }

    let totalQuantity = 0;
    for (const item of cartItems) {
      totalQuantity += item.quantity;
    }

    const deliveryFee = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + tax;

    return NextResponse.json({
      items: cartItems,
      summary: {
        itemCount: cartItems.length,
        totalQuantity,
        subtotal,
        deliveryFee,
        tax,
        total,
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
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
    const { productId, quantity } = addToCartSchema.parse(body);

    // Check if product exists and is available
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 400 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    let cartItem;

    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: true,
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      });
    }

    return NextResponse.json({
      message: 'Item added to cart',
      item: cartItem,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// PATCH - Update cart item quantity
const updateCartSchema = z.object({
  cartItemId: z.string(),
  quantity: z.number().int().positive(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { cartItemId, quantity } = updateCartSchema.parse(body);

    // Check if cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    if (!cartItem || cartItem.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Check stock
    if (cartItem.product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true },
    });

    return NextResponse.json({
      message: 'Cart updated',
      item: updatedItem,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from cart
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get('itemId');

    if (!cartItemId) {
      return NextResponse.json(
        { error: 'Cart item ID required' },
        { status: 400 }
      );
    }

    // Check if cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Delete item
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}