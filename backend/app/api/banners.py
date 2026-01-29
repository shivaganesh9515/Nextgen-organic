from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.banner import Banner
from app.models.notification import NotificationType
from app.api.notifications import notify_all_vendors

router = APIRouter()

class BannerCreate(BaseModel):
    title: str
    location: str
    status: str = "Active"
    image_url: str
    link_url: str = None  # Added link_url

class BannerUpdate(BaseModel):
    title: str | None = None
    location: str | None = None
    status: str | None = None
    image_url: str | None = None
    link_url: str | None = None

class BannerResponse(BaseModel):
    id: int
    title: str
    location: str
    status: str
    image_url: str
    link_url: str | None = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[BannerResponse])
async def list_banners(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Banner).order_by(Banner.id.desc()))
    return result.scalars().all()

@router.post("/", response_model=BannerResponse)
async def create_banner(
    banner: BannerCreate,
    db: AsyncSession = Depends(get_db)
):
    new_banner = Banner(**banner.dict())
    db.add(new_banner)
    await db.commit()
    await db.refresh(new_banner)
    
    # Notify all vendors about new banner if active
    if new_banner.status == "Active":
        await notify_all_vendors(
            db,
            NotificationType.PROMOTION,
            title="New Banner Available",
            message=f"A new banner '{new_banner.title}' is now active on the {new_banner.location}.",
            extra_data={"banner_id": new_banner.id}
        )
        await db.commit()
    
    return new_banner

@router.put("/{banner_id}", response_model=BannerResponse)
async def update_banner(
    banner_id: int,
    banner_update: BannerUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Banner).where(Banner.id == banner_id))
    banner = result.scalars().first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    
    update_data = banner_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(banner, key, value)
    
    await db.commit()
    await db.refresh(banner)
    return banner

@router.delete("/{banner_id}")
async def delete_banner(
    banner_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Banner).where(Banner.id == banner_id))
    banner = result.scalars().first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    
    await db.delete(banner)
    await db.commit()
    return {"message": "Banner deleted successfully"}
