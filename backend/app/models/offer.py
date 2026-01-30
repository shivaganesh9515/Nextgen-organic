from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.models.base import Base

class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    discount = Column(String) # e.g. "20% OFF"
    code = Column(String, unique=True, index=True)
    status = Column(String, default="Active") # 'Active', 'Expired'
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
