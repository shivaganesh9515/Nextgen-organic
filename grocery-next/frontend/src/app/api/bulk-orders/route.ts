import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// GET - Get bulk orders
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: { 
      customerId?: string;
      OR?: Array<{ vendorId?: string | null }>;
      status?: string;
    } = {};

    if (session.user.role === 'CUSTOMER') {
      where.customerId = session.user.id;
    } else if (session.user.role === 'VENDOR') {
      const vendor = await prisma.vendor.findUnique({
        where: { userId: session.user.id },
      });
      if (vendor) {
        where.OR = [
          { vendorId: vendor.id },
          { vendorId: null }, // Unassigned bulk orders
        ];
      }
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const bulkOrders = await prisma.bulkOrder.findMany({
      where,
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        vendor: {
          select: {
            businessName: true,
            phone: true,
          },
        },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bulkOrders });
  } catch (error) {
    console.error('Error fetching bulk orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bulk orders' },
      { status: 500 }
    );
  }
}

// POST - Create bulk order request
const createBulkOrderSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.object({
    category: z.string(),
    specifications: z.string(),
    quality: z.string(),
  }),
  budget: z.number().positive().optional(),
  quantity: z.string(),
  deliveryDate: z.string(),
  location: z.string(),
  contactInfo: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  items: z.array(
    z.object({
      productName: z.string(),
      quantity: z.string(),
      unit: z.string(),
      notes: z.string().optional(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'CUSTOMER') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createBulkOrderSchema.parse(body);

    // Create bulk order
    const bulkOrder = await prisma.bulkOrder.create({
      data: {
        customerId: session.user.id,
        title: validatedData.title,
        description: validatedData.description,
        requirements: validatedData.requirements,
        budget: validatedData.budget,
        quantity: validatedData.quantity,
        deliveryDate: new Date(validatedData.deliveryDate),
        location: validatedData.location,
        contactInfo: validatedData.contactInfo,
        items: {
          create: validatedData.items,
        },
      },
      include: {
        items: true,
      },
    });

    // TODO: Notify all approved vendors about new bulk order

    return NextResponse.json(
      {
        message: 'Bulk order request submitted successfully',
        bulkOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating bulk order:', error);
    return NextResponse.json(
      { error: 'Failed to create bulk order' },
      { status: 500 }
    );
  }
}