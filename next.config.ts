import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/villa",
        destination: "/posts/official-united-villa-match-report",
        permanent: true,
      },
      {
        source: "/dorgu",
        destination: "/posts/official-dorgu-player-match",
        permanent: true,
      },
      {
        source: "/maguire",
        destination: "/posts/official-carrick-maguire-injury",
        permanent: true,
      },
      {
        source: "/toone",
        destination: "/posts/official-toone-fifpro-world11",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
