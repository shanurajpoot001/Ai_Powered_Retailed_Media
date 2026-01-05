#!/bin/bash

echo "=== Building Project ==="

# Build backend
echo "Building backend..."
cd backend
npm install
npm run build 2>/dev/null || echo "Backend doesn't require build"

# Build frontend
echo "Building frontend..."
cd ../frontend
npm install
npm run build

echo "=== Deployment Ready ==="
echo "Frontend build: ./frontend/dist"
echo "Backend: Ready to start with 'npm start'"
echo ""
echo "For Docker deployment, run:"
echo "docker-compose up -d"
