# Telegram Notification Service

This service sends notifications to a Telegram bot when orders are placed or reservations are made in the MindStore application. It also provides a cart API for managing shopping carts.

## Setup Instructions

1. **Get your Chat ID**:
   - Message your bot on Telegram
   - Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response
   - Add it to the `subscribedChats` array in `server.js`

2. **Environment Variables**:
   - The bot token is stored in the `.env` file
   - Make sure to keep this file secure and don't commit it to version control

3. **Starting the Service**:
   ```bash
   cd src/telegram-server
   npm install
   node server.js
   ```

## Endpoints

### Notification Endpoints
- `POST /send-reservation-notification` - Send reservation notification
- `POST /send-order-notification` - Send order notification
- `POST /webhook/:token` - Telegram webhook endpoint
- `GET /health` - Health check endpoint

### Cart Endpoints
- `GET /cart/:userId` - Get cart for a specific user
- `POST /cart/:userId/add` - Add item to user's cart
- `POST /cart/:userId/remove` - Remove item from user's cart
- `POST /cart/:userId/clear` - Clear user's cart
- `GET /carts` - Get all carts (admin/debugging)

### Telegram Commands
- `/start` - Welcome message and chat ID information
- `/cart` - View current cart contents

## How It Works

1. When a user makes a reservation or places an order in the MindStore app, a notification is sent to this service
2. The service formats the notification message
3. The message is sent to all subscribed Telegram chats
4. Users can also manage their shopping carts through the API or Telegram commands

## Cart API Usage

### Add Item to Cart
```bash
POST /cart/user123/add
Content-Type: application/json

{
  "item": {
    "id": "item1",
    "title": "Course Title",
    "price": 29.99,
    "quantity": 2
  }
}
```

### Remove Item from Cart
```bash
POST /cart/user123/remove
Content-Type: application/json

{
  "itemId": "item1"
}
```

### Get Cart
```bash
GET /cart/user123
```

## Security Note

For production use:
- Store chat IDs in a database rather than in memory
- Implement proper authentication for the notification endpoints
- Use HTTPS for all communication
- Regularly rotate your bot token