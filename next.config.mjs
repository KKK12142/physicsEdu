/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    // markdown editor를 위한 설정 추가
    config.externals = [...(config.externals || []), "canvas", "jsdom"];

    return config;
  },
  // 보안 정책 설정 추가
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
