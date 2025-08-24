import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
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

// Add webpack alias to handle missing @sanity/descriptors
if (typeof nextConfig.webpack === 'function') {
  const originalWebpack = nextConfig.webpack;
  nextConfig.webpack = (config, options) => {
    config = originalWebpack(config, options);
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/descriptors': false
    };
    return config;
  };
} else {
  nextConfig.webpack = (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/descriptors': false
    };
    return config;
  };
}
