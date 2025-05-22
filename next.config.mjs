const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['i.gyazo.com'],
    unoptimized: true,
  },
  env: {
    PROXYCURL_API_KEY: process.env.PROXYCURL_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextConfig;