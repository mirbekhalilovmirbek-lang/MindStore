const axios = require('axios');

// Base URL for the server (adjust if running on a different port)
const BASE_URL = 'http://localhost:3001';

// Test user ID
const TEST_USER_ID = 'testuser123';

// Test item
const testItem = {
  id: 'course1',
  title: 'React Fundamentals',
  price: 49.99,
  quantity: 1
};

async function testCart() {
  try {
    console.log('🧪 Testing Cart Functionality\n');
    console.log('NOTE: Cart contents will be displayed in the server console for each operation\n');
    
    // 1. Get empty cart
    console.log('1. Getting initial cart...');
    let response = await axios.get(`${BASE_URL}/cart/${TEST_USER_ID}`);
    console.log('Initial cart retrieved (check server console for display)');
    
    // 2. Add item to cart
    console.log('\n2. Adding item to cart...');
    response = await axios.post(`${BASE_URL}/cart/${TEST_USER_ID}/add`, {
      item: testItem
    });
    console.log('Item added to cart (check server console for display)');
    
    // 3. Add another item
    console.log('\n3. Adding another item...');
    const anotherItem = {
      id: 'course2',
      title: 'Advanced JavaScript',
      price: 59.99,
      quantity: 2
    };
    response = await axios.post(`${BASE_URL}/cart/${TEST_USER_ID}/add`, {
      item: anotherItem
    });
    console.log('Second item added to cart (check server console for display)');
    
    // 4. Get cart
    console.log('\n4. Getting cart...');
    response = await axios.get(`${BASE_URL}/cart/${TEST_USER_ID}`);
    console.log('Cart retrieved (check server console for display)');
    
    // 5. Remove item
    console.log('\n5. Removing item from cart...');
    response = await axios.post(`${BASE_URL}/cart/${TEST_USER_ID}/remove`, {
      itemId: 'course1'
    });
    console.log('Item removed from cart (check server console for display)');
    
    // 6. Clear cart
    console.log('\n6. Clearing cart...');
    response = await axios.post(`${BASE_URL}/cart/${TEST_USER_ID}/clear`);
    console.log('Cart cleared (check server console for display)');
    
    console.log('\n✅ Cart testing completed successfully!');
    console.log('📝 Check the server console to see detailed cart displays for each operation');
  } catch (error) {
    console.error('❌ Error during cart testing:', error.response?.data || error.message);
  }
}

// Run the test
testCart();