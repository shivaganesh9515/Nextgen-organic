import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET all reviews with filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');
    const rating = searchParams.get('rating');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const query: Record<string, unknown> = {};

    if (productId) query.productId = productId;
    if (userId) query.userId = userId;
    if (rating) query.rating = parseInt(rating);

    const sortQuery: Record<string, 1 | -1> = {};
    sortQuery[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const reviews = await Review.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'name profilePicture')
      .populate('productId', 'name images')
      .lean();

    const total = await Review.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST create new review
export async function POST(req: NextRequest) {
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
    
    // Check if user has purchased the product
    // This would typically involve checking orders, but for now we'll allow it
    // In a real implementation, you'd verify the user purchased the product
    
    const existingReview = await Review.findOne({
      productId: body.productId,
      userId: user.id,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    const review = new Review({
      ...body,
      userId: user.id,
    });
    
    await review.save();

    // Update product rating
    const productReviews = await Review.find({ productId: body.productId });
    const avgRating = productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
    
    await Product.findByIdAndUpdate(body.productId, {
      rating: avgRating,
      reviewCount: productReviews.length,
    });

    // Populate user and product info
    await review.populate('userId', 'name profilePicture');
    await review.populate('productId', 'name images');

    return NextResponse.json(
      { success: true, data: review },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}