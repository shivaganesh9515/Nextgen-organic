import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart, { ICartItem } from '@/models/Cart';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { CustomUser } from '../auth/[...nextauth]/route';

// GET user cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId: (session.user as CustomUser).id })
      .populate('items.productId', 'name price images stock')
      .populate('items.vendorId', 'storeName')
      .lean();

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      });
    }

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST add item to cart
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { productId, quantity } = await req.json();

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: (session.user as CustomUser).id });

    if (!cart) {
      cart = new Cart({
        userId: (session.user as CustomUser).id,
        items: [],
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        vendorId: product.vendorId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    // Populate and return updated cart
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price images stock')
      .populate('items.vendorId', 'storeName');

    return NextResponse.json({
      success: true,
      data: populatedCart,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// PUT update cart item
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { productId, quantity } = await req.json();

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId: (session.user as CustomUser).id });

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    // Update quantity
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    // Populate and return updated cart
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price images stock')
      .populate('items.vendorId', 'storeName');

    return NextResponse.json({
      success: true,
      data: populatedCart,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE clear cart or remove item
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    const cart = await Cart.findOne({ userId: (session.user as CustomUser).id });

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      });
    }

    if (productId) {
      // Remove specific item
      cart.items = cart.items.filter(
        (item: ICartItem) => item.productId.toString() !== productId
      );
    } else {
      // Clear entire cart
      cart.items = [];
    }

    await cart.save();

    // Populate and return updated cart
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price images stock')
      .populate('items.vendorId', 'storeName');

    return NextResponse.json({
      success: true,
      data: populatedCart,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}