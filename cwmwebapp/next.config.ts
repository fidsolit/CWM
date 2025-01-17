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
  experimental: {
    appDir: true, // Enables the new app directory structure
    serverComponentsExternalPackages: ["mongoose"], // Allows using "mongoose" in server components
    typedRoutes: true, // Experimental feature for typed routes
  },
  webpack(config: any) {
    config.experiments = { ...config.experiments, topLevelAwait: true }; // Enables top-level `await` in modules
    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add Firebase Storage domain to allow optimized image loading
    remotePatterns: [
      {
        protocol: "https", // Protocol used by Firebase Storage
        hostname: "firebasestorage.googleapis.com", // Hostname of Firebase Storage
        port: "", // Leave empty (Firebase doesn't use custom ports)
        pathname: "/v0/b/**", // Match Firebase Storage path format
      },
    ],
  },
};

module.exports = nextConfig;
