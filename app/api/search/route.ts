import { NextResponse } from "next/server";
import { getProducts, isConfigured } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isConfigured()) return NextResponse.json([]);
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
  try {
    const products = await getProducts({
      first: 8,
      query: q || undefined,
      sortKey: q ? "RELEVANCE" : "CREATED_AT",
      reverse: !q,
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}
