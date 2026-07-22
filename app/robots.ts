import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eurodesign.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/carrinho" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
