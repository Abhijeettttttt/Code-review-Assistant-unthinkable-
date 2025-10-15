# 🚀 Deployment Guide

## Local Development

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-.git
   cd Code-review-Assistant-unthinkable-
   ```

2. **Run setup script**
   ```bash
   # Windows
   setup.bat
   
   # Manual setup
   cd backend && pip install -r requirements.txt
   cd ../frontend && npm install
   ```

3. **Configure API Key**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Gemini API key: `GEMINI_API_KEY=your_key_here`

4. **Start servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   uvicorn main:app --reload
   
   # Terminal 2: Frontend  
   cd frontend
   npm run dev
   ```

## Production Deployment

### Option 1: Docker (Recommended)

Create `Dockerfile` for backend:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create `Dockerfile` for frontend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Option 2: Heroku

1. **Backend (Heroku)**
   ```bash
   # Create Procfile
   echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > Procfile
   
   # Deploy
   heroku create your-app-backend
   heroku config:set GEMINI_API_KEY=your_key
   git push heroku main
   ```

2. **Frontend (Vercel/Netlify)**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Option 3: VPS/Cloud Server

1. **Setup server**
   ```bash
   # Install dependencies
   sudo apt update
   sudo apt install python3 python3-pip nodejs npm nginx
   
   # Clone and setup
   git clone https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-.git
   cd Code-review-Assistant-unthinkable-
   ```

2. **Backend setup**
   ```bash
   cd backend
   pip3 install -r requirements.txt
   
   # Create systemd service
   sudo nano /etc/systemd/system/code-review-backend.service
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm run build
   
   # Configure Nginx
   sudo nano /etc/nginx/sites-available/code-review
   ```

## Environment Variables

### Backend (.env)
```bash
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./reviews.db  # Optional: for custom DB path
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com  # Optional
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000  # Backend URL
```

## Security Considerations

1. **API Key Security**
   - Never commit `.env` files
   - Use environment variables in production
   - Rotate API keys regularly

2. **CORS Configuration**
   - Update allowed origins in production
   - Use HTTPS in production

3. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Monitor API usage

## Monitoring & Maintenance

1. **Logs**
   ```bash
   # Backend logs
   tail -f backend/app.log
   
   # System logs
   journalctl -u code-review-backend -f
   ```

2. **Database Backup**
   ```bash
   # Backup SQLite database
   cp backend/reviews.db backup/reviews_$(date +%Y%m%d).db
   ```

3. **Updates**
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Restart services
   sudo systemctl restart code-review-backend
   sudo systemctl reload nginx
   ```

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using port 8000
   lsof -i :8000
   
   # Kill process
   kill -9 <PID>
   ```

2. **Permission errors**
   ```bash
   # Fix file permissions
   chmod +x start-backend.bat
   chmod +x start-frontend.bat
   ```

3. **Database issues**
   ```bash
   # Reset database
   rm backend/reviews.db
   # Restart backend to recreate
   ```

## Performance Optimization

1. **Backend**
   - Use Gunicorn with multiple workers
   - Implement caching for repeated requests
   - Add database indexing

2. **Frontend**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement lazy loading

3. **Database**
   - Regular cleanup of old reviews
   - Database optimization queries
   - Consider PostgreSQL for high traffic