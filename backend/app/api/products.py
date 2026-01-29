from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.models.product import Product, ProductApprovalStatus
from app.api.deps import get_current_vendor, get_current_admin
from typing import List
import uuid
from app.models.admin_notification import AdminNotification, AdminNotificationType

router = APIRouter()


@router.get("/all")
async def list_all_products(db: AsyncSession = Depends(get_db), admin = Depends(get_current_admin)):
    """
    Admin Endpoint: Get all products across all vendors.
    """
    result = await db.execute(
        select(Product).options(selectinload(Product.vendor), selectinload(Product.category))
    )
    products = result.scalars().all()
    
    return [
        {
            "id": str(p.id),
            "name": p.name,
            "description": p.description or "",
            "vendor": p.vendor.business_name if p.vendor else "Unknown",
            "vendor_id": str(p.vendor_id),
            "category": p.category.name if p.category else "General",
            "price": float(p.price),
            "stock": p.stock_quantity or 0,
            "status": str(p.approval_status.value) if p.approval_status else "DRAFT",
            "image_url": p.image_url or "",
            "is_active": p.is_active
        }
        for p in products
    ]


@router.get("/")
async def list_vendor_products(db: AsyncSession = Depends(get_db), vendor: Vendor = Depends(get_current_vendor)):
    """
    Get all products for the authenticated vendor.
    Returns products belonging to the logged-in vendor.
    """
    result = await db.execute(
        select(Product)
        .where(Product.vendor_id == vendor.id)
        .options(selectinload(Product.category))
    )
    products = result.scalars().all()
    
    return [
        {
            "id": str(p.id),
            "name": p.name,
            "description": p.description or "",
            "category": p.category.name if p.category else "General",
            "price": float(p.price),
            "stock": p.stock_quantity or 0,
            "status": str(p.approval_status.value) if p.approval_status else "DRAFT",
            "image_url": p.image_url or "",
            "is_active": p.is_active
        }
        for p in products
    ]


@router.get("/{product_id}")
async def get_product(product_id: str, db: AsyncSession = Depends(get_db), vendor: Vendor = Depends(get_current_vendor)):
    """
    Get a single product by ID (must belong to the vendor).
    """
    try:
        pid = uuid.UUID(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    result = await db.execute(
        select(Product)
        .where(Product.id == pid, Product.vendor_id == vendor.id)
        .options(selectinload(Product.category))
    )
    product = result.scalars().first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "id": str(product.id),
        "name": product.name,
        "description": product.description or "",
        "category": product.category.name if product.category else "General",
        "price": float(product.price),
        "stock": product.stock_quantity or 0,
        "status": str(product.approval_status.value) if product.approval_status else "DRAFT",
        "image_url": product.image_url or "",
        "is_active": product.is_active
    }


@router.post("/")
async def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock_quantity: int = Form(...),
    category_id: int = Form(None),
    image: UploadFile = File(None),
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """
    Create a new product for the authenticated vendor.
    """
    
    # Mock Image Upload URL
    image_url = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400"
    if image and image.filename:
        image_url = f"https://mock-storage.com/{image.filename}"
    
    # Generate slug
    slug = f"{name.lower().replace(' ', '-')}-{vendor.id}"[:80]
    
    new_product = Product(
        name=name,
        slug=slug,
        description=description,
        price=price,
        stock_quantity=stock_quantity,
        category_id=category_id,
        image_url=image_url,
        vendor_id=vendor.id,
        approval_status=ProductApprovalStatus.PUBLISHED,
        is_active=True
    )
    
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    
    # Notify Admin
    admin_notif = AdminNotification(
        type=AdminNotificationType.NEW_PRODUCT,
        title="New Product Added",
        message=f"Vendor has added a new product: {name}",
        extra_data={"vendor_id": str(vendor.id), "product_id": str(new_product.id)}
    )
    db.add(admin_notif)
    await db.commit()
    
    return {
        "id": str(new_product.id),
        "name": new_product.name,
        "message": "Product created successfully"
    }


@router.delete("/{product_id}")
async def delete_product(product_id: str, db: AsyncSession = Depends(get_db), vendor: Vendor = Depends(get_current_vendor)):
    """
    Delete a product (soft delete - sets is_active to False).
    """
    try:
        pid = uuid.UUID(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    result = await db.execute(
        select(Product).where(Product.id == pid, Product.vendor_id == vendor.id)
    )
    product = result.scalars().first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.is_active = False
    await db.commit()
    
    return {"message": "Product deleted successfully"}

