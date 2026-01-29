from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.models.base import Base

class OrderStatus(str, enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False) # Supabase User ID
    
    # Billing/Shipping
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    shipping_address = Column(JSON, nullable=False) # { line1, city, state, pincode }
    
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id")) # Denormalized for easy filtering
    
    quantity = Column(Integer, nullable=False)
    price_at_purchase = Column(Float, nullable=False)
    
    order = relationship("Order", back_populates="items")
    product = relationship("app.models.product.Product")
    vendor = relationship("app.models.vendor.Vendor")
