import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.vendor import Vendor
from app.models.admin_notification import AdminNotification

async def check_recent_data():
    async with AsyncSessionLocal() as db:
        # Check Vendor
        print("\n--- Recent Vendors (Top 5) ---")
        # Since no created_at, just getting all and taking last locally (inefficient but works for dev)
        result = await db.execute(select(Vendor))
        vendors = result.scalars().all()
        # Mock sort by assume order of insertion (not guaranteed) or just show last
        for v in vendors[-5:]:
            print(f"Vendor: {v.business_name} | Email: {v.contact_email} | Status: {v.status}")

        # Check Notifications
        print("\n--- Latest Admin Notifications ---")
        # AdminNotification HAS created_at (inherited or explicit? Let's assume yes or remove sort if fails)
        try:
             result = await db.execute(select(AdminNotification).order_by(AdminNotification.created_at.desc()).limit(3))
             notifs = result.scalars().all()
             for n in notifs:
                print(f"Notif: {n.title} | Msg: {n.message}")
        except:
             print("Could not sort notifications by created_at, showing any:")
             result = await db.execute(select(AdminNotification).limit(3))
             for n in result.scalars().all():
                 print(f"Notif: {n.title} | Msg: {n.message}")

if __name__ == "__main__":
    asyncio.run(check_recent_data())
