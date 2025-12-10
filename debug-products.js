// Debug script to check products issue
const frontendUrl = 'https://quickmart-gamma.vercel.app';
const backendUrl = 'https://quickmart-backend-tvuf.onrender.com';

async function debugProducts() {
  console.log('🔍 Debugging Products Issue...\n');

  // Test 1: Check if backend is responding
  try {
    console.log('1. Testing Backend Health...');
    const healthResponse = await fetch(`${backendUrl}/api/health`);
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('✅ Backend is healthy:', data.message);
    } else {
      console.log('❌ Backend health failed:', healthResponse.status);
      return;
    }
  } catch (error) {
    console.log('❌ Backend connection error:', error.message);
    return;
  }

  // Test 2: Check products endpoint
  try {
    console.log('\n2. Testing Products Endpoint...');
    const productsResponse = await fetch(`${backendUrl}/api/products`);
    
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`✅ Products endpoint working, found ${products.length} products`);
      
      if (products.length === 0) {
        console.log('⚠️ Database is empty - need to seed products!');
        console.log('\nTo fix this, run:');
        console.log('cd server');
        console.log('node scripts/seedProducts.js');
      } else {
        console.log('📦 Sample products:');
        products.slice(0, 3).forEach(p => {
          console.log(`  - ${p.name}: ₹${p.price} (${p.category})`);
        });
      }
    } else {
      console.log('❌ Products endpoint failed:', productsResponse.status);
      const errorText = await productsResponse.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.log('❌ Products API error:', error.message);
  }

  // Test 3: Check CORS for frontend
  try {
    console.log('\n3. Testing CORS from Frontend...');
    const corsResponse = await fetch(`${backendUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Origin': frontendUrl,
        'Content-Type': 'application/json'
      }
    });
    
    if (corsResponse.ok) {
      console.log('✅ CORS is working correctly');
    } else {
      console.log('❌ CORS issue detected:', corsResponse.status);
    }
  } catch (error) {
    console.log('❌ CORS test error:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('- Backend URL:', backendUrl);
  console.log('- Frontend URL:', frontendUrl);
  console.log('- Products API:', `${backendUrl}/api/products`);
}

debugProducts().catch(console.error);