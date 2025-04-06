/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Disable server-side image optimization in production
  images: {
    unoptimized: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
