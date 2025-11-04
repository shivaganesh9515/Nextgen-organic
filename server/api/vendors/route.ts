import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vendor from '@/models/Vendor';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { CustomUser } from '../auth/[...nextauth]/route';

// GET all vendors
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (category) query.categories = { $in: [category] };

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 } as Record<string, 1 | -1>)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Vendor.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: vendors,
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

// POST create new vendor
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

    const body = await req.json();

    const vendor = new Vendor({
      ...body,
      userId: (session.user as CustomUser).id,
      status: 'pending',
    });

    await vendor.save();

    return NextResponse.json(
      { success: true, data: vendor },
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