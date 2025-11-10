-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ceramic_products table (idempotent)
CREATE TABLE IF NOT EXISTS ceramic_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,

  ukuran VARCHAR(100) NOT NULL,
  finish VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  image_url TEXT,
  additional_images TEXT[] DEFAULT '{}',
  tipe VARCHAR(50) CHECK (tipe IN ('Lantai', 'Dinding')),
  area_penggunaan VARCHAR(50) CHECK (area_penggunaan IN ('Indoor', 'Outdoor', 'Both')),
  warna VARCHAR(100),
  merk VARCHAR(100),

  harga DECIMAL(12,2),
  kategori VARCHAR(100)
);

-- Ensure merk column exists for older databases (post-create safety)
ALTER TABLE ceramic_products ADD COLUMN IF NOT EXISTS merk VARCHAR(100);
ALTER TABLE ceramic_products ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Create inspiration_gallery table (idempotent)
CREATE TABLE IF NOT EXISTS inspiration_gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  products_used UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  is_published BOOLEAN DEFAULT false
);

-- Create indexes for better performance (idempotent)
CREATE INDEX IF NOT EXISTS idx_ceramic_products_published ON ceramic_products(is_published);

CREATE INDEX IF NOT EXISTS idx_ceramic_products_nama ON ceramic_products(nama);
CREATE INDEX IF NOT EXISTS idx_ceramic_products_tipe ON ceramic_products(tipe);
CREATE INDEX IF NOT EXISTS idx_ceramic_products_area ON ceramic_products(area_penggunaan);
CREATE INDEX IF NOT EXISTS idx_ceramic_products_warna ON ceramic_products(warna);
CREATE INDEX IF NOT EXISTS idx_ceramic_products_finish ON ceramic_products(finish);
CREATE INDEX IF NOT EXISTS idx_ceramic_products_merk ON ceramic_products(merk);
CREATE INDEX IF NOT EXISTS idx_inspiration_published ON inspiration_gallery(is_published);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
-- Recreate trigger safely (idempotent)
DROP TRIGGER IF EXISTS update_ceramic_products_updated_at ON ceramic_products;
CREATE TRIGGER update_ceramic_products_updated_at 
    BEFORE UPDATE ON ceramic_products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE ceramic_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_gallery ENABLE ROW LEVEL SECURITY;

-- Public read access for published products
DROP POLICY IF EXISTS "Public can view published products" ON ceramic_products;
CREATE POLICY "Public can view published products" ON ceramic_products
    FOR SELECT USING (is_published = true);

-- Public read access for published inspiration gallery
DROP POLICY IF EXISTS "Public can view published inspiration" ON inspiration_gallery;
CREATE POLICY "Public can view published inspiration" ON inspiration_gallery
    FOR SELECT USING (is_published = true);

-- Create admin_config table for flexible admin management
CREATE TABLE IF NOT EXISTS admin_config (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default admin (you can change this email)
INSERT INTO admin_config (admin_email, role, is_active) 
VALUES ('admin@example.com', 'admin', true)
ON CONFLICT (admin_email) DO NOTHING;

-- Admin full access (will be applied to authenticated admin users)
DROP POLICY IF EXISTS "Admin full access to products" ON ceramic_products;
CREATE POLICY "Admin full access to products" ON ceramic_products
    FOR ALL USING (
        auth.uid() IN (
            SELECT au.id 
            FROM auth.users au 
            INNER JOIN admin_config ac ON au.email = ac.admin_email 
            WHERE ac.is_active = true
        )
    );

DROP POLICY IF EXISTS "Admin full access to inspiration" ON inspiration_gallery;
CREATE POLICY "Admin full access to inspiration" ON inspiration_gallery
    FOR ALL USING (
        auth.uid() IN (
            SELECT au.id 
            FROM auth.users au 
            INNER JOIN admin_config ac ON au.email = ac.admin_email 
            WHERE ac.is_active = true
        )
    );

-- Add policy for auth.users table
DROP POLICY IF EXISTS "Allow service role to access users" ON auth.users;
CREATE POLICY "Allow service role to access users" ON auth.users
    FOR SELECT USING (true);

-- Verification queries
DO $$ 
BEGIN
    -- Verify required tables exist
    IF NOT EXISTS (
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('ceramic_products', 'inspiration_gallery', 'admin_config')
    ) THEN
        RAISE EXCEPTION 'Missing required tables. Please check schema creation.';
    END IF;

    -- Verify admin@example.com exists in admin_config
    IF NOT EXISTS (
        SELECT 1 FROM admin_config WHERE admin_email = 'admin@example.com'
    ) THEN
        RAISE EXCEPTION 'Default admin (admin@example.com) not found in admin_config.';
    END IF;
END $$;