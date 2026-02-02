"""
Seed Categories ONLY
Inserts system categories into the database.
"""
import asyncio
import sys
import os
from sqlalchemy import select

sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal
from app.models.category import Category

# Categories matched to Frontend/Mobile UI requirements
CATEGORIES_DATA = [
    {"name": "Vegetables", "slug": "vegetables", "image_url": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400"},
    {"name": "Fruits", "slug": "fruits", "image_url": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400"},
    {"name": "Bakery", "slug": "bakery", "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"},
    {"name": "Essentials", "slug": "essentials", "image_url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"},
    {"name": "Snacks", "slug": "snacks", "image_url": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400"},
    {"name": "Dairy", "slug": "dairy", "image_url": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400"},
    {"name": "Juices", "slug": "juices", "image_url": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400"},
]

async def seed_categories():
    print("\n🌱 SEEDING CATEGORIES...")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        for cat_data in CATEGORIES_DATA:
            # Check if exists
            result = await db.execute(select(Category).where(Category.slug == cat_data["slug"]))
            existing = result.scalar_one_or_none()
            
            if not existing:
                cat = Category(
                    name=cat_data["name"],
                    slug=cat_data["slug"],
                    image_url=cat_data["image_url"]
                )
                db.add(cat)
                print(f"   ✅ Added: {cat_data['name']}")
            else:
                print(f"   ⚠️  Skipped (Exists): {cat_data['name']}")
        
        await db.commit()
    
    print("\n" + "=" * 50)
    print("✅ CATEGORIES READY!")

if __name__ == "__main__":
    asyncio.run(seed_categories())
