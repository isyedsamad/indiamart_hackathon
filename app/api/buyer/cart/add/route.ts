import { NextResponse } from "next/server";
import { admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { buyerId, product } = await req.json();

  const ref = admindb.collection("carts").doc(buyerId);
  const snap = await ref.get();

  const items = snap.exists ? snap.data()!.items || [] : [];

  await ref.set(
    { items: [...items, product] },
    { merge: true }
  );

  return NextResponse.json({ success: true });
}
