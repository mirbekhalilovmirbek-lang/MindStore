const fs = require('fs');
const path = require('path');

// Function to set chat ID in .env file
function setChatId(chatId) {
  const envPath = path.join(__dirname, '.env');
  
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if TELEGRAM_CHAT_ID is already set
  if (envContent.includes('TELEGRAM_CHAT_ID=')) {
    // Update existing line
    envContent = envContent.replace(/TELEGRAM_CHAT_ID=.*/, `TELEGRAM_CHAT_ID=${chatId}`);
  } else {
    // Add new line
    envContent += `\nTELEGRAM_CHAT_ID=${chatId}`;
  }
  
  // Write back to file
  fs.writeFileSync(envPath, envContent);
  
  console.log(`Chat ID ${chatId} has been set in .env file.`);
  console.log('Please restart the Telegram notification server for changes to take effect.');
}

// Get chat ID from command line arguments
const chatId = process.argv[2];

if (!chatId) {
  console.log('Usage: node set-chat-id.js <your_chat_id>');
  console.log('Example: node set-chat-id.js 1234567890');
  process.exit(1);
}

// Validate chat ID (should be numeric)
if (!/^\d+$/.test(chatId)) {
  console.log('Error: Chat ID should be a numeric value.');
  process.exit(1);
}

setChatId(chatId);