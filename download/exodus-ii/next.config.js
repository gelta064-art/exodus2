/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages compatible output
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
