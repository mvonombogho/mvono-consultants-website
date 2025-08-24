/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
  webpack: (config) => {
    // Simple module resolution fix without require
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false }
    });
    return config;
  },
  transpilePackages: ['framer-motion'],
  images: { domains: ['cdn.sanity.io'] }
};

export default nextConfig;
