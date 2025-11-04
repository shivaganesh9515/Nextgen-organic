import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { CustomUser } from '../../auth/[...nextauth]/route';

// GET user analytics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const userId = (session.user as CustomUser).id;

    // Get user orders
    const orders = await Order.find({ userId });
    
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    
    // Calculate recent data (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentOrders = orders.filter(order => 
      order.createdAt >= thirtyDaysAgo
    );
    
    const recentSpent = recentOrders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    
    // Get favorite categories
    const categoryCountMap = new Map<string, number>();
    
    for (const order of orders) {
      for (const item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          const currentCount = categoryCountMap.get(product.category) || 0;
          categoryCountMap.set(product.category, currentCount + 1);
        }
      }
    }
    
    const favoriteCategories = Array.from(categoryCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          orders: totalOrders,
          spent: totalSpent,
        },
        recent: {
          spent: recentSpent,
          orders: recentOrders.length,
        },
        favoriteCategories,
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