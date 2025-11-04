import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order, { IOrder, IOrderItem } from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { CustomUser } from '../../auth/[...nextauth]/route';

// GET specific order
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const order = await Order.findById(id)
      .populate('items.productId', 'name images')
      .populate('items.vendorId', 'storeName')
      .lean() as IOrder | null;

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Users can only view their own orders or admins can view any order
    if (order.userId.toString() !== (session.user as CustomUser).id && 
        (session.user as CustomUser).role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT update order (admin/vendor only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only admins and vendors can update orders
    const userRole = (session.user as CustomUser).role;
    if (userRole !== 'admin' && userRole !== 'vendor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Vendors can only update orders from their own store
    if (userRole === 'vendor') {
      const hasVendorItem = order.items.some(
        (item: IOrderItem) => item.vendorId.toString() === (session.user as CustomUser).id
      );
      if (!hasVendorItem) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    ).populate('items.productId', 'name images')
      .populate('items.vendorId', 'storeName');

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}