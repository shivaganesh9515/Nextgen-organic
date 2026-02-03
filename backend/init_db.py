"""
Initialize database tables and seed testimonials.
Run this script to create all tables and add sample data.
"""
import asyncio
import sys
sys.path.insert(0, '.')

from app.core.database import engine
from app.models.base import Base
from app.models.testimonial import Testimonial
from app.models.vendor import Vendor
from app.models.product import Product
from app.models.category import Category
from app.models.order import Order, OrderItem
from app.models.notification import Notification
from app.models.admin_notification import AdminNotification
from app.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

async def init_db():
    print("Creating all database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ All tables created!")

async def seed_testimonials():
    print("\nSeeding testimonials...")
    
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    
    testimonials_data = [
        {
            "name": "Priya Sharma",
            "role": "Home Chef",
            "location": "Mumbai",
            "quote": "The organic vegetables from NextGen are incredibly fresh. My family loves the taste difference!",
            "rating": 5,
            "is_featured": True
        },
        {
            "name": "Rajesh Kumar",
            "role": "Restaurant Owner",
            "location": "Delhi",
            "quote": "As a restaurant owner, quality matters. NextGen Organics delivers consistent, premium produce every time.",
            "rating": 5,
            "is_featured": True
        },
        {
            "name": "Anita Patel",
            "role": "Health Enthusiast",
            "location": "Bangalore",
            "quote": "I switched to organic 6 months ago. The certified products give me peace of mind about what I'm eating.",
            "rating": 4,
            "is_featured": True
        },
        {
            "name": "Vikram Singh",
            "role": "Organic Farmer",
            "location": "Punjab",
            "quote": "Partnering with NextGen has transformed my farm's reach. The platform is farmer-friendly and transparent.",
            "rating": 5,
            "is_featured": True
        },
        {
            "name": "Meera Reddy",
            "role": "Nutritionist",
            "location": "Hyderabad",
            "quote": "I recommend NextGen to all my clients. Their NPOP certified products are truly organic and safe.",
            "rating": 5,
            "is_featured": True
        },
        {
            "name": "Arjun Menon",
            "role": "Fitness Coach",
            "location": "Chennai",
            "quote": "Clean eating starts with clean ingredients. NextGen makes it easy to source the best organic produce.",
            "rating": 4,
            "is_featured": True
        }
    ]
    
    async with AsyncSessionLocal() as session:
        # Check if testimonials already exist
        result = await session.execute(select(Testimonial))
        existing = result.scalars().all()
        
        if existing:
            print(f"   Already have {len(existing)} testimonials. Skipping seed.")
            return
        
        for t_data in testimonials_data:
            testimonial = Testimonial(**t_data)
            session.add(testimonial)
        
        await session.commit()
        print(f"✅ Added {len(testimonials_data)} testimonials!")

async def seed_categories():
    print("\nSeeding categories...")
    
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    
    categories_data = [
        {"name": "Vegetables", "slug": "vegetables", "image_url": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400"},
        {"name": "Fruits", "slug": "fruits", "image_url": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400"},
        {"name": "Grains", "slug": "grains", "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
        {"name": "Dairy", "slug": "dairy", "image_url": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400"},
        {"name": "Spices", "slug": "spices", "image_url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"},
        {"name": "Honey & Sweeteners", "slug": "honey-sweeteners", "image_url": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"},
    ]
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Category))
        existing = result.scalars().all()
        
        if existing:
            print(f"   Already have {len(existing)} categories. Skipping seed.")
            return
        
        for c_data in categories_data:
            category = Category(**c_data)
            session.add(category)
        
        await session.commit()
        print(f"✅ Added {len(categories_data)} categories!")

async def main():
    print("="*50)
    print(" DATABASE INITIALIZATION SCRIPT")
    print("="*50)
    
    await init_db()
    await seed_categories()
    await seed_testimonials()
    
    print("\n" + "="*50)
    print(" ✅ DATABASE READY!")
    print("="*50)

if __name__ == "__main__":
    asyncio.run(main())
