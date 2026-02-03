import os
from PIL import Image

start_dir = r"c:\Users\gunny\development\Nextgen-organic"
candidates = [
    r"frontend\website\public\final-logo-v9.png",
    r"frontend\website\public\final-logo.png",
    r"frontend\website\public\nextgen-logo.png",
    r"mobile\assets\logo.png",
    r"mobile\assets\icon.png",
    r"mobile\assets\adaptive-icon.png"
]

print(f"{'File':<60} | {'Size':<20} | {'Aspect':<10}")
print("-" * 100)

for rel_path in candidates:
    full_path = os.path.join(start_dir, rel_path)
    if os.path.exists(full_path):
        try:
            with Image.open(full_path) as img:
                w, h = img.size
                aspect = w / h
                print(f"{rel_path:<60} | {w}x{h:<19} | {aspect:.2f}")
        except Exception as e:
            print(f"{rel_path:<60} | Error: {e}")
    else:
        print(f"{rel_path:<60} | Not Found")
