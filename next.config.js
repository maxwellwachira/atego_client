/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['mygrannyslove.com', 'localhost', 'luddoc-institute.com', 'backend.luddoc-institute.com'],
  }
}

module.exports = nextConfig
