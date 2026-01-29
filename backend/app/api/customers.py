from fastapi import APIRouter, Depends
from typing import List

router = APIRouter()

# Mock Customers
MOCK_CUSTOMERS = [
    {"id": 1, "name": "Ravi Kumar", "email": "ravi@example.com", "phone": "+91 9876543210", "orders": 12, "spent": "₹15,400", "status": "Active"},
    {"id": 2, "name": "Sneha Gupta", "email": "sneha@example.com", "phone": "+91 9876543211", "orders": 5, "spent": "₹4,200", "status": "Active"},
    {"id": 3, "name": "Amit Patel", "email": "amit@example.com", "phone": "+91 9876543212", "orders": 0, "spent": "₹0", "status": "Inactive"},
]

@router.get("/")
async def list_customers():
    return MOCK_CUSTOMERS
