# Quick Email Setup for OTP Sending

## 🚀 To Send OTP to Real Email Addresses

Currently, your system shows development OTP because email credentials are not configured. Here's how to fix it:

### Option 1: Automated Setup (Recommended)
```bash
node setup-email.js
```
Follow the prompts to enter your Gmail credentials.

### Option 2: Manual Setup

1. **Get Gmail App Password:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

2. **Update server/.env file:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

3. **Restart your server:**
   ```bash
   # Stop current server (Ctrl+C)
   # Then restart:
   cd server
   npm run dev
   ```

### Option 3: Test Email Service
```bash
cd server
node test-email.js
```
This will test if your email configuration works.

## ✅ After Setup

Once email is configured:
- ✅ OTP will be sent to the entered email address
- ✅ No more development OTP display
- ✅ Professional email template with QuickMart branding
- ✅ Works exactly like Amazon/Swiggy

## 🧪 Test the Flow

1. Go to your frontend registration
2. Enter any valid email address
3. Click "Send OTP"
4. Check your email inbox (and spam folder)
5. Enter the OTP from email
6. Complete registration

## 🔧 Current Status

Your system is configured to:
- Send emails when EMAIL_USER and EMAIL_PASS are set
- Fall back to development mode when email is not configured
- Always store OTP securely in database
- Provide professional user experience

## 📧 Email Template Preview

When configured, users will receive:
```
Subject: Your QuickMart Verification Code

🛒 QuickMart
Fresh Groceries Delivered in Minutes

Verification Code

Hi [Name],

Thank you for registering with QuickMart! Please use the verification code below to complete your registration:

[6-DIGIT OTP]

Important:
• This code will expire in 5 minutes
• Do not share this code with anyone
• If you didn't request this code, please ignore this email
```

## 🚨 Need Help?

If you encounter issues:
1. Check spam/junk folder
2. Verify Gmail app password is correct
3. Ensure 2FA is enabled on Gmail
4. Run `node server/test-email.js` to test
5. Check server console for error messages