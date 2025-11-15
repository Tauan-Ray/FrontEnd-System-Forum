import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'objectstorage.sa-saopaulo-1.oraclecloud.com' }]
  }
};

export default nextConfig;
