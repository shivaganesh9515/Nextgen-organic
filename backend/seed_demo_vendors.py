"""
Comprehensive Demo Seeding Script
Creates 5 Vendor Users with Logins + 20-30 Products Each
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
from app.core.security import get_password_hash
from sqlalchemy import select

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
    {"name": "Pulses & Lentils", "slug": "pulses", "image": "https://images.unsplash.com/photo-1515543904435-f8a5003fe5dd?w=400"},
    {"name": "Oils & Ghee", "slug": "oils", "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"},
    {"name": "Honey & Sweeteners", "slug": "honey", "image": "https://images.unsplash.com/photo-1587049352847-de tried-honey-9b6c?w=400"},
]

# Product templates per category
PRODUCTS_BY_CATEGORY = {
    "vegetables": [
        ("Organic Spinach", "Fresh green spinach leaves, pesticide-free", 45, 100),
        ("Farm Fresh Tomatoes", "Juicy red tomatoes from organic farms", 60, 80),
        ("Green Capsicum", "Crisp bell peppers, naturally grown", 80, 60),
        ("Organic Carrots", "Sweet and crunchy carrots", 55, 90),
        ("Fresh Broccoli", "Nutrient-rich broccoli florets", 120, 40),
        ("Organic Cauliflower", "White cauliflower heads", 65, 50),
        ("Lady Finger (Bhindi)", "Tender okra pods", 50, 70),
        ("Organic Potatoes", "Farm fresh potatoes", 40, 150),
        ("Green Beans", "Crispy string beans", 70, 60),
        ("Organic Onions", "Fresh red onions", 35, 200),
        ("Bottle Gourd (Lauki)", "Fresh bottle gourd", 45, 80),
        ("Ridge Gourd", "Organic ridge gourd", 50, 70),
        ("Bitter Gourd (Karela)", "Fresh bitter gourd", 55, 60),
        ("Organic Cabbage", "Green cabbage heads", 40, 90),
        ("Fresh Beetroot", "Deep red beetroot", 60, 70),
    ],
    "fruits": [
        ("Organic Apples", "Sweet and crispy Himalayan apples", 180, 100),
        ("Fresh Bananas", "Naturally ripened bananas", 50, 150),
        ("Organic Mangoes", "Sweet Alphonso mangoes", 250, 80),
        ("Papaya", "Ripe organic papaya", 70, 60),
        ("Sweet Oranges", "Juicy Nagpur oranges", 90, 120),
        ("Organic Grapes", "Seedless green grapes", 140, 70),
        ("Fresh Pomegranate", "Ruby red pomegranates", 160, 80),
        ("Organic Guava", "Fresh guavas", 80, 90),
        ("Watermelon", "Sweet watermelons", 45, 50),
        ("Muskmelon", "Fragrant muskmelons", 55, 60),
        ("Fresh Strawberries", "Organic strawberries", 200, 40),
        ("Kiwi Fruit", "Imported organic kiwi", 180, 50),
        ("Sweet Lime (Mosambi)", "Juicy sweet lime", 75, 100),
        ("Dragon Fruit", "Exotic dragon fruit", 220, 30),
        ("Organic Pineapple", "Sweet pineapples", 90, 60),
    ],
    "grains": [
        ("Organic Basmati Rice", "Premium aged basmati", 180, 200),
        ("Brown Rice", "Whole grain brown rice", 120, 150),
        ("Quinoa", "Organic white quinoa", 350, 80),
        ("Foxtail Millet", "Nutritious foxtail millet", 90, 100),
        ("Ragi (Finger Millet)", "Organic ragi grains", 85, 120),
        ("Jowar (Sorghum)", "Organic jowar grains", 75, 100),
        ("Bajra (Pearl Millet)", "Traditional bajra", 70, 110),
        ("Organic Wheat", "Stone-ground wheat", 55, 200),
        ("Oats", "Rolled organic oats", 140, 80),
        ("Barley", "Organic barley grains", 95, 70),
        ("Amaranth Seeds", "Nutritious amaranth", 110, 60),
        ("Buckwheat", "Gluten-free buckwheat", 160, 50),
        ("Little Millet", "Organic little millet", 100, 80),
        ("Kodo Millet", "Traditional kodo millet", 95, 70),
        ("Barnyard Millet", "Organic barnyard millet", 90, 75),
    ],
    "dairy": [
        ("Fresh Milk (1L)", "Farm fresh cow milk", 70, 100),
        ("Organic Curd", "Thick set curd", 55, 80),
        ("Paneer (250g)", "Fresh cottage cheese", 120, 60),
        ("Butter (500g)", "Pure organic butter", 280, 50),
        ("Organic Ghee (500ml)", "A2 cow ghee", 650, 40),
        ("Buttermilk", "Fresh chaas", 30, 100),
        ("Fresh Cream", "Heavy whipping cream", 90, 50),
        ("Organic Cheese", "Artisan cheese block", 350, 30),
        ("Farm Eggs (6 pack)", "Free-range organic eggs", 80, 120),
        ("Farm Eggs (12 pack)", "Free-range organic eggs", 150, 100),
        ("Flavored Yogurt", "Organic fruit yogurt", 60, 70),
        ("Lassi (Sweet)", "Traditional sweet lassi", 45, 80),
        ("Khoa (250g)", "Fresh reduced milk", 180, 40),
        ("Mozzarella Cheese", "Fresh mozzarella", 280, 35),
        ("Buffalo Milk (1L)", "Fresh buffalo milk", 80, 90),
    ],
    "spices": [
        ("Organic Turmeric Powder", "Pure haldi powder", 150, 100),
        ("Red Chilli Powder", "Kashmiri red chilli", 180, 80),
        ("Cumin Seeds", "Organic jeera", 200, 90),
        ("Coriander Powder", "Fresh dhania powder", 120, 100),
        ("Black Pepper", "Whole black pepper", 350, 60),
        ("Cardamom (Elaichi)", "Green cardamom pods", 1200, 40),
        ("Cinnamon Sticks", "Organic dalchini", 280, 50),
        ("Cloves", "Whole organic cloves", 450, 45),
        ("Bay Leaves", "Dried tej patta", 80, 80),
        ("Garam Masala", "Premium spice blend", 220, 70),
        ("Fresh Ginger", "Organic ginger root", 90, 100),
        ("Garlic", "Organic garlic bulbs", 120, 90),
        ("Fresh Mint Leaves", "Organic pudina", 40, 80),
        ("Curry Leaves", "Fresh kadi patta", 30, 100),
        ("Fenugreek Seeds", "Organic methi dana", 100, 70),
    ],
}

# Image URLs for products
PRODUCT_IMAGES = {
    "vegetables": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    "fruits": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400",
    "grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    "dairy": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    "spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
}

async def seed():
    print("\n🌱 COMPREHENSIVE DEMO SEEDING")
    print("=" * 50)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        
        # 1. Create/Update Admin
        print("\n1️⃣  Creating Admin User...")
        admin_email = "admin@nextgen.com"
        result = await db.execute(select(User).where(User.email == admin_email))
        admin = result.scalars().first()
        if admin:
            admin.hashed_password = get_password_hash("admin")
            print(f"   ✅ Admin updated: {admin_email}")
        else:
            admin = User(
                email=admin_email,
                hashed_password=get_password_hash("admin"),
                full_name="Super Admin",
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(admin)
            print(f"   ✅ Admin created: {admin_email}")

        # 2. Create Categories
        print("\n2️⃣  Creating Categories...")
        category_map = {}
        for cat_data in CATEGORIES:
            result = await db.execute(select(Category).where(Category.slug == cat_data["slug"]))
            cat = result.scalars().first()
            if not cat:
                cat = Category(
                    name=cat_data["name"],
                    slug=cat_data["slug"],
                    image_url=cat_data["image"]
                )
                db.add(cat)
                await db.flush()
                print(f"   ✅ Created: {cat_data['name']}")
            category_map[cat_data["slug"]] = cat.id if hasattr(cat, 'id') else None

        await db.commit()
        
        # Refresh category_map with IDs
        for cat_data in CATEGORIES:
            result = await db.execute(select(Category).where(Category.slug == cat_data["slug"]))
            cat = result.scalars().first()
            if cat:
                category_map[cat_data["slug"]] = cat.id

        # 3. Create Vendors & Products
        print("\n3️⃣  Creating Vendors & Products...")
        
        vendor_category_mapping = {
            0: ["vegetables"],           # Green Valley Farms
            1: ["fruits"],               # Sunrise Organics
            2: ["grains"],               # Nature's Basket
            3: ["dairy"],                # Farm Fresh Daily
            4: ["spices"],               # Herbal Haven
        }
        
        for idx, v_data in enumerate(VENDORS):
            print(f"\n   📦 Vendor {idx+1}: {v_data['business_name']}")
            
            # Create User
            result = await db.execute(select(User).where(User.email == v_data["email"]))
            user = result.scalars().first()
            if user:
                user.hashed_password = get_password_hash(v_data["password"])
            else:
                user = User(
                    email=v_data["email"],
                    hashed_password=get_password_hash(v_data["password"]),
                    full_name=v_data["business_name"] + " Owner",
                    role="vendor",
                    is_active=True
                )
                db.add(user)
            
            # Create Vendor Profile
            result = await db.execute(select(Vendor).where(Vendor.contact_email == v_data["email"]))
            vendor = result.scalars().first()
            if not vendor:
                vendor = Vendor(
                    business_name=v_data["business_name"],
                    contact_email=v_data["email"],
                    phone_number=v_data["phone"],
                    address_line=f"{random.randint(1,500)} Organic Lane",
                    city=v_data["city"],
                    state="India",
                    pincode=f"{random.randint(100000, 999999)}",
                    seller_category=v_data["category"],
                    status=VendorStatus.APPROVED,
                    is_verified=True
                )
                db.add(vendor)
                await db.flush()
            
            print(f"      User: {v_data['email']} / {v_data['password']}")
            
            # Create Products for this vendor
            categories_for_vendor = vendor_category_mapping.get(idx, ["vegetables"])
            products_created = 0
            
            for cat_slug in categories_for_vendor:
                products_data = PRODUCTS_BY_CATEGORY.get(cat_slug, [])
                cat_id = category_map.get(cat_slug)
                
                for p_name, p_desc, p_price, p_stock in products_data:
                    # Check if product exists
                    slug = f"{p_name.lower().replace(' ', '-').replace('(', '').replace(')', '')}-{vendor.id}"[:100]
                    result = await db.execute(select(Product).where(Product.slug == slug))
                    if result.scalars().first():
                        continue
                    
                    product = Product(
                        vendor_id=vendor.id,
                        category_id=cat_id,
                        name=p_name,
                        slug=slug,
                        description=p_desc,
                        price=p_price + random.randint(-10, 20),  # Slight price variation
                        stock_quantity=p_stock + random.randint(-20, 50),
                        image_url=PRODUCT_IMAGES.get(cat_slug, "https://via.placeholder.com/400"),
                        product_type=ProductType.ORGANIC if v_data["category"] == SellerCategory.NPOP_ORGANIC else ProductType.NATURAL,
                        approval_status=ProductApprovalStatus.PUBLISHED,
                        is_active=True
                    )
                    db.add(product)
                    products_created += 1
            
            # Add some products from other categories to reach 20-30
            other_cats = ["vegetables", "fruits", "grains", "dairy", "spices"]
            for cat_slug in other_cats:
                if cat_slug not in categories_for_vendor and products_created < 25:
                    extra_products = PRODUCTS_BY_CATEGORY.get(cat_slug, [])[:5]
                    cat_id = category_map.get(cat_slug)
                    
                    for p_name, p_desc, p_price, p_stock in extra_products:
                        slug = f"{p_name.lower().replace(' ', '-').replace('(', '').replace(')', '')}-{vendor.id}"[:100]
                        result = await db.execute(select(Product).where(Product.slug == slug))
                        if result.scalars().first():
                            continue
                        
                        product = Product(
                            vendor_id=vendor.id,
                            category_id=cat_id,
                            name=p_name,
                            slug=slug,
                            description=p_desc,
                            price=p_price + random.randint(-10, 20),
                            stock_quantity=p_stock,
                            image_url=PRODUCT_IMAGES.get(cat_slug, "https://via.placeholder.com/400"),
                            product_type=ProductType.ORGANIC,
                            approval_status=ProductApprovalStatus.PUBLISHED,
                            is_active=True
                        )
                        db.add(product)
                        products_created += 1
                        if products_created >= 25:
                            break
            
            print(f"      Products created: {products_created}")
        
        await db.commit()

    print("\n" + "=" * 50)
    print("✅ SEEDING COMPLETE!")
    print("=" * 50)
    print("\n📋 LOGIN CREDENTIALS:")
    print("-" * 50)
    print(f"{'Email':<35} {'Password':<15}")
    print("-" * 50)
    print(f"{'admin@nextgen.com':<35} {'admin':<15}")
    print("-" * 50)
    for v in VENDORS:
        print(f"{v['email']:<35} {v['password']:<15}")
    print("-" * 50)
    print(f"\nTotal: 1 Admin + {len(VENDORS)} Vendors with 25+ products each")

if __name__ == "__main__":
    asyncio.run(seed())
