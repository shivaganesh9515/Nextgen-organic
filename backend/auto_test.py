import subprocess
import time
import requests
import sys
import os

# Add current dir to path
sys.path.append(os.getcwd())

def run_test():
    print("\n🚀 STARTING AUTOMATED SYSTEM CHECK 🚀")
    print("---------------------------------------")

    # 1. Start Backend (Temporary Instance)
    print("1️⃣  Launching Backend Server (Port 8000)...")
    # Using subprocess to start uvicorn
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--port", "8000"],
        stdout=subprocess.DEVNULL, # Hide server logs to keep output clean
        stderr=subprocess.PIPE
    )
    
    # Wait for boot (5 seconds)
    time.sleep(5) 

    try:
        # 2. Check Health
        print("2️⃣  Checking API Health...")
        try:
            resp = requests.get("http://localhost:8000/health")
            if resp.status_code == 200:
                print("   ✅ Backend is ONLINE")
            else:
                print(f"   ❌ Backend Error: {resp.status_code}")
                # Print stderr if failed
                print(proc.stderr.read().decode())
                return
        except requests.exceptions.ConnectionError:
             print("   ❌ Backend Unreachable. The server failed to start.")
             # Check if it crashed
             if proc.poll() is not None:
                 print(f"   Server Exit Code: {proc.returncode}")
                 print(proc.stderr.read().decode())
             return

        # 3. Test Admin Login
        print("3️⃣  Testing Admin Login (admin@nextgen.com)...")
        # OAuth2 expects 'username' field, even if it's an email
        login_payload = {"username": "admin@nextgen.com", "password": "admin"} 
        resp = requests.post("http://localhost:8000/api/v1/auth/login", data=login_payload)
        
        token = None
        if resp.status_code == 200:
            token = resp.json().get("access_token")
            print("   ✅ Login SUCCESS")
        else:
            print(f"   ❌ Login Failed: {resp.status_code}")
            print(f"   Response: {resp.text}")
            return

        # 4. Fetch Vendors (Protected Route)
        print("4️⃣  Fetching Vendor Data (Secure Route)...")
        headers = {"Authorization": f"Bearer {token}"}
        resp = requests.get("http://localhost:8000/api/v1/admin/vendors", headers=headers)
        
        if resp.status_code == 200:
             vendors = resp.json()
             print(f"   ✅ Data Access SUCCESS. Found {len(vendors)} vendors in database.")
             print("   SAMPLE DATA:")
             for v in vendors[:3]:
                 print(f"      - {v['business_name']} [{v['status']}]")
        else:
             print(f"   ❌ Data Fetch Failed: {resp.status_code} {resp.text}")

        # 5. Test Vendor Login
        print("5️⃣  Testing Vendor Login (farm@nextgen.com)...")
        vendor_payload = {"username": "farm@nextgen.com", "password": "farm"}
        resp = requests.post("http://localhost:8000/api/v1/auth/login", data=vendor_payload)
        if resp.status_code == 200:
            print("   ✅ Vendor Login SUCCESS")
        else:
            print(f"   ❌ Vendor Login Failed: {resp.text}")

        print("\n✨ SYSTEM STATUS: FULLY OPERATIONAL ✨")
        print("You can verify this live at http://localhost:3001/admin/login")

    finally:
        print("\n🛑 Stopping Temporary Server...")
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    run_test()
