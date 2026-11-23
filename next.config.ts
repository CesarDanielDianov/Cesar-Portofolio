import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Old route names, kept so previously shared links keep working.
  async redirects() {
    return [
      { source: "/contacts", destination: "/experience", permanent: true },
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/CV-C%C3%A9sarDianov.pdf", destination: "/cesar-dianov-cv.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
