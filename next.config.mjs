/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ayansh-cms-uhkm.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;