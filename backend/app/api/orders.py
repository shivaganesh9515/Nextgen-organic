from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.order import Order, OrderItem
from typing import List

router = APIRouter()

# Mock Orders for MVP (until we have checkout flow)
MOCK_ORDERS = [
    {
        "id": "ord_1", "customer": "Ravi Kumar", "total": 1200, "status": "PENDING", "date": "2024-03-10",
        "items": [
           {"product": "Organic Tomatoes", "quantity": 2, "vendor": "Ramesh Organics"},
           {"product": "Fresh Spinach", "quantity": 1, "vendor": "Green Valley"} 
        ]
    },
    {
        "id": "ord_2", "customer": "Sneha Gupta", "total": 450, "status": "DELIVERED", "date": "2024-03-08",
        "items": [
           {"product": "Raw Honey", "quantity": 1, "vendor": "Prakruthi Farms"}
        ]
    }
]

@router.get("/")
async def list_orders(db: AsyncSession = Depends(get_db)):
    """
    Get all orders (Global Admin View).
    """
    # Real implementation would be:
    # result = await db.execute(select(Order).options(selectinload(Order.items)))
    # return result.scalars().all()
    
    return MOCK_ORDERS
