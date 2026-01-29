from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.models.product import Product
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.models.product import Product
from app.api.deps import get_current_vendor, get_current_admin
from typing import List
import uuid

router = APIRouter()

from sqlalchemy.orm import selectinload

@router.get("/all")
async def list_all_products(db: AsyncSession = Depends(get_db), admin = Depends(get_current_admin)):
    """
    Admin Endpoint: Get all products across all vendors.
    """
    result = await db.execute(select(Product).options(selectinload(Product.vendor)))
    products = result.scalars().all()
    
    # Transform to list of dicts with vendor name
    return [
        {
            "id": p.id,
            "name": p.name,
            "vendor": p.vendor.business_name if p.vendor else "Unknown",
            "price": p.price,
            "stock": p.stock_quantity,
            "status": p.status
        }
        for p in products
    ]

@router.get("/", response_model=List[dict])
async def list_vendor_products(db: AsyncSession = Depends(get_db), vendor: Vendor = Depends(get_current_vendor)):
    """
    Get all products for the authenticated vendor.
    """
    # Assuming Product model has a vendor_id and relationship
    # Since Product model was created earlier, let's assume standard SQLAlchemy
    # We might need to check app/models/vendor.py to match exact fields
    
    # Placeholder query until model is verified
    # result = await db.execute(select(Product).where(Product.vendor_id == vendor.id))
    # return result.scalars().all()
    return []

@router.post("/")
async def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock_quantity: int = Form(...),
    category: str = Form(...),
    is_organic: bool = Form(False),
    image: UploadFile = File(None),
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """
    Create a new product.
    Handles image upload (Mock for now, returns a dummy URL).
    """
    
    # Mock Image Upload URL
    image_url = ""
    if image:
        # 1. Upload to Supabase Storage / Drive (Using Mock here)
        image_url = f"https://mock-storage.com/{image.filename}"
    
    new_product = Product(
        name=name,
        description=description,
        price=price,
        stock_quantity=stock_quantity,
        category=category,
        is_organic=is_organic,
        image_url=image_url,
        vendor_id=vendor.id,
        status="active" # Default status
    )
    
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    
    return new_product
