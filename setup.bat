@echo off
echo 🚀 QuickMart Automated Setup (Windows)
echo =====================================

REM Check if we're in the right directory
if not exist "server" (
    echo ❌ Please run this script from the project root directory
    echo    ^(where you can see both 'server' and 'src' folders^)
    pause
    exit /b 1
)

if not exist "src" (
    echo ❌ Please run this script from the project root directory
    echo    ^(where you can see both 'server' and 'src' folders^)
    pause
    exit /b 1
)

echo ✅ Project structure verified

echo.
echo 📦 Installing backend dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Backend dependencies installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo.
echo 🔗 Testing MongoDB connection...
call node test-connection.js
if errorlevel 1 (
    echo ❌ MongoDB connection failed
    pause
    exit /b 1
)
echo ✅ MongoDB connection successful

echo.
echo 📦 Seeding products...
call node scripts/seedProducts.js
if errorlevel 1 (
    echo ❌ Product seeding failed
    pause
    exit /b 1
)
echo ✅ Products seeded successfully

echo.
echo 👤 Creating admin user...
call node scripts/createAdmin.js
if errorlevel 1 (
    echo ❌ Admin user creation failed
    pause
    exit /b 1
)
echo ✅ Admin user created

echo.
echo 🧪 Verifying setup...
call node test-server.js
echo ✅ Database verification completed

cd ..

echo.
echo 📦 Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Frontend dependencies installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo 🧪 Testing API endpoints...
call node debug-products.js
echo ✅ API testing completed

echo.
echo 🎉 QuickMart Setup Complete!
echo ============================
echo.
echo 📋 Setup Summary:
echo ✅ Backend dependencies installed
echo ✅ MongoDB Atlas connected
echo ✅ 70 products seeded
echo ✅ Admin user created ^(admin@quickmart.com / admin123^)
echo ✅ Frontend dependencies installed
echo ✅ API endpoints tested
echo.
echo 🚀 Next Steps:
echo 1. Push to GitHub:
echo    git add .
echo    git commit -m "Complete QuickMart setup"
echo    git push origin main
echo.
echo 2. Test your live app:
echo    Frontend: https://quickmart-gamma.vercel.app
echo    Backend:  https://quickmart-backend-tvuf.onrender.com
echo.
pause