import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { formats: ["image/avif", "image/webp"], unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/ssemuyabadev/sf_frontend/**" }] } };
export default nextConfig;