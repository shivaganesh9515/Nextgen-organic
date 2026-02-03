import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")

if not url or not key:
    print("Error: Supabase credentials not found in .env")
    exit(1)

try:
    supabase: Client = create_client(url, key)
    print("Successfully initialized Supabase client.")

    # Try to list buckets to verify connection and permissions (Storage)
    print("Checking Storage Buckets...")
    buckets = supabase.storage.list_buckets()
    print(f"Buckets found: {len(buckets)}")
    for b in buckets:
        print(f" - {b.name}")

    # Try to select from vendors (Database)
    print("\nChecking 'vendors' table...")
    response = supabase.table("vendors").select("count", count="exact").execute()
    print(f"Vendors count response: {response}")
    
    print("\nSupabase Connection Verified!")

except Exception as e:
    print(f"\nConnection Failed: {e}")
