/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      'zlqiphritvynqxdnnzqr.supabase.co',
      'rastreadito.vercel.app',
      'leafly-public.imgix.net',
      'images.leafly.com',
      'www.leafly.com',
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  }
}

module.exports = nextConfig
