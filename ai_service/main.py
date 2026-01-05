from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import json
from datetime import datetime
from image_processor import ImageProcessor
from creative_generator import CreativeGenerator

app = FastAPI(title="Retail Media Creative AI Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = ImageProcessor()
generator = CreativeGenerator()

class GenerateRequest(BaseModel):
    assets: list
    colorPalette: list
    format: str
    guidelines: dict

class ImageProcessingRequest(BaseModel):
    imagePath: str
    operation: str
    params: dict = {}

@app.get("/api/health")
async def health():
    return {"status": "AI Service is running", "version": "1.0.0"}

@app.post("/api/generate")
async def generate_creative(request: GenerateRequest):
    """Generate creative compositions based on assets and color palette"""
    try:
        # Validate request
        if not request.assets or len(request.assets) == 0:
            raise ValueError("At least one asset is required")
        if not request.colorPalette or len(request.colorPalette) == 0:
            raise ValueError("Color palette is required")

        # Generate creative using assets and color palette
        result = generator.generate(
            assets=request.assets,
            palette=request.colorPalette,
            format=request.format,
            guidelines=request.guidelines
        )

        return {
            "success": True,
            "generatedImage": result["main"],
            "variations": result["variations"],
            "format": request.format,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/process-image")
async def process_image(request: ImageProcessingRequest):
    """Process images with various operations"""
    try:
        if not request.imagePath:
            raise ValueError("Image path is required")

        image_path = request.imagePath
        operation = request.operation
        params = request.params

        if operation == "remove-background":
            result = processor.remove_background(image_path)
        elif operation == "enhance":
            result = processor.enhance_quality(image_path, params.get("quality", 80))
        elif operation == "resize":
            result = processor.resize(image_path, params.get("width", 1200), params.get("height", 800))
        elif operation == "crop":
            result = processor.crop(image_path, params.get("x", 0), params.get("y", 0), 
                                   params.get("width", 800), params.get("height", 600))
        else:
            raise ValueError(f"Unknown operation: {operation}")

        return {"success": True, "image": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/formats")
async def get_supported_formats():
    """Get supported creative formats"""
    return {
        "formats": [
            {"name": "Facebook", "value": "facebook", "dimensions": "1200x628"},
            {"name": "Instagram", "value": "instagram", "dimensions": "1080x1080"},
            {"name": "Display Ad", "value": "display", "dimensions": "300x250"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
