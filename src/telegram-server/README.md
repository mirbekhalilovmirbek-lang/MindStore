# Telegram Notification Service

This service sends notifications to a Telegram bot when orders are placed or reservations are made in the MindStore application.

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

- `POST /send-reservation-notification` - Send reservation notification
- `POST /send-order-notification` - Send order notification
- `POST /webhook/:token` - Telegram webhook endpoint
- `GET /health` - Health check endpoint

## How It Works

1. When a user makes a reservation or places an order in the MindStore app, a notification is sent to this service
2. The service formats the notification message
3. The message is sent to all subscribed Telegram chats

## Security Note

For production use:
- Store chat IDs in a database rather than in memory
- Implement proper authentication for the notification endpoints
- Use HTTPS for all communication
- Regularly rotate your bot token