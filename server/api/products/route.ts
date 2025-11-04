import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Vendor from '@/models/Vendor';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { CustomUser } from '../auth/[...nextauth]/route';

// GET all products with filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const filter = searchParams.get('filter');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const vendorId = searchParams.get('vendorId');

    const query: { status: string; category?: string; discount?: { $gt: number }; $or?: Array<{ name: { $regex: string; $options: string } } | { description: { $regex: string; $options: string } }>; vendorId?: string } = { status: 'approved' };

    if (category) query.category = category;
    if (filter === 'sale') query.discount = { $gt: 0 };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (vendorId) query.vendorId = vendorId;

    const sortQuery: Record<string, 1 | -1> = {};
    if (sort === 'new') sortQuery.createdAt = -1;
    if (sort === 'popular') sortQuery.sales = -1;
    if (sort === 'price-low') sortQuery.price = 1;
    if (sort === 'price-high') sortQuery.price = -1;
    if (sort === 'rating') sortQuery.rating = -1;

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('vendorId', 'storeName storeImage rating')
      .lean();

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: products,
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

// POST new product
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
    
    // Check if user is a vendor or admin
    const userRole = (session.user as CustomUser).role;
    if (userRole !== 'vendor' && userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // If vendor, ensure they're creating product for their own store
    let vendorId = body.vendorId;
    if (userRole === 'vendor') {
      const vendor = await Vendor.findOne({ userId: (session.user as CustomUser).id });
      if (!vendor) {
        return NextResponse.json(
          { success: false, error: 'Vendor profile not found' },
          { status: 404 }
        );
      }
      if (vendorId && vendorId !== vendor._id.toString()) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
      vendorId = vendor._id.toString();
    }

    const product = new Product({
      ...body,
      vendorId,
      status: 'pending',
    });

    await product.save();

    return NextResponse.json(
      { success: true, data: product },
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