from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.product import Product
from app.models.vendor import Vendor
from app.api.deps import get_current_vendor
from app.schemas.vendor import VendorResponse # Reuse or create Product Schema
import uuid

router = APIRouter()

@router.get("/me/profile", response_model=VendorResponse)
async def get_profile(vendor: Vendor = Depends(get_current_vendor)):
    return vendor

@router.patch("/me/profile")
async def update_profile(
    phone_number: str = None,
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    if phone_number:
        vendor.phone_number = phone_number
    
    await db.commit()
    await db.refresh(vendor)
    return vendor

@router.get("/products")
async def list_my_products(db: AsyncSession = Depends(get_db), vendor: Vendor = Depends(get_current_vendor)):
    result = await db.execute(select(Product).where(Product.vendor_id == vendor.id))
    return result.scalars().all()

@router.post("/products")
async def create_product(
    name: str, 
    price: float, 
    description: str = "", 
    category_id: int = None,
    db: AsyncSession = Depends(get_db), 
    vendor: Vendor = Depends(get_current_vendor)
):
    # Basic creation logic
    # Real implementation would use Pydantic schema
    product = Product(
        vendor_id=vendor.id,
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        approval_status="DRAFT" # Auto-draft
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product
