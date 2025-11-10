# Panduan Setup Supabase untuk Web Katalog Keramik

## Langkah 1: Buat Project di Supabase

1. Kunjungi [https://supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Login atau buat akun baru
4. Klik "New Project"
5. Isi detail project:
   - Organization: Pilih/buat organization
   - Name: `ceramic-catalog` (atau nama lain)
   - Database Password: Buat password yang kuat
   - Region: Pilih Singapore untuk performa terbaik
   - Pricing: Pilih Free tier untuk mulai

## Langkah 2: Dapatkan Kredensial API

Setelah project dibuat:

1. Masuk ke **Dashboard** project Anda
2. Pergi ke **Settings** → **API**
3. Copy kredensial berikut:

   - **URL**: `https://your-project-ref.supabase.co`
   - **anon/public key**: String panjang yang dimulai dengan `ey...`
   - **service_role key**: String panjang (di bagian "Project API keys")

## Langkah 3: Update File Environment

Edit file `.env.local` dan ganti nilai berikut dengan kredensial Anda:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here

# Vercel Build Hook (opsional)
VERCEL_BUILD_HOOK_URL=your_vercel_build_hook_url

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
```

## Langkah 4: Setup Database Schema

1. Masuk ke **SQL Editor** di dashboard Supabase
2. Copy seluruh isi dari file `supabase/schema.sql`
3. Paste dan run SQL script tersebut
4. Script akan membuat:
   - Tabel `ceramic_products` dengan semua kolom termasuk `merk`
   - Index untuk performa
   - Storage bucket untuk gambar

## Langkah 5: Setup Authentication (Penting!)

1. Pergi ke **Authentication** → **Settings**
2. Di bagian "URL Configuration", set:
   - **Site URL**: `http://localhost:3000` (untuk development)
   - **Additional Redirect URLs**: Tambah `http://localhost:3000/admin`

3. Pergi ke **Authentication** → **Users**
4. Klik "Invite User" dan masukkan email admin Anda
5. Set password untuk user admin

## Langkah 6: Test Koneksi

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. Login dengan email dan password admin yang dibuat

## Troubleshooting

### Jika tidak bisa login:
- Pastikan Site URL di Supabase Auth settings sudah benar
- Pastikan kredensial API di `.env.local` sudah benar
- Cek browser console untuk error messages

### Jika database error:
- Pastikan SQL schema sudah di-run di SQL Editor
- Pastikan service_role key memiliki permission yang cukup

## Support

Jika mengalami masalah:
1. Cek documentation: [Supabase Docs](https://supabase.com/docs)
2. Lihat error di browser console
3. Pastikan semua environment variables sudah benar