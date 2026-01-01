// Test current email behavior
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

async function testEmailBehavior() {
  console.log('🧪 Testing Current Email Behavior...\n');

  const testData = {
    email: 'newemail@example.com',
    phone: '9999999999'
  };

  try {
    console.log('📤 Sending OTP request...');
    const response = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));

    if (result.developmentOTP) {
      console.log('\n❌ Currently showing development OTP');
      console.log('🔧 This means email credentials are not configured');
      console.log('\n📧 To send real emails:');
      console.log('1. Run: node setup-email.js');
      console.log('2. Or manually add EMAIL_USER and EMAIL_PASS to server/.env');
      console.log('3. Restart the server');
    } else {
      console.log('\n✅ Email configured - OTP sent to email address');
      console.log('📬 Check your email inbox');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testEmailBehavior();