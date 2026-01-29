from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.api.deps import get_current_admin
from app.core.config import settings
import uuid
import string
import secrets
from supabase import create_client, Client
from app.core.email import send_approval_email

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
        
        # Check if user already exists (optional, but good practice)
        # For MVP, we attempt create directly
        
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
        # Log error but don't crash if it's just a duplicate user (handle gracefully in prod)
        print(f"Supabase Auth Error: {e}")
        # If user exists, we might want to fetch them or error out. 
        # For robust MVP flow:
        raise HTTPException(status_code=500, detail=f"Failed to create Supabase User: {str(e)}")
    
    # 2. Update Vendor
    vendor.status = VendorStatus.APPROVED
    vendor.is_verified = True
    vendor.auth_user_id = auth_user_id # Link the UUIDs
    
    await db.commit()
    
    # 3. Send Email (via Background Task)
    background_tasks.add_task(send_approval_email, vendor.contact_email, temp_password)

    return {"message": "Vendor approved", "temp_credentials": {"email": vendor.contact_email, "password": temp_password}}

@router.post("/vendors/{vendor_id}/reject")
async def reject_vendor(vendor_id: uuid.UUID, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
        
    vendor.status = VendorStatus.REJECTED
    await db.commit()
    return {"message": "Vendor rejected"}
