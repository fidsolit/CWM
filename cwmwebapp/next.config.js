/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com"],
  },
  // No more `experimental.serverActions`
};

module.exports = nextConfig;
