import { NextResponse } from "next/server";
import { admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { requirementId, sellerId, message } = await req.json();

  await admindb.collection("responses").add({
    requirementId,
    sellerId,
    message,
    createdAt: new Date(),
  });

  await admindb
    .collection("requirements")
    .doc(requirementId)
    .update({ status: "responded" });

  return NextResponse.json({ success: true });
}
