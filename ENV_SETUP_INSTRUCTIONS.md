# Environment Setup - IMPORTANT

## Admin Email Configured ✅

The admin email has been set to: **hariraj1389@gmail.com**

All form submissions (Contact Form & Booking Form) will send notifications to this email.

## Create .env.local File

Create a file named `.env.local` in the root directory of your project with this content:

```env
# Admin Email Configuration
ADMIN_EMAIL=hariraj1389@gmail.com

# Email Service API Key (add when ready to send actual emails)
# Uncomment and add your Resend API key:
# RESEND_API_KEY=re_your_key_here
```

## Steps to Create .env.local:

1. In the project root folder `f:\ertyu\hotel\kavitha-hotel (1)\`
2. Create a new file named `.env.local` (note the dot at the start)
3. Copy the content above into the file
4. Save the file

**Note:** This file is automatically ignored by Git for security (already in .gitignore)

## Current Status

✅ **Admin email configured:** hariraj1389@gmail.com  
⏳ **Email sending:** Currently logs to console (test mode)  
📧 **To enable actual emails:** Follow the setup in `EMAIL_SETUP.md`

## Quick Test

1. Submit any form on the website
2. Check your terminal/console
3. Look for: `To: hariraj1389@gmail.com`
4. You'll see all the data that will be emailed

## Next Steps to Send Real Emails

1. **Sign up for Resend:** https://resend.com (free tier: 100 emails/day)
2. **Get API key** from Resend dashboard
3. **Install package:** `npm install resend`
4. **Add API key** to `.env.local` file
5. **Uncomment code** in `lib/email.ts` (Option 1)
6. **Restart server:** `npm run dev`

That's it! Emails will be sent to **hariraj1389@gmail.com**! 🚀
