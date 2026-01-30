from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.models.notification import Notification, NotificationType
from app.models.order import Order, OrderItem
from app.api.deps import get_current_admin
from app.core.config import settings
import uuid
import string
import secrets
from supabase import create_client, Client
from app.core.email import send_approval_email, send_suspension_email, send_reactivation_email, send_rejection_email

router = APIRouter()

def generate_temp_password(length=12):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for i in range(length))

@router.get("/vendors/pending")
async def list_pending_vendors(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(Vendor).where(Vendor.status == VendorStatus.PENDING))
    return result.scalars().all()

@router.get("/vendors")
async def list_all_vendors(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(Vendor))
    return result.scalars().all()

@router.get("/vendors/approved")
async def list_approved_vendors(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    """Get all approved vendors for messaging dropdowns."""
    result = await db.execute(select(Vendor).where(Vendor.status == VendorStatus.APPROVED))
    return result.scalars().all()

@router.post("/vendors/{vendor_id}/approve")
async def approve_vendor(vendor_id: uuid.UUID, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
        
    if vendor.status == VendorStatus.APPROVED:
        return {"message": "Already approved"}

    # 1. Create Supabase User
    temp_password = generate_temp_password()
    auth_user_id = None
    
    try:
        # Use Service Role Key for Admin Actions
        supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
        
        res = supabase.auth.admin.create_user({
            "email": vendor.contact_email,
            "password": temp_password,
            "email_confirm": True,
            "user_metadata": {
                "role": "vendor",
                "vendor_id": str(vendor.id),
                "business_name": vendor.business_name
            }
        })
        auth_user_id = res.user.id
        
    except Exception as e:
        print(f"Supabase Auth Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create Supabase User: {str(e)}")
    
    # 2. Update Vendor
    vendor.status = VendorStatus.APPROVED
    vendor.is_verified = True
    vendor.auth_user_id = auth_user_id
    
    await db.commit()
    
    # 3. Send Email (via Background Task)
    background_tasks.add_task(send_approval_email, vendor.contact_email, temp_password)

    return {"message": "Vendor approved", "temp_credentials": {"email": vendor.contact_email, "password": temp_password}}

@router.post("/vendors/{vendor_id}/reject")
async def reject_vendor(vendor_id: uuid.UUID, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
        
    vendor.status = VendorStatus.REJECTED
    
    notification = Notification(
        vendor_id=vendor.id,
        type=NotificationType.SYSTEM,
        title="Application Status Update",
        message="We regret to inform you that your vendor application has not been approved at this time. Please contact support for more information."
    )
    db.add(notification)
    
    await db.commit()
    
    background_tasks.add_task(send_rejection_email, vendor.contact_email, vendor.business_name)
    
    return {"message": "Vendor rejected"}


@router.post("/vendors/{vendor_id}/suspend")
async def suspend_vendor(vendor_id: uuid.UUID, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    """Suspend an approved vendor."""
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    if vendor.status == VendorStatus.PENDING:
        raise HTTPException(status_code=400, detail="Cannot suspend a pending vendor. Reject instead.")
    
    vendor.status = VendorStatus.SUSPENDED
    vendor.is_verified = False
    
    notification = Notification(
        vendor_id=vendor.id,
        type=NotificationType.SYSTEM,
        title="⚠️ Account Suspended",
        message="Your vendor account has been suspended. Your products are no longer visible to customers. If you believe this is an error, please contact support immediately."
    )
    db.add(notification)
    
    await db.commit()
    
    background_tasks.add_task(send_suspension_email, vendor.contact_email, vendor.business_name)
    
    return {"message": f"Vendor '{vendor.business_name}' suspended successfully"}


@router.post("/vendors/{vendor_id}/reactivate")
async def reactivate_vendor(vendor_id: uuid.UUID, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    """Reactivate a suspended vendor."""
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    if vendor.status != VendorStatus.SUSPENDED:
        raise HTTPException(status_code=400, detail="Vendor is not suspended")
    
    vendor.status = VendorStatus.APPROVED
    vendor.is_verified = True
    
    notification = Notification(
        vendor_id=vendor.id,
        type=NotificationType.SYSTEM,
        title="✅ Account Reactivated",
        message="Great news! Your vendor account has been reactivated. Your products are now visible to customers again. Welcome back!"
    )
    db.add(notification)
    
    await db.commit()
    
    background_tasks.add_task(send_reactivation_email, vendor.contact_email, vendor.business_name)
    
    return {"message": f"Vendor '{vendor.business_name}' reactivated successfully"}


@router.delete("/vendors/{vendor_id}")
async def delete_vendor(vendor_id: uuid.UUID, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    """Permanently delete a vendor and their data."""
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    business_name = vendor.business_name
    await db.delete(vendor)
    await db.commit()
    
    return {"message": f"Vendor '{business_name}' deleted permanently"}


# ========== ORDERS SECTION ==========
@router.get("/orders")
async def list_admin_orders(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    """Get all orders for Admin Dashboard."""
    try:
        query = select(Order).options(
            selectinload(Order.items).selectinload(OrderItem.product),
            selectinload(Order.items).selectinload(OrderItem.vendor)
        ).order_by(Order.created_at.desc())
        
        result = await db.execute(query)
        orders = result.scalars().all()
        
        formatted = []
        for o in orders:
            items_count = len(o.items) if o.items else 0
            formatted.append({
                "id": str(o.id),
                "customer_name": o.customer_name or "Unknown",
                "customer_email": o.customer_email or "",
                "date": o.created_at.strftime("%Y-%m-%d %H:%M") if o.created_at else "Unknown",
                "status": str(o.status.value) if hasattr(o.status, 'value') else str(o.status),
                "total": float(o.total_amount),
                "items_count": items_count
            })
        
        return formatted
        
    except Exception as e:
        print(f"Error listing admin orders: {e}")
        return []
