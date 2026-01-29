import asyncio
import sys
import os

# Add current dir to path to import app modules
sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal, engine
from app.models.base import Base
from app.models.user import User
from app.models.vendor import Vendor, VendorStatus
from sqlalchemy import select

# Local Hashing Implementation to avoid Import Errors
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hash(password: str) -> str:
    return pwd_context.hash(password)

async def seed():
    print("🌱 Seeding Database V2...")
    
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        
        # 1. Create Admin
        admin_email = "admin@nextgen.com"
        result = await db.execute(select(User).where(User.email == admin_email))
        if not result.scalars().first():
            print(f"Creating Admin: {admin_email}")
            admin = User(
                email=admin_email,
                hashed_password=get_hash("admin"),
                full_name="Super Admin",
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(admin)
        else:
            print("Admin already exists.")
        
        # 2. Create Vendor User (for Login)
        vendor_email = "farm@nextgen.com"
        result = await db.execute(select(User).where(User.email == vendor_email))
        existing_vendor_user = result.scalars().first()
        
        if not existing_vendor_user:
            print(f"Creating Vendor User: {vendor_email}")
            vendor_user = User(
                email=vendor_email,
                hashed_password=get_hash("farm"),
                full_name="Green Valley Owner",
                role="vendor",
                is_active=True
            )
            db.add(vendor_user)
            await db.commit()
            await db.refresh(vendor_user)
            existing_vendor_user = vendor_user
        else:
            print("Vendor User already exists.")

        # 3. Create Vendor Profile (Linked to User)
        # Check if profile exists
        result = await db.execute(select(Vendor).where(Vendor.contact_email == vendor_email))
        if not result.scalars().first():
            print(f"Creating Vendor Profile: Green Valley Farms")
            v_profile = Vendor(
                # owner_id=existing_vendor_user.id, 
                business_name="Green Valley Farms",
                contact_name="John Farmer",
                contact_email=vendor_email,
                phone_number="9876543210",
                address="123 Country Road",
                seller_category="FARMER",
                status=VendorStatus.APPROVED,
                is_verified=True
            )
            db.add(v_profile)
        else:
             print("Vendor Profile already exists.")

        # 4. Create Dummy Vendors (For Admin Panel)
        dummies = [
            ("Fresh Organics", "fresh@test.com", "PENDING", "WHOLESALER"),
            ("Daily Dairy", "milk@test.com", "APPROVED", "FARMER"),
            ("Spice World", "spice@test.com", "PENDING", "AGGREGATOR"),
            ("Berry Good", "berry@test.com", "REJECTED", "FARMER"),
            ("Urban Roots", "urban@test.com", "APPROVED", "FARMER"),
        ]
        
        for name, email, status, cat in dummies:
            result = await db.execute(select(Vendor).where(Vendor.contact_email == email))
            if not result.scalars().first():
                print(f"Creating Dummy Vendor: {name}")
                v = Vendor(
                    business_name=name,
                    contact_name="Test Owner",
                    contact_email=email,
                    phone_number=f"555{str(hash(email))[-6:]}", # dummy phone
                    address="Mock Address",
                    seller_category=cat,
                    status=getattr(VendorStatus, status), 
                    is_verified=(status == "APPROVED")
                )
                db.add(v)

        await db.commit()
    
    print("✅ Database Seeded Successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
