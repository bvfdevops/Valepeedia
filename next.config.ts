import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio (/studio) aún no es totalmente compatible con el doble-render
  // de Strict Mode bajo React 19.2, lo que provoca un error de useMemo en dev.
  // Strict Mode no corre en producción, así que esto no afecta el build final.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
