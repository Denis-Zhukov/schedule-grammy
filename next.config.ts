import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['grammy'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://oauth.telegram.org",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
