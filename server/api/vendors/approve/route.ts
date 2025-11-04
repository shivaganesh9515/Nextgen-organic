import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vendor from '@/models/Vendor';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { CustomUser } from '../../auth/[...nextauth]/route';

// PUT approve/reject vendor
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as CustomUser).role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    const { vendorId, status, reason } = await req.json();

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        status,
        rejectionReason: reason || null,
        approvedAt: status === 'approved' ? new Date() : null,
      },
      { new: true }
    ).populate('userId', 'email name');

    // If approved, update user role to vendor
    if (vendor && status === 'approved') {
      await User.findByIdAndUpdate(vendor.userId, { role: 'vendor' });
    }

    // TODO: Send email notification

    return NextResponse.json({
      success: true,
      data: vendor,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}