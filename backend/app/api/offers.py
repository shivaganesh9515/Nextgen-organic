from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.offer import Offer
from app.models.notification import NotificationType
from app.api.notifications import notify_all_vendors
import datetime

router = APIRouter()

class OfferCreate(BaseModel):
    title: str
    discount: str
    code: str
    status: str = "Active"
    expires_at: Optional[str] = None # Expect ISO string format

class OfferResponse(BaseModel):
    id: int
    title: str
    discount: str
    code: str
    status: str
    expires_at: Optional[datetime.datetime]
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[OfferResponse])
async def list_offers(db: AsyncSession = Depends(get_db)):
    # Fetch active offers sorted by newest
    result = await db.execute(select(Offer).order_by(Offer.id.desc()))
    return result.scalars().all()

@router.post("/", response_model=OfferResponse)
async def create_offer(
    offer: OfferCreate,
    db: AsyncSession = Depends(get_db)
):
    # Parse expiration date if provided
    expiry_dt = None
    if offer.expires_at:
        try:
            expiry_dt = datetime.datetime.fromisoformat(offer.expires_at.replace('Z', '+00:00'))
        except ValueError:
             pass # Or handle error. For now default to None

    new_offer = Offer(
        title=offer.title,
        discount=offer.discount,
        code=offer.code,
        status=offer.status,
        expires_at=expiry_dt
    )
    
    db.add(new_offer)
    await db.commit()
    await db.refresh(new_offer)
    
    # Notify all vendors about new offer (Optional, based on business logic)
    # await notify_all_vendors(
    #     db,
    #     NotificationType.PROMOTION,
    #     title="New Offer Campaign",
    #     message=f"A new offer '{new_offer.title}' ({new_offer.discount}) is now active. Code: {new_offer.code}.",
    #     extra_data={"offer_id": str(new_offer.id)}
    # )
    # await db.commit()
    
    return new_offer

@router.delete("/{offer_id}")
async def delete_offer(offer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Offer).where(Offer.id == offer_id))
    offer = result.scalars().first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
        
    await db.delete(offer)
    await db.commit()
    return {"message": "Offer deleted successfully"}
