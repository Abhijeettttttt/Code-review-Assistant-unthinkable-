# 🚀 Vercel Deployment Guide

## The Problem You Encountered

The 404 error happens because Vercel is trying to deploy your entire project (frontend + backend), but Vercel is designed for **frontend applications only**. Your FastAPI backend needs to be deployed separately.

## ✅ Solution: Split Deployment

### Step 1: Deploy Backend First (Choose One)

#### Option A: Railway (Recommended - Free & Easy)
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose "backend" folder
6. Add environment variable: `GEMINI_API_KEY=your_key`
7. Railway will give you a URL like: `https://your-app.railway.app`

#### Option B: Render (Free Tier Available)
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `GEMINI_API_KEY=your_key`

#### Option C: Heroku (Paid)
```bash
# In your backend folder
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile
heroku create your-backend-app
heroku config:set GEMINI_API_KEY=your_key
git subtree push --prefix backend heroku main
```

### Step 2: Deploy Frontend to Vercel

#### Method 1: Vercel Dashboard (Easiest)
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your repository
5. **Important**: Set root directory to `frontend`
6. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (from Step 1)
7. Deploy!

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# In your frontend folder
cd frontend
vercel

# Follow prompts and set:
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
# - Environment variable: VITE_API_URL=your_backend_url
```

### Step 3: Update CORS Settings

Update your backend `main.py` to allow your Vercel domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://your-vercel-app.vercel.app"  # Add your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔧 Quick Fix for Current Issue

If you want to deploy **only the frontend** to Vercel right now:

### Option 1: Deploy Frontend Folder Only
1. Create a new repository with just the frontend code
2. Copy everything from `frontend/` folder to the new repo
3. Deploy the new repo to Vercel
4. Set `VITE_API_URL=http://localhost:8000` (for now)

### Option 2: Use Vercel CLI with Root Directory
```bash
cd frontend
vercel --prod
# When prompted, set root directory to current folder
```

## 🌐 Complete Deployment URLs

After successful deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app` (or Render/Heroku)
- **Full App**: Frontend calls backend via API

## 🔍 Troubleshooting

### "CORS Error" after deployment
- Add your Vercel URL to backend CORS settings
- Redeploy backend

### "API connection error"
- Check if `VITE_API_URL` environment variable is set correctly
- Verify backend is running and accessible

### "Build failed" on Vercel
- Make sure you're deploying from `frontend` folder
- Check if all dependencies are in `package.json`

## 📱 Test Your Deployment

1. **Backend**: Visit `https://your-backend-url.com/` - should show API message
2. **Frontend**: Visit `https://your-app.vercel.app` - should load the UI
3. **Integration**: Upload a file and check if it works end-to-end

## 💡 Pro Tips

1. **Free Hosting Combo**:
   - Frontend: Vercel (free)
   - Backend: Railway (free tier)
   - Total cost: $0/month

2. **Custom Domain**:
   - Add your domain in Vercel dashboard
   - Update CORS settings with new domain

3. **Environment Variables**:
   - Never commit API keys
   - Use Vercel's environment variable settings
   - Different URLs for development/production

## 🚀 Alternative: Full-Stack Deployment

If you want everything in one place, consider:
- **Netlify** (supports serverless functions)
- **Railway** (supports full-stack apps)
- **DigitalOcean App Platform**

Would you like me to help you with any of these deployment options?