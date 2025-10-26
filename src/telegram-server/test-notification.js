const axios = require('axios');

// Test reservation notification
const testReservation = async () => {
  try {
    const response = await axios.post('http://localhost:3001/send-reservation-notification', {
      reservation: {
        course: "Advanced React Development",
        date: "2025-11-15",
        time: "10:00 AM",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        participants: 2
      }
    });
    
    console.log('Reservation notification response:', response.data);
  } catch (error) {
    console.error('Error sending reservation notification:', error.message);
  }
};

// Test order notification
const testOrder = async () => {
  try {
    const response = await axios.post('http://localhost:3001/send-order-notification', {
      order: {
        id: 12345,
        items: [
          {
            title: "React Fundamentals Course",
            price: 99.99,
            quantity: 1
          },
          {
            title: "JavaScript Essentials Book",
            price: 29.99,
            quantity: 2
          }
        ],
        subtotal: 159.97,
        tax: 12.80,
        total: 172.77,
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: "+0987654321"
      }
    });
    
    console.log('Order notification response:', response.data);
  } catch (error) {
    console.error('Error sending order notification:', error.message);
  }
};

// Run tests
console.log('Testing reservation notification...');
testReservation();

console.log('Testing order notification...');
testOrder();