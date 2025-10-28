const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot Token (should be in environment variables in production)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// In a real application, you would store these in a database
// For now, we'll use a fixed chat ID from environment variables or a default one
const FIXED_CHAT_ID = process.env.TELEGRAM_CHAT_ID || null;
let subscribedChats = FIXED_CHAT_ID ? [FIXED_CHAT_ID] : [];

// Cart storage (in a real app, this would be in a database)
let carts = {};

// Function to display cart contents in console
function displayCartInConsole(userId, action) {
  const cart = carts[userId] || { items: [], total: 0 };
  console.log(`\n=== CART UPDATE ===`);
  console.log(`User ID: ${userId}`);
  console.log(`Action: ${action}`);
  console.log(`Items in cart: ${cart.items.length}`);
  
  if (cart.items.length > 0) {
    console.log('Cart Contents:');
    cart.items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`);
    });
    console.log(`Total: $${cart.total.toFixed(2)}`);
  } else {
    console.log('Cart is empty');
  }
  console.log('===================\n');
}

// Function to send message to Telegram
const sendTelegramMessage = async (message) => {
  try {
    // If we have a fixed chat ID or subscribed chats, send the message
    const chatsToSend = FIXED_CHAT_ID ? [FIXED_CHAT_ID] : subscribedChats;
    
    if (chatsToSend.length > 0) {
      for (const chatId of chatsToSend) {
        try {
          await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: chatId,
            text: message
          });
          console.log(`Message sent to chat ${chatId}`);
        } catch (error) {
          console.error(`Failed to send message to chat ${chatId}:`, error.message);
        }
      }
      return { success: true, message: `Message sent to ${chatsToSend.length} chat(s)` };
    } else {
      // If no chats are subscribed, log the message
      console.log('Telegram message (not sent due to missing chat ID):', message);
      console.log('To receive messages:');
      console.log('1. Set TELEGRAM_CHAT_ID in your .env file with your chat ID');
      console.log('2. OR message your bot on Telegram and send /start command');
      console.log('3. OR visit https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates to find your chat ID');
      
      // Even if we can't send the message, we'll consider it a success for the API response
      return { success: true, message: 'Message logged (not sent due to missing chat ID)' };
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { success: false, error: error.message };
  }
};

// Cart endpoints
// Get cart for a user
app.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const cart = carts[userId] || { items: [], total: 0 };
  displayCartInConsole(userId, 'VIEW CART');
  res.json({ success: true, cart });
});

// Add item to cart
app.post('/cart/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { item } = req.body;
  
  if (!item || !item.id || !item.title || item.price === undefined) {
    return res.status(400).json({ 
      success: false, 
      error: 'Item must include id, title, and price' 
    });
  }
  
  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 };
  }
  
  const existingItemIndex = carts[userId].items.findIndex(i => i.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    carts[userId].items[existingItemIndex].quantity += item.quantity || 1;
  } else {
    // Add new item
    carts[userId].items.push({ 
      ...item, 
      quantity: item.quantity || 1 
    });
  }
  
  // Recalculate total
  carts[userId].total = carts[userId].items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  console.log(`Item added to cart for user ${userId}:`, item);
  displayCartInConsole(userId, 'ADD ITEM');
  res.json({ 
    success: true, 
    message: 'Item added to cart',
    cart: carts[userId]
  });
});

// Remove item from cart
app.post('/cart/:userId/remove', (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;
  
  if (!carts[userId]) {
    return res.status(404).json({ 
      success: false, 
      error: 'Cart not found for user' 
    });
  }
  
  carts[userId].items = carts[userId].items.filter(item => item.id !== itemId);
  
  // Recalculate total
  carts[userId].total = carts[userId].items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  console.log(`Item removed from cart for user ${userId}:`, itemId);
  displayCartInConsole(userId, 'REMOVE ITEM');
  res.json({ 
    success: true, 
    message: 'Item removed from cart',
    cart: carts[userId]
  });
});

// Clear cart
app.post('/cart/:userId/clear', (req, res) => {
  const { userId } = req.params;
  
  if (carts[userId]) {
    carts[userId].items = [];
    carts[userId].total = 0;
    console.log(`Cart cleared for user ${userId}`);
  }
  
  displayCartInConsole(userId, 'CLEAR CART');
  res.json({ 
    success: true, 
    message: 'Cart cleared',
    cart: carts[userId] || { items: [], total: 0 }
  });
});

// Get all carts (for debugging/admin purposes)
app.get('/carts', (req, res) => {
  console.log('\n=== ALL CARTS ===');
  Object.keys(carts).forEach(userId => {
    displayCartInConsole(userId, 'VIEW ALL CARTS');
  });
  if (Object.keys(carts).length === 0) {
    console.log('No carts found');
    console.log('=================\n');
  }
  res.json({ success: true, carts });
});

// Endpoint for Telegram webhook (to receive messages from users)
app.post(`/webhook/${TELEGRAM_BOT_TOKEN}`, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text;
      
      // Add chat to subscribed chats if not already there
      if (!subscribedChats.includes(chatId)) {
      if (!FIXED_CHAT_ID) {  // Only add to subscribedChats if not using fixed chat ID
        subscribedChats.push(chatId);
      }
        console.log(`New subscriber: ${chatId}`);
      }
      
      // Respond to user commands
      if (text === '/start') {
        const welcomeMessage = `
Welcome to MindStore notifications!
You will now receive notifications about orders and reservations.
Your chat ID is: ${chatId}
        `;
        
        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
          chat_id: chatId,
          text: welcomeMessage
        });
      } else if (text === '/cart') {
        // Show cart status
        const cart = carts[chatId] || { items: [], total: 0 };
        let cartMessage = '🛒 Your Cart:\n';
        
        if (cart.items.length === 0) {
          cartMessage += 'Your cart is empty.';
        } else {
          cart.items.forEach(item => {
            cartMessage += `\n- ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
          });
          cartMessage += `\n\nTotal: $${cart.total.toFixed(2)}`;
        }
        
        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
          chat_id: chatId,
          text: cartMessage
        });
        
        // Also display in console
        displayCartInConsole(chatId, 'TELEGRAM /cart COMMAND');
      }
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.sendStatus(500);
  }
});

