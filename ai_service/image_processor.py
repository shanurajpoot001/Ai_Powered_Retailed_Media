import cv2
import numpy as np
from PIL import Image, ImageEnhance
import os

class ImageProcessor:
    def __init__(self):
        self.output_dir = "processed_images"
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def remove_background(self, image_path):
        """Simple background removal using color detection"""
        try:
            img = cv2.imread(image_path)
            hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            
            # Create mask for white background
            lower = np.array([0, 0, 200])
            upper = np.array([180, 30, 255])
            mask = cv2.inRange(hsv, lower, upper)
            
            # Invert mask
            mask_inv = cv2.bitwise_not(mask)
            result = cv2.bitwise_and(img, img, mask=mask_inv)
            
            output_path = f"{self.output_dir}/nobg_{os.path.basename(image_path)}"
            cv2.imwrite(output_path, result)
            
            return f"/processed_images/{os.path.basename(output_path)}"
        except Exception as e:
            raise Exception(f"Background removal failed: {str(e)}")

    def enhance_quality(self, image_path, quality=80):
        """Enhance image quality"""
        try:
            img = Image.open(image_path)
            
            # Enhance sharpness
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(1.5)
            
            # Enhance contrast
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.2)
            
            output_path = f"{self.output_dir}/enhanced_{os.path.basename(image_path)}"
            img.save(output_path, quality=quality)
            
            return f"/processed_images/{os.path.basename(output_path)}"
        except Exception as e:
            raise Exception(f"Enhancement failed: {str(e)}")

    def resize(self, image_path, width, height):
        """Resize image to specified dimensions"""
        try:
            img = Image.open(image_path)
            img = img.resize((width, height), Image.Resampling.LANCZOS)
            
            output_path = f"{self.output_dir}/resized_{os.path.basename(image_path)}"
            img.save(output_path)
            
            return f"/processed_images/{os.path.basename(output_path)}"
        except Exception as e:
            raise Exception(f"Resize failed: {str(e)}")

    def crop(self, image_path, x, y, width, height):
        """Crop image"""
        try:
            img = Image.open(image_path)
            img = img.crop((x, y, x + width, y + height))
            
            output_path = f"{self.output_dir}/cropped_{os.path.basename(image_path)}"
            img.save(output_path)
            
            return f"/processed_images/{os.path.basename(output_path)}"
        except Exception as e:
            raise Exception(f"Crop failed: {str(e)}")
