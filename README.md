# AI-Powered Retail Media Creative Builder

A hackathon prototype for creating professional, AI-powered retail media creatives using MERN stack + Python AI service.

## Architecture

- **Frontend**: React + Vite (port 3000)
- **Backend**: Node.js/Express + MongoDB (port 5000)
- **AI Service**: Python FastAPI (port 8000)

## Quick Start - Docker Compose

```bash
# From root directory
docker-compose up -d

# Backend runs on http://localhost:5000
# Frontend runs on http://localhost:3000
# AI Service runs on http://localhost:8000
```

## Manual Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB 6.0+

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2. AI Service Setup
```bash
cd ai_service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Features

### Asset Management
- Upload logos, packshots, and backgrounds
- Automatic image optimization
- Asset type classification

### Color Palette Management
- Create brand-specific color palettes
- Store multiple palettes per brand
- Apply palettes to creative generation

### AI Creative Generation
- Generate creatives in multiple formats (Facebook, Instagram, Display)
- Create variations with different color schemes
- Brand guideline compliance checking

### Image Processing
- Background removal
- Image enhancement
- Resizing and cropping
- Quality optimization

## API Endpoints

### Uploads
- `POST /api/uploads/upload` - Upload an asset
- `GET /api/uploads` - Get all assets

### Palettes
- `POST /api/palettes/create` - Create color palette
- `GET /api/palettes` - Get all palettes

### Creatives
- `POST /api/creatives/generate` - Generate creative
- `GET /api/creatives` - Get all creatives

### AI Service
- `GET /api/health` - Health check
- `POST /api/generate` - Generate creative composition
- `POST /api/process-image` - Process image
- `GET /api/formats` - Get supported formats

## Testing the System

### 1. Verify Services
```bash
# Check Backend
curl http://localhost:5000/api/health

# Check AI Service
curl http://localhost:8000/api/health
```

### 2. Upload Assets
- Go to http://localhost:3000
- Click on "Upload Assets"
- Select logo/packshot/background
- Drag and drop or click to upload

### 3. Create Color Palette
- Enter brand name (e.g., "Coca-Cola")
- Enter palette name (e.g., "Summer Red")
- Pick colors using color pickers
- Click "Create Palette"

### 4. Generate Creative
- Select uploaded assets
- Choose color palette
- Select format (Facebook/Instagram/Display)
- Click "Generate Creative"

## File Structure

```
.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── ai_service/
│   ├── main.py
│   ├── image_processor.py
│   ├── creative_generator.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/retail-creative
PORT=5000
AI_SERVICE_URL=http://localhost:8000
```

### AI Service (python environment)
No additional setup needed - uses localhost by default

### Frontend
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Hackathon Features

### MVP (Completed)
- Asset upload and storage
- Color palette management
- Basic creative generation
- Multiple format support

### Future Enhancements
- Collaborative editing
- AI-powered creative scoring
- Fully automated generation from text prompts
- Advanced guideline validation
- Export optimization
- Real-time preview
- Team management

## Deployment

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

### Vercel (Frontend)
```bash
cd frontend
npm run build
# Deploy via Vercel CLI or push to GitHub
```

### Heroku (Backend)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

## Troubleshooting

### "AI service unavailable"
- Ensure Python service is running on port 8000
- Check: `curl http://localhost:8000/api/health`

### "MongoDB connection error"
- Ensure MongoDB is running
- Check connection URI in .env

### "CORS errors"
- Frontend and Backend CORS are configured
- Ensure ports are correct in API client

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, Sharp
- **AI**: Python, FastAPI, OpenCV, Pillow, NumPy
- **DevOps**: Docker, Docker Compose

## License

MIT
