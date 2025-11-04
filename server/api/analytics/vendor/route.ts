import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vendor from '@/models/Vendor';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { CustomUser } from '../../auth/[...nextauth]/route';

// GET vendor analytics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as CustomUser).role !== 'vendor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    // Get vendor
    const vendor = await Vendor.findOne({ userId: (session.user as CustomUser).id });
    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Get vendor products
    const products = await Product.find({ vendorId: vendor._id });
    const totalProducts = products.length;
    
    // Get vendor orders
    const orders = await Order.find({ 
      'items.vendorId': vendor._id 
    }).populate('items.productId', 'name');
    
    const totalOrders = orders.length;
    let totalSales = 0;
    for (const order of orders) {
      for (const item of order.items) {
        if (item.vendorId.toString() === vendor._id.toString()) {
          totalSales += item.total;
        }
      }
    }
    
    // Calculate recent data (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentOrders = orders.filter(order => 
      order.createdAt >= thirtyDaysAgo
    );
    
    let recentSales = 0;
    for (const order of recentOrders) {
      for (const item of order.items) {
        if (item.vendorId.toString() === vendor._id.toString()) {
          recentSales += item.total;
        }
      }
    }
    
    // Get top selling products
    const productSalesMap = new Map<string, { name: string; quantity: number; revenue: number }>();
    
    for (const order of orders) {
      for (const item of order.items) {
        if (item.vendorId.toString() === vendor._id.toString()) {
          const productId = item.productId.toString();
          const productInfo = productSalesMap.get(productId) || { 
            name: 'Unknown Product', 
            quantity: 0, 
            revenue: 0 
          };
          
          productInfo.quantity += item.quantity;
          productInfo.revenue += item.total;
          productSalesMap.set(productId, productInfo);
        }
      }
    }
    
    const topProducts = Array.from(productSalesMap.entries())
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .map(([productId, data]) => ({ productId, ...data }));

    return NextResponse.json({
      success: true,
      data: {
        vendor: {
          name: vendor.storeName,
          status: vendor.status,
          rating: vendor.rating,
          reviewCount: vendor.reviewCount,
        },
        totals: {
          products: totalProducts,
          orders: totalOrders,
          sales: totalSales,
        },
        recent: {
          sales: recentSales,
          orders: recentOrders.length,
        },
        topProducts,
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