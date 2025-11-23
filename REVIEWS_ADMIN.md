# Customer Reviews - Admin Documentation

## Overview
The Customer Reviews feature allows website visitors to submit reviews with ratings and comments. Only the website host (admin) can delete reviews using password authentication.

## Features

### For Customers:
- ✅ Submit reviews with name, rating (1-5 stars), and comment
- ✅ View all submitted reviews in an interactive grid
- ✅ Real-time form validation
- ✅ Smooth animations and modern UI

### For Admin (Host Only):
- 🔒 Delete inappropriate or spam reviews
- 🔒 Password-protected deletion
- 🔒 Delete button visible on hover over reviews

## Admin Password

### Default Password
The default admin password is: `admin123`

### Changing the Admin Password

**For Production (Recommended):**
1. Create a `.env.local` file in your project root
2. Add the following line:
   ```
   ADMIN_PASSWORD=your_secure_password_here
   ```
3. Restart your development server

**For Development:**
The password is currently set in `/app/api/reviews/route.ts` on line 28:
```typescript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
```

## How to Delete a Review (Admin)

1. Navigate to the "Customer Reviews" section on your website
2. Hover over any review card
3. Click the red trash icon (🗑️) that appears in the top-right corner
4. Enter the admin password in the dialog box
5. Click "Delete Review"

## Security Notes

⚠️ **Important:**
- Never share the admin password publicly
- Always use environment variables for production
- Consider implementing proper user authentication for production use
- The current implementation uses in-memory storage (data resets on server restart)

## Upgrading to Database Storage

For production, you should replace the in-memory storage with a real database:

1. Choose a database (MongoDB, PostgreSQL, Supabase, etc.)
2. Update `/app/api/reviews/route.ts` to use your database
3. Replace the `reviews` array with database queries
4. Add proper indexes for performance

## API Endpoints

- `GET /api/reviews` - Fetch all reviews
- `POST /api/reviews` - Submit a new review
- `DELETE /api/reviews?id={reviewId}&password={adminPassword}` - Delete a review (admin only)

## Customization

You can customize the review section by editing:
- `/components/customer-reviews.tsx` - Main component
- `/app/api/reviews/route.ts` - API logic
- Colors, animations, and styling in the component file

## Support

For issues or questions, check the implementation in:
- Component: `components/customer-reviews.tsx`
- API: `app/api/reviews/route.ts`
- Page: `app/page.tsx`
