/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["cdn.weatherapi.com"],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: *.vercel.app cdn.weatherapi.com; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
