/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/unnati',
  assetPrefix: '/unnati/',
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig