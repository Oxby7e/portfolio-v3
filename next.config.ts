import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/ask": [
      "./bin/opencode",
      "./node_modules/opencode-ai/**/*",
      "./node_modules/opencode-linux-*/**/*",
    ],
  },
};

export default nextConfig;
