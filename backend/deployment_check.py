import requests
import sys

API_URL = "http://127.0.0.1:8000"

def run_check():
    print(f"Checking Backend at {API_URL}...")
    
    # 1. Health
    try:
        r_docs = requests.get(f"{API_URL}/docs")
        if r_docs.status_code == 200:
             print("✅ Backend Online (Docs Accessible)")
        else:
             print(f"⚠️  Backend Accessible but returned {r_docs.status_code}")
    except Exception as e:
        print(f"❌ Backend Unreachable: {e}")
        return

    # 2. Public Products
    try:
        r_prod = requests.get(f"{API_URL}/api/v1/public/products")
        if r_prod.status_code == 200:
            prods = r_prod.json()
            print(f"✅ Public Products Endpoint OK (Found {len(prods)} items)")
        else:
            print(f"❌ Public Products Failed: {r_prod.status_code}")
            try:
                print(f"   Response: {r_prod.text}")
            except:
                pass
    except Exception as e:
        print(f"❌ Public Products Error: {e}")

    # 3. Vendors
    try:
        r_vend = requests.get(f"{API_URL}/api/v1/public/vendors")
        if r_vend.status_code == 200:
            vends = r_vend.json()
            print(f"✅ Public Vendors Endpoint OK (Found {len(vends)} items)")
        else:
            print(f"❌ Public Vendors Failed: {r_vend.status_code}")
            try:
                print(f"   Response: {r_vend.text}")
            except:
                pass
    except Exception as e:
        print(f"❌ Vendor Error: {e}")

if __name__ == "__main__":
    run_check()
