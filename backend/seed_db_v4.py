"""
Database Seeding Script V4 - Uses App's Own Security Module
This ensures password hashes are 100% compatible with the login system.
"""
import asyncio
import sys
import os

sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal, engine
from app.models.base import Base
from app.models.user import User
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from app.core.security import get_password_hash  # Use the app's own hashing!
from sqlalchemy import select

async def seed():
    print("🌱 Seeding Database V4 (Using App's Security Module)...")
    
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        
        # 1. Create Admin
        admin_email = "admin@nextgen.com"
        result = await db.execute(select(User).where(User.email == admin_email))
        existing = result.scalars().first()
        
        if existing:
            print(f"⚠️  Admin exists. Updating password...")
            existing.hashed_password = get_password_hash("admin")
        else:
            print(f"✨ Creating Admin: {admin_email}")
            admin = User(
                email=admin_email,
                hashed_password=get_password_hash("admin"),
                full_name="Super Admin",
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(admin)
        
        # 2. Create Vendor User
        vendor_email = "farm@nextgen.com"
        result = await db.execute(select(User).where(User.email == vendor_email))
        existing_vendor = result.scalars().first()
        
        if existing_vendor:
            print(f"⚠️  Vendor user exists. Updating password...")
            existing_vendor.hashed_password = get_password_hash("farm")
        else:
            print(f"✨ Creating Vendor User: {vendor_email}")
            vendor_user = User(
                email=vendor_email,
                hashed_password=get_password_hash("farm"),
                full_name="Green Valley Owner",
                role="vendor",
                is_active=True
            )
            db.add(vendor_user)

        # 3. Create Vendor Profile
        result = await db.execute(select(Vendor).where(Vendor.contact_email == vendor_email))
        if not result.scalars().first():
            print(f"✨ Creating Vendor Profile: Green Valley Farms")
            v_profile = Vendor(
                business_name="Green Valley Farms",
                contact_email=vendor_email,
                phone_number="9876543210",
                address_line="123 Country Road",
                city="Hyderabad",
                state="Telangana",
                pincode="500001",
                seller_category=SellerCategory.NPOP_ORGANIC,
                status=VendorStatus.APPROVED,
                is_verified=True
            )
            db.add(v_profile)

        # 4. Create Demo Vendors
        dummies = [
            ("Fresh Organics", "fresh@test.com", VendorStatus.PENDING, SellerCategory.NATURAL),
            ("Daily Dairy", "milk@test.com", VendorStatus.APPROVED, SellerCategory.ECO_FRIENDLY),
            ("Spice World", "spice@test.com", VendorStatus.PENDING, SellerCategory.NPOP_ORGANIC),
            ("Berry Good", "berry@test.com", VendorStatus.REJECTED, SellerCategory.NATURAL),
            ("Urban Roots", "urban@test.com", VendorStatus.APPROVED, SellerCategory.ECO_FRIENDLY),
        ]
        
        for name, email, status, cat in dummies:
            result = await db.execute(select(Vendor).where(Vendor.contact_email == email))
            if not result.scalars().first():
                print(f"✨ Creating Demo Vendor: {name}")
                v = Vendor(
                    business_name=name,
                    contact_email=email,
                    phone_number=f"555{abs(hash(email)) % 1000000:06d}",
                    address_line="Demo Address",
                    city="Demo City",
                    state="Demo State",
                    pincode="000000",
                    seller_category=cat,
                    status=status,
                    is_verified=(status == VendorStatus.APPROVED)
                )
                db.add(v)

        await db.commit()
    
    print("\n✅ Database Seeded Successfully!")
    print("   Admin: admin@nextgen.com / admin")
    print("   Vendor: farm@nextgen.com / farm")

if __name__ == "__main__":
    asyncio.run(seed())
