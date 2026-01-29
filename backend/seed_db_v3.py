import asyncio
import sys
import os
import bcrypt

# Add current dir to path to import app modules
sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal, engine
from app.models.base import Base
from app.models.user import User
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from sqlalchemy import select

def get_hash(password: str) -> str:
    # Direct Bcrypt usage to avoid Passlib issues
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')

async def seed():
    print("🌱 Seeding Database V3 (Fixed Schema)...")
    
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
        result = await db.execute(select(Vendor).where(Vendor.contact_email == vendor_email))
        if not result.scalars().first():
            print(f"Creating Vendor Profile: Green Valley Farms")
            v_profile = Vendor(
                business_name="Green Valley Farms",
                # contact_name="John Farmer", # REMOVED - Not in model
                contact_email=vendor_email,
                phone_number="9876543210",
                address_line="123 Country Road",
                city="Hyderabad",
                state="Telangana",
                pincode="500001",
                seller_category=SellerCategory.NPOP_ORGANIC, # Enum Value
                status=VendorStatus.APPROVED,
                is_verified=True
            )
            db.add(v_profile)
        else:
             print("Vendor Profile already exists.")

        # 4. Create Dummy Vendors (For Admin Panel)
        dummies = [
            ("Fresh Organics", "fresh@test.com", "PENDING", SellerCategory.NATURAL),
            ("Daily Dairy", "milk@test.com", "APPROVED", SellerCategory.ECO_FRIENDLY),
            ("Spice World", "spice@test.com", "PENDING", SellerCategory.NPOP_ORGANIC),
            ("Berry Good", "berry@test.com", "REJECTED", SellerCategory.NATURAL),
            ("Urban Roots", "urban@test.com", "APPROVED", SellerCategory.ECO_FRIENDLY),
        ]
        
        for name, email, status, cat in dummies:
            result = await db.execute(select(Vendor).where(Vendor.contact_email == email))
            if not result.scalars().first():
                print(f"Creating Dummy Vendor: {name}")
                v = Vendor(
                    business_name=name,
                    contact_email=email,
                    phone_number=f"555{str(hash(email))[-6:]}", 
                    address_line="Mock Address Line",
                    city="Mock City",
                    state="Mock State",
                    pincode="000000",
                    seller_category=cat, # Enum Value
                    status=getattr(VendorStatus, status), 
                    is_verified=(status == "APPROVED")
                )
                db.add(v)

        await db.commit()
    
    print("✅ Database Seeded Successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
