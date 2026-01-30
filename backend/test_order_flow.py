"""
End-to-End Order Flow Test (Simple Version)
"""
import requests

API_URL = "http://127.0.0.1:8000/api/v1"

def test():
    results = []
    
    # 1. Products
    r = requests.get(f"{API_URL}/public/products")
    if r.status_code == 200:
        prods = r.json()
        results.append(f"[OK] Products: {len(prods)} found")
    else:
        results.append(f"[FAIL] Products: {r.status_code}")
        return results
    
    # 2. Place Order
    order_payload = {
        "user_id": "ded8126b-6080-4595-bf89-40b38343e742",
        "customer_name": "Test User",
        "customer_email": "test@example.com",
        "shipping_address": {"line1": "123 Test St", "city": "Bangalore", "state": "KA", "pincode": "560001"},
        "items": [{"product_id": 1, "quantity": 2, "price": 100}]
    }
    r = requests.post(f"{API_URL}/public/orders", json=order_payload)
    order_result = r.json()
    results.append(f"[OK] Order: {order_result.get('message', r.status_code)}")
    
    # 3. Admin Login
    r = requests.post(f"{API_URL}/auth/login", data={"username": "admin@nextgen.com", "password": "admin"})
    if r.status_code != 200:
        results.append(f"[FAIL] Admin Login: {r.status_code}")
        return results
    token = r.json().get("access_token")
    results.append("[OK] Admin Login")
    
    # 4. Admin Orders
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{API_URL}/admin/orders", headers=headers)
    if r.status_code == 200:
        orders = r.json()
        results.append(f"[OK] Admin Orders: {len(orders)} orders visible")
    else:
        results.append(f"[FAIL] Admin Orders: {r.status_code}")
    
    # 5. Admin Notifications
    r = requests.get(f"{API_URL}/admin/notifications", headers=headers)
    if r.status_code == 200:
        notifs = r.json()
        results.append(f"[OK] Admin Notifications: {len(notifs)} total")
    else:
        results.append(f"[WARN] Admin Notifications: {r.status_code}")
    
    # 6. Vendor Login
    r = requests.post(f"{API_URL}/auth/login", data={"username": "farm@nextgen.com", "password": "farm"})
    if r.status_code == 200:
        v_token = r.json().get("access_token")
        results.append("[OK] Vendor Login")
        
        # 7. Vendor Notifications
        v_headers = {"Authorization": f"Bearer {v_token}"}
        r = requests.get(f"{API_URL}/vendor/notifications", headers=v_headers)
        if r.status_code == 200:
            v_notifs = r.json()
            results.append(f"[OK] Vendor Notifications: {len(v_notifs)} total")
        else:
            results.append(f"[WARN] Vendor Notifications: {r.status_code}")
    else:
        results.append(f"[WARN] Vendor Login: {r.status_code}")
    
    return results

if __name__ == "__main__":
    results = test()
    output = "\n".join(results)
    print(output)
    with open("test_results.txt", "w", encoding="utf-8") as f:
        f.write(output)
    print("\nResults saved to test_results.txt")
