import requests
import json

URL = "http://127.0.0.1:8000/api/v1/banners/"

banner_data = {
    "title": "Welcome Offer 50% Off",
    "location": "Home Screen Top",
    "status": "Active",
    "image_url": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    "link_url": "/collection/organic"
}

try:
    response = requests.post(URL, json=banner_data)
    if response.status_code == 200:
        print("Success! Demo Banner Created:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"Failed to create banner. Status: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
