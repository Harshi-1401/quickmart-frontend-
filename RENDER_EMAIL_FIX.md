# Fix for Email Sending on Render

We have updated the email service to be more robust and added a debugging endpoint.

## Steps to Fix

1. **Redeploy your Backend**
   - Push these changes to your repository.
   - Wait for Render to finish the deployment.

2. **Check Environment Variables on Render**
   - Go to your Render Dashboard -> Services -> your-backend-service -> Environment.
   - Ensure you have the following variables set:
     - `EMAIL_USER`: Your Gmail address (e.g., `yourname@gmail.com`)
     - `EMAIL_PASS`: Your Gmail **App Password** (not your login password).

3. **If Gmail still fails (Common on Render)**
   - Gmail often blocks data center IPs. It is recommended to use explicit SMTP settings.
   - Add these additional environment variables in Render:
     - `SMTP_HOST`: `smtp.gmail.com`
     - `SMTP_PORT`: `587`
     - `SMTP_SECURE`: `false`
     - `SMTP_USER`: Same as your `EMAIL_USER`
     - `SMTP_PASS`: Same as your `EMAIL_PASS`

## How to Test

We added a new test endpoint to your backend. You can use Postman or curl to test it.

**Endpoint:** `POST /api/setup/test-email`

**Body (JSON):**
```json
{
  "email": "your-personal-email@gmail.com"
}
```

**Example Curl Command:**
```bash
curl -X POST https://your-render-url.onrender.com/api/setup/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

If this returns success, your email system is working!
