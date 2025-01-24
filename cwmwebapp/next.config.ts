// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//   module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'assets.example.com',
//         port: '',
//         pathname: '/account123/**',
//         search: '',
//       },
//     ],
//   },
// }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for React apps
  experimental: {
    typedRoutes: true, // Ensure your Next.js version supports this
  },
  webpack(config: any) {
    config.experiments = { ...config.experiments, topLevelAwait: true }; // Enables top-level `await` usage
    return config;
  },
  images: {
    // domains: ["firebasestorage.googleapis.com"], // Firebase Storage domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // Match Firebase Storage URLs
      },
    ],
  },
};

module.exports = nextConfig;
