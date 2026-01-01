// Test script to verify resend OTP functionality
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

async function testResendOTP() {
  console.log('🧪 Testing Resend OTP Functionality...\n');

  const testData = {
    email: 'resend-test-unique@example.com',
    phone: '5555555555'
  };

  try {
    // Step 1: Send initial OTP
    console.log('📤 Step 1: Sending initial OTP...');
    const sendOTPResponse = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const sendOTPResult = await sendOTPResponse.json();
    console.log('Response:', sendOTPResult);

    if (!sendOTPResponse.ok) {
      console.log('❌ Send OTP failed');
      return;
    }

    const firstOTP = sendOTPResult.developmentOTP;
    console.log(`✅ First OTP: ${firstOTP}\n`);

    // Step 2: Resend OTP
    console.log('🔄 Step 2: Resending OTP...');
    const resendOTPResponse = await fetch(`${API_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const resendOTPResult = await resendOTPResponse.json();
    console.log('Response:', resendOTPResult);

    if (!resendOTPResponse.ok) {
      console.log('❌ Resend OTP failed');
      return;
    }

    const secondOTP = resendOTPResult.developmentOTP;
    console.log(`✅ Second OTP: ${secondOTP}\n`);

    // Step 3: Verify that old OTP is invalid
    console.log('🔍 Step 3: Testing old OTP (should fail)...');
    const verifyOldOTPResponse = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testData.email,
        phone: testData.phone,
        otp: firstOTP
      })
    });

    const verifyOldOTPResult = await verifyOldOTPResponse.json();
    console.log('Response:', verifyOldOTPResult);

    if (verifyOldOTPResponse.ok) {
      console.log('❌ Old OTP should have been invalid');
      return;
    }

    console.log('✅ Old OTP correctly invalidated\n');

    // Step 4: Verify new OTP works
    console.log('🔍 Step 4: Testing new OTP (should work)...');
    const verifyNewOTPResponse = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testData.email,
        phone: testData.phone,
        otp: secondOTP
      })
    });

    const verifyNewOTPResult = await verifyNewOTPResponse.json();
    console.log('Response:', verifyNewOTPResult);

    if (!verifyNewOTPResponse.ok) {
      console.log('❌ New OTP verification failed');
      return;
    }

    console.log('✅ New OTP verified successfully\n');

    console.log('🎉 Resend OTP Test Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Initial OTP generation');
    console.log('✅ OTP resend functionality');
    console.log('✅ Old OTP invalidation');
    console.log('✅ New OTP verification');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testResendOTP();