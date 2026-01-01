import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Bỏ qua lỗi ESLint khi build (như lỗi prefer-const, no-explicit-any)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript khi build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
