import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media*.giphy.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
