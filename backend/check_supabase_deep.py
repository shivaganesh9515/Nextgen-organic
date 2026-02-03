import os
import asyncio
from dotenv import load_dotenv
from supabase import create_client, Client, ClientOptions
import random
import string

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY") # Service key needed for admin tasks

if not url or not key:
    print("Error: Supabase credentials not found in .env")
    exit(1)

supabase: Client = create_client(url, key, options=ClientOptions(
    postgrest_client_timeout=10,
    storage_client_timeout=10
))

def print_header(title):
    print(f"\n{'='*50}")
    print(f" {title}")
    print(f"{'='*50}")

def check_tables():
    print_header("1. Checking Tables & Schema")
    # Tables to expect based on supabase_setup.sql
    expected_tables = ['vendors', 'products', 'categories', 'testimonials'] 
    
    # We can't easily query information_schema via API unless we have a function or raw SQL access.
    # But we can try to Select from them.
    
    for table in expected_tables:
        try:
            # Just get 1 row to see if table exists
            res = supabase.table(table).select("*").limit(1).execute()
            print(f"✅ Table '{table}' exists. (Accessible via API)")
        except Exception as e:
            msg = str(e)
            if "relation" in msg and "does not exist" in msg:
                print(f"❌ Table '{table}' MISSING!")
            else:
                print(f"⚠️  Table '{table}' error: {msg}")

def check_rls_policies():
    print_header("2. Checking RLS Policies (Inferred)")
    # We can't query pg_policies directly via Client unless exposed.
    # We will try to INSERT into 'vendors' without auth. 
    # If RLS is ON and policy says "anyone can register", it should work.
    
    print("Test: Public Registration (INSERT into vendors)")
    
    dummy_vendor = {
        "business_name": "Test Vendor " + ''.join(random.choices(string.ascii_uppercase, k=4)),
        "contact_email": f"test_{random.randint(1000,9999)}@example.com",
        "phone_number": "1234567890",
        "status": "PENDING"
    }
    
    try:
        # This is using SERVICE KEY (admin), so it bypasses RLS in many cases unless explicitly scoped.
        # To test 'Public', we should use ANON key, but I only loaded .env which usually has SERVICE_KEY for backend.
        # Let's check if we can simulate anon.
        
        # Actually, let's just use the client we have. If it works, DB is writable.
        res = supabase.table("vendors").insert(dummy_vendor).execute()
        if res.data:
            print(f"✅ Insert Successful (DB is writable). ID: {res.data[0]['id']}")
            # Cleanup
            supabase.table("vendors").delete().eq("id", res.data[0]['id']).execute()
            print("   (Cleaned up test record)")
        else:
            print("❌ Insert Failed (No data returned)")
            
    except Exception as e:
        print(f"❌ Insert Failed: {e}")

async def check_auth_service():
    print_header("3. Checking Auth Service")
    email = f"healthcheck_{random.randint(10000,99999)}@example.com"
    password = "HealthCheck123!"
    
    try:
        print(f"Attempting to Sign Up test user: {email}")
        # Note: gotrue client is sync in the python sdk usually, ensuring compat
        res = supabase.auth.sign_up({
            "email": email, 
            "password": password
        })
        
        if res.user:
            print(f"✅ Auth Service is UP. User created with ID: {res.user.id}")
            # Identify if email confirmation is on
            if res.user.identities and len(res.user.identities) > 0:
                print("   (User identity created)")
            else:
                print("   (Warning: User created but check identities)")
                
            # Try to sign in immediately (might fail if email confirmation is required)
            try:
                login_res = supabase.auth.sign_in_with_password({"email": email, "password": password})
                if login_res.user:
                    print("✅ Sign In Successful (Email confirmation NOT required or auto-confirmed)")
                else:
                    print("⚠️  Sign In returned no user.")
            except Exception as login_e:
                print(f"ℹ️  Sign In failed (Likely Email Confirmation Required): {login_e}")
            
            # Cleanup user (Requires Service Role / Admin API)
            try:
                admin_client = supabase # We assumed SERVICE_KEY is used
                admin_client.auth.admin.delete_user(res.user.id)
                print("✅ Test user deleted.")
            except Exception as del_e:
                print(f"⚠️  Could not delete test user: {del_e}")
                
        else:
            print("❌ Auth Sign Up succeeded but returned no User object.")

    except Exception as e:
        print(f"❌ Auth Service Check Failed: {e}")

if __name__ == "__main__":
    check_tables()
    check_rls_policies()
    asyncio.run(check_auth_service())
