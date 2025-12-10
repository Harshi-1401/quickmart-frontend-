#!/bin/bash

echo "🚀 QuickMart Automated Setup (Bash Version)"
echo "============================================"

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "src" ]; then
    echo "❌ Please run this script from the project root directory"
    echo "   (where you can see both 'server' and 'src' folders)"
    exit 1
fi

echo "✅ Project structure verified"

# Function to run commands with error checking
run_command() {
    local cmd="$1"
    local desc="$2"
    local dir="${3:-.}"
    
    echo "📋 $desc..."
    if (cd "$dir" && eval "$cmd"); then
        echo "✅ $desc completed"
    else
        echo "❌ $desc failed"
        exit 1
    fi
}

# Step 1: Install backend dependencies
run_command "npm install" "Installing backend dependencies" "server"

# Step 2: Test MongoDB connection
run_command "node test-connection.js" "Testing MongoDB connection" "server"

# Step 3: Seed products
run_command "node scripts/seedProducts.js" "Seeding products" "server"

# Step 4: Create admin user
run_command "node scripts/createAdmin.js" "Creating admin user" "server"

# Step 5: Verify setup
run_command "node test-server.js" "Verifying database setup" "server"

# Step 6: Install frontend dependencies
run_command "npm install" "Installing frontend dependencies"

# Step 7: Test API
run_command "node debug-products.js" "Testing API endpoints"

echo ""
echo "🎉 QuickMart Setup Complete!"
echo "============================"
echo ""
echo "📋 What was completed:"
echo "✅ Backend dependencies installed"
echo "✅ MongoDB Atlas connected"
echo "✅ 70 products seeded"
echo "✅ Admin user created (admin@quickmart.com / admin123)"
echo "✅ Frontend dependencies installed"
echo "✅ API endpoints tested"
echo ""
echo "🚀 Next steps:"
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Complete QuickMart setup'"
echo "   git push origin main"
echo ""
echo "2. Test your live app:"
echo "   Frontend: https://quickmart-gamma.vercel.app"
echo "   Backend:  https://quickmart-backend-tvuf.onrender.com"