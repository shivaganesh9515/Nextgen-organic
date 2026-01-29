from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, public, admin, vendor, products, categories, banners, offers, orders, customers, analytics

app = FastAPI(
    title="Next360 Organics API",
    description="Backend for Next360 Organics Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],  # All Frontends
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(public.router, prefix="/api/v1/public", tags=["Public"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])
app.include_router(vendor.router, prefix="/api/v1/vendor", tags=["Vendor"])
app.include_router(products.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(categories.router, prefix="/api/v1/categories", tags=["Categories"])
app.include_router(banners.router, prefix="/api/v1/banners", tags=["Banners"])
app.include_router(offers.router, prefix="/api/v1/offers", tags=["Offers"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(customers.router, prefix="/api/v1/customers", tags=["Customers"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])

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
