/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/:all*(gz)",
        locale: false,
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/gzip",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
