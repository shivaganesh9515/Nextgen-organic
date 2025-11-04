import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Refund from '@/models/Refund';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET all refunds with filtering
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');

    const query: Record<string, unknown> = {};

    // Filter by user role
    if (user.role === 'user') {
      query.userId = user.id;
    } else if (user.role === 'vendor') {
      query.vendorId = user.id;
    }

    if (status) query.status = status;
    if (orderId) query.orderId = orderId;

    const sortQuery: Record<string, 1 | -1> = { createdAt: -1 };

    const refunds = await Refund.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('vendorId', 'storeName')
      .populate('orderId', 'orderNumber totalAmount')
      .lean();

    const total = await Refund.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: refunds,
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

// POST create new refund request
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
    
    // Verify the order belongs to the user
    const order = await Order.findOne({ 
      _id: body.orderId, 
      userId: user.id 
    });
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found or does not belong to you' },
        { status: 404 }
      );
    }
    
    // Check if refund already exists for this order
    const existingRefund = await Refund.findOne({ orderId: body.orderId });
    
    if (existingRefund) {
      return NextResponse.json(
        { success: false, error: 'Refund request already exists for this order' },
        { status: 400 }
      );
    }

    const refund = new Refund({
      ...body,
      userId: user.id,
      vendorId: order.items[0]?.vendorId, // Assuming first item's vendor
    });
    
    await refund.save();

    // Update order refund status
    await Order.findByIdAndUpdate(body.orderId, {
      refundStatus: 'requested',
      refundReason: body.reason,
    });

    // Populate related data
    await refund.populate('userId', 'name email');
    await refund.populate('vendorId', 'storeName');
    await refund.populate('orderId', 'orderNumber totalAmount');

    return NextResponse.json(
      { success: true, data: refund },
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