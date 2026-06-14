import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is for production builds only. Enabling it in dev causes
  // false "missing generateStaticParams" errors during HMR/Fast Refresh.
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
