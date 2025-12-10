// Test script for Render backend deployment
const backendUrl = 'https://quickmart-backend-tvuf.onrender.com';

async function testRenderBackend() {
  console.log('🧪 Testing Render Backend Deployment...\n');

  // Test root endpoint
  try {
    console.log('🔍 Testing Root Endpoint...');
    const rootResponse = await fetch(`${backendUrl}/`);
    if (rootResponse.ok) {
      const data = await rootResponse.json();
      console.log('✅ Root endpoint working:', data.message);
      console.log('📋 Available endpoints:', Object.keys(data.endpoints));
    } else {
      console.log('❌ Root endpoint failed:', rootResponse.status);
    }
  } catch (error) {
    console.log('❌ Root endpoint error:', error.message);
  }

  // Test health endpoint
  try {
    console.log('\n🔍 Testing Health Endpoint...');
    const healthResponse = await fetch(`${backendUrl}/api/health`);
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('✅ Health endpoint working:', data.message);
      console.log('🌍 Environment:', data.environment);
    } else {
      console.log('❌ Health endpoint failed:', healthResponse.status);
    }
  } catch (error) {
    console.log('❌ Health endpoint error:', error.message);
  }

  // Test products endpoint
  try {
    console.log('\n🔍 Testing Products Endpoint...');
    const productsResponse = await fetch(`${backendUrl}/api/products`);
    if (productsResponse.ok) {
      const data = await productsResponse.json();
      console.log('✅ Products endpoint working, found', data.length, 'products');
    } else {
      console.log('❌ Products endpoint failed:', productsResponse.status);
    }
  } catch (error) {
    console.log('❌ Products endpoint error:', error.message);
  }

  // Test auth endpoints structure
  console.log('\n🔍 Testing Auth Endpoints Structure...');
  const authEndpoints = ['/api/auth/login', '/api/auth/register'];
  
  for (const endpoint of authEndpoints) {
    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // Empty body to test endpoint existence
      });
      
      if (response.status === 400 || response.status === 422) {
        console.log(`✅ ${endpoint} - Endpoint exists (validation error expected)`);
      } else if (response.status === 404) {
        console.log(`❌ ${endpoint} - Endpoint not found`);
      } else {
        console.log(`⚠️ ${endpoint} - Unexpected status:`, response.status);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error:`, error.message);
    }
  }

  console.log('\n📋 Backend Status Summary:');
  console.log(`Backend URL: ${backendUrl}`);
  console.log('Expected endpoints:');
  console.log('- GET  / (root)');
  console.log('- GET  /api/health');
  console.log('- GET  /api/products');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
}

// Run the test
testRenderBackend().catch(console.error);