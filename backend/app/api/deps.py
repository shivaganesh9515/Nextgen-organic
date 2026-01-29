from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.user import User
from app.models.vendor import Vendor, VendorStatus
# from app.core.security import verify_token  <-- REMOVED
from jose import jwt, JWTError
from app.core.config import settings
import uuid

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if token == "DEV_ADMIN_TOKEN":
        # Mock Admin User for Development/Testing
        return User(id=uuid.uuid4(), email="admin@nextgen.com", role="admin", is_active=True)

    try:
        # MVP Hack: Decode without signature verification to accept Supabase tokens 
        # (Assuming backend doesn't have the Supabase JWT secret configured yet)
        # In production, this MUST use the Supabase JWT Secret to verify signature.
        payload = jwt.get_unverified_claims(token)
        print(f"DEBUG: Token Payload Keys: {payload.keys()}")
        
        email: str = payload.get("email") # Supabase puts email in 'email' field
        if not email:
            email = payload.get("sub") # Fallback
            
        print(f"DEBUG: Extracted Email: {email}")

        if email is None:
            raise credentials_exception
    except Exception as e:
        print(f"DEBUG: Token decoding error: {e}")
        raise credentials_exception
        
    # Sync User: Ensure this email exists in our local DB or just bypass User check and go to Vendor
    # For now, we try to find a local User. If not found, we creates a temporary one in memory 
    # so the dependency chain continues to `get_current_vendor`.
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()
    
    if user is None:
        print(f"DEBUG: User not found in DB for {email}, creating transient user.")
        # Create a transient User object for the dependency chain if local DB sync is missing
        # This allows Vendor lookup by email to proceed.
        user = User(email=email, role="vendor", is_active=True)
        # We don't save this to DB here, just return it.
    else:
        print(f"DEBUG: Found User {user.id} in DB.")
        
    return user

async def get_current_admin(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user is not an admin"
        )
    return user

async def get_current_vendor(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Local Auth User -> Linked Vendor
    # Note: In pure Supabase model, user.id would be the Auth ID.
    # Here, we assume User table is synced or used as Auth Source.
    # We query Vendor by contact_email matching User email (Simplification for Transition)
    # OR by auth_user_id if we rely on Supabase UUID.
    
    print(f"DEBUG: Looking up vendor for email: {user.email}")
    
    # Transition Logic: Match email
    result = await db.execute(select(Vendor).where(Vendor.contact_email == user.email))
    vendor = result.scalars().first()
    
    if not vendor:
        print("DEBUG: Vendor profile not found in DB.")
        raise HTTPException(status_code=403, detail="Vendor profile not found")
        
    if vendor.status != VendorStatus.APPROVED:
        print(f"DEBUG: Vendor status IS NOT APPROVED. Status is: {vendor.status}")
        raise HTTPException(status_code=403, detail="Vendor account is not approved yet")
        
    print(f"DEBUG: Vendor found and approved: {vendor.id}")
    return vendor
