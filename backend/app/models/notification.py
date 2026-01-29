from sqlalchemy import Column, String, Boolean, Enum, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
import uuid
import enum
from datetime import datetime
from app.models.base import Base


class NotificationType(str, enum.Enum):
    SYSTEM = "SYSTEM"           # Auto-generated (suspend, reactivate, etc.)
    MESSAGE = "MESSAGE"         # Custom admin message
    BEST_SELLER = "BEST_SELLER" # Best seller invitation
    PROMOTION = "PROMOTION"     # Promotional opportunity


class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), nullable=False)
    
    type = Column(Enum(NotificationType), default=NotificationType.MESSAGE, nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Extra data for specific notification types (e.g., product selection for best seller)
    extra_data = Column(JSON, nullable=True)
    
    # Relationship
    vendor = relationship("Vendor", back_populates="notifications")
