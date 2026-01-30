from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import API routers
from app.api import auth, public, admin, products, categories, banners, offers, orders, customers, analytics, notifications
from app.api import vendor as vendor_api  # Aliased to avoid collision with model

from app.core.database import engine
from app.models.base import Base
# Import all models to ensure they are registered with Base (use aliases to avoid conflicts)
from app.models import user as user_model
from app.models import vendor as vendor_model
from app.models import product as product_model
from app.models import order as order_model
from app.models import category as category_model
from app.models import notification as notification_model
from app.models import admin_notification as admin_notification_model
from app.models import offer as offer_model

app = FastAPI(
    title="Next360 Organics API",
    description="Backend for Next360 Organics Platform",
    version="1.0.0"
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Create all tables (safe to run multiple times, it skips existing)
        await conn.run_sync(Base.metadata.create_all)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow ALL origins for Mobile App / Demo flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(public.router, prefix="/api/v1/public", tags=["Public"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])
app.include_router(vendor_api.router, prefix="/api/v1/vendor", tags=["Vendor"])
app.include_router(products.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(categories.router, prefix="/api/v1/categories", tags=["Categories"])
app.include_router(banners.router, prefix="/api/v1/banners", tags=["Banners"])
app.include_router(offers.router, prefix="/api/v1/offers", tags=["Offers"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(customers.router, prefix="/api/v1/customers", tags=["Customers"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(notifications.router, prefix="/api/v1", tags=["Notifications"])

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Next360 API is running",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}
