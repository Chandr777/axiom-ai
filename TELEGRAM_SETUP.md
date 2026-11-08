# Telegram notifications for audit requests

The form sends company, website, and contact email to the Vercel serverless function at `/api/telegram`. The function sends a message to one fixed Telegram chat. It does not save submissions.

## Configure the bot

1. Create a bot with Telegram's official `@BotFather` and copy its token.
2. Add the bot to the private group that should receive requests, or open the bot and send it `/start` for a personal chat.
3. Find the destination chat ID using a trusted Telegram bot-management method. Keep the chat private.
4. In Vercel, add these Production environment variables to the `axiom-ai` project:
   - `TELEGRAM_BOT_TOKEN` — bot token
   - `TELEGRAM_CHAT_ID` — destination chat ID
5. Redeploy the production project so the function receives the variables.
6. Submit a real test request from the site and confirm that the private chat receives it.

Never put the bot token in frontend code, a public repository, or a message. If it has already been exposed, revoke it through `@BotFather` and use a new token.
