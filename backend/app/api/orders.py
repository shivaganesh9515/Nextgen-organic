from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.order import Order, OrderItem
# from app.models.user import User  # User model import
from typing import List

# Import Dependency for Auth
from app.api.deps import get_current_user

router = APIRouter()

# Mock Order Data fallback if DB empty
MOCK_ORDERS = [
    {
        "id": "ord_1024", 
        "date": "2024-03-30 10:30:00", 
        "status": "DELIVERED", 
        "total": 55.00,
        "items": [
           {"product": {"name": "Organic Red Tomatoes", "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200"}, "quantity": 1, "vendor": {"name": "Green Valley Farms"}}
        ]
    }
]

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

        query = select(Order).where(Order.user_id == current_user.id).options(selectinload(Order.items).selectinload(OrderItem.product), selectinload(Order.items).selectinload(OrderItem.vendor))
        result = await db.execute(query)
        orders = result.scalars().all()
        
        # Transform for Frontend (simpler structure) if needed, 
        # or return raw objects if frontend is robust.
        # For now, let's return raw logic or simple dict
        
        formatted_orders = []
        for o in orders:
            items_list = []
            for i in o.items:
                 items_list.append({
                     "product": i.product.name if i.product else "Unknown Product",
                     "quantity": i.quantity,
                     "vendor": i.vendor.name if i.vendor else "Unknown Vendor",
                     "image": i.product.image if i.product else ""
                 })
            
            # Use first item image as main image or generic
            main_image = items_list[0]['image'] if items_list and items_list[0]['image'] else ""

            formatted_orders.append({
                "id": str(o.id),
                "date": o.created_at.strftime("%Y-%m-%d %H:%M") if o.created_at else "Unknown Date",
                "status": o.status,
                "total": o.total_amount,
                "restaurant": items_list[0]['vendor'] if items_list else "Multiple Vendors", # Simplify for UI
                "items": [item['product'] for item in items_list],
                "image": main_image
            })
            
        return formatted_orders

    except Exception as e:
        print(f"Error fetching orders: {e}")
        return []

@router.get("/")
async def list_orders(db: AsyncSession = Depends(get_db)):
    """
    Get all orders (Global Admin View).
    """
    return []
