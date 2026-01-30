import { NextResponse } from "next/server";
import { admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { name, category, price, sellerId } = await req.json();

  if (!name || !category || !sellerId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await admindb.collection("products").add({
    name,
    category,
    price: price || null,
    sellerId,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
