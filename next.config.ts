import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      {protocol:'https', hostname:'picsum.photos', pathname:'/**'}
    ]
  }
};

export default nextConfig;
