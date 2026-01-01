// Test script to verify production vs development behavior
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

async function testProductionBehavior() {
  console.log('🧪 Testing Production vs Development Behavior...\n');

  const testData = {
    email: 'production-test@example.com',
    phone: '1111111111'
  };

  try {
    // Test current behavior (should be development)
    console.log('📤 Testing current environment behavior...');
    const sendOTPResponse = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const sendOTPResult = await sendOTPResponse.json();
    console.log('Response:', JSON.stringify(sendOTPResult, null, 2));

    if (sendOTPResult.developmentOTP) {
      console.log('✅ Development mode detected - OTP visible in response');
      console.log(`🔐 Development OTP: ${sendOTPResult.developmentOTP}`);
    } else {
      console.log('✅ Production mode detected - OTP hidden from response');
      console.log('📧 OTP should be sent via email only');
    }

    console.log('\n📋 Expected Behavior:');
    console.log('🔧 Development Mode:');
    console.log('  - OTP logged to console');
    console.log('  - OTP included in API response');
    console.log('  - Email sending optional');
    console.log('  - Frontend shows development OTP');
    
    console.log('\n🚀 Production Mode:');
    console.log('  - OTP only sent via email');
    console.log('  - No OTP in API response');
    console.log('  - No console logging of OTP');
    console.log('  - Frontend shows "Please check your email"');

    console.log('\n🔄 To test production mode:');
    console.log('1. Set NODE_ENV=production in server/.env');
    console.log('2. Configure email credentials');
    console.log('3. Restart the server');
    console.log('4. Test the OTP flow');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testProductionBehavior();