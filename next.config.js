/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['magento.test'],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'readymadeui.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'magento.test/',
        port: '',
        pathname: '/.*/**',
      },
    ],
  }
}