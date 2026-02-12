import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "blog.ulalaunch.com",
      },
    ],
  },
};

export default nextConfig;
