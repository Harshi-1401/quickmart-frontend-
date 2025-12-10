# Fix API Connection Issue

## Problem
Frontend is calling `/auth/login` instead of `/api/auth/login`

## Solution Steps

### 1. Test Backend Endpoints
```bash
node test-render-backend.js
```

### 2. Verify Backend is Working
```bash
# Test health endpoint
curl https://quickmart-backend-tvuf.onrender.com/api/health

# Test products endpoint  
curl https://quickmart-backend-tvuf.onrender.com/api/products
```

### 3. Update Frontend API URL
The `.env.production` file has been updated to:
```env
REACT_APP_API_URL=https://quickmart-backend-tvuf.onrender.com/api
```

### 4. Redeploy Frontend
Since your frontend is on Vercel, you need to:

**Option A: Git Push (if connected to GitHub)**
```bash
git add .
git commit -m "Fix API URL for Render backend"
git push
```

**Option B: Manual Redeploy**
1. Go to Vercel Dashboard
2. Find your quickmart project
3. Go to Settings → Environment Variables
4. Add/Update: `REACT_APP_API_URL` = `https://quickmart-backend-tvuf.onrender.com/api`
5. Go to Deployments tab
6. Click "Redeploy" on latest deployment

### 5. Test After Redeployment
Visit your frontend and try:
- User registration
- User login
- Adding items to cart
- Placing orders

## Expected API Calls After Fix
- ✅ `https://quickmart-backend-tvuf.onrender.com/api/auth/login`
- ✅ `https://quickmart-backend-tvuf.onrender.com/api/auth/register`
- ✅ `https://quickmart-backend-tvuf.onrender.com/api/products`
- ✅ `https://quickmart-backend-tvuf.onrender.com/api/orders`

## Current Status
- ✅ Backend deployed and working on Render
- ✅ CORS configured for your Vercel frontend
- ✅ MongoDB Atlas connected
- 🔄 Frontend needs redeployment with correct API URL