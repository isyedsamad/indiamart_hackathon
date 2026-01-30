import { NextResponse } from "next/server";
import { adminAuth, admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const user = await adminAuth.getUserByEmail(email);

    const snap = await admindb.collection("users").doc(user.uid).get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const { role } = snap.data() as { role: "buyer" | "seller" };

    return NextResponse.json({
      success: true,
      role,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
