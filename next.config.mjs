/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    dynamicIO: true,
  },
  staticPageGenerationTimeout: 120, // increased from 60 to 120 seconds
};

export default nextConfig;
