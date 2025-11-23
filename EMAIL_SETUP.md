# Email Setup Instructions

## Overview
The contact forms and booking inquiries now automatically send email notifications to the admin.

## Current Status
✅ **Email functionality is configured** - The system will now:
- Send email notifications to admin when users submit contact or booking forms
- Send confirmation emails to customers (optional)
- Log all submissions to console for testing

## Email Information Sent to Admin

### From Contact Form:
- Customer Name
- Customer Email
- Customer Phone (if provided)
- Message

### From Booking/Event Form:
- Customer Name
- Customer Email  
- Customer Phone (if provided)
- Event Date
- Function Type (Wedding, Birthday, Corporate, Festival, Other)
- Number of Guests
- Additional Notes

## Setup Production Email Service

Currently, emails are logged to the console. To enable actual email sending:

### Option 1: Using Resend (Recommended)

1. Install Resend:
   ```bash
   npm install resend
   ```

2. Get API key from https://resend.com

3. Create `.env.local` file in project root:
   ```env
   ADMIN_EMAIL=your-admin-email@example.com
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

4. Uncomment the Resend code in `lib/email.ts` (lines marked with "Option 1")

### Option 2: Using Nodemailer (SMTP)

1. Install nodemailer:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. Add to `.env.local`:
   ```env
   ADMIN_EMAIL=your-admin-email@example.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

3. Update `lib/email.ts` to use nodemailer

### Option 3: Using SendGrid

1. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```

2. Add to `.env.local`:
   ```env
   ADMIN_EMAIL=your-admin-email@example.com
   SENDGRID_API_KEY=SG.xxxxxxxxxxxx
   ```

3. Update `lib/email.ts` to use SendGrid

## Email Templates

Beautiful HTML email templates are already created with:
- Gradient header with hotel branding
- Clean, organized information display
- Color-coded sections
- Mobile-responsive design
- Professional styling

## Testing

To test email sending:

1. Fill out the contact form or booking form on the website
2. Check the terminal/console for email logs
3. Once production email service is configured, check the admin inbox

## Recommended Setup

For Kavitha Hotel, we recommend using **Resend** because:
- ✅ Easy to set up
- ✅ Reliable delivery
- ✅ Good free tier (100 emails/day)
- ✅ Built for Next.js
- ✅ No server configuration needed

## Support

If you need help setting up email service, please refer to:
- Resend Docs: https://resend.com/docs
- Nodemailer Docs: https://nodemailer.com
- SendGrid Docs: https://docs.sendgrid.com

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` or `.env` files to Git
- Keep your API keys secret
- Use environment variables for all sensitive data
- The `.env.local` file is already in `.gitignore`
