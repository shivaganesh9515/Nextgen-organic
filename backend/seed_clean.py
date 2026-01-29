"""
Clean Database and Re-seed with EXACTLY 5 Vendors
Removes all existing data and creates fresh demo data.
"""
import asyncio
import sys
import os
import uuid
import random

sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal, engine
from app.models.base import Base
from app.models.user import User
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from app.models.product import Product, ProductType, ProductApprovalStatus
from app.models.category import Category
from app.models.order import Order, OrderItem
from app.core.security import get_password_hash
from sqlalchemy import select, delete

# ===================== DEMO DATA =====================

VENDORS = [
    {
        "business_name": "Green Valley Farms",
        "email": "greenvalley@nextgen.com",
        "password": "vendor123",
        "phone": "9876543210",
        "city": "Hyderabad",
        "category": SellerCategory.NPOP_ORGANIC,
        "specialty": "Fresh Vegetables & Leafy Greens"
    },
    {
        "business_name": "Sunrise Organics",
        "email": "sunrise@nextgen.com",
        "password": "vendor123",
        "phone": "9876543211",
        "city": "Bangalore",
        "category": SellerCategory.NATURAL,
        "specialty": "Fruits & Berries"
    },
    {
        "business_name": "Nature's Basket",
        "email": "naturesbasket@nextgen.com",
        "password": "vendor123",
        "phone": "9876543212",
        "city": "Chennai",
        "category": SellerCategory.ECO_FRIENDLY,
        "specialty": "Grains, Pulses & Millets"
    },
    {
        "business_name": "Farm Fresh Daily",
        "email": "farmfresh@nextgen.com",
        "password": "vendor123",
        "phone": "9876543213",
        "city": "Mumbai",
        "category": SellerCategory.NPOP_ORGANIC,
        "specialty": "Dairy & Eggs"
    },
    {
        "business_name": "Herbal Haven",
        "email": "herbalhaven@nextgen.com",
        "password": "vendor123",
        "phone": "9876543214",
        "city": "Delhi",
        "category": SellerCategory.NATURAL,
        "specialty": "Spices, Herbs & Condiments"
    }
]

