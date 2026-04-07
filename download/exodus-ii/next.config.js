/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // GitHub Pages: static HTML export
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
