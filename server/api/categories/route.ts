import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET all categories
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const isActive = searchParams.get('isActive');
    const parentId = searchParams.get('parentId');

    const query: Record<string, unknown> = {};

    if (isActive) query.isActive = isActive === 'true';
    if (parentId) query.parentCategory = parentId;

    const categories = await Category.find(query)
      .sort({ createdAt: -1 } as Record<string, 1 | -1>)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Category.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: categories,
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

// POST create new category (admin only)
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
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await req.json();
    
    // Generate slug from name if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const category = new Category(body);
    await category.save();

    return NextResponse.json(
      { success: true, data: category },
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