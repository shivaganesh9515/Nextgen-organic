import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// GET - Get single product
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            rating: true,
            totalReviews: true,
            city: true,
            state: true,
            description: true,
          },
        },
        category: true,
        subcategory: true,
        reviews: {
          where: { isVisible: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.product.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PATCH - Update product (Vendor only)
const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  price: z.number().positive().optional(),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
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
    const validatedData = updateProductSchema.parse(body);

    // Get vendor
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Check if product belongs to vendor
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        category: true,
        subcategory: true,
      },
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (Vendor only)
export async function DELETE(
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

    // Get vendor
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Check if product belongs to vendor
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      );
    }

    // Soft delete - just mark as inactive
    await prisma.product.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}