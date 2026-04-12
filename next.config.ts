import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Bism - The Sovereign Policy */
  typescript: {
    ignoreBuildErrors: true, // Don't let the "bones" stop the flight
  },
  eslint: {
    ignoreDuringBuilds: true, // Posture is for the Wiz, not the machine
  },
  // If you have a headers section, we need to adjust the CSP
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
};

export default nextConfig;
