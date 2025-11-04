import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Wishlist, { IWishlist } from '@/models/Wishlist';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { CustomUser } from '../auth/[...nextauth]/route';
import mongoose from 'mongoose';

// GET user wishlist
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

    const wishlist = await Wishlist.findOne({ userId: (session.user as CustomUser).id })
      .populate('items.productId', 'name price images rating reviewCount')
      .lean();

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      });
    }

    return NextResponse.json({
      success: true,
      data: wishlist,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST add item to wishlist
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

    const { productId } = await req.json();

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: (session.user as CustomUser).id });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: (session.user as CustomUser).id,
        items: [],
      });
    }

    // Check if item already exists in wishlist
    const existingItemIndex = wishlist.items.findIndex(
      (item: IWishlist['items'][0]) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1) {
      // Add new item
      wishlist.items.push({
        productId,
        addedAt: new Date(),
      });
    }

    await wishlist.save();

    // Populate and return updated wishlist
    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price images rating reviewCount');

    return NextResponse.json({
      success: true,
      data: populatedWishlist,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE remove item from wishlist
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

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const wishlist = await Wishlist.findOne({ userId: (session.user as CustomUser).id });

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      });
    }

    // Remove item
    wishlist.items = wishlist.items.filter(
      (item: IWishlist['items'][0]) => item.productId.toString() !== productId
    );

    await wishlist.save();

    // Populate and return updated wishlist
    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price images rating reviewCount');

    return NextResponse.json({
      success: true,
      data: populatedWishlist,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}