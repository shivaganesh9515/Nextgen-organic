import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const respondSchema = z.object({
  quotedPrice: z.number().positive(),
  quotedDetails: z.string().min(20, 'Please provide detailed quote information'),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'VENDOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = respondSchema.parse(body);

    // Get vendor
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor || vendor.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Vendor not approved' },
        { status: 403 }
      );
    }

    // Get bulk order
    const bulkOrder = await prisma.bulkOrder.findUnique({
      where: { id: params.id },
    });

    if (!bulkOrder) {
      return NextResponse.json(
        { error: 'Bulk order not found' },
        { status: 404 }
      );
    }

    if (bulkOrder.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Bulk order is no longer available' },
        { status: 400 }
      );
    }

    // Update bulk order with vendor's quote
    const updatedBulkOrder = await prisma.bulkOrder.update({
      where: { id: params.id },
      data: {
        vendorId: vendor.id,
        status: 'QUOTED',
        quotedPrice: validatedData.quotedPrice,
        quotedDetails: validatedData.quotedDetails,
        responseDate: new Date(),
      },
      include: {
        customer: {
          select: {
            email: true,
            firstName: true,
          },
        },
        vendor: {
          select: {
            businessName: true,
            phone: true,
          },
        },
      },
    });

    // TODO: Send email to customer about vendor quote

    return NextResponse.json({
      message: 'Quote submitted successfully',
      bulkOrder: updatedBulkOrder,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error responding to bulk order:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote' },
      { status: 500 }
    );
  }
}