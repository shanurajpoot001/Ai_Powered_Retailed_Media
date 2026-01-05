from PIL import Image, ImageDraw, ImageFont
import os
import random
import time

class CreativeGenerator:
    def __init__(self):
        self.output_dir = "generated_creatives"
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def generate(self, assets, palette, format="facebook", guidelines=None):
        """Generate creative compositions with actual assets"""
        try:
            # Format-specific dimensions
            dimensions = {
                "facebook": (1200, 628),
                "instagram": (1080, 1080),
                "display": (300, 250)
            }
            
            width, height = dimensions.get(format, (1200, 628))
            
            # Create base image with primary color from palette
            primary_color = palette[0] if palette and len(palette) > 0 else "#FFFFFF"
            img = Image.new('RGB', (width, height), primary_color)
            draw = ImageDraw.Draw(img)
            
            # Load and composite uploaded assets
            logo_img = None
            packshot_imgs = []
            background_img = None
            
            for asset_path in assets:
                if os.path.exists(asset_path):
                    try:
                        asset_img = Image.open(asset_path)
                        # Determine asset type from path or use heuristics
                        asset_name = os.path.basename(asset_path).lower()
                        
                        if 'logo' in asset_name or asset_img.width < 500:
                            logo_img = asset_img
                        elif 'background' in asset_name:
                            background_img = asset_img
                        else:
                            packshot_imgs.append(asset_img)
                    except Exception as e:
                        print(f"Could not load asset {asset_path}: {e}")
                        continue
            
            # Composite background if available
            if background_img:
                bg_resized = background_img.resize((width, height), Image.Resampling.LANCZOS)
                img.paste(bg_resized, (0, 0))
            
            # Add packshots (main product images)
            if packshot_imgs:
                packshot = packshot_imgs[0]
                # Resize packshot to fit nicely (about 60% of canvas)
                packshot_size = (int(width * 0.6), int(height * 0.6))
                packshot_resized = packshot.resize(packshot_size, Image.Resampling.LANCZOS)
                # Center the packshot
                packshot_x = (width - packshot_size[0]) // 2
                packshot_y = (height - packshot_size[1]) // 2
                img.paste(packshot_resized, (packshot_x, packshot_y), packshot_resized if packshot_resized.mode == 'RGBA' else None)
            
            # Add logo (top right corner)
            if logo_img:
                logo_size = (int(width * 0.15), int(height * 0.15))
                logo_resized = logo_img.resize(logo_size, Image.Resampling.LANCZOS)
                logo_x = width - logo_size[0] - 20
                logo_y = 20
                img.paste(logo_resized, (logo_x, logo_y), logo_resized if logo_resized.mode == 'RGBA' else None)
            
            # Add color accents from palette
            if palette and len(palette) > 1:
                accent_height = height // 10
                accent_width = width // len(palette)
                for i, color in enumerate(palette[:min(5, len(palette))]):
                    accent_x = i * accent_width
                    draw.rectangle([accent_x, height - accent_height, accent_x + accent_width, height], fill=color)
            
            # Generate unique filename with timestamp
            timestamp = int(time.time() * 1000)
            main_path = f"{self.output_dir}/creative_main_{timestamp}.png"
            img.save(main_path, quality=95, optimize=True)
            
            # Generate variations with different color schemes
            variations = []
            for i in range(min(3, len(palette))):
                variant = img.copy()
                if i > 0 and len(palette) > i:
                    # Create variant with different primary color
                    variant_bg = Image.new('RGB', (width, height), palette[i])
                    variant_bg.paste(variant, (0, 0), variant if variant.mode == 'RGBA' else None)
                    variant = variant_bg
                
                variant_path = f"{self.output_dir}/creative_variant_{timestamp}_{i}.png"
                variant.save(variant_path, quality=95, optimize=True)
                variations.append(f"/generated_creatives/creative_variant_{timestamp}_{i}.png")
            
            return {
                "main": f"/generated_creatives/creative_main_{timestamp}.png",
                "variations": variations
            }
        except Exception as e:
            raise Exception(f"Creative generation failed: {str(e)}")

    def validate_guidelines(self, creative_data, guidelines):
        """Validate creative against brand guidelines"""
        try:
            checks = {
                "max_file_size": creative_data.get("size", 0) < guidelines.get("maxFileSize", 500000),
                "brand_compliant": True  # Add brand compliance logic
            }
            
            return all(checks.values())
        except Exception as e:
            raise Exception(f"Guideline validation failed: {str(e)}")
