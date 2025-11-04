import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

// GET related products
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  try {
    await connectDB();

    // Get the current product to find related ones
    const product = await Product.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find related products by category, excluding the current product
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
      status: 'approved',
    })
    .limit(8)
    .populate('vendorId', 'storeName storeImage rating')
    .lean();

    return NextResponse.json({
      success: true,
      data: relatedProducts,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}