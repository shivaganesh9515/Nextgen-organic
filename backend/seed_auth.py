
import os
import requests
import json
from dotenv import load_dotenv

SUPABASE_URL = "https://iuljhrcptprenzuegrhw.supabase.co"
SUPABASE_KEY = "sb_publishable__0aw3kgvSVY9oHGOc35uUg_kKWgLA-D" # Anon Key

def seed_vendor_auth():
    print("🌱 Seeding Supabase Auth User...")
    
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    email = "vendor.demo@nextgen.com"
    payload = {
        "email": email,
        "password": "password123",
        "data": {
            "role": "vendor",
            "business_name": "Organic Harvest Co."
        }
    }
    
    try:
        res = requests.post(url, headers=headers, json=payload)
        
        if res.status_code == 200:
            print("✅ User created successfully!")
            print(f"Email: {email}")
            print("Password: password123")
            print("Response:", res.json())
        elif res.status_code == 429:
             print("⚠️ Rate limited. Wait a bit.")
        elif "User already registered" in res.text:
            print(f"ℹ️ User {email} already exists. You can login with 'password123'.")
        else:
            print(f"❌ Failed: {res.status_code}")
            print(res.text)
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_vendor_auth()
