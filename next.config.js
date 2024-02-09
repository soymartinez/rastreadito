/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'zlqiphritvynqxdnnzqr.supabase.co',
      },
      {
        hostname: 'rastreadito.vercel.app',
      },
      {
        hostname: 'leafly-public.imgix.net',
      },
      {
        hostname: 'images.leafly.com',
      },
      {
        hostname: 'www.leafly.com',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config
  }
}

module.exports = nextConfig
