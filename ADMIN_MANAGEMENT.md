# Admin Management Guide

## Overview
The application now uses a flexible admin management system with an `admin_config` table to manage admin users.

## How to Add/Remove Admins

### Method 1: Direct Database Insert (Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Run the following SQL commands:

```sql
-- Add a new admin
INSERT INTO admin_config (admin_email, role, is_active) 
VALUES ('your-admin-email@domain.com', 'admin', true)
ON CONFLICT (admin_email) DO NOTHING;

-- Remove admin access (set as inactive)
UPDATE admin_config 
SET is_active = false 
WHERE admin_email = 'admin-to-remove@domain.com';

-- List all current admins
SELECT * FROM admin_config ORDER BY created_at DESC;

-- Update admin role
UPDATE admin_config 
SET role = 'super_admin' 
WHERE admin_email = 'your-admin-email@domain.com';
```

### Method 2: Using Admin Panel (Future Enhancement)

Once you're logged in as admin, you can create a simple interface to manage other admins.

## Admin Roles

- **admin**: Can manage products and inspiration gallery
- **super_admin**: Can manage products, inspiration gallery, and other admins

## Default Admin

The system comes with a default admin:
- Email: `admin@example.com`
- Role: `admin`
- Status: Active

You should change this email to your actual admin email after setup.

## How Admin Access Works

1. User logs in through the admin login page
2. System checks if the user's email exists in `admin_config` table
3. If email exists and `is_active = true`, user gets full access
4. If email doesn't exist or `is_active = false`, access is denied

## Security Notes

- Only users listed in `admin_config` with `is_active = true` can access admin features
- The `admin_config` table is only accessible through direct database access
- Consider implementing additional security measures like:
  - Two-factor authentication
  - Session timeout
  - IP whitelisting
  - Activity logging

## Troubleshooting

### Can't Login as Admin
1. Check if user exists in `auth.users` table
2. Check if email exists in `admin_config` with `is_active = true`
3. Verify the SQL query in the RLS policies is working correctly

### Need to Reset Admin Access
If you're locked out, you can always add yourself as admin directly through the SQL Editor:

```sql
-- Emergency admin addition
INSERT INTO admin_config (admin_email, role, is_active) 
VALUES ('your-email@domain.com', 'super_admin', true)
ON CONFLICT (admin_email) DO UPDATE SET is_active = true, role = 'super_admin';
```

## Future Enhancements

Consider adding:
- Admin management UI
- Activity logs
- Role-based permissions for different admin actions
- Admin invitation system
- Password reset for admin users