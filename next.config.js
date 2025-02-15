/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['m2.test'],
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
        hostname: 'm2.test',
        port: '',
        pathname: '',
      },
    ],
  }
}