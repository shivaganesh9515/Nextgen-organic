import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Get user's orders
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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: { 
      customerId?: string;
      vendorId?: string;
      status?: string;
    } = {};

    // Filter based on user role
    if (session.user.role === 'CUSTOMER') {
      where.customerId = session.user.id;
    } else if (session.user.role === 'VENDOR') {
      const vendor = await prisma.vendor.findUnique({
        where: { userId: session.user.id },
      });
      if (!vendor) {
        return NextResponse.json(
          { error: 'Vendor not found' },
          { status: 404 }
        );
      }
      where.vendorId = vendor.id;
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    // Count total orders
    const total = await prisma.order.count({ where });

    // Fetch orders
    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                unit: true,
              },
            },
          },
        },
        vendor: {
          select: {
            businessName: true,
            phone: true,
            city: true,
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        address: true,
        tracking: {
          orderBy: { timestamp: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}