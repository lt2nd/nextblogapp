// app/api/uploads/imagekit-signature/route.ts
import { getImageKit } from "@/utils/imagekit";

export async function GET() {
  try {
    const ik = getImageKit();
    const auth = ik.getAuthenticationParameters();
    return new Response(JSON.stringify(auth), { status: 200, headers: { "content-type": "application/json" }});
  } catch (err) {
    console.error("imagekit signature error", err);
    return new Response(JSON.stringify({ error: "signature error" }), { status: 500, headers: { "content-type": "application/json" }});
  }
}
