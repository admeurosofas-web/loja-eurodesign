/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },

  async redirects() {
    return [
      // Tema Shopify antigo → rotas do Next.js
      { source: "/products/:handle", destination: "/produtos/:handle", permanent: true },
      { source: "/products", destination: "/produtos", permanent: true },
      { source: "/collections/all", destination: "/produtos", permanent: true },
      { source: "/collections/frontpage", destination: "/produtos", permanent: true },
      { source: "/collections/:handle", destination: "/produtos?q=:handle", permanent: true },
      { source: "/collections/:handle/products/:product", destination: "/produtos/:product", permanent: true },
      { source: "/cart", destination: "/carrinho", permanent: true },
      { source: "/pages/sobre", destination: "/sobre", permanent: true },
      { source: "/pages/contato", destination: "/contato", permanent: true },
      { source: "/pages/showroom", destination: "/showroom", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
