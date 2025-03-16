import type { NextConfig } from "next";

const url = process.env.IMAGEURL!;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [url],
  },
};

export default nextConfig;
