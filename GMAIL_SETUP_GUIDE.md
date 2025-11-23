# 📧 Gmail Email Setup Guide

## ✅ Nodemailer Installed!

The email system is now configured to send real emails using Gmail SMTP.

## 🔐 Setup Gmail App Password (Required)

To send emails, you need to create a Gmail App Password:

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA (if not already enabled)

### Step 2: Create App Password

1. After enabling 2FA, go back to **Security**
2. Under "How you sign in to Google", click **App passwords**
   - Or go directly to: https://myaccount.google.com/apppasswords
3. Click **Select app** → Choose **Mail**
4. Click **Select device** → Choose **Other (Custom name)**
5. Type: **Kavitha Hotel Website**
6. Click **Generate**
7. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 3: Create .env.local File

Create a file named `.env.local` in your project root:

```
f:\ertyu\hotel\kavitha-hotel (1)\.env.local
```

Add this content:

```env
# Admin Email (where notifications will be sent)
ADMIN_EMAIL=hariraj1389@gmail.com

# Gmail Account (can be same as admin or different)
GMAIL_USER=hariraj1389@gmail.com

# Gmail App Password (16 characters, no spaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Replace `abcdefghijklmnop` with your actual 16-character app password!**

### Step 4: Restart Server

```bash
# Stop the current server (press Ctrl+C in terminal)
# Then restart:
npm run dev
```

## 🧪 Test Email Sending

1. Go to your website: http://localhost:3001
2. Fill out the **Contact Form** or **Booking Form**
3. Click Submit
4. Check your terminal for:
   ```
   ✅ Email sent successfully!
   Message ID: <some-id>
   To: hariraj1389@gmail.com
   ```
5. **Check your inbox** at hariraj1389@gmail.com!

## 📧 Email Details

**From:** Kavitha Hotel <hariraj1389@gmail.com>  
**To:** hariraj1389@gmail.com  
**Subject:**
- 💬 New Contact Form Submission (from Contact page)
- 🎉 New Booking Inquiry (from Booking page)

## ⚠️ Important Notes

### Security:
- ✅ Never share your App Password
- ✅ Never commit `.env.local` to Git (already in .gitignore)
- ✅ Keep your App Password secret
- ✅ You can revoke/recreate App Passwords anytime

### Gmail Limits:
- **Free Gmail:** 500 emails per day
- **Google Workspace:** 2,000 emails per day
- This is more than enough for a hotel website!

### If Email Doesn't Work:

1. **Check .env.local exists** in project root
2. **Verify App Password** (16 characters, no spaces)
3. **Check 2FA is enabled** on Gmail account
4. **Look at terminal errors** for clues
5. **Try generating a new App Password**

## 🎯 Current Configuration

✅ **Nodemailer installed**  
✅ **Admin email:** hariraj1389@gmail.com  
✅ **Gmail SMTP configured**  
⏳ **Needs:** Gmail App Password in `.env.local`

## 🆘 Troubleshooting

### "Invalid login credentials"
- Your App Password is wrong or not set
- Make sure 2FA is enabled
- Generate a new App Password

### "Missing credentials"
- `.env.local` file doesn't exist or is in wrong location
- Should be in: `f:\ertyu\hotel\kavitha-hotel (1)\.env.local`

### "Authentication failed"
- App Password has spaces (remove them)
- Using regular password instead of App Password
- 2FA not enabled on Gmail

### Email not arriving
- Check spam/junk folder
- Verify ADMIN_EMAIL is correct
- Check terminal for success message

## 📝 Quick Setup Checklist

- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate Gmail App Password
- [ ] Create `.env.local` file in project root
- [ ] Add `ADMIN_EMAIL=hariraj1389@gmail.com`
- [ ] Add `GMAIL_USER=hariraj1389@gmail.com`
- [ ] Add `GMAIL_APP_PASSWORD=your-16-char-password`
- [ ] Restart server (`npm run dev`)
- [ ] Test by submitting a form
- [ ] Check hariraj1389@gmail.com inbox

## 🎉 You're Done!

Once the App Password is set up, all form submissions will automatically send beautiful HTML emails to **hariraj1389@gmail.com**!

---

Need help? The error messages in the terminal will guide you!
