import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// GET - List products with filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const vendorId = searchParams.get('vendorId');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const featured = searchParams.get('featured') === 'true';

    // Build where clause
    const where: { 
      isActive: boolean;
      category?: { slug: string };
      subcategory?: { slug: string };
      vendorId?: string;
      OR?: Array<{ 
        name?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
        tags?: { has: string };
      }>;
      price?: { gte?: number; lte?: number };
      isFeatured?: boolean;
    } = {
      isActive: true,
    };

    if (category) {
      where.category = { slug: category };
    }

    if (subcategory) {
      where.subcategory = { slug: subcategory };
    }

    if (vendorId) {
      where.vendorId = vendorId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search.toLowerCase() } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (featured) {
      where.isFeatured = true;
    }

    // Count total products
    const total = await prisma.product.count({ where });

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            rating: true,
            city: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create product (Vendor only)
const createProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  categoryId: z.string(),
  subcategoryId: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
  unit: z.string(),
  price: z.number().positive('Price must be positive'),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  minOrderQty: z.number().int().positive().default(1),
  maxOrderQty: z.number().int().positive().optional(),
  certifications: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  shelfLife: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'VENDOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createProductSchema.parse(body);

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

    // Generate slug
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create product
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug,
        vendorId: vendor.id,
      },
      include: {
        category: true,
        subcategory: true,
        vendor: {
          select: {
            businessName: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}