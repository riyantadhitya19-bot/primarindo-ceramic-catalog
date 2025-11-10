-- Create storage bucket for ceramic photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'foto-keramik',
  'foto-keramik',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Storage RLS Policies for foto-keramik bucket

-- Public can read all files
CREATE POLICY "Public can read ceramic photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'foto-keramik');

-- Only authenticated admin users can upload files
CREATE POLICY "Admin can upload ceramic photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'foto-keramik' AND
        auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com')
    );

-- Only authenticated admin users can update files
CREATE POLICY "Admin can update ceramic photos" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'foto-keramik' AND
        auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com')
    );

-- Only authenticated admin users can delete files
CREATE POLICY "Admin can delete ceramic photos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'foto-keramik' AND
        auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com')
    );