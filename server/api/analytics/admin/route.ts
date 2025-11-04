import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Vendor from '@/models/Vendor';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { CustomUser } from '../../auth/[...nextauth]/route';

// GET admin analytics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as CustomUser).role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    // Get counts
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Get sales data
    const orders = await Order.find({}, 'totalAmount finalAmount createdAt');
    
    const totalSales = orders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentOrders = orders.filter(order => 
      order.createdAt >= thirtyDaysAgo
    );
    
    const recentSales = recentOrders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    
    // Get user growth data
    const users = await User.find({}, 'createdAt role');
    const vendors = await Vendor.find({}, 'createdAt status');
    
    // Calculate growth percentages
    const userGrowth = users.filter(user => 
      user.createdAt >= thirtyDaysAgo
    ).length;
    
    const vendorGrowth = vendors.filter(vendor => 
      vendor.createdAt >= thirtyDaysAgo
    ).length;
    
    // Get top vendors by sales
    const vendorSalesMap = new Map<string, number>();
    
    for (const order of orders) {
      for (const item of order.items) {
        const vendorId = item.vendorId.toString();
        const currentSales = vendorSalesMap.get(vendorId) || 0;
        vendorSalesMap.set(vendorId, currentSales + item.total);
      }
    }
    
    const topVendors = Array.from(vendorSalesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([vendorId, sales]) => ({ vendorId, sales }));
    
    // Get top products by sales
    const productSalesMap = new Map<string, number>();
    
    for (const order of orders) {
      for (const item of order.items) {
        const productId = item.productId.toString();
        const currentSales = productSalesMap.get(productId) || 0;
        productSalesMap.set(productId, currentSales + item.quantity);
      }
    }
    
    const topProducts = Array.from(productSalesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, quantity]) => ({ productId, quantity }));

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          vendors: totalVendors,
          products: totalProducts,
          orders: totalOrders,
          sales: totalSales,
        },
        recent: {
          sales: recentSales,
          orders: recentOrders.length,
          userGrowth,
          vendorGrowth,
        },
        topVendors,
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