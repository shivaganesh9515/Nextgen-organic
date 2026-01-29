from sqlalchemy import Column, String, Boolean, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base
import uuid
from datetime import datetime
import enum


class AdminNotificationType(enum.Enum):
    NEW_VENDOR = "NEW_VENDOR"
    NEW_PRODUCT = "NEW_PRODUCT"
    NEW_ORDER = "NEW_ORDER"
    VENDOR_UPDATE = "VENDOR_UPDATE"
    SYSTEM = "SYSTEM"


class AdminNotification(Base):
    __tablename__ = "admin_notifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(Enum(AdminNotificationType), nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Extra data (e.g., vendor_id, product_id, order_id for linking)
    extra_data = Column(JSON, nullable=True)
