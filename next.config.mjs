/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, 'framer-motion': require.resolve('framer-motion') };
    return config;
  },
  transpilePackages: ['framer-motion']
};
export default nextConfig;
