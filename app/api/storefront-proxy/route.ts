import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function usable(value: string | undefined): value is string {
  if (!value) return false;
  const normalized = value.trim();
  return Boolean(
    normalized &&
      normalized !== "[SENSITIVE]" &&
      !normalized.includes("sua-loja") &&
      !normalized.includes("seu_storefront_token_aqui"),
  );
}

export async function POST(request: NextRequest) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  const apiVersion = process.env.SHOPIFY_API_VERSION?.trim() || "2025-01";

  if (!usable(domain) || !usable(token)) {
    return NextResponse.json(
      { errors: [{ message: "Storefront da Shopify não configurada no ambiente de produção." }] },
      { status: 503 },
    );
  }

  let payload: { query?: unknown; variables?: unknown };

  try {
    payload = (await request.json()) as { query?: unknown; variables?: unknown };
  } catch {
    return NextResponse.json({ errors: [{ message: "JSON inválido." }] }, { status: 400 });
  }

  if (typeof payload.query !== "string" || payload.query.length > 50_000) {
    return NextResponse.json(
      { errors: [{ message: "Consulta GraphQL inválida." }] },
      { status: 400 },
    );
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: payload.query, variables: payload.variables ?? {} }),
    cache: "no-store",
  });

  const responseBody = await upstream.text();

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/json",
      "Cache-Control": "no-store",
    },
  });
}
