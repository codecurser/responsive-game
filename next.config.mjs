/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure static files are served correctly
  async rewrites() {
    return [
      {
        source: '/game/:mode*',
        destination: '/game/:mode*',
      },
    ];
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
}

export default nextConfig
