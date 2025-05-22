const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Add these lines for proper asset loading
  assetPrefix: isProd ? '' : '',
  basePath: '',
  images: {
    domains: ['i.gyazo.com'],
    unoptimized: true,
  },
  env: {
    PROXYCURL_API_KEY: process.env.PROXYCURL_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  // Also add this to ensure proper static file serving
  //output: 'export',
};

export default nextConfig;