"""
Seed Admin User Script
Creates an admin user with known credentials for login.
"""
import asyncio
import sys
sys.path.insert(0, '.')

from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from app.core.database import engine
from app.models.base import Base
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ADMIN_EMAIL = "admin@next360.com"
ADMIN_PASSWORD = "admin123"  # Change this in production!

async def seed_admin():
    print("="*50)
    print(" SEEDING ADMIN USER")
    print("="*50)
    
    # Create tables first
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        # Check if admin exists
        result = await session.execute(select(User).where(User.email == ADMIN_EMAIL))
        existing = result.scalars().first()
        
        if existing:
            print(f"✅ Admin user already exists: {ADMIN_EMAIL}")
            print(f"   Role: {existing.role}")
            return
        
        # Create admin user
        hashed_pwd = pwd_context.hash(ADMIN_PASSWORD)
        admin = User(
            email=ADMIN_EMAIL,
            hashed_password=hashed_pwd,
            full_name="Admin User",
            role="admin",
            is_active=True,
            is_superuser=True
        )
        session.add(admin)
        await session.commit()
        
        print(f"✅ Admin user created!")
        print(f"   Email: {ADMIN_EMAIL}")
        print(f"   Password: {ADMIN_PASSWORD}")
        print(f"   Role: admin")

if __name__ == "__main__":
    asyncio.run(seed_admin())
