// Email Setup Helper for QuickMart OTP System
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📧 QuickMart Email Setup Helper\n');
console.log('This will help you configure email sending for OTP delivery.\n');

console.log('📋 Gmail Setup Instructions:');
console.log('1. Go to your Google Account settings');
console.log('2. Enable 2-Factor Authentication');
console.log('3. Go to Security → 2-Step Verification → App passwords');
console.log('4. Generate an app password for "Mail"');
console.log('5. Use that 16-character password below\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupEmail() {
  try {
    const email = await askQuestion('Enter your Gmail address: ');
    const password = await askQuestion('Enter your Gmail app password (16 characters): ');
    
    // Read current .env file
    let envContent = fs.readFileSync('server/.env', 'utf8');
    
    // Update or add email configuration
    if (envContent.includes('EMAIL_USER=')) {
      envContent = envContent.replace(/EMAIL_USER=.*/, `EMAIL_USER=${email}`);
    } else {
      envContent += `\nEMAIL_USER=${email}`;
    }
    
    if (envContent.includes('EMAIL_PASS=')) {
      envContent = envContent.replace(/EMAIL_PASS=.*/, `EMAIL_PASS=${password}`);
    } else {
      envContent += `\nEMAIL_PASS=${password}`;
    }
    
    // Write back to .env file
    fs.writeFileSync('server/.env', envContent);
    
    console.log('\n✅ Email configuration saved to server/.env');
    console.log('\n🔄 Next steps:');
    console.log('1. Restart your server');
    console.log('2. Test email sending: cd server && node test-email.js');
    console.log('3. Try the OTP flow - it will now send emails!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setupEmail();