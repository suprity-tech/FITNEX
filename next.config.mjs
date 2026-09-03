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
  staticPageGenerationTimeout: 60,
}

export default nextConfig
