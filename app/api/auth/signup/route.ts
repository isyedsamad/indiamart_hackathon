import { NextResponse } from "next/server";
import { adminAuth, admindb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }
    const user = await adminAuth.createUser({
      email,
      password,
    });
    await admindb.collection("users").doc(user.uid).set({
      email,
      role,
      createdAt: new Date(),
    });
    return NextResponse.json({
      success: true,
      role,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
