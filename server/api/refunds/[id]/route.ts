import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Refund, { IRefund } from '@/models/Refund';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

// GET specific refund
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const refund = await Refund.findById(id)
      .populate('userId', 'name email')
      .populate('vendorId', 'storeName')
      .populate('orderId', 'orderNumber totalAmount')
      .lean() as IRefund | null;

    if (!refund) {
      return NextResponse.json(
        { success: false, error: 'Refund not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (refund && user.role === 'user' && refund.userId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    if (user.role === 'vendor' && refund.vendorId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: refund,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT update refund status (admin/vendor)
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
    
    const refund = await Refund.findById(id);
    
    if (!refund) {
      return NextResponse.json(
        { success: false, error: 'Refund not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (refund && user.role === 'user' && refund.userId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    if (user.role === 'vendor' && refund.vendorId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Only admin can change status to approved/rejected
    if ((body.status === 'approved' || body.status === 'rejected') && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Only admin can approve/reject refunds' },
        { status: 403 }
      );
    }

    // Update refund
    const updatedRefund = await Refund.findByIdAndUpdate(
      id,
      {
        ...body,
        processedAt: body.status === 'completed' ? new Date() : refund.processedAt,
      },
      { new: true, runValidators: true }
    )
    .populate('userId', 'name email')
    .populate('vendorId', 'storeName')
    .populate('orderId', 'orderNumber totalAmount');

    // Update order status
    if (updatedRefund.status === 'approved' || updatedRefund.status === 'rejected') {
      await Order.findByIdAndUpdate(updatedRefund.orderId, {
        refundStatus: updatedRefund.status,
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedRefund,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}