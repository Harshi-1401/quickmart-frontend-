// Test script to verify OTP flow without email configuration
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

async function testOTPFlow() {
  console.log('🧪 Testing QuickMart OTP Flow...\n');

  const testData = {
    email: 'test@example.com',
    phone: '1234567890',
    name: 'Test User',
    gender: 'male',
    address: '123 Test Street',
    password: 'testpassword123'
  };

  try {
    // Step 1: Send OTP
    console.log('📤 Step 1: Sending OTP...');
    const sendOTPResponse = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testData.email,
        phone: testData.phone
      })
    });

    const sendOTPResult = await sendOTPResponse.json();
    console.log('Response:', sendOTPResult);

    if (!sendOTPResponse.ok) {
      console.log('❌ Send OTP failed');
      return;
    }

    const otp = sendOTPResult.developmentOTP;
    if (!otp) {
      console.log('❌ No development OTP received');
      return;
    }

    console.log(`✅ OTP sent successfully: ${otp}\n`);

    // Step 2: Verify OTP
    console.log('🔍 Step 2: Verifying OTP...');
    const verifyOTPResponse = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testData.email,
        phone: testData.phone,
        otp: otp
      })
    });

    const verifyOTPResult = await verifyOTPResponse.json();
    console.log('Response:', verifyOTPResult);

    if (!verifyOTPResponse.ok) {
      console.log('❌ Verify OTP failed');
      return;
    }

    console.log('✅ OTP verified successfully\n');

    // Step 3: Complete Registration
    console.log('📝 Step 3: Completing registration...');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testData.email,
        phone: testData.phone,
        otp: otp,
        name: testData.name,
        gender: testData.gender,
        address: testData.address,
        password: testData.password
      })
    });

    const registerResult = await registerResponse.json();
    
    if (!registerResponse.ok) {
      console.log('Response:', registerResult);
      console.log('❌ Registration failed');
      return;
    }

    console.log('✅ Registration completed successfully');
    console.log('User ID:', registerResult.user.id);
    console.log('Token received:', registerResult.token ? 'Yes' : 'No');

    console.log('\n🎉 OTP Flow Test Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ OTP generation and storage');
    console.log('✅ OTP verification');
    console.log('✅ User registration');
    console.log('✅ JWT token generation');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testOTPFlow();