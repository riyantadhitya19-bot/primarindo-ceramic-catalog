# Ceramic Catalog Website

A modern, responsive ceramic product catalog built with Next.js 15, TypeScript, and Supabase. Features include product browsing, admin panel, inspiration gallery, and WhatsApp integration.

## 🚀 Features

- **Product Catalog**: Browse ceramic products with search and filtering
- **Admin Panel**: Manage products with authentication (demo: admin@example.com / admin123)
- **Inspiration Gallery**: Showcase design inspirations
- **Favorites**: Save products to wishlist
- **WhatsApp Integration**: Direct inquiry via WhatsApp
- **Responsive Design**: Works on all devices
- **Mock Data Support**: Works out-of-the-box without database setup

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

## 📦 Quick Start

### Option 1: Demo Mode (No Database Required)
The website works immediately with mock data:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the catalog with sample data.

### Option 2: Production Mode (With Supabase)
1. Set up Supabase project and database
2. Configure environment variables in `.env.local`
3. Run development server

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Admin Panel

- **URL**: `/admin`
- **Demo Credentials**:
  - Email: `admin@example.com`
  - Password: `admin123`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy!

### Manual Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
ceramic-catalog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   ├── favorit/           # Favorites page
│   │   ├── inspirasi/         # Inspiration gallery
│   │   ├── tentang/           # About page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ProductGrid.tsx    # Product listing
│   │   ├── ProductCard.tsx    # Product card
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Site footer
│   ├── lib/                   # Utilities and configurations
│   │   ├── supabase.ts        # Supabase client
│   │   └── supabase-mock.ts   # Mock data for demo
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── DEPLOYMENT.md              # Detailed deployment guide
└── vercel.json               # Vercel configuration
```

## 🎨 Customization

- **Colors**: Modify Tailwind CSS classes in components
- **Products**: Update mock data in `src/lib/supabase-mock.ts` or use Supabase
- **Branding**: Update `src/app/layout.tsx` and components
- **Content**: Modify pages in `src/app/`

## 📞 Support

For issues and questions:
- Check browser console for errors
- Review server logs
- Ensure environment variables are configured
- Verify Supabase connection

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
