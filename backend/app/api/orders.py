from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.vendor import Vendor
from typing import List

# Import Dependency for Auth
from app.api.deps import get_current_user, get_current_admin

router = APIRouter()

@router.get("/my-orders")
async def get_my_orders(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Get all orders for the authenticated user.
    """
    print(f"Fetching orders for user: {current_user.id}")
    try:
        # Check if user exists in DB and has ID
        if not current_user or not hasattr(current_user, 'id'):
             # If transient user or error, return empty
             return []

        query = select(Order).where(Order.user_id == current_user.id).options(
            selectinload(Order.items).selectinload(OrderItem.product), 
            selectinload(Order.items).selectinload(OrderItem.vendor)
        )
        result = await db.execute(query)
        orders = result.scalars().all()
        
        formatted_orders = []
        for o in orders:
            items_list = []
            for i in o.items:
                 items_list.append({
                     "product": i.product.name if i.product else "Unknown Product",
                     "quantity": i.quantity,
                     "vendor": i.vendor.business_name if i.vendor else "Unknown Vendor",
                     "image": i.product.image_url if i.product else ""
                 })
            
            # Use first item image as main image or generic
            main_image = items_list[0]['image'] if items_list and items_list[0]['image'] else ""

            formatted_orders.append({
                "id": str(o.id),
                "date": o.created_at.strftime("%Y-%m-%d %H:%M") if o.created_at else "Unknown Date",
                "status": str(o.status.value) if hasattr(o.status, 'value') else str(o.status),
                "total": float(o.total_amount),
                "restaurant": items_list[0]['vendor'] if items_list else "Multiple Vendors",
                "items": [item['product'] for item in items_list],
                "image": main_image
            })
            
        return formatted_orders

    except Exception as e:
        print(f"Error fetching orders: {e}")
        return []

@router.get("/")
async def list_orders(db: AsyncSession = Depends(get_db), admin = Depends(get_current_admin)):
    """
    Get all orders (Global Admin View).
    """
    try:
        query = select(Order).options(
            selectinload(Order.items).selectinload(OrderItem.product),
            selectinload(Order.items).selectinload(OrderItem.vendor)
        ).order_by(Order.created_at.desc())
        
        result = await db.execute(query)
        orders = result.scalars().all()
        
        formatted = []
        for o in orders:
            items_count = len(o.items) if o.items else 0
            formatted.append({
                "id": str(o.id),
                "customer_name": o.customer_name or "Unknown",
                "customer_email": o.customer_email or "",
                "date": o.created_at.strftime("%Y-%m-%d %H:%M") if o.created_at else "Unknown",
                "status": str(o.status.value) if hasattr(o.status, 'value') else str(o.status),
                "total": float(o.total_amount),
                "items_count": items_count
            })
        
        return formatted
        
    except Exception as e:
        print(f"Error listing all orders: {e}")
        return []
