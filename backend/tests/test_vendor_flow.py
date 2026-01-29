from fastapi.testclient import TestClient
from app.main import app
import pytest
from app.models.vendor import Vendor, VendorStatus, SellerCategory
from app.core.database import AsyncSessionLocal
from sqlalchemy.future import select
import asyncio

# Setup TestClient with the app
client = TestClient(app)

def test_register_vendor_success():
    # Mock Files
    files = {
        "doc_company_reg": ("company_reg.pdf", b"fake content", "application/pdf"),
        "doc_pan_card": ("pan.jpg", b"fake content", "image/jpeg"),
        "doc_bank_proof": ("bank.pdf", b"fake content", "application/pdf"),
        "doc_fssai_cert": ("fssai.pdf", b"fake content", "application/pdf"),
        # Optional
        "doc_npop_cert": ("npop.pdf", b"fake organic content", "application/pdf")
    }

    # Form Data
    data = {
        "business_name": "Test Organic Farm",
        "contact_email": "test@organic.com",
        "phone_number": "9876543210",
        "address_line": "123 Green Way",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560001",
        "year_establishment": "2020",
        "seller_category": "NPOP_ORGANIC",
        "fssai_number": "12345678901234",
        "fssai_validity": "2030-01-01",
        "fssai_type": "Manufacturer",
        "npop_number": "ORG-101",
        "npop_scope": "Aditi Cert",
    }

    response = client.post("/api/v1/public/vendors/register", data=data, files=files)
    
    # Assert API Success
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["business_name"] == "Test Organic Farm"
    assert json_response["status"] == "PENDING"
    assert json_response["seller_category"] == "NPOP_ORGANIC"
    
    print("\n✅ API Response Verified")

    # Assert Email Uniqueness
    response_dupe = client.post("/api/v1/public/vendors/register", data=data, files=files)
    assert response_dupe.status_code == 400
    assert response_dupe.json()["detail"] == "Vendor with this email already exists"

    print("✅ Duplicate Check Verified")
