// Test script to verify frontend-backend connection
const frontendUrl = 'https://quickmart-c77puv6q2-harshinis-projects-99997810.vercel.app';
const backendUrl = 'https://your-backend-deployment.vercel.app'; // Update after backend deployment

async function testDeployment() {
  console.log('🧪 Testing QuickMart Deployment...\n');

  // Test Frontend
  try {
    console.log('🔍 Testing Frontend...');
    const frontendResponse = await fetch(frontendUrl);
    if (frontendResponse.ok) {
      console.log('✅ Frontend is accessible');
    } else {
      console.log('❌ Frontend returned:', frontendResponse.status);
    }
  } catch (error) {
    console.log('❌ Frontend error:', error.message);
  }

  // Test Backend Health
  try {
    console.log('\n🔍 Testing Backend Health...');
    const healthResponse = await fetch(`${backendUrl}/api/health`);
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('✅ Backend is healthy:', data.message);
    } else {
      console.log('❌ Backend health check failed:', healthResponse.status);
    }
  } catch (error) {
    console.log('❌ Backend error:', error.message);
  }

  // Test CORS
  try {
    console.log('\n🔍 Testing CORS Configuration...');
    const corsResponse = await fetch(`${backendUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Origin': frontendUrl,
        'Content-Type': 'application/json'
      }
    });
    
    if (corsResponse.ok) {
      console.log('✅ CORS is properly configured');
    } else {
      console.log('❌ CORS issue detected:', corsResponse.status);
    }
  } catch (error) {
    console.log('❌ CORS test error:', error.message);
  }

  console.log('\n📋 Deployment Status Summary:');
  console.log(`Frontend URL: ${frontendUrl}`);
  console.log(`Backend URL: ${backendUrl}`);
  console.log('\n💡 Next Steps:');
  console.log('1. Deploy backend to get actual URL');
  console.log('2. Update backend URL in this script');
  console.log('3. Update REACT_APP_API_URL in frontend');
  console.log('4. Run this test again');
}

// Run the test
testDeployment().catch(console.error);