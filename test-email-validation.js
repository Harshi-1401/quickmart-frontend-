const axios = require('axios');

async function testEmailValidation() {
  const backendUrl = 'https://quickmart-backend-tvuf.onrender.com';
  
  console.log('🔍 Testing Email Validation Endpoint');
  console.log('===================================');
  
  try {
    // Test the validate-email endpoint
    console.log('1️⃣ Testing /api/auth/validate-email...');
    const response = await axios.post(`${backendUrl}/api/auth/validate-email`, {
      email: 'test@gmail.com'
    });
    
    console.log('✅ Email validation endpoint working:', response.data);
    
  } catch (error) {
    console.error('❌ Email validation failed:');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 404) {
      console.log('\n🔧 Route not found - backend may not be updated');
      console.log('📝 Checking if backend is accessible...');
      
      try {
        const healthCheck = await axios.get(`${backendUrl}/api/auth/login`);
        console.log('✅ Backend is accessible, but validate-email route missing');
      } catch (healthError) {
        if (healthError.response?.status === 400) {
          console.log('✅ Backend is accessible, but validate-email route missing');
        } else {
          console.log('❌ Backend connection issue');
        }
      }
    }
  }
}

testEmailValidation();