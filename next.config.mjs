/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // tree-shake big icon / animation / 3D barrels
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
