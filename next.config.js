/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Enter Your api in API_PROD_URL
    // Enter Your store live url in to FRONT_URL
    API_PROD_URL: "https://apis.vector-x.com/api/",
    FRONT_URL: "http://localhost:3000/",
  },
  images: {
    // domains: ['apis.vector-x.com'],
      domains: ['apis.vector-x.com', 'laravel.pixelstrap.net'],
   },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "127.0.0.1",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "laravel.pixelstrap.net",
  //     },
  //     // Add your api base url object here 
  //   ],
  // },
};

module.exports = nextConfig;
