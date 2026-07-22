import type { MetadataRoute } from "next";
import { getProducts, isConfigured } from "@/lib/shopify";

const SITE_URL = "https://www.eurodesign.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/produtos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/carrinho`, changeFrequency: "monthly", priority: 0.3 },
  ];

  if (!isConfigured()) return staticRoutes;

  try {
    const products = await getProducts({ first: 100 });
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${SITE_URL}/produtos/${p.handle}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
