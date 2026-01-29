
import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from app.models.user import User

async def seed_vendor_db():
    async with AsyncSessionLocal() as db:
        print("🌱 Seeding Database Vendor directly...")
        
        email = "vendor.demo@nextgen.com"
        
        # 1. Check if Vendor exists
        result = await db.execute(select(Vendor).where(Vendor.contact_email == email))
        vendor = result.scalars().first()
        
        if vendor:
            print(f"ℹ️ Vendor {email} already exists. Updating status to APPROVED.")
            vendor.status = VendorStatus.APPROVED
            vendor.is_verified = True
        else:
            print(f"✨ Creating new Vendor {email}...")
            vendor = Vendor(
                business_name="Organic Harvest Co.",
                contact_email=email,
                phone_number="+91 9988776655",
                # New fields based on updated Model
                address_line="123 Green Valley",
                city="Nashik",
                state="Maharashtra",
                pincode="422001",
                seller_category=SellerCategory.NATURAL, # Enum
                status=VendorStatus.APPROVED, # Pre-approve!
                is_verified=True,
                documents={"company_reg": "http://mock/doc1.pdf"},
                fssai_number="12345678901234",
                fssai_type="State"
                # Add dates if needed, handled as nullable usually?
            )
            db.add(vendor)
            
        # 2. Sync User Table (Optional but safe)
        # Auth happens in Supabase, but our Code attempts to sync User table sometimes
        result_user = await db.execute(select(User).where(User.email == email))
        user = result_user.scalars().first()
        if not user:
             print("✨ Creating linked Local User...")
             user = User(email=email, role="vendor", is_active=True, hashed_password="DUMMY_HASH_SUPABASE_AUTH")
             db.add(user)
        
        await db.commit()
        print("✅ Database Seeded Successfully! Vendor + User created and APPROVED.")

if __name__ == "__main__":
    asyncio.run(seed_vendor_db())
