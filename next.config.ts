import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["localhost"],
    }
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [{ hostname: 'objectstorage.sa-saopaulo-1.oraclecloud.com' }, { hostname: 'localhost' }, { hostname: 'api.devtalk.com.br' }]
  }
};

export default nextConfig;
