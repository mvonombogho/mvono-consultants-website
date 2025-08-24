import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = { 
      ...config.resolve.alias, 
      'framer-motion': require.resolve('framer-motion') 
    };
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
