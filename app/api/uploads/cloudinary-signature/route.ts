// app/api/uploads/cloudinary-signature/route.ts
import { getCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    console.error("CLOUDINARY_API_SECRET is not set in environment variables.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    const cl = getCloudinary();
    const timestamp = Math.floor(Date.now() / 1000);
    // Build signature: cloudinary expects a sorted param string; utils provides helper `api_sign_request`
    const signature = cl.utils.api_sign_request({ timestamp }, apiSecret);
    return NextResponse.json({ signature, timestamp });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Cloudinary signature generation failed:", errorMessage);
    return NextResponse.json({ error: "Failed to generate signature." }, { status: 500 });
  }
}
