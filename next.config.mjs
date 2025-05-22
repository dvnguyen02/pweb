/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.gyazo.com'],
  },
  env: {
    PROXYCURL_API_KEY: process.env.PROXYCURL_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextConfig;
