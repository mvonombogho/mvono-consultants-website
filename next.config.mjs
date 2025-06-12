<<<<<<< HEAD
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'cdn.sanity.io'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    styledComponents: true,
  },
  
  // Enable public directory for static assets
  // This ensures favicon.ico is read from public/ rather than app/
  assetPrefix: '',

  // Add this to disable the app router's automatic favicon processing
  webpack: (config, { isServer }) => {
    // Add a rule to handle favicon_io properly
    config.module.rules.push({
      test: /\.(ico|png|webmanifest)$/,
      issuer: /\.(js|ts)x?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/images/',
          outputPath: 'static/images/'
        }
      }]
    });

    // Disable the standard favicon handling rules that might cause issues
    const rules = config.module.rules;
    
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].oneOf) {
        for (let j = 0; j < rules[i].oneOf.length; j++) {
          const rule = rules[i].oneOf[j];
          if (rule.test && 
              (rule.test.toString().includes('favicon') || 
               rule.test.toString().includes('icon') || 
               rule.test.toString().includes('metadata'))) {
            // Remove the rule
            rules[i].oneOf.splice(j, 1);
            j--; // Adjust index after splice
          }
        }
      }
    }
    
    return config;
  }
};

export default nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
