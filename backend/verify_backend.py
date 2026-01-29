import requests
import asyncio
import json
import uuid

BASE_URL = "http://localhost:8000/api/v1/public"

def check_backend():
    print("🔬 Verifying Backend Integrity (Round 2)...")
    
    # 4. Check Order Creation (Valid UUID, but potentially Mock Product mismatch)
    try:
        valid_uuid = str(uuid.uuid4())
        payload = {
            "user_id": valid_uuid,
            "customer_name": "Test Script User",
            "customer_email": "test@script.com",
            "shipping_address": {"city": "Test City"},
            "items": [{"product_id": 99999, "quantity": 1, "price": 100}] # ID 99999 likely doesn't exist
        }
        r = requests.post(f"{BASE_URL}/orders", json=payload)
        
        if r.status_code == 200:
             print(f"✅ Order Creation Handled Gracefully: {r.json()['message']}")
        else:
             print(f"❌ Order Creation Failed: {r.status_code} - {r.text}")
             
    except Exception as e:
        print(f"❌ Order Check Failed: {e}")

if __name__ == "__main__":
    check_backend()
