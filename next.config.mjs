/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false, // Hindari native module canvas masuk ke bundle
    };
    return config;
  },
};

export default nextConfig;
