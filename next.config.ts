import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["localhost"],
    }
  },
  images: {
    remotePatterns: [{ hostname: 'objectstorage.sa-saopaulo-1.oraclecloud.com' }, { hostname: 'localhost' }]
  }
};

export default nextConfig;
