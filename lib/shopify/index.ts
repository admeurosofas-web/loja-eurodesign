import type { Cart, Product } from "./types";
import {
  ADD_TO_CART,
  CREATE_CART,
  GET_CART,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS,
  REMOVE_CART_LINES,
  UPDATE_CART_LINES,
} from "./queries";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export function isConfigured(): boolean {
  return Boolean(domain && token && !domain.includes("sua-loja"));
}

type GraphQLResponse<T> = { data: T; errors?: { message: string }[] };

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  cache: RequestCache = "force-cache",
): Promise<T> {
  if (!isConfigured()) {
    throw new Error(
      "Shopify não configurado. Preencha SHOPIFY_STORE_DOMAIN e SHOPIFY_STOREFRONT_ACCESS_TOKEN em .env.local",
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  return json.data;
}

/* ---------- normalização (flatten das edges) ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeProduct(node: any): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    availableForSale: node.availableForSale,
    featuredImage: node.featuredImage ?? null,
    images: (node.images?.edges ?? []).map((e: any) => e.node),
    priceRange: node.priceRange,
    options: node.options ?? [],
    variants: (node.variants?.edges ?? []).map((e: any) => e.node),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeCart(node: any): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity,
    cost: node.cost,
    lines: (node.lines?.edges ?? []).map((e: any) => e.node),
  };
}

/* ---------- produtos ---------- */

export async function getProducts(opts?: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { edges: { node: unknown }[] } }>(GET_PRODUCTS, {
    first: opts?.first ?? 24,
    query: opts?.query,
    sortKey: opts?.sortKey ?? "CREATED_AT",
    reverse: opts?.reverse ?? true,
  });
  return data.products.edges.map((e) => reshapeProduct(e.node));
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: unknown | null }>(GET_PRODUCT_BY_HANDLE, { handle });
  return data.product ? reshapeProduct(data.product) : null;
}

/* ---------- carrinho ---------- */

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: unknown | null }>(GET_CART, { id: cartId }, "no-store");
  return data.cart ? reshapeCart(data.cart) : null;
}

export async function createCart(merchandiseId: string, quantity = 1): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(
    CREATE_CART,
    { lines: [{ merchandiseId, quantity }] },
    "no-store",
  );
  return reshapeCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, merchandiseId: string, quantity = 1): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(
    ADD_TO_CART,
    { cartId, lines: [{ merchandiseId, quantity }] },
    "no-store",
  );
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>(
    UPDATE_CART_LINES,
    { cartId, lines: [{ id: lineId, quantity }] },
    "no-store",
  );
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(
    REMOVE_CART_LINES,
    { cartId, lineIds: [lineId] },
    "no-store",
  );
  return reshapeCart(data.cartLinesRemove.cart);
}

/* ---------- util ---------- */

export function formatBRL(amount: string | number, currency = "BRL"): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}
