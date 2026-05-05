# Booking Notifications (Hybrid with Setmore)

This service keeps Setmore for appointment scheduling but sends patient notifications in Macedonian using your own templates.

## What it does

- Receives booking events from a webhook endpoint.
- Stores appointments in a local JSON file.
- Sends confirmation email and SMS in Macedonian.
- Sends reminder email and SMS before the appointment (default: 24h and 2h).

## Project layout

- src/server.js: Webhook API and confirmation flow.
- src/reminders.js: Scheduler for reminders.
- src/templates.js: Macedonian notification templates.
- src/providers.js: Email and SMS provider adapters.
- src/store.js: Local appointment storage.
- data/appointments.json: Stored appointment records.

## Setup

1. Open terminal in this folder.
2. Install dependencies:

   npm install

3. Copy environment file:

   copy .env.example .env

4. Edit .env and set at least:

   - RESEND_API_KEY
   - EMAIL_FROM
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_FROM

5. Start webhook API:

   npm start

6. In a second terminal, start reminders scheduler:

   npm run reminders

## Configure Setmore webhook

In Setmore dashboard, create a webhook that points to:

- <https://your-domain.com/webhooks/setmore>

If you set WEBHOOK_TOKEN, add request header:

- x-webhook-token: your-token

## Quick local test

Send a sample event manually:

curl -X POST <http://localhost:8787/webhooks/setmore> \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"demo-001\",\"start_at\":\"2026-05-10T10:00:00+02:00\",\"service\":\"Преглед\",\"customer\":{\"name\":\"Иван Петров\",\"email\":\"<patient@example.com>\",\"phone\":\"+38970111222\"},\"status\":\"confirmed\"}"

Then inspect stored records:

- GET <http://localhost:8787/appointments>

## Notes

- This is a practical starter for production use and already supports custom Macedonian templates.
- For production deployment, run behind HTTPS and add monitoring/log retention.
