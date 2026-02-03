import os
from PIL import Image, ImageOps, ImageDraw

def crop_to_circle(image_path, output_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # Create a circular mask
        mask = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask)
        
        # Draw a white circle on the mask
        width, height = img.size
        # Take the smaller dimension to make a perfect circle centered
        dim = min(width, height)
        
        # Add a small padding to avoid cutting off edges if the logo touches borders
        padding = 10 
        left = (width - dim) // 2 + padding
        top = (height - dim) // 2 + padding
        right = (width + dim) // 2 - padding
        bottom = (height + dim) // 2 - padding
        
        draw.ellipse((left, top, right, bottom), fill=255)
        
        # Apply the mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        output.save(output_path)
        print(f"Successfully saved circular logo to: {output_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # Using the mobile asset as it is likely a cleaner single logo
    input_img = r"mobile\assets\logo.png"
    output_img = r"frontend\website\public\circle-logo.png"
    
    if os.path.exists(input_img):
        crop_to_circle(input_img, output_img)
    else:
        print(f"Could not find logo file: {input_img}")
