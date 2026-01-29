from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.models.base import Base

class Banner(Base):
    __tablename__ = "banners"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    image_url = Column(String)
    link_url = Column(String, nullable=True)  # URL to redirect to
    location = Column(String, default="Home") # e.g., 'Home - Hero', 'Sidebar'
    status = Column(String, default="Active") # 'Active', 'Inactive'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
