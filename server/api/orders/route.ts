import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { CustomUser } from '../auth/[...nextauth]/route';

// GET user orders
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const query: { userId: string; orderStatus?: string } = { 
      userId: (session.user as CustomUser).id 
    };

    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 } as Record<string, 1 | -1>)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: orders,
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

// POST create order
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

    const order = new Order({
      ...body,
      userId: (session.user as CustomUser).id,
    });

    await order.save();

    // TODO: Process payment
    // TODO: Send confirmation email
    // TODO: Update product sales count
    // TODO: Update vendor statistics

    return NextResponse.json(
      { success: true, data: order },
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