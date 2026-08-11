import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/internet-photobooth",
  assetPrefix: "/internet-photobooth/",
};

export default nextConfig;