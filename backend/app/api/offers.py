from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.notification import NotificationType
from app.api.notifications import notify_all_vendors

router = APIRouter()

# Mock Offers Data (In real app, this would be a DB Model)
OFFERS = [
    {"id": 1, "title": "Summer Sale", "discount": "20% OFF", "code": "SUMMER20", "status": "Active", "expiresAt": "2024-06-30"},
    {"id": 2, "title": "Welcome Bonus", "discount": "₹100 OFF", "code": "WELCOME100", "status": "Active", "expiresAt": "2024-12-31"},
    {"id": 3, "title": "Vegetable Fest", "discount": "15% OFF", "code": "VEG15", "status": "Expired", "expiresAt": "2024-01-15"}
]

class OfferCreate(BaseModel):
    title: str
    discount: str
    code: str
    expiresAt: str
    status: str = "Active"

@router.get("/")
async def list_offers():
    return OFFERS

@router.post("/")
async def create_offer(
    offer: OfferCreate,
    db: AsyncSession = Depends(get_db)
):
    new_offer = offer.dict()
    new_offer["id"] = len(OFFERS) + 1
    OFFERS.append(new_offer)
    
    # Notify all vendors about new offer
    await notify_all_vendors(
        db,
        NotificationType.PROMOTION,
        title="New Offer Campaign",
        message=f"A new offer '{offer.title}' ({offer.discount}) is now active. Code: {offer.code}.",
        extra_data={"offer_id": new_offer["id"]}
    )
    await db.commit()
    
    return new_offer