CATEGORIES = [
    {"name": "Fresh Vegetables", "slug": "vegetables", "image": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400"},
    {"name": "Fruits", "slug": "fruits", "image": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400"},
    {"name": "Grains & Millets", "slug": "grains", "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
    {"name": "Dairy Products", "slug": "dairy", "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400"},
    {"name": "Spices & Herbs", "slug": "spices", "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"},
]

# Product templates per category (5 products each for simplicity)
PRODUCTS_BY_CATEGORY = {
    "vegetables": [
        ("Organic Spinach", "Fresh green spinach leaves, pesticide-free", 45, 100),
        ("Farm Fresh Tomatoes", "Juicy red tomatoes from organic farms", 60, 80),
        ("Green Capsicum", "Crisp bell peppers, naturally grown", 80, 60),
        ("Organic Carrots", "Sweet and crunchy carrots", 55, 90),
        ("Fresh Broccoli", "Nutrient-rich broccoli florets", 120, 40),
    ],
    "fruits": [
        ("Organic Apples", "Sweet and crispy Himalayan apples", 180, 100),
        ("Fresh Bananas", "Naturally ripened bananas", 50, 150),
        ("Organic Mangoes", "Sweet Alphonso mangoes", 250, 80),
        ("Sweet Oranges", "Juicy Nagpur oranges", 90, 120),
        ("Fresh Pomegranate", "Ruby red pomegranates", 160, 80),
    ],
    "grains": [
        ("Organic Basmati Rice", "Premium aged basmati", 180, 200),
        ("Brown Rice", "Whole grain brown rice", 120, 150),
        ("Quinoa", "Organic white quinoa", 350, 80),
        ("Foxtail Millet", "Nutritious foxtail millet", 90, 100),
        ("Ragi (Finger Millet)", "Organic ragi grains", 85, 120),
    ],
    "dairy": [
        ("Fresh Milk (1L)", "Farm fresh cow milk", 70, 100),
        ("Organic Curd", "Thick set curd", 55, 80),
        ("Paneer (250g)", "Fresh cottage cheese", 120, 60),
        ("Organic Ghee (500ml)", "A2 cow ghee", 650, 40),
        ("Farm Eggs (12 pack)", "Free-range organic eggs", 150, 100),
    ],
    "spices": [
        ("Organic Turmeric Powder", "Pure haldi powder", 150, 100),
        ("Red Chilli Powder", "Kashmiri red chilli", 180, 80),
        ("Cumin Seeds", "Organic jeera", 200, 90),
        ("Black Pepper", "Whole black pepper", 350, 60),
        ("Garam Masala", "Premium spice blend", 220, 70),
    ],
}

PRODUCT_IMAGES = {
    "vegetables": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    "fruits": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400",
    "grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    "dairy": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    "spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
}

async def clean_and_seed():
    print("\n🧹 CLEANING DATABASE...")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        # Delete all existing data in order (respecting foreign keys)
        print("   Deleting order items...")
        await db.execute(delete(OrderItem))
        print("   Deleting orders...")
        await db.execute(delete(Order))
        print("   Deleting products...")
        await db.execute(delete(Product))
        print("   Deleting categories...")
        await db.execute(delete(Category))
        print("   Deleting vendors...")
        await db.execute(delete(Vendor))
        print("   Deleting users...")
        await db.execute(delete(User))
        await db.commit()
        print("   ✅ All tables cleared!")

    print("\n🌱 SEEDING FRESH DATA...")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        
        # 1. Create Admin User
        print("\n1️⃣  Creating Admin User...")
        admin = User(
            email="admin@nextgen.com",
            hashed_password=get_password_hash("admin"),
            full_name="Super Admin",
            role="admin",
            is_active=True,
            is_superuser=True
        )
        db.add(admin)
        print(f"   ✅ Admin: admin@nextgen.com / admin")

        # 2. Create Categories
        print("\n2️⃣  Creating Categories...")
        category_map = {}
        for cat_data in CATEGORIES:
            cat = Category(
                name=cat_data["name"],
                slug=cat_data["slug"],
                image_url=cat_data["image"]
            )
            db.add(cat)
            await db.flush()
            category_map[cat_data["slug"]] = cat.id
            print(f"   ✅ {cat_data['name']}")

        # 3. Create Vendors & Their Products
        print("\n3️⃣  Creating 5 Vendors...")
        
        vendor_category_mapping = ["vegetables", "fruits", "grains", "dairy", "spices"]
        
        for idx, v_data in enumerate(VENDORS):
            print(f"\n   📦 Vendor {idx+1}: {v_data['business_name']}")
            
            # Create User for Vendor
            user = User(
                email=v_data["email"],
                hashed_password=get_password_hash(v_data["password"]),
                full_name=v_data["business_name"] + " Owner",
                role="vendor",
                is_active=True
            )
            db.add(user)
            
            # Create Vendor Profile (ALL APPROVED)
            vendor = Vendor(
                business_name=v_data["business_name"],
                contact_email=v_data["email"],
                phone_number=v_data["phone"],
                address_line=f"{random.randint(1,500)} Organic Lane",
                city=v_data["city"],
                state="India",
                pincode=f"{random.randint(100000, 999999)}",
                seller_category=v_data["category"],
                status=VendorStatus.APPROVED,  # All 5 are APPROVED
                is_verified=True
            )
            db.add(vendor)
            await db.flush()
            
            print(f"      Login: {v_data['email']} / {v_data['password']}")
            
            # Create 5 Products for this vendor
            cat_slug = vendor_category_mapping[idx]
            products_data = PRODUCTS_BY_CATEGORY.get(cat_slug, [])
            cat_id = category_map.get(cat_slug)
            
            for p_name, p_desc, p_price, p_stock in products_data:
                slug = f"{p_name.lower().replace(' ', '-').replace('(', '').replace(')', '')}-{vendor.id}"[:80]
                product = Product(
                    vendor_id=vendor.id,
                    category_id=cat_id,
                    name=p_name,
                    slug=slug,
                    description=p_desc,
                    price=p_price + random.randint(-5, 10),
                    stock_quantity=p_stock + random.randint(-10, 30),
                    image_url=PRODUCT_IMAGES.get(cat_slug),
                    product_type=ProductType.ORGANIC,
                    approval_status=ProductApprovalStatus.PUBLISHED,
                    is_active=True
                )
                db.add(product)
            
            print(f"      Products: 5 items in {cat_slug}")
        
        await db.commit()

    print("\n" + "=" * 50)
    print("✅ DATABASE READY!")
    print("=" * 50)
    print("\n📊 FINAL COUNTS:")
    print("   • Admin Users: 1")
    print("   • Vendors: 5 (all APPROVED)")
    print("   • Products: 25 (5 per vendor)")
    print("   • Orders: 0")
    print("\n📋 LOGIN CREDENTIALS:")
    print("-" * 50)
    print(f"{'Role':<10} {'Email':<30} {'Password':<15}")
    print("-" * 50)
    print(f"{'Admin':<10} {'admin@nextgen.com':<30} {'admin':<15}")
    for v in VENDORS:
        print(f"{'Vendor':<10} {v['email']:<30} {v['password']:<15}")
    print("-" * 50)

if __name__ == "__main__":
    asyncio.run(clean_and_seed())
