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
}

module.exports = nextConfig
