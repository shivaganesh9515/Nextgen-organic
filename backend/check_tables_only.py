import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")

supabase: Client = create_client(url, key)

tables = ['vendors', 'products', 'categories', 'testimonials']
results = []

print("Checking User Tables...")
results.append("CHECK RESULTS:")

for table in tables:
    try:
        # Just get 1 row to see if table exists
        res = supabase.table(table).select("*").limit(1).execute()
        results.append(f"✅ {table}: EXISTS")
        print(f"✅ {table}: EXISTS")
    except Exception as e:
        msg = str(e)
        if "relation" in msg and "does not exist" in msg:
            results.append(f"❌ {table}: MISSING")
            print(f"❌ {table}: MISSING")
        else:
            results.append(f"⚠️ {table}: ERROR ({msg})")
            print(f"⚠️ {table}: ERROR ({msg})")

with open("db_status.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(results))
