from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, case, extract
from app.core.database import get_db
from app.models.order import Order, OrderStatus, OrderItem
from app.models.vendor import Vendor, VendorStatus
from app.models.product import Product, ProductApprovalStatus
from app.models.user import User
from app.api.deps import get_current_vendor
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """
    Get aggregated statistics for the Admin Dashboard.
    All values are calculated from actual database records.
    """
    
    # 1. Total Revenue (Sum of all non-cancelled orders)
    res_revenue = await db.execute(
        select(func.sum(Order.total_amount))
        .where(Order.status != OrderStatus.CANCELLED)
    )
    revenue = res_revenue.scalar() or 0
    
    # 2. Total Orders Count
    res_orders = await db.execute(select(func.count(Order.id)))
    total_orders = res_orders.scalar() or 0
    
    # 3. Active Vendors Count
    res_vendors = await db.execute(
        select(func.count(Vendor.id)).where(Vendor.status == VendorStatus.APPROVED)
    )
    active_vendors = res_vendors.scalar() or 0
    
    # 4. Total Customers Count (Users with role 'customer')
    res_customers = await db.execute(
        select(func.count(User.id)).where(User.role == 'customer')
    )
    total_customers = res_customers.scalar() or 0

    # 5. Sales Trend (Last 6 months)
    # Note: For SQLite/Postgres compatibility in MVP, we might fetch recent orders and aggregate in Python
    # or use a simple query. Here we'll do a simple Python aggregation for safety.
    six_months_ago = datetime.now() - timedelta(days=180)
    res_trend_orders = await db.execute(
        select(Order.created_at, Order.total_amount)
        .where(Order.created_at >= six_months_ago)
        .where(Order.status != OrderStatus.CANCELLED)
        .order_by(Order.created_at)
    )
    trend_orders = res_trend_orders.all()
    
    # Group by Month name
    history_map = {}
    for order in trend_orders:
        month_name = order.created_at.strftime("%b") # Jan, Feb
        history_map[month_name] = history_map.get(month_name, 0) + (order.total_amount or 0)
        
    # Format for graph (ensure order?) - Using fixed last 6 months order would be better but simple dict is okay for now
    # Let's clean it up to be chronological
    sales_trend = []
    for i in range(5, -1, -1):
        month_date = datetime.now() - timedelta(days=i*30)
        name = month_date.strftime("%b")
        sales_trend.append({
            "month": name,
            "amount": int(history_map.get(name, 0))
        })

    return {
        "revenue": float(revenue),
        "total_orders": int(total_orders),
        "active_vendors": int(active_vendors),
        "total_customers": int(total_customers),
        "sales_trend": sales_trend
    }


@router.get("/vendor/dashboard")
async def get_vendor_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """
    Get dynamic statistics for the Vendor Dashboard.
    Calculates specific earnings and orders for the logged-in vendor.
    """
    
    # 1. Vendor's Revenue (Sum of (price * quantity) for items belonging to this vendor)
    # Only for non-cancelled orders
    res_earnings = await db.execute(
        select(func.sum(OrderItem.price_at_purchase * OrderItem.quantity))
        .join(Order, OrderItem.order_id == Order.id)
        .where(OrderItem.vendor_id == vendor.id)
        .where(Order.status != OrderStatus.CANCELLED)
    )
    earnings = res_earnings.scalar() or 0
    
    # 2. Active Products (Published)
    res_active_products = await db.execute(
        select(func.count(Product.id)).where(
            Product.vendor_id == vendor.id,
            Product.approval_status == ProductApprovalStatus.PUBLISHED,
            Product.is_active == True
        )
    )
    active_products = res_active_products.scalar() or 0
    
    # 3. Pending Orders (Count of distinct orders containing this vendor's items that are PENDING)
    res_pending = await db.execute(
        select(func.count(func.distinct(Order.id)))
        .join(OrderItem, Order.id == OrderItem.order_id)
        .where(OrderItem.vendor_id == vendor.id)
        .where(Order.status == OrderStatus.PENDING)
    )
    pending_orders = res_pending.scalar() or 0
    
    # 4. Total Products
    res_total_products = await db.execute(
        select(func.count(Product.id)).where(Product.vendor_id == vendor.id)
    )
    total_products = res_total_products.scalar() or 0
    
    # 5. Monthly Revenue Graph (Last 6 Months)
    six_months_ago = datetime.now() - timedelta(days=180)
    res_trend_items = await db.execute(
        select(Order.created_at, OrderItem.price_at_purchase, OrderItem.quantity)
        .join(Order, OrderItem.order_id == Order.id)
        .where(OrderItem.vendor_id == vendor.id)
        .where(Order.created_at >= six_months_ago)
        .where(Order.status != OrderStatus.CANCELLED)
    )
    trend_items = res_trend_items.all()
    
    graph_map = {}
    for item in trend_items:
        month_name = item.created_at.strftime("%b")
        total_val = item.price_at_purchase * item.quantity
        graph_map[month_name] = graph_map.get(month_name, 0) + total_val

    revenue_graph = []
    for i in range(5, -1, -1):
        month_date = datetime.now() - timedelta(days=i*30)
        name = month_date.strftime("%b")
        revenue_graph.append({
            "name": name,
            "total": int(graph_map.get(name, 0))
        })
        
    return {
        "earnings": float(earnings),
        "active_products": int(active_products),
        "pending_orders": int(pending_orders),
        "total_products": int(total_products),
        "revenue_graph": revenue_graph
    }
