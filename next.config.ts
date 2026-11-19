import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      // Green Dhaka city landing pages keep their SEO URLs: /solar-company-in-dhaka
      { source: "/solar-company-in-:city", destination: "/solar-company-in/:city" },
    ];
  },
};

export default nextConfig;
