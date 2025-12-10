# QuickMart Deployment Guide

## Frontend Deployment (Vercel) ✅ COMPLETED
Your frontend is already deployed at:
**https://quickmart-c77puv6q2-harshinis-projects-99997810.vercel.app**

## Backend Deployment (Vercel)

### Option 1: Deploy to Vercel (Recommended)

1. **Prepare Backend for Deployment:**
   ```bash
   cd server
   cp package-vercel.json package.json
   ```

2. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy from server directory
   cd server
   vercel

   # Follow prompts:
   # - Set up and deploy? Y
   # - Which scope? (your account)
   # - Link to existing project? N
   # - Project name: quickmart-backend
   # - Directory: ./
   ```

3. **Set Environment Variables in Vercel:**
   Go to your Vercel dashboard → Project Settings → Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET = quickmart_jwt_secret_key_2024_production_ready
   NODE_ENV = production
   ```

4. **Update Frontend API URL:**
   After backend deployment, update `.env.production`:
   ```env
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

5. **Redeploy Frontend:**
   ```bash
   # Trigger new deployment with updated API URL
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

### Option 2: Deploy to Railway

1. **Connect GitHub Repository:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub account
   - Deploy from GitHub repository

2. **Configure Environment Variables:**
   ```
   MONGODB_URI = mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET = quickmart_jwt_secret_key_2024_production_ready
   PORT = 5000
   ```

3. **Set Root Directory:**
   - In Railway dashboard, set root directory to `server`

### Option 3: Deploy to Render

1. **Create New Web Service:**
   - Go to [Render.com](https://render.com)
   - Connect GitHub repository
   - Choose "Web Service"

2. **Configuration:**
   ```
   Name: quickmart-backend
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables:**
   ```
   MONGODB_URI = mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET = quickmart_jwt_secret_key_2024_production_ready
   ```

## Database Setup (After Backend Deployment)

1. **Seed Database:**
   ```bash
   # Run these commands after backend is deployed
   curl https://your-backend-url.vercel.app/api/health
   
   # Or use the setup scripts locally:
   cd server
   npm run setup
   ```

## Testing Deployment

1. **Test Backend Health:**
   ```bash
   curl https://your-backend-url.vercel.app/api/health
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new user
   - Add items to cart
   - Place an order

## Current Status

✅ **Frontend**: Deployed on Vercel  
✅ **Backend**: Deployed on Render (`quickmart-backend-tvuf.onrender.com`)  
✅ **Database**: MongoDB Atlas configured  
✅ **CORS**: Configured for your frontend domain  
🔄 **API Connection**: Needs frontend redeployment with correct API URL  

## Next Steps

1. Deploy backend using one of the options above
2. Update frontend API URL with backend deployment URL
3. Test the complete application
4. Run database setup scripts

## Troubleshooting

### CORS Issues
- Ensure your frontend domain is added to CORS origins in `server.js`
- Check browser console for CORS errors

### Database Connection
- Verify MongoDB Atlas credentials
- Check if IP address is whitelisted in MongoDB Atlas

### Environment Variables
- Ensure all required environment variables are set in deployment platform
- Check for typos in variable names

### API Endpoints
- Test individual endpoints using curl or Postman
- Check server logs for errors