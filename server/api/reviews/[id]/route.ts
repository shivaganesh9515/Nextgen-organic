import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET specific review
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();

    const review = await Review.findById(id)
      .populate('userId', 'name profilePicture')
      .populate('productId', 'name images')
      .lean();

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT update review
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as CustomUser;
    
    await connectDB();

    const body = await req.json();
    
    // Check if user owns this review
    const existingReview = await Review.findById(id);
    
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    if (existingReview.userId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const review = await Review.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
    .populate('userId', 'name profilePicture')
    .populate('productId', 'name images');

    // Update product rating
    const productReviews = await Review.find({ productId: review.productId });
    const avgRating = productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
    
    await Product.findByIdAndUpdate(review.productId, {
      rating: avgRating,
      reviewCount: productReviews.length,
    });

    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE review
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as CustomUser;
    
    await connectDB();

    const review = await Review.findById(id);
    
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if user owns this review or is admin
    if (review.userId.toString() !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await Review.findByIdAndDelete(id);

    // Update product rating
    const productReviews = await Review.find({ productId: review.productId });
    const avgRating = productReviews.length > 0 
      ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length
      : 0;
    
    await Product.findByIdAndUpdate(review.productId, {
      rating: avgRating,
      reviewCount: productReviews.length,
    });

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}