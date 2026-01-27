from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth

app = FastAPI(
    title="Next360 Organics API",
    description="Backend for Next360 Organics Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])

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
