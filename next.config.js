/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media-public.canva.com"],
  },
  experimental: {
    serverActions: true,
  },
};
module.exports = nextConfig;
