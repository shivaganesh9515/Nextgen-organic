import asyncio
import logging
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.database import AsyncSessionLocal
from app.models.product import Product

# Silence SQLAlchemy logs
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.ERROR)

async def debug_products():
    async with AsyncSessionLocal() as db:
        print("Querying products...")
        try:
            result = await db.execute(
                select(Product).options(selectinload(Product.vendor))
            )
            products = result.scalars().all()
            print(f"Found {len(products)} products.")
            
            for p in products:
                v_name = p.vendor.business_name if p.vendor else 'None'
                print(f"Product: {p.name} | Vendor: {v_name} | VendorID: {p.vendor_id}")
                
                # Check enum access
                print(f"  > Status: {p.approval_status}")
                print(f"  > Type: {p.product_type}")

        except Exception as e:
            print(f"CRASH: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
    loop.run_until_complete(debug_products())
