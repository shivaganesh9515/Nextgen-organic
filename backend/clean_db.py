"""
Clean Database ONLY
Removes all existing data.
"""
import asyncio
import sys
import os
from sqlalchemy import delete

sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal
from app.models.user import User
from app.models.vendor import Vendor
from app.models.product import Product
from app.models.category import Category
from app.models.order import Order, OrderItem

async def clean_db():
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

if __name__ == "__main__":
    asyncio.run(clean_db())
