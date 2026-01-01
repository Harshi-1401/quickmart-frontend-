// QuickMart OTP System Verification Script
// Run this to verify the OTP system is working correctly

const fs = require('fs');
const path = require('path');

console.log('🔍 QuickMart OTP System Verification\n');

// Check if required files exist
const requiredFiles = [
  'server/models/OTP.js',
  'server/services/emailService.js',
  'server/routes/auth.js',
  'src/pages/Login.js'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check server dependencies
console.log('\n📦 Checking server dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
  const requiredDeps = ['nodemailer', 'mongoose', 'express', 'jsonwebtoken', 'bcryptjs'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('❌ Could not read server/package.json');
  allFilesExist = false;
}

// Check environment configuration
console.log('\n🔧 Checking environment configuration...');
const envExample = 'server/.env.example';
if (fs.existsSync(envExample)) {
  const envContent = fs.readFileSync(envExample, 'utf8');
  const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'JWT_SECRET', 'MONGODB_URI'];
  
  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`✅ ${envVar} configured in .env.example`);
    } else {
      console.log(`❌ ${envVar} - MISSING from .env.example`);
    }
  });
} else {
  console.log('❌ server/.env.example not found');
}

// Check API endpoints in auth.js
console.log('\n🌐 Checking API endpoints...');
try {
  const authContent = fs.readFileSync('server/routes/auth.js', 'utf8');
  const requiredEndpoints = [
    "router.post('/send-otp'",
    "router.post('/resend-otp'",
    "router.post('/verify-otp'",
    "router.post('/register'"
  ];
  
  requiredEndpoints.forEach(endpoint => {
    if (authContent.includes(endpoint)) {
      console.log(`✅ ${endpoint.replace("router.post('", '').replace("'", '')} endpoint`);
    } else {
      console.log(`❌ ${endpoint.replace("router.post('", '').replace("'", '')} endpoint - MISSING`);
    }
  });
} catch (error) {
  console.log('❌ Could not read server/routes/auth.js');
}

// Summary
console.log('\n📋 Summary:');
if (allFilesExist) {
  console.log('✅ All required files and dependencies are present');
  console.log('\n🚀 Next steps:');
  console.log('1. Configure email credentials in server/.env');
  console.log('2. Test email service: cd server && node test-email.js');
  console.log('3. Start the server: cd server && npm start');
  console.log('4. Test the OTP flow in the frontend');
} else {
  console.log('❌ Some required files or dependencies are missing');
  console.log('Please check the errors above and fix them before proceeding');
}

console.log('\n📖 For detailed setup instructions, see EMAIL-SETUP.md');