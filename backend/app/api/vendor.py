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

from app.models.product import Product, ProductType, ApprovalStatus
from pydantic import BaseModel
from typing import Optional

class ProductCreateSchema(BaseModel):
    name: str
    description: str = ""
    price: float
    stock_quantity: int
    category_id: int
    product_type: ProductType
    image_url: Optional[str] = None

@router.post("/products")
async def create_product(
    product_data: ProductCreateSchema,
    db: AsyncSession = Depends(get_db), 
    vendor: Vendor = Depends(get_current_vendor)
):
    product = Product(
        vendor_id=vendor.id,
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        stock_quantity=product_data.stock_quantity,
        category_id=product_data.category_id,
        product_type=product_data.product_type,
        image_url=product_data.image_url,
        
        # Auto-Publish for Immediate Mobile Sync
        is_active=True,
        approval_status=ApprovalStatus.PUBLISHED
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product
