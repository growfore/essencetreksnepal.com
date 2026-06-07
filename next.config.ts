import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add this:
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.essencetreksnepal.com/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination:
          "https://api.essencetreksnepal.com/api/v1/uploads/:path*",
      },
    ];
  },
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.growfore.com",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.summitluxurytreks.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.essencetreksnepal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "essence-api.growfore.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
