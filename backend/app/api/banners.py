from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Mock Banner Data (In real app, this would be a DB Model)
BANNERS = [
    {"id": 1, "title": "Summer Sale", "location": "Home - Hero", "status": "Active", "image_url": "https://via.placeholder.com/800x400"},
    {"id": 2, "title": "New Arrivals", "location": "Home - Mid", "status": "Inactive", "image_url": "https://via.placeholder.com/800x400"},
]

class BannerCreate(BaseModel):
    title: str
    location: str
    status: str = "Active"
    image_url: str

@router.get("/")
async def list_banners():
    return BANNERS

@router.post("/")
async def create_banner(banner: BannerCreate):
    new_banner = banner.dict()
    new_banner["id"] = len(BANNERS) + 1
    BANNERS.append(new_banner)
    return new_banner
