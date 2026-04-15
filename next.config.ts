import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath for GitHub Pages project site — remove when munreader.com DNS is live
  basePath: "/exodus-ii",
  distDir: "dist",
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow Google Fonts CDN to load (needed for Syncopate, Geist)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
