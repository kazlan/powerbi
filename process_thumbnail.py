
from PIL import Image
import os

SOURCE_IMAGE = r"C:\Users\perse\OneDrive\Documentos\1. PROYECTOS\PL-300\public\podcasts\copilot-reports\slides\slide_07.png"
DEST_IMAGE = r"C:\Users\perse\OneDrive\Documentos\1. PROYECTOS\PL-300\public\podcasts\copilot-reports\thumbnail_16_9.png"

def make_16_9(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            target_ratio = 16 / 9
            current_ratio = width / height
            
            if current_ratio > target_ratio:
                # Image is too wide, crop width
                new_width = int(height * target_ratio)
                left = (width - new_width) / 2
                top = 0
                right = (width + new_width) / 2
                bottom = height
                img = img.crop((left, top, right, bottom))
            elif current_ratio < target_ratio:
                # Image is too tall, crop height
                new_height = int(width / target_ratio)
                left = 0
                top = (height - new_height) / 2
                right = width
                bottom = (height + new_height) / 2
                img = img.crop((left, top, right, bottom))
            
            # Save the result
            img.save(output_path)
            print(f"Successfully saved 16:9 image to {output_path}")
            
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    if os.path.exists(SOURCE_IMAGE):
        make_16_9(SOURCE_IMAGE, DEST_IMAGE)
    else:
        print(f"Source image not found: {SOURCE_IMAGE}")
