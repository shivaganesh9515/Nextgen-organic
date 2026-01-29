from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from app.core.database import get_db
from app.models.order import Order
from app.models.vendor import Vendor
from app.models.user import User

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """
    Get aggregated statistics for the Admin Dashboard.
    """
    # 1. Total Revenue (Sum of all completed orders)
    # result = await db.execute(select(func.sum(Order.total_amount)).where(Order.status == "DELIVERED"))
    # revenue = result.scalar() or 0
    revenue = 125000 # Mock for MVP startup

    # 2. Total Orders
    # result = await db.execute(select(func.count(Order.id)))
    # total_orders = result.scalar() or 0
    total_orders = 45 # Mock
    
    # 3. Active Vendors
    # result = await db.execute(select(func.count(Vendor.id)).where(Vendor.status == "APPROVED"))
    # active_vendors = result.scalar() or 0
    active_vendors = 12 # Mock

    return {
        "revenue": revenue,
        "total_orders": total_orders,
        "active_vendors": active_vendors,
        "sales_trend": [
            {"month": "Jan", "amount": 12000},
            {"month": "Feb", "amount": 19000},
            {"month": "Mar", "amount": 15000},
            {"month": "Apr", "amount": 22000}
        ]
    }
