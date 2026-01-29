from sqlalchemy import Column, String, Boolean, Enum, JSON, Integer, Date, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import enum
from app.models.base import Base

class VendorStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    SUSPENDED = "SUSPENDED"

class SellerCategory(str, enum.Enum):
    NPOP_ORGANIC = "NPOP_ORGANIC"
    NATURAL = "NATURAL"
    ECO_FRIENDLY = "ECO_FRIENDLY"

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    auth_user_id = Column(UUID(as_uuid=True), nullable=True, unique=True)
    
    # 1. Company Details
    business_name = Column(String, nullable=False)
    contact_email = Column(String, nullable=False, unique=True)
    phone_number = Column(String, nullable=False)
    address_line = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    pincode = Column(String, nullable=False)
    year_establishment = Column(String, nullable=True) # String to handle diverse inputs/ranges
    
    status = Column(Enum(VendorStatus), default=VendorStatus.PENDING)
    is_verified = Column(Boolean, default=False)

    # 2. Seller Category
    seller_category = Column(Enum(SellerCategory), nullable=False)
    
    # 3. Documents (URLs/IDs to Google Drive)
    # Stored as JSON: { "reg_cert": "url", "pan_card": "url", "cancelled_cheque": "url", "manufacturing_license": "url" }
    documents = Column(JSON, default={}) 

    # 4. NPOP Details (If applicable)
    npop_number = Column(String, nullable=True)
    npop_validity = Column(Date, nullable=True)
    npop_scope = Column(String, nullable=True) # Certification Body
    
    # 5. FSSAI Details
    fssai_number = Column(String, nullable=True)
    fssai_validity = Column(Date, nullable=True)
    fssai_type = Column(String, nullable=True) # Manufacturer/Trader etc.
    
    def __repr__(self):
        return f"<Vendor {self.business_name} ({self.status})>"


