
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8090',
            pathname: '/api/files/hooimef6b6yqbd5/**',
          },
          {
            protocol: 'https',
            hostname: 'poll-pulse.pockethost.io',
            port: '',
            pathname: '/api/files/hooimef6b6yqbd5/**',
          },
        ],
      },
};

export default nextConfig;
