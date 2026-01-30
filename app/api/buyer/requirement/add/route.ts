import { NextResponse } from "next/server";
import { admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { title, category, budget, buyerId } = await req.json();

  if (!title || !category || !buyerId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await admindb.collection("requirements").add({
    title,
    category,
    budget: budget || null,
    buyerId,
    status: "open",
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
