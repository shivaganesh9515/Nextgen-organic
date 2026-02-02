from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus
from app.models.email_draft import EmailDraft, EmailStatus
import secrets
import string
import re
from sqlalchemy.sql import func
# Assuming you have a Supabase Admin Client wrapper. 
# If not, we'll need to use the supabase-py client with SERVICE_ROLE_KEY.
from supabase import create_client, Client
import os

router = APIRouter()

# Initialize Supabase Admin Client
# Ensure these env vars are available in your backend .env
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    # Fallback or Log warning - Request will fail if called
    print("WARNING: Supabase Admin Credentials Missing")

def get_supabase_admin() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def generate_secure_password(length=12):
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    while True:
        password = ''.join(secrets.choice(alphabet) for i in range(length))
        if (any(c.islower() for c in password)
                and any(c.isupper() for c in password)
                and sum(c.isdigit() for c in password) >= 1
                and any(c in "!@#$%^&*" for c in password)):
            return password

def generate_business_email(business_name: str) -> str:
    # Sanitize: Remove special chars, spaces to dots, lowercase
    clean = re.sub(r'[^a-zA-Z0-9]', '', business_name.lower())
    return f"{clean}@next360.in"

@router.post("/vendors/{vendor_id}/approve-onboard")
async def approve_and_onboard_vendor(
    vendor_id: str, 
    db: AsyncSession = Depends(get_db)
):
    """
    1. Verify Vendor exists & is PENDING
    2. Generate Credentials
    3. Create Supabase Auth User
    4. Update Vendor (Approved + Auth ID)
    5. Create Welcome Email Draft
    """
    # 1. Fetch Vendor
    result = await db.execute(select(Vendor).where(Vendor.id == vendor_id))
    vendor = result.scalars().first()
    
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    if vendor.status == VendorStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Vendor already approved")

    # 2. Generate Credentials
    email = generate_business_email(vendor.business_name)
    password = generate_secure_password()
    
    # Check for email uniqueness (naive check via Supabase or DB attempt)
    # Ideally checking DB `users` table if mapped or handling Supabase error
    
    # 3. Create Supabase User
    supabase = get_supabase_admin()
    try:
        user_attributes = {
            "email": email,
            "password": password,
            "email_confirm": True, # Auto confirm
            "user_metadata": {
                "full_name": vendor.business_name,
                "role": "vendor"
            }
        }
        user = supabase.auth.admin.create_user(user_attributes)
        auth_user_id = user.user.id
        
    except Exception as e:
        # Handle duplicate email or network error
        raise HTTPException(status_code=500, detail=f"Failed to create Auth User: {str(e)}")

    # 4. Update Vendor
    original_personal_email = vendor.contact_email # Save original email for notification
    
    vendor.status = VendorStatus.APPROVED
    vendor.auth_user_id = auth_user_id
    vendor.contact_email = email # Update to the system email (primary login)
    
    db.add(vendor)
    
    # 5. Create Draft
    email_body = f"""
    <h1>Welcome to Next360, {vendor.business_name}!</h1>
    <p>Your application has been approved.</p>
    <p><strong>Login Portal:</strong> <a href="https://next360.in/login/vendor">Vendor Login</a></p>
    <p><strong>Username:</strong> {email}</p>
    <p><strong>Temporary Password:</strong> {password}</p>
    <br>
    <p>Please change your password upon first login.</p>
    """
    
    draft = EmailDraft(
        vendor_id=vendor.id,
        recipient_email=original_personal_email, # Send to PERSONAL email
        subject="Welcome to NextGen Organics - Your Account Credentials",
        body_html=email_body,
        generated_password=password
    )
    
    db.add(draft)
    await db.commit()
    
    return {
        "success": True, 
        "message": "Vendor Approved & Credentials Generated",
        "email_draft_id": str(draft.id),
        "credentials": {
            "email": email,
            "password": password
        }
    }

@router.get("/admin/onboarding/drafts/{draft_id}")
async def get_email_draft(draft_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmailDraft).where(EmailDraft.id == draft_id))
    draft = result.scalars().first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    return draft

@router.post("/admin/onboarding/drafts/{draft_id}/send")
async def send_email_draft(draft_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmailDraft).where(EmailDraft.id == draft_id))
    draft = result.scalars().first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
        
    # TODO: Integrate actual Email Service (SendGrid/AWS SES)
    # For now, just mark SENT
    draft.status = EmailStatus.SENT
    draft.sent_at = func.now()
    
    await db.commit()
    return {"success": True, "message": "Email sent successfully (Mock)"}
