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
});