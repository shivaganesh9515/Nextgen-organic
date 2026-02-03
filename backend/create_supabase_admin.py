"""
Create Admin User in Supabase Auth
Uses the Supabase Admin API to create a user.
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
service_key: str = os.environ.get("SUPABASE_SERVICE_KEY")

if not url or not service_key:
    print("❌ Error: Supabase credentials not found in .env")
    exit(1)

ADMIN_EMAIL = "admin@next360.com"
ADMIN_PASSWORD = "admin123"

print("="*50)
print(" Creating Admin User in Supabase Auth")
print("="*50)

try:
    supabase: Client = create_client(url, service_key)
    
    # Use Admin API to create user
    response = supabase.auth.admin.create_user({
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
        "email_confirm": True,  # Auto-confirm email
        "user_metadata": {
            "role": "admin",
            "full_name": "Admin User"
        }
    })
    
    if response.user:
        print(f"✅ Admin user created in Supabase!")
        print(f"   User ID: {response.user.id}")
        print(f"   Email: {response.user.email}")
        print(f"   Role: admin")
        print(f"\n📝 Login Credentials:")
        print(f"   Email: {ADMIN_EMAIL}")
        print(f"   Password: {ADMIN_PASSWORD}")
    else:
        print(f"⚠️ Response: {response}")
        
except Exception as e:
    error_msg = str(e)
    if "already been registered" in error_msg or "already exists" in error_msg:
        print(f"✅ Admin user already exists: {ADMIN_EMAIL}")
    else:
        print(f"❌ Error: {e}")
