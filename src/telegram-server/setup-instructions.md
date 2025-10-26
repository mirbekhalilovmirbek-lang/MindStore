# Telegram Notification Setup Instructions

## Step 1: Get Your Chat ID

1. Open Telegram on your phone or computer
2. Search for your bot (the one with token 8267840967:AAFFfV8bGCqQldyYl-AJazVBhopH1EhX3Eo)
3. Send any message to your bot (like "Hello" or "/start")

## Step 2: Find Your Chat ID

After messaging your bot, run this command to get your chat ID:

```
curl https://api.telegram.org/bot8267840967:AAFFfV8bGCqQldyYl-AJazVBhopH1EhX3Eo/getUpdates
```

Or visit this URL in your browser:
https://api.telegram.org/bot8267840967:AAFFfV8bGCqQldyYl-AJazVBhopH1EhX3Eo/getUpdates

Look for a section like this in the response:
```json
{
  "update_id": 123456789,
  "message": {
    "message_id": 2,
    "from": {
      "id": 1234567890,  <-- This is your chat ID
      "is_bot": false,
      "first_name": "Your Name",
      ...
    },
    "chat": {
      "id": 1234567890,  <-- This is also your chat ID
      ...
    },
    ...
  }
}
```

## Step 3: Configure Your Chat ID

1. Open the `.env` file in the `src/telegram-server/` directory
2. Uncomment the `TELEGRAM_CHAT_ID` line
3. Replace `YOUR_CHAT_ID_HERE` with your actual chat ID
4. Save the file

Your .env file should look like this:
```
TELEGRAM_BOT_TOKEN=8267840967:AAFFfV8bGCqQldyYl-AJazVBhopH1EhX3Eo
PORT=3001
TELEGRAM_CHAT_ID=1234567890
```

## Step 4: Restart the Server

1. Stop the current server (Ctrl+C in the terminal where it's running)
2. Start it again with `node server.js`

## Step 5: Test the Notification

You can test if everything works by running:
```
node test-notification.js
```

Or by making a reservation or placing an order in the MindStore app.

## Alternative Method: Use the Bot Command

Instead of manually getting your chat ID, you can:

1. Message your bot with the command `/start`
2. The bot will reply with your chat ID
3. Add that chat ID to your .env file as described above