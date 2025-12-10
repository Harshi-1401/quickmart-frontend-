# GitHub Actions Setup

## To use the GitHub Action for seeding database:

### Step 1: Add Secrets to GitHub
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these secrets:

**MONGODB_URI**
```
mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0
```

**JWT_SECRET**
```
quickmart_jwt_secret_key_2024_production_ready
```

### Step 2: Run the Action
1. Go to **Actions** tab in your GitHub repository
2. Find **"Seed Database"** workflow
3. Click **"Run workflow"**
4. Click the green **"Run workflow"** button

### Step 3: Check Results
- The action will install dependencies and seed your database
- Check the logs to see if it completed successfully
- Test your frontend to see if products appear