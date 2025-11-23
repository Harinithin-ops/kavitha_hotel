// Email utility functions
// For production, install: npm install resend
// Or use nodemailer for custom SMTP

type ContactEmailData = {
  name: string
  email: string
  phone?: string
  message?: string
}

type BookingEmailData = {
  name: string
  email: string
  phone?: string
  eventDate?: string
  eventType?: string
  guests?: number
  notes?: string
}

/**
 * Send email notification to admin
 * Replace with your actual email service implementation
 */
export async function sendAdminNotification(data: ContactEmailData | BookingEmailData, type: 'contact' | 'booking') {
  // Admin email - Set this in your environment variables
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hariraj1389@gmail.com'
  
  try {
    const emailHTML = generateEmailHTML(data, type)
    const subject = type === 'contact' ? '💬 New Contact Form Submission' : '🎉 New Booking Inquiry'
    
    // Using Nodemailer with Gmail SMTP
    const nodemailer = require('nodemailer')
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'your-gmail@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
      },
    })

    // Send email
    const info = await transporter.sendMail({
      from: `"Kavitha Hotel" <${process.env.GMAIL_USER || 'noreply@kavithahotel.com'}>`,
      to: ADMIN_EMAIL,
      subject: subject,
      html: emailHTML,
    })

    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('To:', ADMIN_EMAIL)
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email sending error:', error)
    // Still log to console as backup
    console.log('📧 Email data (failed to send):')
    console.log('To:', ADMIN_EMAIL)
    console.log('Type:', type)
    console.log('Data:', data)
    return { success: false, error }
  }
}

/**
 * Generate HTML email template
 */
function generateEmailHTML(data: ContactEmailData | BookingEmailData, type: 'contact' | 'booking'): string {
  const isBooking = type === 'booking'
  const bookingData = isBooking ? data as BookingEmailData : null

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isBooking ? 'New Booking Inquiry' : 'New Contact Form Submission'}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .info-row {
          margin-bottom: 15px;
          padding: 10px;
          background: white;
          border-radius: 5px;
          border-left: 3px solid #10b981;
        }
        .label {
          font-weight: bold;
          color: #059669;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          color: #374151;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: #10b981;
          color: white;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏨 Kavitha Hotel</h1>
        <p style="margin: 10px 0 0 0;">
          ${isBooking ? '🎉 New Booking Inquiry' : '💬 New Contact Message'}
        </p>
      </div>
      
      <div class="content">
        <p>You have received a new ${isBooking ? 'booking inquiry' : 'message'} from your website.</p>
        
        <div class="info-row">
          <span class="label">Name</span>
          <span class="value">${data.name}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Email</span>
          <span class="value"><a href="mailto:${data.email}" style="color: #059669;">${data.email}</a></span>
        </div>
        
        ${data.phone ? `
        <div class="info-row">
          <span class="label">Phone</span>
          <span class="value"><a href="tel:${data.phone}" style="color: #059669;">${data.phone}</a></span>
        </div>
        ` : ''}
        
        ${bookingData ? `
          ${bookingData.eventDate ? `
          <div class="info-row">
            <span class="label">Event Date</span>
            <span class="value">${new Date(bookingData.eventDate).toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          ` : ''}
          
          ${bookingData.eventType ? `
          <div class="info-row">
            <span class="label">Function Type</span>
            <span class="value"><span class="badge">${bookingData.eventType}</span></span>
          </div>
          ` : ''}
          
          ${bookingData.guests ? `
          <div class="info-row">
            <span class="label">Number of Guests</span>
            <span class="value">${bookingData.guests} guests</span>
          </div>
          ` : ''}
        ` : ''}
        
        ${(data as ContactEmailData).message || bookingData?.notes ? `
        <div class="info-row">
          <span class="label">${isBooking ? 'Additional Notes' : 'Message'}</span>
          <span class="value" style="white-space: pre-wrap;">${(data as ContactEmailData).message || bookingData?.notes}</span>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>This email was sent from your website contact form.</p>
          <p>Received at: ${new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'long'
          })}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Send confirmation email to customer (optional)
 */
export async function sendCustomerConfirmation(data: ContactEmailData | BookingEmailData, type: 'contact' | 'booking') {
  try {
    const emailHTML = generateCustomerConfirmationHTML(data, type)
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'your-gmail@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
      },
    })

    const info = await transporter.sendMail({
      from: `"Kavitha Hotel" <${process.env.GMAIL_USER || 'noreply@kavithahotel.com'}>`,
      to: data.email,
      subject: '✅ Thank you for contacting Kavitha Hotel',
      html: emailHTML,
    })

    console.log('✅ Confirmation email sent to customer:', data.email)
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Customer confirmation email error:', error)
    return { success: false, error }
  }
}

function generateCustomerConfirmationHTML(data: ContactEmailData | BookingEmailData, type: 'contact' | 'booking'): string {
  const isBooking = type === 'booking'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .contact-info {
          margin-top: 20px;
          padding: 20px;
          background: white;
          border-radius: 5px;
          border-left: 3px solid #10b981;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏨 Kavitha Hotel</h1>
        <p>Thank you for reaching out!</p>
      </div>
      
      <div class="content">
        <p>Dear ${data.name},</p>
        
        <p>Thank you for your ${isBooking ? 'booking inquiry' : 'message'}. We have received your request and will get back to you shortly.</p>
        
        ${isBooking ? '<p>Our team will review your event requirements and contact you with availability and pricing details.</p>' : ''}
        
        <div class="contact-info">
          <strong>Contact Us:</strong><br>
          Address: 51/1, Thondamuthur Road, Uliyampalayam<br>
          Contact Person: R. Suresh<br>
          Phone: <a href="tel:+919943050088" style="color: #059669;">+91 99430 50088</a>
        </div>
        
        <p style="margin-top: 20px;">Best regards,<br><strong>Kavitha Hotel Team</strong></p>
      </div>
    </body>
    </html>
  `
}
