"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
} from "./shopify";
import type { Cart } from "./shopify/types";

const CART_COOKIE = "eurodesign_cart_id";

export async function getCurrentCart(): Promise<Cart | null> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}

export async function addItemAction(merchandiseId: string, quantity = 1): Promise<void> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;

  let cart: Cart;
  if (cartId) {
    try {
      cart = await addToCart(cartId, merchandiseId, quantity);
    } catch {
      cart = await createCart(merchandiseId, quantity);
    }
  } else {
    cart = await createCart(merchandiseId, quantity);
  }

  store.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  revalidatePath("/carrinho");
}

export async function updateItemAction(lineId: string, quantity: number): Promise<void> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) return;
  if (quantity <= 0) {
    await removeCartLine(cartId, lineId);
  } else {
    await updateCartLine(cartId, lineId, quantity);
  }
  revalidatePath("/carrinho");
}

export async function removeItemAction(lineId: string): Promise<void> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) return;
  await removeCartLine(cartId, lineId);
  revalidatePath("/carrinho");
}
