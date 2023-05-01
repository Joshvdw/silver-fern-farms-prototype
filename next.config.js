/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "export",
  async headers() {
    return [
      {
        source: "/unity-build/gzip/:path*\\.gz",
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