// Endpoint to send reservation notification
app.post('/send-reservation-notification', async (req, res) => {
  try {
    const { reservation } = req.body;
    
    const message = `
🎉 New Reservation Confirmed!

Course: ${reservation.course}
Date: ${reservation.date}
Time: ${reservation.time}
Name: ${reservation.name}
Email: ${reservation.email}
Phone: ${reservation.phone}
Participants: ${reservation.participants}

Reservation confirmed at: ${new Date().toLocaleString()}

📲 Please contact the customer on WhatsApp at 0703 15 33 55 to confirm their booking.
    `;
    
    const result = await sendTelegramMessage(message);
    res.json(result);
  } catch (error) {
    console.error('Error processing reservation notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to send order notification
app.post('/send-order-notification', async (req, res) => {
  try {
    const { order } = req.body;
    
    let itemsList = '';
    order.items.forEach(item => {
      itemsList += `\n- ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
    });
    
    const message = `
🛒 New Order Placed!

Order ID: ${order.id}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}
Address: ${order.customerAddress || 'Not provided'}

Items:${itemsList}

Subtotal: $${order.subtotal.toFixed(2)}
Tax: $${order.tax.toFixed(2)}
Total: $${order.total.toFixed(2)}

Order placed at: ${new Date().toLocaleString()}
    `;
    
    const result = await sendTelegramMessage(message);
    res.json(result);
  } catch (error) {
    console.error('Error processing order notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to get subscribed chats (for debugging)
app.get('/subscribed-chats', (req, res) => {
  res.json({ 
    subscribedChats,
    fixedChatId: FIXED_CHAT_ID,
    usingFixedChatId: !!FIXED_CHAT_ID
  });
});

// Endpoint to manually add a chat ID (for testing)
app.post('/add-chat', (req, res) => {
  const { chatId } = req.body;
  if (chatId && !subscribedChats.includes(chatId)) {
    subscribedChats.push(chatId);
    res.json({ success: true, message: `Chat ${chatId} added` });
  } else if (chatId) {
    res.json({ success: true, message: `Chat ${chatId} already exists` });
  } else {
    res.status(400).json({ success: false, error: 'Chat ID is required' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Telegram notification service is running',
    subscribedChats: subscribedChats.length,
    fixedChatId: FIXED_CHAT_ID,
    usingFixedChatId: !!FIXED_CHAT_ID
  });
});

app.listen(PORT, () => {
  console.log(`Telegram notification service running on port ${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/webhook/${TELEGRAM_BOT_TOKEN}`);
  
  if (FIXED_CHAT_ID) {
    console.log(`Using fixed chat ID: ${FIXED_CHAT_ID}`);
  } else {
    console.log('No fixed chat ID set. Message your bot or set TELEGRAM_CHAT_ID in .env file.');
  }
  
  console.log('Cart API endpoints available:');
  console.log(`- GET    /cart/:userId`);
  console.log(`- POST   /cart/:userId/add`);
  console.log(`- POST   /cart/:userId/remove`);
  console.log(`- POST   /cart/:userId/clear`);
  console.log(`- GET    /carts`);
});