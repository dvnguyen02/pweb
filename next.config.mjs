const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // output: isProd ? 'export' : undefined, // REMOVE or COMMENT THIS LINE
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['i.gyazo.com'],
    unoptimized: true,
  },
  assetPrefix: isProd ? '' : '',
  basePath: isProd ? '' : '',
  env: {
    PROXYCURL_API_KEY: process.env.PROXYCURL_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextConfig;