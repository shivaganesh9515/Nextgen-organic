import requests

def create_vendor():
    url = "http://localhost:8000/api/v1/public/register-vendor"
    data = {
        "business_name": "Organic Harvest Co.",
        "contact_email": "vendor.demo@nextgen.com",
        "phone_number": "+91 9988776655",
        "seller_category": "Farms",
        "business_address": "123 Green Valley, Nashik",
        "tax_id": "GSTIN123456789",
        "documents": {}
    }
    
    try:
        res = requests.post(url, json=data)
        print(f"Status: {res.status_code}")
        print(f"Response: {res.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_vendor()
