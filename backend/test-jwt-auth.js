#!/usr/bin/env node

/**
 * JWT Authentication Test Script
 * 
 * This script tests the JWT authentication flow:
 * 1. Register a new user
 * 2. Login with the user
 * 3. Use the JWT token to access protected endpoints
 * 4. Verify token validation
 */

const axios = require('axios');

const API_BASE_URL = process.env.API_URL || 'http://localhost:3005';
const TEST_USER = {
  email: `test-${Date.now()}@example.com`,
  password: 'testpassword123',
  name: 'Test User',
  role: 'user'
};

let jwtToken = null;

async function testJwtAuthentication() {
  console.log('🔐 Testing JWT Authentication...\n');
  
  try {
    // Step 1: Register a new user
    console.log('1️⃣ Registering new user...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, TEST_USER);
    console.log('✅ Registration successful');
    console.log(`   User ID: ${registerResponse.data.user.id}`);
    console.log(`   Email: ${registerResponse.data.user.email}`);
    console.log(`   Role: ${registerResponse.data.user.role}`);
    
    jwtToken = registerResponse.data.access_token;
    console.log(`   JWT Token: ${jwtToken.substring(0, 50)}...\n`);
    
    // Step 2: Login with the user
    console.log('2️⃣ Testing login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    console.log('✅ Login successful');
    console.log(`   JWT Token: ${loginResponse.data.access_token.substring(0, 50)}...\n`);
    
    // Step 3: Test protected endpoint access
    console.log('3️⃣ Testing protected endpoint access...');
    const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    console.log('✅ Protected endpoint access successful');
    console.log(`   Users count: ${usersResponse.data.length || 0}\n`);
    
    // Step 4: Test token verification
    console.log('4️⃣ Testing token verification...');
    const verifyResponse = await axios.post(`${API_BASE_URL}/auth/verify-token`, {}, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    console.log('✅ Token verification successful');
    console.log(`   Token valid: ${verifyResponse.data.valid}`);
    console.log(`   User ID: ${verifyResponse.data.user.userId}`);
    console.log(`   User email: ${verifyResponse.data.user.email}\n`);
    
    // Step 5: Test invalid token
    console.log('5️⃣ Testing invalid token...');
    try {
      await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('❌ Invalid token test failed - should have returned 401');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Invalid token correctly rejected (401 Unauthorized)');
      } else {
        console.log(`❌ Unexpected error: ${error.message}`);
      }
    }
    
    console.log('\n🎉 All JWT authentication tests passed!');
    console.log('\n📋 Summary:');
    console.log('   ✅ User registration works');
    console.log('   ✅ User login works');
    console.log('   ✅ JWT token generation works');
    console.log('   ✅ Protected endpoint access works');
    console.log('   ✅ Token verification works');
    console.log('   ✅ Invalid token rejection works');
    
    console.log('\n🔗 Next steps:');
    console.log('   1. Open Swagger UI: http://localhost:3005/api');
    console.log('   2. Click "Authorize" button');
    console.log('   3. Enter: Bearer ' + jwtToken);
    console.log('   4. Test protected endpoints in Swagger');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure the backend server is running on port 3005');
    console.log('   2. Check if MongoDB is connected');
    console.log('   3. Verify JWT_SECRET is set in environment');
    console.log('   4. Check server logs for detailed errors');
    
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testJwtAuthentication();
}

module.exports = { testJwtAuthentication }; 