import requests
import random
import time

# Unique fields
unique_phone = str(int(time.time()))
unique_email = f"admin_{unique_phone}@nextgen.com"

url = "http://localhost:8000/api/v1/auth/signup"
data = {
    "email": "secure_admin@nextgen.com",
    "password": "admin",
    "full_name": "Official Admin",
    "role": "admin",
    # Random phone to avoid collision
    "phone_number": f"{random.randint(1000000000, 9999999999)}"
}

print(f"Attempting to create user: {data['email']} / {data['password']}")

try:
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("SUCCESS: User created.")
        print(response.json())
    else:
        print(f"FAILED: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
