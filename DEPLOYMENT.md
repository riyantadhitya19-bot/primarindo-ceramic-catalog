# Ceramic Catalog - Deployment Guide

## Overview
This ceramic catalog website is built with Next.js 15, TypeScript, and Supabase. It includes a public product catalog, admin panel, and inspiration gallery.

## Features
- ✅ Product catalog with search and filtering
- ✅ Admin panel for product management
- ✅ Inspiration gallery
- ✅ Favorites/wishlist functionality
- ✅ WhatsApp integration for inquiries
- ✅ Responsive design
- ✅ Mock data support for demonstration

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Vercel account (for deployment)
- Supabase account (for production database)

## Local Development

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ceramic-catalog
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

#### Option A: Using Mock Data (No Supabase Required)
The website works out-of-the-box with mock data for demonstration purposes. Simply run:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the catalog with sample data.

#### Option B: With Real Supabase (Production)
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a new database with the following tables:

**ceramic_products table:**
```sql
CREATE TABLE ceramic_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  kode_produk TEXT NOT NULL,
  ukuran TEXT,
  finish TEXT,
  tipe TEXT,
  area_penggunaan TEXT,
  warna TEXT,
  harga_per_dus DECIMAL(10,2),
  is_published BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**inspirations table:**
```sql
CREATE TABLE inspirations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Set up environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
VERCEL_BUILD_HOOK_URL=your_vercel_build_hook
```

4. Run the development server:
```bash
npm run dev
```

## Deployment to Vercel

### Quick Deploy (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Manual Deploy
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes (for production) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes (for production) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes (for production) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for inquiries | No |
| `VERCEL_BUILD_HOOK_URL` | Vercel build hook for Supabase triggers | No |

## Admin Panel
- URL: `/admin`
- Demo credentials: 
  - Email: `admin@example.com`
  - Password: `admin123`

## Supabase Webhook Setup (Optional)
To automatically rebuild your site when data changes:

1. Create a Vercel build hook in your project settings
2. Add the webhook URL to your Supabase database triggers
3. The site will automatically rebuild when products are added/updated

## Troubleshooting

### Common Issues

1. **"Invalid supabaseUrl" error**
   - Ensure your Supabase URL starts with `https://`
   - Check that all environment variables are properly set

2. **Images not loading**
   - Verify image domains are configured in `next.config.ts`
   - Check that image URLs are accessible

3. **Admin panel not working**
   - Ensure you're using the correct credentials
   - Check browser console for authentication errors

### Mock Data Mode
If you see "Using mock Supabase data for demonstration" in the console, it means the app is running in demo mode with sample data. This is perfect for:
- Development and testing
- Client demonstrations
- Portfolio showcases

## Support
For issues or questions, please check:
- Console logs for error messages
- Network tab for API requests
- Supabase dashboard for database issues

## Next Steps
1. Set up your Supabase project with real data
2. Configure environment variables
3. Deploy to Vercel
4. Set up webhook for automatic rebuilds
5. Customize the design and content for your brand