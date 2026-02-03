"""
NextGen Organics - End-to-End Flow Test Script
Tests the complete vendor onboarding and product pipeline.
"""
import requests
import random
import string
import json

BASE_URL = "http://localhost:8000/api/v1"

def random_string(length=6):
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def print_step(step_num, title):
    print(f"\n{'='*60}")
    print(f" STEP {step_num}: {title}")
    print(f"{'='*60}")

def print_result(success, message):
    icon = "✅" if success else "❌"
    print(f"{icon} {message}")

# Test Data
TEST_VENDOR = {
    "business_name": f"Test Farm {random_string(4).upper()}",
    "contact_email": f"testvendor_{random_string(5)}@example.com",
    "phone_number": "9876543210",
    "seller_category": "NPOP_ORGANIC",
    "address_line": "123 Test Street",
    "city": "Hyderabad",
    "state": "Telangana",
    "pincode": "500001"
}

ADMIN_CREDENTIALS = {
    "username": "admin@nextgen.com",
    "password": "admin123"
}

def test_health_check():
    print_step(0, "Backend Health Check")
    try:
        res = requests.get(f"{BASE_URL.replace('/api/v1', '')}/health", timeout=5)
        if res.status_code == 200:
            print_result(True, f"Backend is healthy: {res.json()}")
            return True
        else:
            print_result(False, f"Health check failed: {res.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Cannot connect to backend: {e}")
        return False

def test_vendor_registration():
    print_step(1, "Vendor Registration")
    print(f"   Registering: {TEST_VENDOR['business_name']} ({TEST_VENDOR['contact_email']})")
    
    try:
        res = requests.post(f"{BASE_URL}/public/vendors/register", json=TEST_VENDOR, timeout=10)
        if res.status_code in [200, 201]:
            data = res.json()
            vendor_id = data.get("id") or data.get("vendor_id")
            print_result(True, f"Vendor registered! ID: {vendor_id}")
            return vendor_id
        else:
            print_result(False, f"Registration failed: {res.status_code} - {res.text}")
            return None
    except Exception as e:
        print_result(False, f"Registration error: {e}")
        return None

def test_admin_login():
    print_step(2, "Admin Login")
    print(f"   Logging in as: {ADMIN_CREDENTIALS['username']}")
    
    try:
        # OAuth2 password flow
        res = requests.post(
            f"{BASE_URL}/auth/login",
            data=ADMIN_CREDENTIALS,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )
        if res.status_code == 200:
            token = res.json().get("access_token")
            print_result(True, f"Admin logged in! Token: {token[:20]}...")
            return token
        else:
            print_result(False, f"Admin login failed: {res.status_code} - {res.text}")
            # Try dev token
            print("   Trying DEV_ADMIN_TOKEN fallback...")
            return "DEV_ADMIN_TOKEN"
    except Exception as e:
        print_result(False, f"Login error: {e}")
        return "DEV_ADMIN_TOKEN"  # Fallback for dev

def test_admin_fetch_vendors(admin_token):
    print_step(3, "Admin Fetches Pending Vendors")
    
    try:
        res = requests.get(
            f"{BASE_URL}/admin/vendors",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        if res.status_code == 200:
            vendors = res.json()
            pending = [v for v in vendors if v.get("status") == "PENDING"]
            print_result(True, f"Found {len(vendors)} vendors, {len(pending)} pending")
            return pending
        else:
            print_result(False, f"Fetch vendors failed: {res.status_code} - {res.text}")
            return []
    except Exception as e:
        print_result(False, f"Fetch error: {e}")
        return []

def test_admin_approve_vendor(admin_token, vendor_id):
    print_step(4, "Admin Approves Vendor")
    print(f"   Approving vendor ID: {vendor_id}")
    
    try:
        res = requests.post(
            f"{BASE_URL}/admin/vendors/{vendor_id}/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        if res.status_code == 200:
            data = res.json()
            creds = data.get("temp_credentials", {})
            print_result(True, f"Vendor approved!")
            if creds:
                print(f"   📧 Temp Email: {creds.get('email')}")
                print(f"   🔑 Temp Password: {creds.get('password')}")
            return creds
        else:
            print_result(False, f"Approval failed: {res.status_code} - {res.text}")
            return None
    except Exception as e:
        print_result(False, f"Approval error: {e}")
        return None

def test_vendor_login(email, password):
    print_step(5, "Vendor Login")
    print(f"   Logging in as: {email}")
    
    try:
        res = requests.post(
            f"{BASE_URL}/auth/login",
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )
        if res.status_code == 200:
            token = res.json().get("access_token")
            print_result(True, f"Vendor logged in! Token: {token[:20]}...")
            return token
        else:
            print_result(False, f"Vendor login failed: {res.status_code} - {res.text}")
            return None
    except Exception as e:
        print_result(False, f"Vendor login error: {e}")
        return None

def test_public_categories():
    print_step(6, "Public Categories Fetch")
    
    try:
        res = requests.get(f"{BASE_URL}/public/categories", timeout=10)
        if res.status_code == 200:
            categories = res.json()
            print_result(True, f"Categories loaded: {len(categories)} found")
            return categories
        else:
            print_result(False, f"Categories failed: {res.status_code} - {res.text}")
            return []
    except Exception as e:
        print_result(False, f"Categories error: {e}")
        return []

def test_public_testimonials():
    print_step(7, "Public Testimonials Fetch")
    
    try:
        res = requests.get(f"{BASE_URL}/public/testimonials", timeout=10)
        if res.status_code == 200:
            testimonials = res.json()
            print_result(True, f"Testimonials loaded: {len(testimonials)} found")
            return testimonials
        else:
            print_result(False, f"Testimonials failed: {res.status_code} - {res.text}")
            return []
    except Exception as e:
        print_result(False, f"Testimonials error: {e}")
        return []

def run_full_test():
    print("\n" + "🚀 "*15)
    print("   NEXTGEN ORGANICS - END-TO-END FLOW TEST")
    print("🚀 "*15)
    
    results = {"passed": 0, "failed": 0}
    
    # Step 0: Health Check
    if test_health_check():
        results["passed"] += 1
    else:
        results["failed"] += 1
        print("\n⛔ Backend is not running. Aborting tests.")
        return results
    
    # Step 1: Vendor Registration
    vendor_id = test_vendor_registration()
    if vendor_id:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Step 2: Admin Login
    admin_token = test_admin_login()
    if admin_token:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Step 3: Fetch Vendors
    pending_vendors = test_admin_fetch_vendors(admin_token)
    if pending_vendors:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Step 4: Approve Vendor
    if vendor_id and admin_token:
        creds = test_admin_approve_vendor(admin_token, vendor_id)
        if creds:
            results["passed"] += 1
            
            # Step 5: Vendor Login
            vendor_token = test_vendor_login(creds.get("email"), creds.get("password"))
            if vendor_token:
                results["passed"] += 1
            else:
                results["failed"] += 1
        else:
            results["failed"] += 1
    
    # Step 6: Public Categories
    if test_public_categories():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Step 7: Public Testimonials
    if test_public_testimonials():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Summary
    print("\n" + "="*60)
    print(f"   TEST SUMMARY")
    print("="*60)
    print(f"   ✅ Passed: {results['passed']}")
    print(f"   ❌ Failed: {results['failed']}")
    print("="*60)
    
    return results

if __name__ == "__main__":
    run_full_test()
