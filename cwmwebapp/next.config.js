/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
