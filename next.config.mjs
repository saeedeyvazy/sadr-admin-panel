/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: "/admin",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/login',
        basePath: false,
        permanent: false
      },
      {
        source: '/institution',
        destination: '/admin/inst-login',
        basePath: false,
        permanent: false
      },
      {
        source: '/person',
        destination: '/admin/person-login',
        basePath: false,
        permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig