"""
Seed Testimonials
"""
import asyncio
import sys
import os
from sqlalchemy import Column, Integer, String, Text, Boolean, func
from sqlalchemy.orm import declarative_base

sys.path.append(os.getcwd())
from app.core.database import AsyncSessionLocal, engine

# Simple Model Definition for Seeding (avoiding complex imports if not needed)
from app.models.base import Base

from app.models.testimonial import Testimonial

TESTIMONIALS = [
  {
    "role": "Local Farmer",
    "name": "Rajesh Kumar",
    "location": "Organic Roots Farm, Nashik",
    "quote": "Finally, a platform that respects our hard work. Next360 handles the logistics so I can focus on growing pure food.",
    "rating": 5
  },
  {
    "role": "Hub Store Owner",
    "name": "Sarah Jenkins",
    "location": "Green Valley Community Hub",
    "quote": "My store has become the neighborhood favorite. The produce quality is unmatched, and customers love the transparency.",
    "rating": 5
  },
  {
    "role": "Customer",
    "name": "Priya Sharma",
    "location": "Health Conscious Mom",
    "quote": "I visited the farm where my spinach was grown through the app. That level of trust means everything to my family.",
    "rating": 5
  }
]

async def seed_testimonials():
    # Create table if it doesn't exist (Quick hack for local dev since we are not running migrations)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    print("\n💬 SEEDING TESTIMONIALS...")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        for item in TESTIMONIALS:
            t = Testimonial(**item)
            db.add(t)
            print(f"   ✅ Added: {item['name']}")
        
        await db.commit()
    
    print("\n" + "=" * 50)
    print("✅ TESTIMONIALS READY!")

if __name__ == "__main__":
    asyncio.run(seed_testimonials())
