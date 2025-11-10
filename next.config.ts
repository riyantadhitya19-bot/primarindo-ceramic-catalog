import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // During development, type errors won't fail the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // During development, eslint errors won't fail the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
