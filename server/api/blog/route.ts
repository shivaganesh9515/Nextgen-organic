import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET all blog posts with filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const status = searchParams.get('status') || 'published';
    const author = searchParams.get('author');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (category) query.categories = category;
    if (author) query.author = author;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const sortQuery: Record<string, 1 | -1> = { createdAt: -1 };

    const blogs = await Blog.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name profilePicture')
      .lean();

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: blogs,
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

// POST create new blog post
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
    
    // Only admins and vendors can create blog posts
    if (user.role !== 'admin' && user.role !== 'vendor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await req.json();
    
    // Generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const blog = new Blog({
      ...body,
      author: user.id,
    });
    
    await blog.save();

    // Populate author info
    await blog.populate('author', 'name profilePicture');

    return NextResponse.json(
      { success: true, data: blog },
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