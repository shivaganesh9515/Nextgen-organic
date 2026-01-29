from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum
from sqlalchemy.orm import relationship
from app.models.base import Base

class ProductType(str, enum.Enum):
    ORGANIC = "ORGANIC"
    NATURAL = "NATURAL"
    ECO_FRIENDLY = "ECO_FRIENDLY"

class ProductApprovalStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PENDING_REVIEW = "PENDING_REVIEW"
    PUBLISHED = "PUBLISHED"
    REJECTED = "REJECTED"

class Product(Base):
    __tablename__ = "products"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    name = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, default=0)
    
    image_url = Column(String, nullable=True)
    gallery_images = Column(Text, nullable=True) # Check if JSON is better, currently Text for MVP (comma separated)
    
    product_type = Column(Enum(ProductType), default=ProductType.ORGANIC)
    approval_status = Column(Enum(ProductApprovalStatus), default=ProductApprovalStatus.DRAFT)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    vendor = relationship("app.models.vendor.Vendor", backref="products")
    category = relationship("app.models.category.Category", backref="products")

    def __repr__(self):
        return f"<Product {self.name}>"
