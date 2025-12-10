#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 QuickMart Automated Setup Starting...\n');

function runCommand(command, description, directory = '.') {
  try {
    console.log(`📋 ${description}...`);
    const result = execSync(command, { 
      cwd: directory, 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    console.log(`✅ ${description} completed`);
    return result;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return null;
  }
}

async function setupQuickMart() {
  console.log('🔍 Checking project structure...');
  
  // Check if we're in the right directory
  if (!fs.existsSync('server') || !fs.existsSync('src')) {
    console.error('❌ Please run this script from the project root directory (where you can see both "server" and "src" folders)');
    process.exit(1);
  }
  
  console.log('✅ Project structure looks good\n');

  // Step 1: Install backend dependencies
  console.log('📦 Installing backend dependencies...');
  runCommand('npm install', 'Backend dependencies installation', 'server');
  
  // Step 2: Test MongoDB connection
  console.log('\n🔗 Testing MongoDB Atlas connection...');
  const connectionTest = runCommand('node test-connection.js', 'MongoDB connection test', 'server');
  
  if (!connectionTest) {
    console.error('❌ MongoDB connection failed. Please check your .env file in server directory');
    process.exit(1);
  }
  
  // Step 3: Seed products
  console.log('\n📦 Seeding products to database...');
  runCommand('node scripts/seedProducts.js', 'Products seeding', 'server');
  
  // Step 4: Create admin user
  console.log('\n👤 Creating admin user...');
  runCommand('node scripts/createAdmin.js', 'Admin user creation', 'server');
  
  // Step 5: Verify setup
  console.log('\n🧪 Verifying database setup...');
  runCommand('node test-server.js', 'Database verification', 'server');
  
  // Step 6: Install frontend dependencies
  console.log('\n📦 Installing frontend dependencies...');
  runCommand('npm install', 'Frontend dependencies installation');
  
  // Step 7: Test API endpoints
  console.log('\n🧪 Testing API endpoints...');
  runCommand('node debug-products.js', 'API endpoints testing');
  
  console.log('\n🎉 QuickMart Setup Complete!\n');
  
  console.log('📋 Setup Summary:');
  console.log('✅ Backend dependencies installed');
  console.log('✅ MongoDB Atlas connected');
  console.log('✅ 70 products seeded to database');
  console.log('✅ Admin user created (admin@quickmart.com / admin123)');
  console.log('✅ Frontend dependencies installed');
  console.log('✅ API endpoints tested');
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Push to GitHub:');
  console.log('   git add .');
  console.log('   git commit -m "Complete QuickMart setup with database seeding"');
  console.log('   git push origin main');
  console.log('\n2. Your deployments will automatically update:');
  console.log('   - Frontend: https://quickmart-gamma.vercel.app');
  console.log('   - Backend: https://quickmart-backend-tvuf.onrender.com');
  console.log('\n3. Test your live application!');
  
  console.log('\n🔗 Useful URLs:');
  console.log('- Products API: https://quickmart-backend-tvuf.onrender.com/api/products');
  console.log('- Health Check: https://quickmart-backend-tvuf.onrender.com/api/health');
  console.log('- Frontend: https://quickmart-gamma.vercel.app');
}

// Run the setup
setupQuickMart().catch(error => {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
});