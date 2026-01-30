import requests
import json

# Use 127.0.0.1 and correct port
API_URL = "http://127.0.0.1:8000/api/v1"

def check_data_integrity():
    try:
        print(f"Checking {API_URL}...")
        
        # 1. Fetch Vendors
        r_v = requests.get(f"{API_URL}/public/vendors")
        if r_v.status_code != 200:
            print(f"Failed to fetch vendors: {r_v.status_code}")
            return
            
        vendors = r_v.json()
        print(f"Fetched {len(vendors)} Vendors.")
        vendor_ids = {v['id']: v['name'] for v in vendors}
        
        # 2. Fetch Products
        r_p = requests.get(f"{API_URL}/public/products")
        if r_p.status_code != 200:
            print(f"Failed to fetch products: {r_p.status_code}")
            return

        products = r_p.json()
        print(f"Fetched {len(products)} Products.")
        
        # 3. Check Relationships
        matched = 0
        unmatched = 0
        
        for p in products:
            v_id = p.get('vendor_id')
            if v_id in vendor_ids:
                matched += 1
            else:
                unmatched += 1
                print(f"[MISMATCH] Product '{p.get('name')}' (ID: {p.get('id')}) links to vendor_id '{v_id}' which is NOT in vendor list.")

        print(f"\nFinal Count: {matched} Matched, {unmatched} Unmatched.")
        
        if len(products) > 0:
            print("Sample Product Keys:", list(products[0].keys()))

    except Exception as e:
        print(f"Script Error: {e}")

if __name__ == "__main__":
    check_data_integrity()
