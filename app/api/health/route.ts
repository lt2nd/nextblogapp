// app/api/health/route.ts
export async function GET() {
  return new Response(JSON.stringify({ message: "Hello from the Next.js backend!" }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
