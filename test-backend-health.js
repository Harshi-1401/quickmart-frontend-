const axios = require('axios');

async function testBackendHealth() {
  const backendUrl = 'https://quickmart-backend-tvuf.onrender.com';
  
  console.log('🔍 Testing Backend Health');
  console.log('========================');
  
  try {
    console.log('1️⃣ Testing health endpoint...');
    const response = await axios.get(`${backendUrl}/api/health`);
    console.log('✅ Health check passed:', response.data);
    
    console.log('\n2️⃣ Testing root endpoint...');
    const rootResponse = await axios.get(`${backendUrl}/`);
    console.log('✅ Root endpoint passed:', rootResponse.data);
    
    console.log('\n3️⃣ Testing auth login endpoint...');
    try {
      const authResponse = await axios.post(`${backendUrl}/api/auth/login`, {
        email: 'test@test.com',
        password: 'test'
      });
    } catch (authError) {
      if (authError.response && authError.response.status === 400) {
        console.log('✅ Auth endpoint accessible (expected error for invalid credentials)');
      }
    }
    
  } catch (error) {
    console.error('❌ Backend test failed:');
    console.error('Error:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.log('🔧 DNS resolution failed - backend may be down');
    }
  }
}

testBackendHealth();