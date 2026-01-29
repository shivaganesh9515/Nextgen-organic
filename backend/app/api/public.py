from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from typing import Optional, List
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from app.schemas.vendor import VendorResponse
from app.services.drive import drive_service
import json

router = APIRouter()

@router.post("/vendors/register", response_model=VendorResponse)
async def register_vendor(
    # 1. Company
    business_name: str = Form(...),
    contact_email: str = Form(...),
    phone_number: str = Form(...),
    address_line: str = Form(...),
    city: str = Form(...),
    state: str = Form(...),
    pincode: str = Form(...),
    year_establishment: Optional[str] = Form(None),
    
    # 2. Category
    seller_category: SellerCategory = Form(...),
    
    # 3. Documents (Files)
    # We expect specific field names from frontend
    doc_company_reg: UploadFile = File(...),
    doc_pan_card: UploadFile = File(...),
    doc_bank_proof: UploadFile = File(...),
    doc_manufacturing_license: Optional[UploadFile] = File(None),
    
    # 4. Certification (Optional but conditional)
    npop_number: Optional[str] = Form(None),
    npop_validity: Optional[str] = Form(None),
    npop_scope: Optional[str] = Form(None),
    doc_npop_cert: Optional[UploadFile] = File(None),
    
    # 5. FSSAI
    fssai_number: str = Form(...),
    fssai_validity: str = Form(...),
    fssai_type: str = Form(...),
    doc_fssai_cert: UploadFile = File(...),
    
    db: AsyncSession = Depends(get_db)
):
    # Check existing
    result = await db.execute(select(Vendor).where(Vendor.contact_email == contact_email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Vendor with this email already exists")

    # Upload Files
    documents = {}
    
    # Mandatory uploads
    documents["company_reg"] = await drive_service.upload_file(doc_company_reg)
    documents["pan_card"] = await drive_service.upload_file(doc_pan_card)
    documents["bank_proof"] = await drive_service.upload_file(doc_bank_proof)
    documents["fssai_cert"] = await drive_service.upload_file(doc_fssai_cert)
    
    # Optionals
    if doc_manufacturing_license:
        documents["manufacturing_license"] = await drive_service.upload_file(doc_manufacturing_license)
    if doc_npop_cert:
        documents["npop_cert"] = await drive_service.upload_file(doc_npop_cert)

    # Convert dates from string if necessary, or keep as string/date. 
    # For MVP we will store as None if empty string?
    # TODO: Parse dates securely. Assuming string for now matching Model if changed, or pass as is.
    # Model uses Date, schema uses date. Input is Form string.
    # We should parse.
    
    new_vendor = Vendor(
        business_name=business_name,
        contact_email=contact_email,
        phone_number=phone_number,
        address_line=address_line,
        city=city,
        state=state,
        pincode=pincode,
        year_establishment=year_establishment,
        seller_category=seller_category,
        documents=documents,
        
        npop_number=npop_number,
        # npop_validity=date.fromisoformat(npop_validity) if npop_validity else None, # Needs parsing
        npop_scope=npop_scope,
        
        fssai_number=fssai_number,
        fssai_type=fssai_type,
        status=VendorStatus.PENDING
    )
    db.add(new_vendor)
    await db.commit()
    await db.refresh(new_vendor)
    
    return new_vendor
