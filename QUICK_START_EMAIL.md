# 🚀 Quick Start - Enable Email Sending

## ✅ What's Done:
- Nodemailer installed ✅
- Email code configured ✅  
- Admin email set to: **hariraj1389@gmail.com** ✅

## ⚠️ What You Need to Do:

### Create `.env.local` file NOW:

1. **Create file** in project root: `f:\ertyu\hotel\kavitha-hotel (1)\.env.local`

2. **Add this content:**
```env
ADMIN_EMAIL=hariraj1389@gmail.com
GMAIL_USER=hariraj1389@gmail.com
GMAIL_APP_PASSWORD=your-16-character-password-here
```

3. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2-Factor Authentication first (if not enabled)
   - Create App Password for "Mail"
   - Copy the 16-character password
   - Paste it in `.env.local` (no spaces!)

4. **Restart server:**
```bash
# Press Ctrl+C in terminal
npm run dev
```

5. **Test it:**
   - Go to website
   - Submit a form
   - Check **hariraj1389@gmail.com** inbox!

## 📖 Full Instructions:
See `GMAIL_SETUP_GUIDE.md` for detailed step-by-step guide.

## 🎯 That's It!
Once you add the Gmail App Password, emails will be sent automatically! 🎉
