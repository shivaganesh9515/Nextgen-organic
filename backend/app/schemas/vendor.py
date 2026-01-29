from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
import uuid
from enum import Enum
from datetime import date

class VendorStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    SUSPENDED = "SUSPENDED"

class SellerCategory(str, Enum):
    NPOP_ORGANIC = "NPOP_ORGANIC"
    NATURAL = "NATURAL"
    ECO_FRIENDLY = "ECO_FRIENDLY"

class VendorRegister(BaseModel):
    # 1. Company
    business_name: str
    contact_email: EmailStr
    phone_number: str
    address_line: str
    city: str
    state: str
    pincode: str
    year_establishment: Optional[str] = None
    
    # 2. Category
    seller_category: SellerCategory
    
    # 3. Documents (Dict of URLs)
    documents: Dict[str, str] 
    # Keys expected: company_reg, pan_card, bank_proof, manufacturing_license, npop_cert, fssai_cert
    
    # 4. Certification
    npop_number: Optional[str] = None
    npop_validity: Optional[date] = None
    npop_scope: Optional[str] = None
    
    # 5. FSSAI
    fssai_number: Optional[str] = None
    fssai_validity: Optional[date] = None
    fssai_type: Optional[str] = None

class VendorResponse(BaseModel):
    id: uuid.UUID
    business_name: str
    contact_email: EmailStr
    status: VendorStatus
    seller_category: SellerCategory
    is_verified: bool

    class Config:
        from_attributes = True
