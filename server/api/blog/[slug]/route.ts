import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog, { IBlog } from '@/models/Blog';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET specific blog post by slug
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug })
      .populate('author', 'name profilePicture')
      .lean() as IBlog | null;

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment views count
    if (blog._id) {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT update blog post
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'admin' && blog.author.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const updatedBlog = blog._id ? await Blog.findByIdAndUpdate(
      blog._id,
      body,
      { new: true, runValidators: true }
    )
    .populate('author', 'name profilePicture') : null;

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE blog post
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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

    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'admin' && blog.author.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    if (blog._id) {
      await Blog.findByIdAndDelete(blog._id);
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}