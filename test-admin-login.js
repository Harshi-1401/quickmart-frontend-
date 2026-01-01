const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('🔐 Testing admin login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@quickmart.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin login successful!');
    console.log('👤 User:', response.data.user);
    console.log('🔑 Token:', response.data.token ? 'Generated' : 'Missing');
    
  } catch (error) {
    console.error('❌ Admin login failed:', error.response?.data || error.message);
    
    // Try to create admin user
    console.log('\n🔧 Attempting to create admin user...');
    try {
      const User = require('./server/models/User');
      const mongoose = require('mongoose');
      
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quickmart');
      
      const adminExists = await User.findOne({ email: 'admin@quickmart.com' });
      if (adminExists) {
        console.log('👤 Admin user exists in database');
        console.log('📧 Email:', adminExists.email);
        console.log('🔐 Role:', adminExists.role);
      } else {
        console.log('❌ Admin user not found in database');
        
        const adminUser = new User({
          name: 'Admin',
          email: 'admin@quickmart.com',
          password: 'admin123',
          phone: '9876543210',
          gender: 'other',
          address: 'QuickMart HQ',
          role: 'admin'
        });
        
        await adminUser.save();
        console.log('✅ Admin user created successfully!');
      }
      
      await mongoose.disconnect();
    } catch (dbError) {
      console.error('❌ Database error:', dbError.message);
    }
  }
}

testAdminLogin();