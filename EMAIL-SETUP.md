# Email Configuration Guide for QuickMart OTP System

## Overview
QuickMart now uses a production-ready OTP system that sends verification codes via email instead of displaying them in the UI.

## Features
- ✅ Secure OTP storage with automatic expiry (5 minutes)
- ✅ Email delivery using Nodemailer
- ✅ Professional email templates
- ✅ Development mode console logging
- ✅ Production mode email-only delivery
- ✅ Resend OTP functionality
- ✅ Input validation and error handling

## Email Service Setup

### Option 1: Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update server/.env**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Option 2: Other SMTP Providers

Update `server/services/emailService.js` to use custom SMTP:

```javascript
this.transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

Add to `server/.env`:
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Popular SMTP Providers:
- **SendGrid**: smtp.sendgrid.net:587
- **Mailgun**: smtp.mailgun.org:587
- **AWS SES**: email-smtp.region.amazonaws.com:587
- **Outlook**: smtp-mail.outlook.com:587

## Testing Email Service

Run the test script:
```bash
cd server
node test-email.js
```

## Environment Configuration

### Development Mode
- OTP logged to console
- OTP also returned in API response (for testing)
- Email sending optional

### Production Mode
- OTP only sent via email
- No console logging of OTP
- No OTP in API response
- Email sending required

## Security Features

1. **Secure Storage**: OTPs stored in MongoDB with TTL index
2. **Automatic Expiry**: 5-minute expiration with automatic cleanup
3. **One-time Use**: OTPs marked as verified after use
4. **Input Validation**: Email and phone format validation
5. **Rate Limiting**: Previous OTPs deleted when new ones are requested

## API Endpoints

### Send OTP
```
POST /api/auth/send-otp
Body: { email, phone }
Response: { message, success, developmentOTP? }
```

### Resend OTP
```
POST /api/auth/resend-otp
Body: { email, phone }
Response: { message, success, developmentOTP? }
```

### Verify OTP
```
POST /api/auth/verify-otp
Body: { email, phone, otp }
Response: { message, verified }
```

### Complete Registration
```
POST /api/auth/register
Body: { email, phone, otp, name, gender, address, password }
Response: { token, user }
```

## Frontend Changes

- OTP display removed in production
- "OTP sent successfully. Please check your email." message
- Resend OTP button added
- Development OTP only shown in development mode

## Deployment Checklist

1. ✅ Set `NODE_ENV=production`
2. ✅ Configure email credentials
3. ✅ Test email service
4. ✅ Verify OTP flow end-to-end
5. ✅ Check email templates render correctly

## Troubleshooting

### Email Not Sending
1. Check email credentials in `.env`
2. Verify SMTP settings
3. Check firewall/network restrictions
4. Test with `node test-email.js`

### OTP Not Received
1. Check spam/junk folder
2. Verify email address format
3. Check email service logs
4. Test with different email provider

### Development Issues
1. OTP visible in console logs
2. Check `NODE_ENV` setting
3. Verify API endpoints

## Email Template Customization

Edit `server/services/emailService.js` to customize:
- Email subject
- HTML template
- Sender name
- Styling

## Security Best Practices

1. Use environment variables for credentials
2. Enable 2FA on email accounts
3. Use app passwords instead of account passwords
4. Monitor email sending logs
5. Implement rate limiting for OTP requests
6. Use HTTPS for all API calls

## Support

For issues with email configuration:
1. Check server logs
2. Run email test script
3. Verify environment variables
4. Test with different email providers